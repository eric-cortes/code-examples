# API integration

## Context

The same booking list/detail feature, shown twice: once against a
hand-written `fetch`/SWR data layer, once after migrating to a generated
OpenAPI client. Kept side by side deliberately as a before/after contrast,
plus the underlying Next.js route handlers and auth config.

## What's here

- `hand-written/Bookings.tsx`, `hand-written/Booking.tsx` — data fetched
  with a custom `useFetch` hook (see
  [`../state-management/useFetch.ts`](../state-management/useFetch.ts)) and
  revalidated manually via `swr`'s `mutate`. UI copy is hardcoded (German).
- `generated/Bookings.tsx`, `generated/Booking.tsx`,
  `generated/BookingEditForm.tsx` — the same feature built on a generated
  API hook (`useBookingControllerGetList`) from an OpenAPI spec, with
  `react-i18next` for copy instead of hardcoded strings.
- `route.ts`, `route.by-id.ts` — Next.js route handlers backing the
  hand-written variant (`app/api/booking/route.ts` and
  `app/api/booking/[id]/route.ts`, flattened here for readability).
- `authConfig.ts` — NextAuth configuration for Azure AD B2C, including
  access-token refresh handling.

## Omitted

- The generated OpenAPI client itself (types, request functions) — machine
  generated, not hand-written, so not representative of authorship.
- `Plans/` and `Riders/` from the generated variant — same pattern as
  `Bookings/`, omitted to avoid repetition.

## Anonymization

Auth configuration reads tenant ID, client ID, and client secret from
environment variables rather than hardcoding them; no real credentials or
tenant names are present.

## Design decision

The generated variant moves selection state from an array (`bookings`,
checked via `.includes()`) to a `Set<string>` of IDs — an incidental
improvement made possible by the rewrite, not something the generated
client required.
