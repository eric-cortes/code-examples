# Maps integration

## Context

From the same booking/scheduling app as [`../feature-structure`](../feature-structure),
using `@react-google-maps/api` to plot bookings, planned routes, and rider
positions on a shared map.

## What's here

- `GoogleMap.tsx` — the core map component: renders markers for multiple
  overlapping data sources (raw bookings, a selected plan, live routes),
  draws polylines between stops on a route, and color-codes markers by
  route index and pickup status.
- `BookingMap.tsx`, `PlannerMap.tsx` — thinner wrappers that feed
  `GoogleMap` different data sources depending on which screen it's used
  from (single booking vs. full planner view).
- `Marker/Marker.tsx` — a marker subcomponent.

## Omitted

- The routing/geolocation backend that produces `routesData` — not
  included, this is the presentation layer only.

## Anonymization

Colors, IDs, and coordinates are generic; no real addresses or rider names
are hardcoded (they're read from props at runtime).

## Design decision

`GoogleMapPlanner` is wrapped in `React.memo` and keeps marker
color/z-index derivation in small pure functions (`getColor`,
`getPolylineColor`) outside the component body, since this map re-renders
on every polling interval and the marker set can be large.
