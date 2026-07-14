# E2E testing (Playwright)

## Context

The Playwright suite that `../testing.yml` runs against every PR's Amplify
preview. ~50 spec files cover the app end to end; this is a representative
slice showing the infrastructure around the tests, not the full suite.

## What's here

- `playwright.config.ts` — worker count derived from CPU cores, three
  Chromium projects (default, `@serial`-tagged tests forced to a single
  worker, everything else parallel), CI-only blob/junit reporters for
  sharding, and global setup/teardown for provisioning a test workspace.
- `support/infra-classify.ts` (+ `infra-classify.test.ts`) — a small,
  dependency-free module that decides whether a failing test was a real
  regression or transient infra (a 5xx on our own hosts, a dropped
  connection). It's deliberately free of any Playwright import so it can be
  unit-tested with Vitest, and its guarantees (a real failure always blocks;
  infra noise never does) are tested directly rather than only observed
  through flaky CI runs.
- `support/fixtures-base.ts` — a custom `test`/`page` fixture that blocks
  the app's live-updates (SSE) connection so `waitForLoadState('networkidle')`
  can resolve, reuses worker-scoped auth state, and wires the infra
  classifier in: it watches responses/failed requests during a test and, on
  an unexpected failure, attaches the observed 5xx/network errors so the
  release-gate reporter can tell the two failure modes apart.
- `support/fixtures-parallel.ts` — worker-scoped authentication plus
  per-worker unique-data generators (`generateTestId`, `generateTestEmail`,
  `createEmployeeData`), so parallel workers never collide on the same
  test data.
- `support/auth.ts` — login/logout helpers with resilient selectors
  (test ID → accessibility role/label → CSS fallback, in that order) and
  gateway-error detection, so a flaky login doesn't masquerade as a broken
  test.
- `support/navigation.ts` — retry logic for hash-based SPA routes: a cold
  `page.goto()` to a hash URL doesn't always trigger the client router on
  CI, so this detects a redirect-to-dashboard and recovers via a sidebar
  click or a client-side hash change before falling back to a full
  re-navigation.
- `tests/team.spec.ts` — one representative spec built on the fixtures
  and navigation helper above.

## Omitted

- The other ~45 spec files — they follow the same pattern as
  `team.spec.ts` (navigate via a helper, assert on visible content) applied
  to different pages, so including more would repeat the same shape.
- `global-setup.ts` / `global-teardown.ts`, `support/workspace.ts`,
  `support/parallel-auth.ts`, `support/env.ts`, and `setup/*` — these
  provision a real test workspace and credentials against internal
  infrastructure and aren't generalizable outside that environment. Because
  they're omitted, the files here won't run standalone (consistent with the
  rest of this repo).
- `reporters/verdict-reporter.ts` — the CI-facing consumer of
  `infra-classify.ts`'s output; omitted since the classifier itself is the
  interesting part.

## Anonymization

Real hostnames, the live-updates subdomain, and localStorage/cookie key
names have been replaced with generic placeholders. `navigation.ts` and
`team.spec.ts` originally asserted on real (German) product copy for a
specific feature; both are rewritten here around a generic "team roster"
page with English content checks, since the literal UI text was more
identifying than the anonymized component/prop names used elsewhere in
this repo.

## Design decision

`infra-classify.ts` is kept free of any `@playwright/test` import even
though its only two callers are Playwright fixtures/reporters. Keeping the
classification logic pure means the load-bearing guarantees (a real
failure always blocks the release gate; infra noise never does) are
covered by fast Vitest unit tests against literal Playwright error strings,
rather than only being verifiable by reproducing flaky CI runs.
