# State management

## Context

From the same booking/scheduling app. `objectsStore`/`objectsProvider`
cache reference data (statuses, models, tenants, roles) that's fetched once
and shared across many feature components, avoiding repeated fetches for
data that rarely changes.

## What's here

- `objectsStore.ts` — a Zustand store holding reference data plus
  per-resource loading/error state.
- `objectsProvider.tsx` — fetches each reference resource (guarded by
  session readiness) and pushes results into the store via one `useEffect`
  per resource.
- `useFetch.ts` — a small wrapper around `useSWR` that also tracks
  `isInitialLoad`, so callers can distinguish "first load" from
  "revalidating in the background."
- `filterDateLogic.ts` — date/time formatting and conversion helpers (ISO,
  `de-DE` locale, Excel serial dates) consolidated in one module instead of
  being reimplemented per component.

## Omitted

- `@/context/appContext` (tenant/global-scope context) — referenced but
  defined elsewhere in the original app.

## Design decision

`objectsProvider` uses one `useEffect` per resource rather than a single
effect watching an array of results, so a failure or update in one resource
(e.g. `roles`) can't accidentally skip processing another (e.g. `tenants`).
