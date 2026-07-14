/**
 * Infra-vs-real failure classification.
 *
 * Pure, dependency-free logic shared by:
 *   - the `page` fixture in fixtures-base.ts (observes 5xx / transport errors
 *     and attaches them to failing tests), and
 *   - the verdict reporter in reporters/verdict-reporter.ts (turns those
 *     attachments into a release-gate verdict).
 *
 * It deliberately has NO runtime import from "@playwright/test" so it can be
 * unit-tested with plain Node / Vitest without a browser. See
 * infra-classify.test.ts.
 *
 * Scope note: this module only CLASSIFIES failures. It never retries and never
 * skips — API-client retry-on-5xx and backend stability are handled elsewhere.
 */

/** A single transient-infra event observed during a test. */
export type InfraEvent = {
	url: string;
	/** HTTP status for a 5xx response; absent for a transport-level failure. */
	status?: number;
	/** Browser error text for a transport failure (e.g. "net::ERR_..."). */
	errorText?: string;
	method: string;
	ts: number;
};

/** Shape of the `infra-5xx.json` attachment written on a failing test. */
export type InfraAttachment = {
	server5xx: InfraEvent[];
	netErrors: InfraEvent[];
};

/**
 * True for transport-level errors that indicate transient infra (connection
 * resets, DNS, timeouts), and NOT for explicit client-side abort codes
 * (ERR_ABORTED / ERR_BLOCKED_BY_CLIENT). Note: our own third-party
 * `route.abort()` calls surface as ERR_FAILED, which this function does NOT
 * exclude — they are filtered out instead by isInfraHost (those hosts are never
 * in the derived infra-host set), which is the real guard against self-noise.
 */
export function isInfraNetError(errorText: string): boolean {
	if (!errorText) {
		return false;
	}
	// Client-side / self-inflicted aborts are NOT transient infra. Match the
	// canonical Chromium net codes (with underscores) as well as the raw
	// route.abort() codes. Note this deliberately does NOT match
	// ERR_CONNECTION_ABORTED — that is a real transport reset (caught below).
	if (/ERR_ABORTED|ERR_BLOCKED_BY_CLIENT|blockedbyclient/i.test(errorText)) {
		return false;
	}
	return /net::ERR_|ECONNREFUSED|ECONNRESET|ERR_CONNECTION|ERR_TIMED_OUT|ERR_NAME_NOT_RESOLVED|ERR_NETWORK_CHANGED/.test(
		errorText,
	);
}

/**
 * Derive the set of hosts whose 5xx/transport errors count as "our infra":
 * the app host itself plus its sibling api.* / accounts.* backends.
 *
 * Mirrors the seeder's fallback host derivation (e2e/setup/seed.ts): only
 * *.example.(dev|test|com) hosts get api/accounts siblings derived; for any
 * other host (e.g. an Amplify PR-preview URL) we still count the app host but
 * cannot guess its backend, so we return just the app host.
 */
