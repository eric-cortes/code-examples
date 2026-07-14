/**
 * Unit tests for the pure infra-vs-real classifier.
 *
 * Runs under Vitest in the "node" project (see vitest.config.ts):
 *
 *   pnpm exec vitest run --project=node
 *
 * Playwright never picks this up: it is outside testDir (./tests) and is
 * matched by the test-file testIgnore glob in playwright.config.ts.
 */

import { describe, expect, it } from "vitest";

import {
	classifyRun,
	classifyTest,
	deriveInfraHosts,
	errorLooksInfra,
	isInfraHost,
	isInfraNetError,
	type FailedTest,
} from "./infra-classify";

describe("isInfraNetError", () => {
	it("matches genuine transport failures", () => {
		expect(isInfraNetError("net::ERR_CONNECTION_REFUSED")).toBe(true);
		expect(isInfraNetError("net::ERR_TIMED_OUT")).toBe(true);
		expect(isInfraNetError("ECONNRESET")).toBe(true);
		expect(isInfraNetError("net::ERR_NAME_NOT_RESOLVED")).toBe(true);
	});

	it("rejects self-inflicted aborts and empty input", () => {
		expect(isInfraNetError("net::ERR_BLOCKED_BY_CLIENT")).toBe(false);
		expect(isInfraNetError("blockedbyclient")).toBe(false);
		expect(isInfraNetError("aborted")).toBe(false);
		expect(isInfraNetError("")).toBe(false);
	});
});

describe("deriveInfraHosts", () => {
	it("derives api/accounts siblings for our own hosts", () => {
		expect(deriveInfraHosts("https://app.example.dev")).toEqual([
			"app.example.dev",
			"api.example.dev",
			"accounts.example.dev",
		]);
		expect(deriveInfraHosts("https://tenant.example.test/some/path")).toEqual([
			"tenant.example.test",
			"api.example.test",
			"accounts.example.test",
		]);
	});

	it("returns only the app host for unrelated hosts (e.g. Amplify previews)", () => {
		expect(deriveInfraHosts("https://pr-123.amplifyapp.com")).toEqual(["pr-123.amplifyapp.com"]);
	});

	it("tolerates a bare hostname and empty input", () => {
		expect(deriveInfraHosts("app.example.dev")).toEqual([
			"app.example.dev",
			"api.example.dev",
			"accounts.example.dev",
		]);
		expect(deriveInfraHosts("")).toEqual([]);
	});
});

describe("isInfraHost", () => {
	const hosts = ["app.example.dev", "api.example.dev", "accounts.example.dev"];

	it("matches derived infra hosts", () => {
		expect(isInfraHost("https://api.example.dev/api/v3/employees", hosts)).toBe(true);
		expect(isInfraHost("https://app.example.dev/login", hosts)).toBe(true);
		expect(isInfraHost("https://accounts.example.dev/oauth", hosts)).toBe(true);
	});

	it("excludes live/SSE and unrelated third-party hosts", () => {
		expect(isInfraHost("https://live.example.dev/.well-known/mercure", hosts)).toBe(false);
		expect(isInfraHost("https://js.chargebee.com/v2/chargebee.js", hosts)).toBe(false);
		expect(isInfraHost("https://o123.ingest.sentry.io/api", hosts)).toBe(false);
	});

	it("returns false on unparseable urls", () => {
		expect(isInfraHost("not a url", hosts)).toBe(false);
	});
});

