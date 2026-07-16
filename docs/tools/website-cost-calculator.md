# Website Cost Calculator

`/tools/website-cost-calculator`

## Purpose

Give a visitor who's window-shopping an instant, honest ballpark for what
their project would cost and take — without waiting on a human — then
hand them straight to a real quote request pre-filled with their
selections.

## Architecture

- `lib/tools/costCalculator.ts` — the calculation engine. Pure, typed,
  deterministic: base cost/timeline per `BusinessType`, plus per-page and
  per-feature additions, producing a cost range, timeline range, a
  complexity tier, and a recommended package tier. No network call, no
  "AI" — a transparent heuristic formula, and the UI says so explicitly
  ("This is an automated estimate, not a fixed quote").
- `app/tools/website-cost-calculator/page.tsx` — metadata, canonical URL,
  OpenGraph/Twitter tags, and `WebApplication` JSON-LD via
  `toolJsonLd()`. Wraps the client component in `ToolLayout`.
- `app/tools/website-cost-calculator/CostCalculatorClient.tsx` — the
  interactive form + live results. Client component (needs state +
  `localStorage`); everything around it (`ToolLayout`, nav, footer) stays
  server-rendered.

## Behaviour

- Business type (`<select>`) and page count (validated number input) plus
  ten feature toggle chips (`FEATURE_KEYS`) drive the estimate live — no
  separate "Calculate" step, since a calculator that shows nothing until
  you press a button is worse UX than one that updates as you go.
- Page count is deliberately a real text input, not a slider, so there's
  a genuine validation case: non-numeric or out-of-range input shows an
  inline error (via `FormField`'s `error` slot) and freezes the estimate
  at its last valid value rather than producing `NaN`.
- Selections persist through `useLocalStorageState` — a returning visitor
  sees their last configuration, not a blank form.
- Loading state: a pulsing skeleton grid renders until the persisted
  selection has hydrated from `localStorage` (a few milliseconds, but a
  real asynchronous gap — not a fake artificial delay).
- "Get Free Quote" opens a `mailto:` to GooglixLabs' real inbox, subject
  and body pre-filled with the full selection and the calculated
  estimate — a working handoff, not a dead button.

## Reusable components used

`ToolLayout`, `FormField`, `ResultCard`, `.gx-toggle-chip` / `.gx-tool-input`
/ `.gx-result-grid` (CSS), the shared `.gx-nav-cta` button style.

## Future improvements

- Once an analytics provider is chosen: track `Tool Opened` on mount,
  `Tool Completed` when the user changes at least one feature/page value
  away from the defaults, and `Quote Requested` on the mailto click.
- Consider a "compare packages" expandable view showing what's included
  at each tier (Starter/Growth/Pro/Enterprise), reusing `ResultCard`.
