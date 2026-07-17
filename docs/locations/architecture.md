# Location pages — data-driven CMS architecture

Rebuilt to scale from 7 locations to hundreds without touching code.
This replaces the previous design, where every location was a ~90-line
hand-authored object (hero copy, paragraphs, FAQs, benefit cards, all
written out per city) — completely unworkable past a handful of pages.

## Adding a new location

Open `lib/locations/data.ts`. Add one object to the relevant `cities`
array (or a new `states`/`countries` entry if it doesn't exist yet):

```ts
{
  name: "Vizag",
  slug: "vizag",
  lat: 17.6868,
  lng: 83.2185,
  industries: ["transport-logistics", "manufacturing-industrial", "retail-ecommerce"],
  facts: ["is a major port city and one of India's largest natural harbours"],
}
```

That's the entire job. The page at `/locations/vizag`, its metadata, its
JSON-LD (Service/FAQPage/BreadcrumbList), its entry in the sitemap, its
breadcrumb, its internal links to/from its state and sibling cities, and
its Digital Growth Report are all generated automatically. No new route
file, no new component, no hand-written copy.

`industries` is the only field that meaningfully drives the page's
content and its Digital Growth Report — get that list right and
everything downstream follows. `facts` is optional and should only ever
contain something genuinely true and verifiable; leave it out rather
than invent one, the generator falls back to honest, industry-derived
copy.

`nearbyCities` is only needed to override the default lateral cross-links
(auto-derived from sibling cities in the same state) — e.g. Nagpur has no
Chhattisgarh siblings, so its entry explicitly points at `["raipur"]`.

## Why the previous design didn't scale

1. **Every content field was hand-typed per city** (`lib/locations/registry.ts`
   used to be the data file itself — hero copy, two paragraphs of "about,"
   two of "why," four benefit cards, three-to-four FAQs, all written out
   per location). At 500 cities that's tens of thousands of lines of
   prose someone has to write and maintain by hand — the opposite of
   "add one object."
2. **`ToolLayout.tsx` hardcoded a `FEATURED_LOCATION_SLUGS` array** —
   4 specific slugs, hand-picked once, that would never update as new
   cities were added.
3. **`app/locations/page.tsx` rendered every single location as a flat
   card grid** — fine at 7, unusable at 500.
4. **`lib/locations/geo.ts` kept its own hardcoded `CITY_COORDINATES`
   array**, duplicating (and only by luck, keeping in sync with) the
   city list in the content registry.
5. **A hardcoded `location.slug === "raipur"` check** decided where the
   LocalBusiness schema rendered — a hardcoded identity check standing
   in for a real data field.
6. **Nagpur was a hand special-cased orphan** with no parent state page,
   because Maharashtra had exactly one city in it and adding a whole
   state page by hand for one city wasn't worth the manual effort.

## The new architecture

```
lib/locations/
  data.ts               ← the ONE file a human edits. Nested
                           country → states → cities, matching the
                           shape you'd expect from a real CMS.
  types.ts               ← CityInput/StateInput/CountryInput (raw
                           authoring shape) + LocationContent (the
                           generated output shape every component and
                           JSON-LD builder already consumed — unchanged,
                           so no downstream file needed to change).
  content-templates.ts   ← the template bank. Every prose field (hero
                           copy, about/why paragraphs, benefit cards,
                           FAQs, meta title/description/keywords) is a
                           small set of variants, deterministically
                           picked per location from a hash of its slug —
                           stable across builds, varied across cities,
                           real facts and industries woven in wherever
                           available.
  industry-playbook.ts   ← challenges / recommended tools / next steps,
                           one entry per canonical industry slug.
  digital-report.ts      ← buildDigitalGrowthReport(location) — derives
                           the new "Free Digital Growth Report" section
                           purely from a location's `industries` list
                           run through the playbook above.
  generate.ts             ← walks the nested tree once, computes every
                           parent/child/sibling relationship structurally
                           (never hand-authored), and calls
                           content-templates.ts to produce a full
                           LocationContent per node.
  registry.ts             ← thin wrapper: flattens generate.ts's output
                           into the exact same public API every existing
                           file already imports (`locationsRegistry`,
                           `getLocationBySlug`, `getLocationOrThrow`,
                           `getLocationsForIndustry`) plus two new
                           data-driven helpers (`getHeadquartersLocation`,
                           `getFeaturedLocations`) that replace the old
                           hardcoded slug lists.
  geo.ts                  ← now re-exports coordinates computed from
                           data.ts instead of keeping its own list.
```

Because `registry.ts`'s exports didn't change shape, every consumer —
`LocationPage.tsx`, `jsonld.ts`, `sitemap.ts`, the industries and
services pages, `NearestLocation.tsx`, `opengraph-image.tsx` — needed
zero changes. The only call sites touched were the two genuine hardcoded
special cases: `ToolLayout.tsx`'s slug list (now `getFeaturedLocations()`)
and the `slug === "raipur"` checks in `jsonld.ts` and
`app/locations/[slug]/page.tsx` (now `location.isHeadquarters`, a real
data field set once in `data.ts`).

Nagpur's Maharashtra orphan special-case is gone too — Maharashtra is now
a normal, fully generated state page with one city in it so far. Its
breadcrumb changed from `Home / Locations / Nagpur` to
`Home / Locations / Maharashtra / Nagpur`, consistent with every other
city, and future Maharashtra cities slot in with zero marginal cost.

## Content generation strategy — and its honest tradeoff

Hand-writing genuinely unique prose for hundreds of cities isn't
realistic, so this is templated: a handful of variants per content slot,
picked deterministically per location, with real data (`facts`,
`industries`, city/state names) woven in. This is the same approach any
large local-SEO page set uses — the alternative (fabricating detail, or
hand-writing at scale) is worse on both cost and honesty. Two things
keep this from reading as thin or duplicate content:

- Meta title, meta description, H1, breadcrumb and FAQ schema are all
  genuinely per-location (not shared boilerplate), which is most of what
  Google evaluates for page uniqueness.
- `facts` — when supplied — makes a location's About paragraph
  materially different from a location without one, not just a
  find-and-replaced city name.

If a specific location (e.g. a second headquarters, or a flagship city
deserving bespoke treatment) ever needs genuinely hand-written copy
beyond what facts + industries produce, that's a deliberate future
extension point (an optional override field on `CityInput`), not
something this pass added — adding it speculatively now would reopen
the "hand-authored per city" problem this refactor exists to close.

## The Digital Growth Report

Every location page now has a "Free Digital Growth Report" section:
common online-visibility challenges, suggested next steps, and
recommended free tools — specific to that location's industry mix, not
generic filler. It's entirely derived from existing data (a location's
`industries` list run through `industry-playbook.ts`, resolving tools
through the existing `lib/tools/registry.ts`), so it works identically
for city #7 or city #507 with no additional authoring.

## Verified

- `npm run build` and `npm run lint` both pass clean with the new
  architecture.
- All 7 previously-hand-written locations (India, Chhattisgarh, Raipur,
  Bhilai, Durg, Bilaspur, Nagpur) plus the newly-generated Maharashtra
  state page render correctly, with unique titles/descriptions/H1s and
  correct breadcrumb/LocalBusiness/FAQ schema.
- The Digital Growth Report renders real, distinct content per location
  based on its industry mix.
- No orphan pages: every location is reachable from `/locations` (via
  country → state) and from its state/city hierarchy links, matching the
  linking strategy from `internal-linking.md`.
