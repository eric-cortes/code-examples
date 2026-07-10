# Reina Eterna (personal project)

## Context

A personal Next.js project (a scrollable, video/image slideshow site) — not
client work, so nothing here is anonymized. This folder keeps a few
representative components rather than the full app.

## What's here

- `src/components/FullVideo` — autoplay/pause driven by viewport visibility
  (`useInView`), mute toggle, and an `onVideoEnd` callback used to chain
  slides together.
- `src/components/ThreeRow` — a layout component composing multiple media
  tiles.
- `src/components/TileThree` — a grid tile component that can render either
  an image or a video source.

## Omitted

- `src/app/page.tsx` and `src/app/layout.tsx` — the top-level composition
  that wires all slide components together with `swiper/react`. Omitted so
  this folder isn't read as a partially-broken standalone app; the pattern
  is the same as `TileThree`/`FullVideo` repeated across ~15 slides.
- `FullImage`, `Infotext`, `TileFour` — same patterns as the kept
  components (image tile, text overlay, four-way grid tile), omitted to
  avoid repetition.
- `src/data/data.json` — slide copy, only meaningful alongside the omitted
  `page.tsx`.

## Design decision

Media playback state (`isMuted`, play/pause) is derived from viewport
visibility via `useInView` rather than a manual scroll listener, so each
tile independently starts/stops its own video without the parent needing to
track which slide is active.
