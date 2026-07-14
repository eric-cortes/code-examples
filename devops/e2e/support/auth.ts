/**
 * Authentication Helpers
 *
 * Supports both global setup workspace and local development fallback.
 */

import { expect, Locator, Page } from "@playwright/test";

import { Credentials } from "./types";
import { getAdminCredentials, getBaseUrl } from "./workspace";

const LOGIN_PAGE_READY_TIMEOUT_MS = 15000;

// Primary selectors: prefer stable test IDs, then accessibility labels/placeholders, then generic fallbacks.
const LOGIN_INPUT_SELECTOR = "input[type='email'], input[name='email']";
const PASSWORD_INPUT_SELECTOR = "input[type='password'], input[name='password']";
const LOGIN_BUTTON_SELECTOR = "button[type='submit']";

const getDefaultCredentials = (): Credentials => {
	const creds = getAdminCredentials();
	return {
		email: process.env.TEST_EMAIL || creds.email,
		password: process.env.TEST_PASSWORD || creds.password,
	};
};

export const DEFAULT_CREDENTIALS: Credentials = getDefaultCredentials();

const isLoginUrl = (url: string): boolean => {
	const path = new URL(url).pathname;
	return path === "/login" || path.endsWith("/login");
};

const getBodyText = async (page: Page): Promise<string> =>
	page
		.locator("body")
		.innerText()
		.catch(() => "");

const isGatewayError = (bodyText: string): boolean => /Bad Gateway|Gateway Timeout|502|503|504/i.test(bodyText);

const getLoginEmailField = (page: Page): Locator =>
	page
		.getByTestId("signin-email-input")
		.or(page.getByRole("textbox", { name: /e-?mail/i }))
		.or(page.getByLabel(/e-?mail/i))
		.or(page.getByPlaceholder(/e-?mail/i))
		.or(page.locator(LOGIN_INPUT_SELECTOR))
		.first();

const getLoginPasswordField = (page: Page): Locator =>
	page
		.getByTestId("signin-password-input")
		.or(page.getByRole("textbox", { name: /passwort|password/i }))
		.or(page.getByLabel(/passwort|password/i))
		.or(page.getByPlaceholder(/passwort|password/i))
		.or(page.locator(PASSWORD_INPUT_SELECTOR))
		.first();

const getLoginSubmitButton = (page: Page): Locator =>
	page
		.getByTestId("signin-button")
		.or(page.getByRole("button", { name: /anmelden|login|sign in/i }))
		.or(page.locator(LOGIN_BUTTON_SELECTOR))
		.first();

const isLoginFormVisible = async (page: Page, timeoutMs: number): Promise<boolean> => {
	const submitVisible = await getLoginSubmitButton(page)
		.waitFor({ state: "visible", timeout: timeoutMs })
		.then(() => true)
		.catch(() => false);

	if (!submitVisible) {
		return false;
	}

	// Validate at least one credential field is visible to avoid false positives from generic buttons.
	const emailVisible = await getLoginEmailField(page)
		.isVisible({ timeout: 2000 })
		.catch(() => false);
	const passwordVisible = await getLoginPasswordField(page)
		.isVisible({ timeout: 2000 })
		.catch(() => false);
	return emailVisible || passwordVisible;
};

export async function navigateToLoginPage(page: Page): Promise<void> {
	const loginUrl = `${getBaseUrl()}/login`;
	console.log("[auth] Navigating to login URL:", loginUrl);
	await page.goto(loginUrl, { waitUntil: "domcontentloaded" });

	const bodyText = await getBodyText(page);
	const bodySnippet = bodyText.slice(0, 300).replace(/\s+/g, " ");
	console.log("[auth] Login page body snippet:", bodySnippet || "(empty)");
	if (isGatewayError(bodyText)) {
		throw new Error(`Login page is unhealthy (${loginUrl}) - received gateway error page.`);
	}

	const hasLoginForm = await isLoginFormVisible(page, LOGIN_PAGE_READY_TIMEOUT_MS);
	const currentUrl = page.url();
	console.log("[auth] hasLoginForm:", hasLoginForm, "currentUrl:", currentUrl);

	// A successful /login redirect to an authenticated route is valid and handled by login().
	if (!hasLoginForm && isLoginUrl(currentUrl)) {
		console.error("[auth] Login form not visible after timeout. Body length:", bodyText.length);
		throw new Error(
			`Unable to reach login page at ${loginUrl} after ${LOGIN_PAGE_READY_TIMEOUT_MS}ms. Current URL: ${currentUrl}`,
		);
	}
}

