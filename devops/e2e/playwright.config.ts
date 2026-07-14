import { existsSync, readFileSync } from "fs";
import os from "os";
import { join } from "path";

import { defineConfig, devices, type ReporterDescription } from "@playwright/test";

import { loadLocalEnv } from "./support/env";

/**
 * E2E Test Configuration
 *
 * Supports parallel execution with worker-scoped authentication.
 */

const workspaceFile = join(process.cwd(), ".auth", "test-workspace.json");
loadLocalEnv();
const environment = process.env.TEST_ENV;
const fallbackBaseUrl =
	process.env.SKIP_CREATING_WORKSPACE === "true" && !process.env.BASE_URL
		? ""
		: environment && environment !== "test"
			? `https://workspace.example.${environment}`
			: "https://workspace.example.test";
const dynamicBaseUrl = process.env.BASE_URL || fallbackBaseUrl;

// Read workspace metadata (ID, slug) written by global-setup.
// Never override BASE_URL with the workspace subdomain — tests always navigate
// to BASE_URL (e.g. the Amplify PR preview). The workspace subdomain is only
// an artifact of the registration flow and must not be used for navigation.
if (existsSync(workspaceFile)) {
	const workspace = JSON.parse(readFileSync(workspaceFile, "utf-8"));
	console.log(`Using test workspace: ${workspace.workspaceSlug}`);
}

const baseURL = dynamicBaseUrl;
const includeExperimentalSuites = process.env.E2E_INCLUDE_EXPERIMENTAL === "1";
const enableCrossBrowserProjects = process.env.E2E_CROSS_BROWSER === "1";

const getWorkerCount = () => {
	if (process.env.WORKERS) {
		const parsed = parseInt(process.env.WORKERS, 10);
		if (!Number.isNaN(parsed) && parsed > 0) {
			return parsed;
		}
	}
	const cpus = os.cpus().length;
	return Math.min(Math.max(1, Math.floor(cpus / 2)), 8);
};

const isShard = !!process.env.CI && process.argv.some((arg) => arg.startsWith("--shard"));

const reporters: ReporterDescription[] = isShard
	? [["blob"], ["list"]]
	: [
			["html", { open: "never", outputFolder: "reports/html", attachments: true }],
			["list"],
			["json", { outputFile: "reports/test-results.json" }],
		];

if (process.env.CI && !isShard) {
	reporters.push(["junit", { outputFile: "reports/junit.xml" }]);
}

export default defineConfig({
	testDir: "./tests",
	testIgnore: [
		...(includeExperimentalSuites
			? []
			: ["**/debug-login*.spec.ts", "**/simple-login.spec.ts", "**/crawler.spec.ts", "**/regression/**"]),
		"../**/*.test.{js,jsx,ts,tsx}",
		"../**/*.spec.ts",
		"../**/*.spec.tsx",
	],

	fullyParallel: !process.env.SERIAL_MODE,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 1,
	workers: process.env.CI ? 2 : getWorkerCount(),
	maxFailures: process.env.CI ? 10 : undefined,

	reporter: reporters,

	timeout: 120000,

	use: {
		baseURL,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
		viewport: { width: 1440, height: 900 },
		actionTimeout: 15000,
		navigationTimeout: 60000,
		ignoreHTTPSErrors: true,
		launchOptions: {
			slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO, 10) : 0,
		},
	},

	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				launchOptions: {
					args: ["--disable-dev-shm-usage", ...(process.env.CI ? ["--no-sandbox"] : [])],
				},
			},
		},
		{
			name: "chromium-parallel",
			use: {
				...devices["Desktop Chrome"],
				launchOptions: {
					args: ["--disable-dev-shm-usage", ...(process.env.CI ? ["--no-sandbox"] : [])],
				},
			},
			grepInvert: /@serial/,
		},
		{
			name: "chromium-serial",
			use: {
				...devices["Desktop Chrome"],
				launchOptions: {
					args: ["--disable-dev-shm-usage", ...(process.env.CI ? ["--no-sandbox"] : [])],
				},
			},
			grep: /@serial/,
			fullyParallel: false,
			workers: 1,
		},
		...(enableCrossBrowserProjects
			? [
					{
						name: "firefox",
						use: { ...devices["Desktop Firefox"] },
					},
					{
						name: "webkit",
						use: { ...devices["Desktop Safari"] },
					},
					{
						name: "Mobile Chrome",
						use: { ...devices["Pixel 5"] },
						grep: /@mobile/,
					},
					{
						name: "Mobile Safari",
						use: { ...devices["iPhone 12"] },
						grep: /@mobile/,
					},
				]
			: []),
	],

	outputDir: "test-results/",

	globalSetup: process.env.SKIP_CREATING_WORKSPACE ? undefined : require.resolve("./global-setup"),
	globalTeardown: process.env.SKIP_CREATING_WORKSPACE ? undefined : require.resolve("./global-teardown"),
});
