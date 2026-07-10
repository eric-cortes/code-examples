# UI system (component library excerpts)

## Context

This was a Vite + Storybook component library shared across several
production frontends, organized by atomic-design level (atoms, molecules,
organisms). This folder keeps a representative slice rather than the full
library.

## What's here

- `src/lib/components/atoms/Button` — a simple atom with variant props, an
  optional icon slot, and matching `.test.tsx` / `.stories.tsx` files.
- `src/lib/components/atoms/MultiSelect` — a stateful atom (selection state,
  keyboard interaction) contrasted with `Button`'s simplicity.
- `src/lib/components/icons` — kept because `Button` depends on
  `iconMapping` for its icon prop.
- `src/lib/components/molecules/ml-banner` — one level up in composition.
- `src/lib/components/organisms/or-footer` — composes atoms/molecules into a
  page-level section.

## Omitted

- The other atom components (`Checkbox`, `FilterChip`, `Heading`, `Input`,
  `Modal`, `Radio`, `Select`, `Text`, `Textarea`) — same
  component/test/stories pattern as `Button` and `MultiSelect`, kept out to
  avoid repetition.
- Storybook config, Vite config, and all build output (`dist/`,
  `storybook-static/`) — build tooling, not application code.

## Design decision

Components are colocated with their tests and stories (`Button/Button.tsx`,
`Button/Button.test.tsx`, `Button/Button.stories.tsx`) rather than split into
parallel `components/` and `__tests__/` trees, so a reviewer can see a
component's implementation, tests, and usage examples in one place.
