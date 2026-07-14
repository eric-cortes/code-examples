/**
 * Navigation Helpers
 *
 * Provides robust navigation for hash-based SPA routes.
 * On CI (headless Chrome), page.goto() with hash URLs sometimes doesn't
 * trigger the SPA router reliably. The SPA may also redirect back to
 * dashboard during initialization. These helpers detect redirect failures
 * and retry using sidebar clicks and client-side hash changes.
 */

import { Page } from "@playwright/test";

import { getBaseUrl, getWorkspaceRoute } from "./workspace";

const BASE_URL = getBaseUrl();

/**
 * Wait for the page to settle after navigation.
 */
async function settlePage(page: Page): Promise<void> {
	await page.waitForLoadState("domcontentloaded");
	// Use a shorter timeout for networkidle to avoid hanging on slow connections
	await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => undefined);
}

/**
 * Poll for SPA content to appear in the page body.
 * Returns true if the content check passes within the timeout.
 */
async function waitForContent(page: Page, check: (text: string) => boolean, timeout: number): Promise<boolean> {
	const deadline = Date.now() + timeout;
	while (Date.now() < deadline) {
		const text = await page
			.locator("body")
			.innerText()
			.catch(() => "");
		if (check(text)) return true;
		await page.waitForTimeout(500);
	}
	return false;
}

/**
 * Check if the current URL hash contains the expected path.
 * Prevents false-positive content checks caused by sidebar text
 * when the SPA has redirected to a different route (e.g. dashboard).
 */
function urlContainsPath(currentUrl: string, path: string): boolean {
	const hashIndex = currentUrl.indexOf("#");
	if (hashIndex < 0) return false;
	const hash = currentUrl.substring(hashIndex + 1); // Skip the # character
	// For paths like "team-calendar/", check if hash starts with workspace ID followed by the path
	// Expected hash format: "/{workspaceId}/{path}" or "{workspaceId}/{path}"
	return hash.includes(`/${path}`) || hash.startsWith(path);
}

/**
 * Navigate to a hash-based SPA route with retry logic.
 *
 * Hash routes (/#/{id}/path) require the SPA JavaScript to process them.
 * On CI (headless Chrome), page.goto() with hash URLs sometimes doesn't
 * trigger the SPA router reliably — the SPA may redirect to dashboard
 * during initialization. This helper detects redirect failures and retries
 * using sidebar clicks and client-side hash changes.
 *
 * @param page - Playwright page
 * @param path - Route path (e.g. 'team-calendar/', 'dashboard', 'settings/general')
 * @param contentCheck - Function that checks body text for expected content
 * @param options - maxRetries (default 2), contentTimeout (default 15000ms)
 */
