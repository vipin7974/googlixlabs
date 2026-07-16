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

`status: "coming-soon"` tools render as a visibly disabled `ToolCard`
(no link, "Coming soon" label) rather than a broken link or a stub page —
intentional, since a card that goes nowhere is worse than no card at all.

## Reusable components (`components/tools/`)

| Component | Responsibility |
|---|---|
| `ToolLayout` | Page shell every `/tools/[slug]` route uses — nav, back-link, header (icon/eyebrow/title/description from the registry), children slot, `CTASection`, footer. Server component. |
| `ToolCard` | The card used in both the homepage grid and `/tools` index. Handles the available-vs-coming-soon rendering split. |
| `ResultCard` | Labelled stat card for a tool's output (cost, timeline, complexity, …). |
| `FormField` | Label + input/select/textarea + hint/error slot, consistently styled and accessible (`aria-invalid`, `role="alert"` on errors). |
| `CTASection` | The universal "Book a free 30-minute consultation" block rendered after every tool. |
| `AnimatedCounter` | Thin wrapper around the site's existing `[data-count]` count-up engine (already driven by `<Interactions />`) — for future score-style tools (Digital Presence Score, Business Readiness Score), not duplicating counting logic. |
| `RecentTools` | Reads `useRecentTools()` and renders a chip row of recently visited tools; renders nothing if there's no history. Used on the homepage and the `/tools` index. |
| `ToolVisitRecorder` | Invisible client component that calls `recordToolVisit(slug)` on mount — the one bit of client-only logic `ToolLayout` needs, kept separate so `ToolLayout` itself can stay a server component. |

## Shared utilities (`lib/tools/`)

- `types.ts` — `ToolMeta`, `ToolStatus`, `ToolIconName`.
- `registry.ts` — the tool list + `getToolBySlug` / `getToolOrThrow` / `availableTools`.
- `jsonld.ts` — `toolJsonLd(tool)` produces a `WebApplication` schema.org object for a tool page.
- `useLocalStorageState.ts` — generic, SSR-safe localStorage-backed `useState` replacement. Renders with the default value on first paint (server and client match, no hydration mismatch), then swaps in any persisted value right after mount. Every tool's inputs should persist through this hook rather than a bespoke `localStorage.getItem` call.
- `useRecentTools.ts` — `recordToolVisit(slug)` + `useRecentTools()` hook, backing the global "recently used tools" feature.
- `costCalculator.ts` — pure calculation engine for the Website Cost Calculator (see its own doc).
- `whatsapp.ts` — phone validation + `wa.me` link builder for the WhatsApp Link Generator.

## Design system

No new dependencies were introduced (no Framer Motion, no shadcn/ui) —
tools reuse the site's existing hand-rolled CSS classes (`--ink`/`--paper`/
`--accent` tokens, `--font-*` variables, the `[data-fade]` scroll-reveal
and `[data-cursor]` custom-cursor mechanisms already driven by
`<Interactions />`). New tool-specific classes (`.gx-tool-card`,
`.gx-result-card`, `.gx-field`, `.gx-toggle-chip`, `.gx-tool-cta`,
`.gx-recent-tools`, …) live in `app/globals.css` under the "Business
Growth Tools" section, following the same naming convention as the rest
of the file.

## Adding tool #3+

1. Flip its `status` to `"available"` in `registry.ts` (or add it if new).
2. `app/tools/<slug>/page.tsx` — copy the pattern from
   `website-cost-calculator/page.tsx` (metadata + `toolJsonLd` + `ToolLayout`).
3. `app/tools/<slug>/<Name>Client.tsx` — the actual interactive UI, using
   `FormField` / `ResultCard` / `.gx-toggle-chip` / `.gx-tool-input` and
   `useLocalStorageState` for persistence.
4. Add the route to `app/sitemap.ts` via `availableTools` (automatic —
   nothing to do here as long as step 1 is done).
5. Write `docs/tools/<slug>.md`.

Score-style tools (Digital Presence Score, Business Readiness Score) will
additionally want a `ScoreCircle` component (an SVG ring gauge) and a
`ProgressBar` (multi-step question flow) — deliberately not built yet
since no current tool needs them; build them alongside the first tool
that does, so they're shaped by a real use case rather than guessed at.

## Future improvements

- Wire `CTASection`'s "Book Now" and each tool's own CTA to a real
  analytics `trackEvent()` call once an analytics provider is chosen —
  the spec calls for tracking `Tool Opened` / `Quote Requested` / etc.;
  deliberately not stubbed yet to avoid inventing an event schema twice.
- `ScoreCircle` + `ProgressBar` components for the two score-based tools.
- A `LeadForm` component if/when an on-page capture form (rather than the
  current mailto-based "Get Free Quote") is wanted.
- Dark mode: intentionally out of scope for this pass — the whole site
  is light-only today; theming tools independently of the rest of the
  site would fragment the design system rather than strengthen it.