export function deriveInfraHosts(baseUrl: string): string[] {
	let host: string;
	try {
		host = new URL(baseUrl).hostname;
	} catch {
		// Tolerate a bare hostname passed instead of a full URL.
		const [hostAndPort] = (baseUrl || "").replace(/^https?:\/\//, "").split("/");
		[host] = hostAndPort.split(":");
	}
	if (!host) {
		return [];
	}
	const hosts = [host];
	if (/\.example\.(dev|test|com)$/.test(host)) {
		hosts.push(host.replace(/^[^.]+\./, "api."));
		hosts.push(host.replace(/^[^.]+\./, "accounts."));
	}
	return hosts;
}

/**
 * True when `url`'s host is one of the derived infra hosts. Live/SSE hosts
 * are excluded defensively (they are route-aborted in the fixture and so never
 * yield a real 5xx, but guarding keeps the signal clean if that ever changes).
 */
export function isInfraHost(url: string, hosts: string[]): boolean {
	let hostname: string;
	try {
		hostname = new URL(url).hostname;
	} catch {
		return false;
	}
	if (/(^|\.)live\.example\.|mercure/i.test(hostname)) {
		return false;
	}
	return hosts.includes(hostname);
}

/**
 * Strip ANSI SGR colour sequences (ESC + "[" + params + "m"). Playwright
 * colourises matcher messages, so markers like "Received: 503" would otherwise
 * be split by colour codes. ESC is built at runtime so the source carries no
 * raw control byte.
 */
function stripAnsi(text: string): string {
	// ESC + "[" + params + "m"; ESC built at runtime so the source carries no raw control byte.
	const ansi = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");
	return text.replace(ansi, "");
}

/**
 * True when a test's failure error(s) look like they were CAUSED by infra — a
 * timeout where the awaited data never loaded, a navigation/transport failure, a
 * browser crash, a gateway error page, or a 5xx surfacing in a status assertion.
 *
 * This is the second half of the infra signal: a failure is treated as
 * infra-suspected only when BOTH (a) a 5xx/transport error was observed on our
 * hosts AND (b) the failure itself is infra-shaped. A wrong VALUE/count/state
 * (the element rendered, the value is wrong) must stay a REAL failure even if it
 * coincided with a background 5xx, so a regression is never masked. Verified
 * against real Playwright 1.59 messages.
 */
export function errorLooksInfra(messages: string[]): boolean {
	const text = stripAnsi((messages || []).filter(Boolean).join("\n"));
	if (!text) {
		return false;
	}
	// (1) Transport / browser-crash / gateway-error-PAGE failures. A real value or
	//     logic regression essentially never produces these.
	if (
		/net::ERR|ERR_(CONNECTION|TIMED_OUT|NAME_NOT_RESOLVED|NETWORK|EMPTY_RESPONSE)|ECONNREFUSED|ECONNRESET|socket hang up|Target (closed|crashed|page)|Bad Gateway|Gateway Timeout|Service Unavailable|Internal Server Error|unhealthy|gateway error/i.test(
			text,
		)
	) {
		return true;
	}
	// (2) A 5xx status surfacing directly in a response/status assertion, e.g.
	//     `expect(apiResponse.status()).toBe(201)` against a 503 → `Received: 503`.
	//     (We deliberately do NOT match `Received: false` from
	//     `expect(resp.ok()).toBe(true)` — it is indistinguishable from a real
	//     boolean regression; a *transient* mutation-503 recovers on retry, and a
	//     *sustained* one blocking is acceptable.)
	if (/Received:\s*"?50[0-9]"?\b/i.test(text)) {
		return true;
	}
	// (3) Only TIMEOUT failures past this point — a non-timeout hard assertion is a
	//     real logic bug, never infra. Playwright 1.59 renders the timeout two
	//     ways: web-first assertions → "Timeout:  5000ms" (colon form, no
	//     "exceeded"); actions / test timeout → "Timeout 5000ms exceeded" /
	//     "Test timeout of Nms exceeded".
	if (!/Timeout:\s*\d+ms|Timeout\s+\d+ms exceeded|Test timeout of \d+ms exceeded/i.test(text)) {
		return false;
	}
	// A web-first assertion times out on BOTH a wrong value and a never-loaded
	// element, so the timeout alone is not the signal. In 1.59 a wrong
	// VALUE/count/state is marked by "unexpected value" + a "Received:" line (the
	// element resolved) → a REAL regression; never mask it. A never-loaded
	// element is marked by "element(s) not found" / "resolved to 0 elements" and
	// has no Received value → the awaited data never arrived → infra-shaped.
	// Element-absent markers must be Playwright-specific. A bare "not found" can
	// appear inside a Received VALUE (e.g. a real "Record not found" regression, or
	// a "No results found" empty state) and would otherwise set elementAbsent on a
	// genuine value mismatch — masking it as infra when a 5xx co-occurs.
	const elementAbsent = /element\(s\) not found|resolved to 0 element/i.test(text);
	const valueMismatch = /unexpected value|Received:/i.test(text);
	if (valueMismatch && !elementAbsent) {
		return false;
	}
	return true;
}

/** Final, retry-aware outcome of a test as Playwright reports it. */
export type TestOutcome = "expected" | "unexpected" | "flaky" | "skipped";

export type TestClassification = "pass" | "real-fail" | "infra-suspected";

/**
 * Classify a single test by its FINAL (retry-aggregated) outcome:
 *   - anything that ultimately passed / was expected / recovered (flaky) /
 *     skipped is a "pass" — it does not block the gate;
 *   - a genuinely-unexpected failure is "infra-suspected" when transient-infra
 *     events were observed during it, else "real-fail".
 *
 * Using the aggregate outcome (not a per-attempt status) is what makes this
 * retry-safe: a test that 503s on attempt 1 and passes on retry is "flaky" →
 * "pass", and never reaches the verdict as a failure.
 */
export function classifyTest(t: { outcome: TestOutcome; hasInfraAttachment: boolean }): TestClassification {
	if (t.outcome !== "unexpected") {
		return "pass";
	}
	return t.hasInfraAttachment ? "infra-suspected" : "real-fail";
}

export type FailedTest = { title: string; file: string; classification: TestClassification };

export type RunVerdict = {
	verdict: "pass" | "fail" | "infra-degraded";
	realFails: number;
	infraFails: number;
	totalTests: number;
	failedTests: FailedTest[];
};

/**
 * Roll per-test classifications into a release-gate verdict.
 *
 * GUARANTEES (the load-bearing invariants of the gate):
 *   - realFails > 0  ⇒ verdict "fail"           — a real failure ALWAYS blocks.
 *   - realFails === 0 ⇒ verdict is never "fail"  — infra noise NEVER blocks.
 *   - realFails === 0 && infraFails > 0 ⇒ "infra-degraded" (advisory).
 */
export function classifyRun(tests: FailedTest[]): RunVerdict {
	const failedTests = tests.filter((t) => t.classification !== "pass");
	const realFails = failedTests.filter((t) => t.classification === "real-fail").length;
	const infraFails = failedTests.filter((t) => t.classification === "infra-suspected").length;
	const verdict = realFails > 0 ? "fail" : infraFails > 0 ? "infra-degraded" : "pass";
	return { verdict, realFails, infraFails, totalTests: tests.length, failedTests };
}
