# Business Growth Tools — architecture

## Purpose

A section of free, self-serve tools (`/tools/*`) that give visitors an
immediate, useful reason to interact with the site beyond reading — and a
natural on-ramp to contacting GooglixLabs once a tool has done its job
(every tool page ends in the same consultation CTA).

## Single source of truth

`lib/tools/registry.ts` is the only place tool metadata is defined — slug,
title, description, icon, accent color, SEO keywords, and `status`
(`"available"` vs `"coming-soon"`). The homepage section, the `/tools`
index, the sitemap, and each tool's own page metadata all read from this
one list instead of repeating copy in four places. **Adding tool #3
onward starts here**, not in a component.

All 10 tools listed in the original spec are now `status: "available"`.
`status: "coming-soon"` still exists as a state (a visibly disabled
`ToolCard`, no link, "Coming soon" label — never a broken link or a stub
page) for whenever tool #11+ gets added ahead of being finished.

## Reusable components (`components/tools/`)

| Component | Responsibility |
|---|---|
| `ToolLayout` | Page shell every `/tools/[slug]` route uses — nav, back-link, header (icon/eyebrow/title/description from the registry), children slot, `CTASection`, footer. Server component. Also carries the `.gx-tool-section` / `.gx-tool-header` classes used by print support (see Invoice Generator's doc). |
| `ToolCard` | The card used in both the homepage grid and `/tools` index. Handles the available-vs-coming-soon rendering split. |
| `ResultCard` | Labelled stat card for a tool's output (cost, timeline, complexity, …). |
| `ScoreCircle` | SVG ring gauge (0–100) with the score and a label in the center. Used by Digital Presence Score and Business Readiness Score. |
| `BarChart` | Minimal SVG bar chart, `{label, value}[]` in. Used by the ROI Calculator (12-month cumulative gain) and EMI Calculator (principal vs. interest). |
| `FormField` | Label + input/select/textarea + hint/error slot, consistently styled and accessible (`aria-invalid`, `role="alert"` on errors). |
| `CTASection` | The universal "Book a free 30-minute consultation" block rendered after every tool. Also print-hidden via `.gx-tool-cta`. |
| `AnimatedCounter` | Thin wrapper around the site's existing `[data-count]` count-up engine (already driven by `<Interactions />`). Built but not yet used by any tool — `ScoreCircle`'s own stroke-dashoffset animation covers the score tools' needs; kept for a future tool that wants a plain numeric count-up. |
| `RecentTools` | Reads `useRecentTools()` and renders a chip row of recently visited tools; renders nothing if there's no history. Used on the homepage and the `/tools` index. |
| `ToolVisitRecorder` | Invisible client component that calls `recordToolVisit(slug)` on mount — the one bit of client-only logic `ToolLayout` needs, kept separate so `ToolLayout` itself can stay a server component. |

## Shared utilities (`lib/tools/`)

- `types.ts` — `ToolMeta`, `ToolStatus`, `ToolIconName`.
- `registry.ts` — the tool list + `getToolBySlug` / `getToolOrThrow` / `availableTools`.
- `jsonld.ts` — `toolJsonLd(tool)` produces a `WebApplication` schema.org object for a tool page.
- `format.ts` — `formatInr` / `formatNumber`. Every tool that shows a rupee amount imports from here — not re-implemented per tool.
- `useLocalStorageState.ts` — generic, SSR-safe localStorage-backed `useState` replacement. Renders with the default value on first paint (server and client match, no hydration mismatch), then swaps in any persisted value right after mount.
- `useNumberField.ts` — text-backed numeric field (draft string + last-valid parsed value + inline error), used by ROI, GST and EMI calculators. The Website Cost Calculator predates this hook and has its own equivalent inline logic — deliberately left alone rather than risk regressing already-verified code for a marginal DRY win.
- `useRecentTools.ts` — `recordToolVisit(slug)` + `useRecentTools()` hook, backing the global "recently used tools" feature.
- `costCalculator.ts` — pure calculation engine for the Website Cost Calculator (see its own doc). Contains the guard comment about never letting a business type's base cost bundle a named feature that's also its own checkbox (see git history — a former "Portfolio with CMS" tier double-billed the CMS feature).
- `whatsapp.ts` — phone validation + `wa.me` link builder, used by both the WhatsApp Link Generator **and** the QR Code Generator's WhatsApp QR type (same validated link, not a re-implementation).
- `roiCalculator.ts`, `digitalScore.ts`, `businessReadiness.ts`, `gstCalculator.ts`, `emiCalculator.ts`, `invoice.ts`, `businessCard.ts`, `qrGenerator.ts` — one calculation/generation module per remaining tool. See each tool's own doc for the specifics worth knowing.

## Design system

No new dependencies for UI/animation (still no Framer Motion, no
shadcn/ui) — tools reuse the site's existing hand-rolled CSS classes
(`--ink`/`--paper`/`--accent` tokens, `--font-*` variables, the
`[data-fade]` scroll-reveal and `[data-cursor]` custom-cursor mechanisms
already driven by `<Interactions />`). New tool-specific classes
(`.gx-tool-card`, `.gx-result-card`, `.gx-field`, `.gx-toggle-chip`,
`.gx-tool-cta`, `.gx-recent-tools`, print rules, …) live in
`app/globals.css` under the "Business Growth Tools" / "Print" sections.

**One deliberate dependency exception**: `qrcode` (see the QR Code
Generator's doc) — hand-rolling QR encoding risked producing codes that
look right but don't scan, which is a worse outcome than one small,
zero-UI-footprint, widely-used dependency.

## Adding tool #11+

1. Add it to `registry.ts` with `status: "coming-soon"` (shows immediately
   as a disabled card, no route needed yet) or `"available"` once its
   route exists.
2. `app/tools/<slug>/page.tsx` — copy the pattern from
   `website-cost-calculator/page.tsx` (metadata + `toolJsonLd` + `ToolLayout`).
3. `app/tools/<slug>/<Name>Client.tsx` — the actual interactive UI, using
   `FormField` / `ResultCard` / `ScoreCircle` / `BarChart` /
   `.gx-toggle-chip` / `.gx-tool-input`, `useNumberField` for validated
   numeric inputs, and `useLocalStorageState` for persistence.
4. Add the route to `app/sitemap.ts` via `availableTools` (automatic —
   nothing to do here as long as step 1 is done).
5. Write `docs/tools/<slug>.md`.

## Future improvements

- Wire `CTASection`'s "Book Now" and each tool's own CTA to a real
  analytics `trackEvent()` call once an analytics provider is chosen —
  the spec calls for tracking `Tool Opened` / `Quote Requested` / etc.;
  deliberately not stubbed yet to avoid inventing an event schema twice.
- A `LeadForm` component if/when an on-page capture form (rather than the
  current mailto-based "Get Free Quote") is wanted.
- Dark mode: intentionally out of scope for this pass — the whole site
  is light-only today; theming tools independently of the rest of the
  site would fragment the design system rather than strengthen it.
