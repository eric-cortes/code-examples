# Code Examples

Selected, anonymized excerpts from production projects. These files are
not meant to run as complete standalone applications — they're here to
show how I structure code, model data, separate responsibilities, and
keep implementations readable and maintainable.

Business-specific names, endpoints, and other identifying details have
been changed or removed. Each folder has its own `README.md` explaining
its context, what it demonstrates, what was omitted, and the main design
decision behind it.

## What the examples demonstrate

React/Next.js component structure, TypeScript modeling, API integration
(both hand-written and generated clients), custom hooks and state
management, error/loading states, component testing, CI/CD (AWS
Amplify + GitHub Actions), and consistent formatting and naming across a
real, multi-feature application.

## Where to look

- [`feature-structure`](feature-structure) — a booking/scheduling
  feature: top-level composition, list/row/edit-form pattern applied
  consistently across entities.
- [`api-integration`](api-integration) — the same feature's data
  layer shown twice: hand-written `fetch`/SWR vs. a generated OpenAPI
  client, plus the backing Next.js route handlers and auth config.
- [`maps-integration`](maps-integration) — Google Maps integration
  for the same app (markers, routes, polylines).
- [`UI`](UI) — ten UI primitives from a production design system
  (Base UI, Tailwind, `cva`), each with types, stories and tests.
- [`state-management`](state-management) — a Zustand store, a
  data-fetching provider, and shared utility hooks/helpers.
- [`devops`](devops) — CI/CD for the same app: an AWS
  Amplify build spec and a GitHub Actions pipeline that deploys per-PR
  preview environments, gates them on E2E tests, and tears them down
  afterwards.
- [`legacy-campaign-site`](legacy-campaign-site) — two
  representative files from an older vanilla-JS marketing site (see
  `leica/` for the full source).
- [`reina`](reina) — a few components from Reina Eterna, an interactive
  documentary (Next.js) built for Taller de Historias en Imágenes
- [`rawtherapy`](rawtherapy) — an AI psychotherapy patient simulator:
  backend (Fastify, Postgres, Redis session locking/idempotency, an LLM
  adapter with a mock fallback) plus a few React frontend pieces (chat
  UI, streamed text-to-speech playback).
