# UI components

## Context

Small, self-contained UI primitives from the same booking/scheduling app,
kept separate from the feature-level components because they have no
dependency on the app's data layer.

## What's here

- `LanguageSelector/` — a locale switcher.
- `TimeSelect/` — a time-of-day input.
- `ToggleSwitch/` — a boolean toggle.
- `index.ts` — the barrel export for this set.

## Omitted

Nothing omitted — this is the complete set of standalone UI components from
the original project; the rest of the app's UI came from a shared design
system (see [`../../ui-system`](../../ui-system)).

## Design decision

These components take no app-specific props (tenant, booking, etc.) and
import nothing from the data layer, which is what makes them portable
enough to reuse outside this one feature.
