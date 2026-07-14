# Feature structure

## Context

This comes from a driver/booking scheduling application (Next.js + React).
It's the hand-written data layer, before a later migration to a
generated OpenAPI client (see [`../api-integration`](../api-integration)).

## What's here

- `Planner.tsx` — the top-level feature component that owns shared state
  (selected date, current tenant) and composes the sub-features below.
- `TourDetails.tsx` — a detail panel for a single scheduled tour.
- `Bookings/` — list (`Bookings.tsx`), row (`Booking.tsx`), and edit form
  (`BookingEditForm.tsx`) for one entity.
- `Teams/` — the same list/row/edit-form pattern applied to a different
  entity, to show the pattern repeats consistently rather than being a
  one-off.

## Omitted

- `Plans/` — a third entity following the identical list/row pattern as
  `Bookings/` and `Teams/`; omitted to avoid showing the same shape three
  times.
- `BookingCreateForm.tsx` — a near-duplicate of `BookingEditForm.tsx`
  (create vs. edit), omitted for the same reason.
- Authentication, routing, and shared UI primitives (`rds-ui-system`) live
  outside this repository.

## Anonymization

Tenant/booking domain terms are generic (scheduling, bookings, teams); no
client-identifying names, endpoints, or IDs are included.

## Design decision

Each entity folder (`Bookings/`, `Teams/`) colocates its list, row, and edit
form rather than splitting by type (all lists together, all forms
together), so the full lifecycle of one entity is readable in one place.
