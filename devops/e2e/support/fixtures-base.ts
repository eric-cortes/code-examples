/**
 * Custom Playwright test fixture that blocks live SSE connections
 * and injects worker-scoped storage state so tests start authenticated
 * without running login before each test.
 *
 * The live-updates endpoint keeps Server-Sent Event connections open
 * indefinitely, which prevents `page.waitForLoadState('networkidle')`
 * from ever resolving. Since E2E tests don't need real-time push
 * updates, we abort these requests at the browser level.
 *
 * Usage: import { test, expect } from '../support/fixtures-base';
 *        (instead of from '@playwright/test')
 *
 * For tests that must run unauthenticated (e.g. login/logout flows),
 * use fixtures-auth.ts instead.
 */

import * as fs from "fs";
import { join } from "path";

import { test as base } from "@playwright/test";

import { login } from "./auth";
import { deriveInfraHosts, errorLooksInfra, isInfraHost, isInfraNetError, type InfraEvent } from "./infra-classify";
import { getWorkerStorageStatePath } from "./parallel-auth";
import { getAdminCredentials, getBaseUrl } from "./workspace";

export const test = base.extend({
	context: async ({ browser }, use, testInfo) => {
		const statePath = getWorkerStorageStatePath(testInfo.workerIndex);
		const hasState = fs.existsSync(statePath);

		const context = await browser.newContext({
			...testInfo.project.use,
			storageState: hasState ? statePath : undefined,
		});

		if (!hasState) {
			const page = await context.newPage();
			page.route("**/.well-known/mercure**", (route) => route.abort());
			page.route("**/live.example.*/**", (route) => route.abort());
			await login(page, getAdminCredentials());
			fs.mkdirSync(join(process.cwd(), ".auth"), { recursive: true });
			await context.storageState({ path: statePath });
			await page.close();
		}

		await use(context);

		await context.close();
	},
	page: async ({ page }, use, testInfo) => {
		// Block live SSE so waitForLoadState('networkidle') resolves
		await page.route("**/.well-known/mercure**", (route) => route.abort());
		await page.route("**/live.example.*/**", (route) => route.abort());

		// Observe transient-infra signals (5xx responses + transport errors) on
		// our own hosts so the release gate can tell "staging was degraded" from
		// "the test is broken". Purely observational — we never retry or skip
		// here (API-client retry / backend stability is handled elsewhere).
		// Accumulators are LOCAL to this fixture instance so they reset per test
		// and never bleed across workers or retries.
		const infraHosts = (() => {
			try {
				return deriveInfraHosts(getBaseUrl());
			} catch {
				return [];
			}
		})();
		const server5xx: InfraEvent[] = [];
		const netErrors: InfraEvent[] = [];
		page.on("response", (response) => {
			try {
				const status = response.status();
				if (status >= 500 && status <= 599 && isInfraHost(response.url(), infraHosts)) {
					server5xx.push({
						url: response.url(),
						status,
						method: response.request().method(),
						ts: Date.now(),
					});
				}
			} catch {
				/* observation must never break a test */
			}
		});
		page.on("requestfailed", (request) => {
			try {
				const errorText = request.failure()?.errorText ?? "";
				if (isInfraNetError(errorText) && isInfraHost(request.url(), infraHosts)) {
					netErrors.push({ url: request.url(), errorText, method: request.method(), ts: Date.now() });
				}
			} catch {
				/* observation must never break a test */
			}
		});

		// Clear service workers and caches to prevent resource accumulation.
		// Wrapped in a navigation check because `about:blank` denies access to caches/localStorage.
		page.on("load", async () => {
			await page
				.evaluate(() => {
					if (typeof window !== "undefined") {
						// Suppress an onboarding modal that blocks pointer events in tests
						localStorage.setItem("app_onboarding_seen", "true");
						if ("caches" in window) {
							caches.keys().then((cacheNames) => {
								return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
							});
						}
					}
				})
				.catch(() => undefined);
		});

		await use(page);

		// On a genuinely-unexpected outcome, attach the observed infra events so
		// the release-gate verdict reporter can classify this failure as
		// infra-suspected rather than a real regression. Two guards prevent
		// masking a real regression: we attach only when (a) a 5xx/transport
		// error was observed on our hosts AND (b) the failure error itself is
		// network/timeout-shaped — a plain assertion mismatch that merely
		// coincided with a background 5xx stays a REAL failure. A retry that
		// recovers ends `expected` and attaches nothing, staying green.
		const sawInfra = server5xx.length > 0 || netErrors.length > 0;
		const failedUnexpectedly = testInfo.status !== testInfo.expectedStatus;
		if (failedUnexpectedly && sawInfra && errorLooksInfra(testInfo.errors.map((e) => e.message ?? ""))) {
			await testInfo
				.attach("infra-5xx.json", {
					contentType: "application/json",
					body: JSON.stringify({ server5xx, netErrors }),
				})
				.catch(() => undefined);
		}
	},
});

export { expect } from "@playwright/test";
export type { Browser, Page, BrowserContext } from "@playwright/test";