export async function navigateToHashRoute(
	page: Page,
	path: string,
	contentCheck?: (text: string) => boolean,
	options: { maxRetries?: number; contentTimeout?: number; sidebarTestId?: string } = {},
): Promise<void> {
	const { maxRetries = 2, contentTimeout = 15000, sidebarTestId } = options;
	const url = `${BASE_URL}${getWorkspaceRoute(path)}`;

	// Use 'commit' to return as soon as navigation starts, then settle separately.
	// A hash-only change from the current document (e.g. login landed on
	// /#/{id}/dashboard and we're now going to /#/{id}/team-calendar/) never
	// "commits", so goto would hang the full timeout and throw before the retry
	// loop below can recover. Treat a failed/timed-out goto as non-fatal — the
	// retry loop recovers via sidebar click / client-side hash change.
	await page.goto(url, { waitUntil: "commit", timeout: 15000 }).catch(() => undefined);
	await settlePage(page);

	// If no content check, use a generic SPA sidebar content check
	const check = contentCheck ?? ((text: string) => /Home|Team|Schedule|Dashboard|Reports|Settings/i.test(text));

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		const perAttemptTimeout = attempt < maxRetries ? Math.min(contentTimeout, 8000) : contentTimeout;

		if (await waitForContent(page, check, perAttemptTimeout)) {
			// Content check passed — verify URL is on the correct route.
			// Sidebar text can cause false positives when the SPA redirected (e.g. to dashboard).
			if (!contentCheck || urlContainsPath(page.url(), path)) return;
			// URL was redirected — content matched from wrong page, fall through to retry
		}

		if (attempt < maxRetries) {
			const wasRedirected = !urlContainsPath(page.url(), path);

			// Strategy 1: Click sidebar item (client-side navigation, most reliable)
			if (sidebarTestId) {
				try {
					const sidebarItem = page.locator(`[data-testid='${sidebarTestId}']`).first();
					if (await sidebarItem.isVisible({ timeout: 3000 }).catch(() => false)) {
						await sidebarItem.click({ timeout: 5000 });
						await settlePage(page);
						continue;
					}
				} catch {
					// Sidebar click failed (e.g. mobile viewport), fall through
				}
			}

			if (wasRedirected) {
				// Strategy 2: SPA is loaded but redirected. Use client-side hash change.
				const hashPath = getWorkspaceRoute(path);
				await page.evaluate((h) => {
					window.location.hash = h.replace(/^\/?#/, "");
				}, hashPath);
				await settlePage(page);
			} else {
				// Strategy 3: URL is correct but content didn't load. Re-navigate.
				// Non-fatal for the same hash-only no-commit reason as the initial goto.
				await page.goto(url, { waitUntil: "commit", timeout: 15000 }).catch(() => undefined);
				await settlePage(page);
			}
		}
	}
}

export async function navigateToDashboard(page: Page): Promise<void> {
	await navigateToHashRoute(page, "dashboard", (text) => /Welcome|Dashboard|Home|Schedule|Inbox/i.test(text));
}

export async function navigateToTeam(page: Page): Promise<void> {
	await navigateToHashRoute(
		page,
		"team/",
		(text) =>
			text.includes("Add team member") ||
			text.includes("Locations") ||
			text.includes("Work areas") ||
			text.includes("Employee ID") ||
			/\d+\s*\/\s*\d+\s*members/.test(text),
		{ sidebarTestId: "page_team", contentTimeout: 60000 },
	);
}

export async function navigateToSettings(page: Page, subpage: string = ""): Promise<void> {
	const path = subpage ? `settings/${subpage}` : "settings/";

	// Settings-specific content markers (not sidebar text)
	const settingsContentChecks: Record<string, (text: string) => boolean> = {
		general: (text) => text.includes("Company name") || text.includes("Address") || text.includes("Display name"),
		"": (text) => text.includes("Company") && text.includes("Notifications"),
		notifications: (text) => text.includes("Notifications") && (text.includes("Email") || text.includes("Push")),
		plan: (text) => text.includes("Scheduling & time tracking"),
		branch: (text) => text.includes("Locations & work areas"),
	};

	const contentCheck =
		settingsContentChecks[subpage] ?? ((text: string) => text.includes("Settings") || text.includes("Company"));

	// Settings has no sidebar item — the SPA often redirects cold loads to dashboard.
	// Warm up the SPA by navigating to dashboard first, then use hash change for settings.
	const hashPath = getWorkspaceRoute(path);

	// Step 1: Ensure the SPA is loaded and running
	if (!urlContainsPath(page.url(), "dashboard") && !page.url().includes("#")) {
		await navigateToDashboard(page);
	}

	// Step 2: Navigate to settings via client-side hash change (avoids cold-load redirect)
	await page.evaluate((h) => {
		window.location.hash = h.replace(/^\/?#/, "");
	}, hashPath);
	await settlePage(page);

	// Step 3: Wait for settings content to load
	if (await waitForContent(page, contentCheck, 20000)) return;

	// Step 4: If content didn't load, try full navigation as fallback
	await navigateToHashRoute(page, path, contentCheck, { contentTimeout: 15000 });
}
