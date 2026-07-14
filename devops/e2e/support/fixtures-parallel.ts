/**
 * Parallel Test Fixtures
 *
 * Extends Playwright's test fixture with worker-scoped authentication
 * and isolated test data generation for parallel execution.
 */

import * as fs from "fs";

import { test as base, expect, type Page } from "@playwright/test";

import { login } from "./auth";
import { getWorkerStorageStatePath } from "./parallel-auth";
import { getAdminCredentials } from "./workspace";

// Define worker-scoped fixtures type
interface WorkerFixtures {
	workerIndex: number;
	generateTestId: (prefix?: string) => string;
	generateTestEmail: (prefix?: string) => string;
	createEmployeeData: (overrides?: Record<string, any>) => Record<string, any>;
}

// Define test-scoped fixtures type
interface TestFixtures {
	authPage: Page;
}

/**
 * Extended test with parallel support
 *
 * Usage:
 *   import { test, expect } from '../support/fixtures-parallel';
 *
 *   test('my test', async ({ authPage, createEmployeeData }) => {
 *     // authPage is pre-authenticated
 *     // createEmployeeData generates unique data per worker
 *   });
 */
export const test = base.extend<TestFixtures, WorkerFixtures>({
	// Worker-scoped fixtures (set up once per worker)
	workerIndex: [
		async (_fixtures, use, testInfo) => {
			await use(testInfo.workerIndex);
		},
		{ scope: "worker" },
	],

	generateTestId: [
		async ({ workerIndex }, use) => {
			await use((prefix: string = "test") => {
				const timestamp = Date.now();
				const random = Math.floor(Math.random() * 1000);
				return `${prefix}-w${workerIndex}-${timestamp}-${random}`;
			});
		},
		{ scope: "worker" },
	],

	generateTestEmail: [
		async ({ workerIndex }, use) => {
			await use((prefix: string = "user") => {
				const testId = `${prefix}-w${workerIndex}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
				return `${testId}@example.test`;
			});
		},
		{ scope: "worker" },
	],

	createEmployeeData: [
		async ({ workerIndex, generateTestEmail }, use) => {
			await use((overrides: Record<string, any> = {}) => {
				return {
					email: generateTestEmail("employee"),
					firstName: overrides.firstName || `Test${workerIndex}`,
					lastName: overrides.lastName || `Worker${workerIndex}`,
					startDate: overrides.startDate || new Date().toISOString().split("T")[0],
					employeeNumber: overrides.employeeNumber || `EMP-W${workerIndex}-${Date.now()}`,
					jobTitle: overrides.jobTitle || "Software Tester",
					...overrides,
				};
			});
		},
		{ scope: "worker" },
	],

	// Test-scoped fixtures (set up for each test)
	authPage: async ({ browser, workerIndex }, use) => {
		const statePath = getWorkerStorageStatePath(workerIndex);

		// Create context with stored auth state if available
		const context = await browser.newContext({
			storageState: fs.existsSync(statePath) ? statePath : undefined,
			ignoreHTTPSErrors: true,
		});

		const page = await context.newPage();

		// If no storage state, login now and save state
		if (!fs.existsSync(statePath)) {
			await login(page, getAdminCredentials());
			await context.storageState({ path: statePath });
		}

		await use(page);
		await context.close();
	},
});

export { expect };
