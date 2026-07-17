# Internal linking strategy — Locations, Services, Industries

## The hierarchy rule

- **Country → State**: `india`'s `childSlugs` links to `chhattisgarh`. Country pages link to states, nothing lower — no shortcut directly to a city.
- **State → City**: `chhattisgarh`'s `childSlugs` links to `raipur`, `bhilai`, `durg`, `bilaspur`. Same rule — a state doesn't skip down to link elsewhere.
- **City → everything else**: city pages link to Services, Industries, Tools, Portfolio, Case Studies, and Contact (see below). Cities have no `childSlugs` — there's nothing under them in this hierarchy.

This lives in `lib/locations/types.ts` as two distinct fields, rendered as two distinct sections in `LocationPage.tsx`:
- `childSlugs` — strict hierarchy (rendered as "Explore by State" / "Explore by City", only on country/state pages)
- `relatedSlugs` — lateral cross-links (sibling cities, e.g. the four Chhattisgarh cities fully mesh-link to each other; Nagpur links to Raipur/Chhattisgarh as a nearby non-sibling hub). This is additive to the hierarchy rule, not a replacement — the brief asks for the hierarchy at minimum, and removing the existing lateral links would have *weakened* topical density, not strengthened it.

The reverse direction (city → its state) is the breadcrumb, driven by the existing `parentSlug`/`parentName` fields, which — before this pass — were stored but never actually rendered as a link. Fixed: `LocationPage.tsx` now looks up `parentSlug` in the registry and only links it if it's a real page (Nagpur's `parentName` is "Maharashtra," which isn't a modeled state page, so its breadcrumb correctly stops at "Locations" rather than linking to a page that doesn't exist).

## City pages link to Services, Industries, Tools, Portfolio, Case Studies, Contact

- **Services**: the "How We Help" section's five cards are now real links to `/services/[slug]`, plus a "View all services" link to the index.
- **Industries**: each industry tag is now a real link to `/industries/[slug]` (see below for how the mapping works), plus a "View all industries" link.
- **Tools**: unchanged from the existing build — four featured `ToolCard`s plus a "View all tools" link.
- **Portfolio / Case Studies**: both link to `/#work` (the homepage's existing project showcase) — see "What's deliberately not built" below for why these two aren't yet distinct destinations.
- **Contact**: the existing "Book Now" CTA, plus an explicit link in the new "Explore GooglixLabs" block.

## Services and Industries are real, new page systems — not anchors

`Services` and `Industries` didn't exist as standalone, indexable pages before this pass — only as in-page sections repeated across every location. Linking to an anchor on the same page a visitor is already on isn't a meaningful internal link for either users or crawlers, so both were built as first-class content types:

- `lib/services/registry.ts` — the same 5 services every location already described, now with slugs, expanded body copy, and one canonical source (`LocationPage.tsx` imports from here instead of keeping its own copy).
- `lib/industries/registry.ts` — a **canonical taxonomy of 12 industries**. Each location's free-text industry tags (e.g. Bhilai's "Steel & Ancillary Manufacturing", Raipur's "Retail & Wholesale Markets") now carry a `slug` referencing one of these 12, so the display text stays unique per location (preserving the original "never copy paragraphs" requirement) while the tag becomes a real, meaningful link.

**Which locations serve a given industry is computed, not hand-kept in sync**: `getLocationsForIndustry()` in `lib/locations/registry.ts` filters the locations data at request time. There's exactly one place industry↔location relationships are defined — on the location's own `industries` array — so the two can never drift apart the way two independently-maintained lists eventually would.

## Tools recommend locations, locations recommend tools

`ToolLayout.tsx` (shared by all 10 tools) now includes a "Serving businesses across" block linking to 4 featured locations plus the `/locations` index — every tool page, automatically. Combined with the existing tool cards on every location page, Tools ↔ Locations is a real two-way link, not one-directional.

## What's deliberately not built

**Blog and Case Studies as distinct content types don't exist on this site.** Building links to pages that don't exist would be a broken link — arguably worse than an orphan page, which this task explicitly asks to avoid. Rather than fabricate blog posts or case-study write-ups as a side effect of a linking-strategy task:

- "Portfolio" and "Case Studies" both currently point to `/#work` (the homepage's real, existing project showcase). They're conceptually close enough that this isn't dishonest, but it means they're not yet meaningfully distinct destinations.
- No blog exists, so "every blog should recommend related location pages" has nothing to attach to yet. When a blog is built, each post should render a `RelatedLocations` component (a thin wrapper around the same pattern `LocationPage.tsx` already uses for `relatedSlugs`) — worth building as a shared component at that point, not now, since designing it against a real post's needs will make it better than guessing at the shape today.

## Verifying "never orphan pages"

Verified with a real crawl (a headless-browser script, not a manual check) starting from `/` and following every internal `<a href>` found, recording which URLs are reachable and which pages are 404s. See the conversation summary for the actual run's results — this file documents the design decisions, not the one-off verification run itself.