/**
 * Block external third-party services that slow down tests or cause timeouts.
 * Called once per page context before login.
 */
async function blockExternalServices(page: Page): Promise<void> {
	await page.route(
		/chargebee\.com|sentry\.io|intercom\.io|analytics|google-analytics|googletagmanager|hotjar|segment/,
		(route) => route.abort("blockedbyclient"),
	);
}

/**
 * Login to the application.
 * Handles both fresh login and already logged-in states.
 */
export async function login(page: Page, credentials: Credentials = getDefaultCredentials()): Promise<void> {
	try {
		await blockExternalServices(page);
		await navigateToLoginPage(page);
		const bodyText = await getBodyText(page);
		if (isGatewayError(bodyText)) {
			throw new Error(`BASE_URL is unhealthy (${getBaseUrl()}) - received gateway error page.`);
		}

		const currentUrl = page.url();
		if (!isLoginUrl(currentUrl) && (await isAuthenticated(page))) {
			return;
		}

		await expect(getLoginEmailField(page)).toBeVisible({
			timeout: LOGIN_PAGE_READY_TIMEOUT_MS,
		});
		await expect(getLoginPasswordField(page)).toBeVisible({
			timeout: 5000,
		});

		await getLoginEmailField(page).fill(credentials.email);
		await getLoginPasswordField(page).fill(credentials.password);
		await getLoginSubmitButton(page).click();

		const navigatedAwayFromLogin = await page
			.waitForURL((url) => !isLoginUrl(url.toString()), { timeout: 20000 })
			.then(() => true)
			.catch(() => false);
		await page.waitForLoadState("domcontentloaded");
		// Bound this wait: specs that don't block live SSE (i.e. use raw
		// @playwright/test instead of fixtures-base) never reach networkidle,
		// which would otherwise hang login() until the whole test times out.
		await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => undefined);

		const url = page.url();
		if (!isLoginUrl(url) || navigatedAwayFromLogin) {
			return;
		}

		if (await isAuthenticated(page)) {
			return;
		}

		if (isLoginUrl(url)) {
			const errorText = await getBodyText(page);
			throw new Error(`Login failed - still on login page. Page content: ${errorText.substring(0, 200)}`);
		}
	} catch (error) {
		await page.screenshot({ path: "test-results/login-error.png", timeout: 5000 }).catch(() => undefined);
		throw error;
	}
}

/**
 * Logout from the application.
 * There is no /logout route — logout means clearing the auth cookie and navigating to /login.
 */
export async function logout(page: Page): Promise<void> {
	await page
		.context()
		.clearCookies()
		.catch(() => undefined);
	await page.goto(`${getBaseUrl()}/login`, { timeout: 20000, waitUntil: "domcontentloaded" });
	await expect(getLoginEmailField(page)).toBeVisible({ timeout: LOGIN_PAGE_READY_TIMEOUT_MS });
}

/**
 * Check if user is authenticated (auth cookie is present)
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
	const cookies = await page.context().cookies();
	return cookies.some((c) => c.name === "AUTH_TOKEN");
}

/**
 * Handle login errors
 */
export async function expectLoginError(page: Page, errorMessage: string): Promise<void> {
	const bodyText = await page.locator("body").innerText();
	expect(bodyText).toContain(errorMessage);
}
