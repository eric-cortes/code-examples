# Code Examples

Selected, anonymized excerpts from production frontend projects. These
files are not meant to run as complete standalone applications — they're
here to show how I structure frontend code, model data, separate
responsibilities, and keep implementations readable and maintainable.

Business-specific names, endpoints, and other identifying details have
been changed or removed. Each folder has its own `README.md` explaining
its context, what it demonstrates, what was omitted, and the main design
decision behind it.

## What the examples demonstrate

React/Next.js component structure, TypeScript modeling, API integration
(both hand-written and generated clients), custom hooks and state
management, error/loading states, component testing, and consistent
formatting and naming across a real, multi-feature application.

## Where to look

- [`examples/feature-structure`](examples/feature-structure) — a booking/scheduling
  feature: top-level composition, list/row/edit-form pattern applied
  consistently across entities.
- [`examples/api-integration`](examples/api-integration) — the same feature's data
  layer shown twice: hand-written `fetch`/SWR vs. a generated OpenAPI
  client, plus the backing Next.js route handlers and auth config.
- [`examples/maps-integration`](examples/maps-integration) — Google Maps integration
  for the same app (markers, routes, polylines).
- [`examples/ui-components`](examples/ui-components) — small standalone UI
  primitives.
- [`examples/state-management`](examples/state-management) — a Zustand store, a
  data-fetching provider, and shared utility hooks/helpers.
- [`examples/legacy-campaign-site`](examples/legacy-campaign-site) — two
  representative files from an older vanilla-JS marketing site (see
  `leica/` for the full source).
- [`ui-system`](ui-system) — a handful of components from a shared
  component library (Vite + Storybook), each with matching tests and
  stories.
- [`reina`](reina) — a few components from a personal (non-client)
  Next.js project.
