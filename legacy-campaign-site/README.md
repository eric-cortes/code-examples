# Legacy campaign site (vanilla JS)

## Context

These two files come from `leica/`, a multi-page marketing campaign site (one
landing page plus per-city pages: Berlin, Milan, New York, Seoul, Shanghai,
Singapore, Sydney) built on jQuery and the `fullpage.js` scroll library. It
predates the TypeScript/React work shown elsewhere in this repository.

## What's here

- `fullpage-navigation.js` — the site's main landing page: section-based full
  page scrolling, mobile vs. desktop layout switching, and click handlers for
  custom scroll controls.
- `city-landing-page.js` — one representative per-city page (Berlin). Each
  city page follows this same pattern (device detection, background video
  swap for mobile vs. desktop, fullpage section hooks), so only one is kept
  here; the other six are near-identical and omitted.

## Omitted

- The other six city scripts (`milan.js`, `newyork.js`, `seoul.js`,
  `shanghai.js`, `singapore.js`, `sydney.js`) — same structure as
  `city-landing-page.js`.
- Vendor libraries (`jquery.fullpage.js`, `swiper.min.js`,
  `mobile-detect.js`) and all minified/built output.
- HTML, CSS, and media assets. The full source lives in `leica/` if you want
  to see the site in context.

## Design decision

Device/viewport branching (mobile vs. desktop video source, mobile vs.
desktop navigation) happens once at load time rather than being re-evaluated
per interaction, since `fullpage.js` and `MobileDetect` don't need to react
to runtime viewport changes for this site's fixed breakpoints.
