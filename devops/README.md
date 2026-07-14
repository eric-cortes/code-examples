# DevOps / CI-CD

## Context

This comes from the same booking/scheduling application (Next.js) as
[`../feature-structure`](../feature-structure). It shows the CI/CD side:
how PRs get an ephemeral preview deployment on AWS Amplify, gated by
tests, with automatic cleanup.

## What's here

- `amplify.yml` — the Amplify build spec: pnpm install, Next.js build,
  and a stripped-down `.next/standalone` output (source maps, docs, and
  license files deleted to shrink the deploy artifact).
- `.amplifyignore` — files excluded from the Amplify build context
  (tests, docs, editor/git metadata, dev-only auth state).
- `testing.yml` — the main CI workflow. On every PR: lints translation
  files, deploys a per-branch Amplify preview, runs Playwright E2E tests
  against that preview, comments the result on the PR, and tears the
  preview branch down afterwards (`if: always()`, so cleanup runs even
  if tests fail).
- `amplify-deployment.yml` — a reusable (`workflow_call`) workflow that
  does the actual Amplify branch lifecycle: clears stuck jobs, creates
  or reuses a branch, starts a release job, associates it with multiple
  custom domains under a sanitized subdomain prefix, and polls until the
  build succeeds or times out.
- [`e2e/`](e2e) — the Playwright suite `testing.yml` runs against each
  preview: config, fixtures, and the infra-vs-real-failure classifier that
  keeps flaky infra from blocking the release gate. See its own README.

## Omitted

- Several sibling workflows from the original repo (`build.yml`,
  `lint.yml`, `prettier.yml`, `staging-deployment.yml`,
  `amplify-url-comment.yml`, `e2e-dispatch.yml`) that follow the same
  patterns shown here or are specific to internal tooling.
- `lefthook.yml` (local pre-commit hooks) and `docker-compose.yml` (local
  E2E environment) — infra for local dev, not CI/CD.

## Anonymization

AWS account ID, custom domain names, and the environment name referenced
in GitHub's environment-protection rules have been replaced with
placeholders. Secret and variable *names* (`AMPLIFY_APP_ID`,
`AWS_ACCESS_KEY_ID`, etc.) are kept as-is since they carry no
client-identifying information.

## Design decision

The Amplify branch lifecycle (`amplify-deployment.yml`) is split out as
a reusable `workflow_call` workflow rather than inlined into
`testing.yml`, so the same deploy/wait/get-URL logic can be invoked from
other workflows (e.g. a staging deploy) without duplication, and its
outputs (`amplify-url`, `deployment-ready`, `branch-created`) form an
explicit contract that downstream jobs (E2E tests, PR comment, cleanup)
depend on.