describe("errorLooksInfra", () => {
	// Real Playwright 1.59 web-first-assertion failure messages (captured live).
	// Web-first assertions render the timeout as "Timeout:  Nms" (colon form, NO
	// "exceeded") and mark a wrong value with "unexpected value" + a "Received:"
	// line; a never-loaded element is marked "element(s) not found" with no value.
	const PW159_VALUE_MISMATCH = [
		"expect(locator).toHaveText(expected) failed",
		"",
		"Locator:  getByTestId('x')",
		'Expected: "Active"',
		'Received: "Inactive"',
		"Timeout:  800ms",
		"",
		"Call log:",
		'  - Expect "toHaveText" with timeout 800ms',
		"  - waiting for getByTestId('x')",
		'    4 × locator resolved to <div data-testid="x">Inactive</div>',
		'      - unexpected value "Inactive"',
	].join("\n");
	const PW159_ELEMENT_ABSENT = [
		"expect(locator).toBeVisible() failed",
		"",
		"Locator: getByTestId('missing')",
		"Expected: visible",
		"Timeout: 800ms",
		"Error: element(s) not found",
		"",
		"Call log:",
		'  - Expect "toBeVisible" with timeout 800ms',
		"  - waiting for getByTestId('missing')",
	].join("\n");
	const PW159_COUNT_MISMATCH = [
		"expect(locator).toHaveCount(expected) failed",
		"Expected: 3",
		"Received: 1",
		"Timeout:  800ms",
		'      - unexpected value "1"',
	].join("\n");

	it("matches transport / browser-crash / gateway-page failures", () => {
		expect(errorLooksInfra(["page.goto: net::ERR_CONNECTION_REFUSED at https://api.example.dev"])).toBe(true);
		expect(errorLooksInfra(["BASE_URL is unhealthy - received gateway error page"])).toBe(true);
		expect(errorLooksInfra(["Target page, context or browser has been closed"])).toBe(true);
		expect(errorLooksInfra(["apiRequestContext.fetch: socket hang up"])).toBe(true);
	});

	it("matches a 5xx status surfacing in a status assertion", () => {
		// expect(apiResponse.status(), "Create record API should return 201").toBe(201) against a 503
		expect(errorLooksInfra(["Create record API should return 201\n\nExpected: 201\nReceived: 503"])).toBe(true);
		expect(errorLooksInfra(["Expected: 200\nReceived: 502"])).toBe(true);
		// Even when ANSI colour codes split the value (Playwright colourises messages).
		expect(errorLooksInfra(["Expected: \u001b[32m201\u001b[39m\nReceived: \u001b[31m503\u001b[39m"])).toBe(true);
	});

	it("matches a real 1.59 element-never-resolved timeout (data never loaded → infra)", () => {
		expect(errorLooksInfra([PW159_ELEMENT_ABSENT])).toBe(true);
		// action timeout (element not actionable) and the test-level timeout
		expect(
			errorLooksInfra(["locator.click: Timeout 30000ms exceeded.\nCall log:\n  - waiting for getByTestId('b')"]),
		).toBe(true);
		expect(errorLooksInfra(["Test timeout of 120000ms exceeded"])).toBe(true);
	});

	it("does NOT mask a real 1.59 value/count mismatch (the dangerous direction)", () => {
		expect(errorLooksInfra([PW159_VALUE_MISMATCH])).toBe(false);
		expect(errorLooksInfra([PW159_COUNT_MISMATCH])).toBe(false);
		// expect(resp.ok()).toBe(true) → Received: false is NOT treated as infra
		expect(errorLooksInfra(["Expected: true\nReceived: false"])).toBe(false);
		// A value mismatch whose Received TEXT contains "not found" (a real
		// "Record not found" regression / a "No results found" empty state) must
		// NOT be masked as infra (the dangerous false-pass direction).
		expect(
			errorLooksInfra([
				'expect(locator).toHaveText(expected) failed\nExpected: "Welcome back"\nReceived: "Record not found"\nTimeout:  5000ms\n  - unexpected value "Record not found"',
			]),
		).toBe(false);
	});

	it("does NOT match a plain (non-timeout) assertion mismatch", () => {
		expect(errorLooksInfra(["expect(received).toBe(expected)\n\nExpected: 5\nReceived: 4"])).toBe(false);
		expect(errorLooksInfra(["Error: strict mode violation: getByRole('button') resolved to 2 elements"])).toBe(
			false,
		);
		expect(errorLooksInfra([])).toBe(false);
		expect(errorLooksInfra([""])).toBe(false);
	});
});

describe("classifyTest", () => {
	it("treats passed/flaky/skipped/expected as pass (retry-safe)", () => {
		expect(classifyTest({ outcome: "expected", hasInfraAttachment: false })).toBe("pass");
		expect(classifyTest({ outcome: "flaky", hasInfraAttachment: true })).toBe("pass");
		expect(classifyTest({ outcome: "skipped", hasInfraAttachment: false })).toBe("pass");
	});

	it("classifies unexpected failures by infra evidence", () => {
		expect(classifyTest({ outcome: "unexpected", hasInfraAttachment: false })).toBe("real-fail");
		expect(classifyTest({ outcome: "unexpected", hasInfraAttachment: true })).toBe("infra-suspected");
	});
});

describe("classifyRun", () => {
	const real: FailedTest = { title: "a", file: "a.spec.ts", classification: "real-fail" };
	const infra: FailedTest = { title: "b", file: "b.spec.ts", classification: "infra-suspected" };
	const pass: FailedTest = { title: "c", file: "c.spec.ts", classification: "pass" };

	it("blocks on any real failure", () => {
		const v = classifyRun([real, pass]);
		expect(v.verdict).toBe("fail");
		expect(v.realFails).toBe(1);
		expect(v.failedTests).toHaveLength(1);
	});

	it("degrades (does not block) on infra-only failures", () => {
		const v = classifyRun([infra, infra, infra, pass]);
		expect(v.verdict).toBe("infra-degraded");
		expect(v.infraFails).toBe(3);
		expect(v.realFails).toBe(0);
	});

	it("a real failure wins over infra noise", () => {
		const v = classifyRun([real, real, infra, infra, infra, pass]);
		expect(v.verdict).toBe("fail");
		expect(v.realFails).toBe(2);
		expect(v.infraFails).toBe(3);
	});

	it("passes a clean run", () => {
		expect(classifyRun([pass, pass]).verdict).toBe("pass");
		expect(classifyRun([]).verdict).toBe("pass");
	});

	it("reports totalTests including passes", () => {
		expect(classifyRun([real, infra, pass]).totalTests).toBe(3);
	});
});
