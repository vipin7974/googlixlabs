# Business Card Generator

`/tools/business-card-generator`

## Purpose

Name, phone, website, email in → a clean, on-brand digital business card
PNG out.

## Architecture

- `lib/tools/businessCard.ts` — `drawBusinessCard(ctx, data, accent, fonts)`,
  a pure Canvas 2D drawing routine. Takes already-resolved font-family
  strings rather than hardcoding `"Bricolage Grotesque"` etc., because
  `next/font` generates scoped, hashed family names — a literal string
  would silently fall back to a system font in canvas rendering.
- `BusinessCardGeneratorClient.tsx` resolves the real family names via
  `getComputedStyle(document.documentElement).getPropertyValue("--font-bricolage")`
  — the same CSS-variable-reading technique `FlowCanvas.tsx` already
  uses for colors — and passes them in.
- The `<canvas>` element **is** the preview (displayed responsively via
  CSS `aspect-ratio`), so there's no separate DOM-vs-canvas rendering
  path that could drift apart; "download" just calls
  `canvas.toDataURL("image/png")` on the same element the user is
  looking at.
- Before the final export redraw, `await document.fonts.ready` guards
  against a rare race where the download click happens a frame before
  the web font finished loading.

## Reusable components/utilities used

`FormField`, `useLocalStorageState`, `ACCENTS.Signal` (from `lib/content.ts`
— no new colors introduced).

## Future improvements

- A small set of alternate layouts/accent choices (currently one fixed
  ink-background layout using the Signal accent).
- Web Share API integration for mobile ("share card" instead of only
  "download").
