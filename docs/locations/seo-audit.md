# Location pages — Local SEO audit & fixes

Scope: every page under `/locations/*`, no UI/visual changes — schema,
metadata, internal links, and semantics only.

## Schema

- **Organization** — already global (`app/layout.tsx`, rendered in every
  page's `<head>` via the root layout), so every location page already
  carries it. No change needed; verified present on all 7 pages.
- **LocalBusiness — added, Raipur only.** `locationLocalBusinessJsonLd()`
  in `lib/locations/jsonld.ts`. Deliberately *not* added to the other 6
  pages: GooglixLabs has one real office, and declaring a `LocalBusiness`
  with an address on a page for a city with no physical presence is a
  false local-listing claim, not a technicality Google overlooks. Reuses
  the same `@id` as the global Organization/ProfessionalService entity
  rather than declaring a second, competing entity — repeating an entity
  with a stable `@id` across pages is normal, expected practice.
  `openingHours` deliberately omitted — inventing them risks telling a
  customer the business is open when it isn't; add once real hours are
  confirmed.
- **BreadcrumbList — fixed a real mismatch.** The visible breadcrumb
  (Home / Locations / [State] / [City]) already included the parent state
  since the last pass, but the JSON-LD version was still hardcoded to 3
  levels, silently missing the state. Structured data contradicting the
  visible page is a real problem, not a nitpick — fixed to walk the same
  `parentSlug` chain the UI uses, so they can never drift apart again.
- **FAQPage** — already present; unchanged (still the real, visible FAQ
  content, nothing added to the schema that isn't on the page).
- **Service** — already present (`Service` + `areaServed`, not
  `LocalBusiness`, for the 6 non-Raipur pages — see above).

## Meta improvements

Every title, once the site's `%s · GooglixLabs` template is applied, was
65–76 characters — past Google's practical ~60-character SERP cutoff, so
every single location page's title was getting truncated. Shortened all 7
to 44–55 characters (with the suffix), keyword-led for the actual local
search phrase (`"website design company in [city]"`) rather than the
longer descriptive phrasing that read fine on the page but not in a
search result.

Three of seven meta descriptions (India, Raipur, Bhilai) were also over
Google's ~155–160 character practical limit and would have been cut off
mid-sentence. All 7 tightened to 140–155 characters, location name kept
early in the sentence so it's still there even if a query still causes
truncation.

Keywords: added one or two realistic long-tail variants per page
(`"website designer near me [city]"`, `"web development company [city]"`)
— phrasing people actually type, not just the formal service name.

## Internal links

Reviewed the full structure built previously (hierarchy, services,
industries, tools, portfolio/case studies, contact — see
`internal-linking.md`). One real gap found and fixed: **9 FAQ answers
across all 7 pages mentioned a specific tool by name — "Website Cost
Calculator," "Digital Presence Score" — as plain text**, not a link, even
though every other part of the page already links tool mentions properly.
Fixed via a new `linkText`/`relatedToolSlug` pair on `LocationFaq`
(`lib/locations/types.ts`) — the exact substring is swapped for a real
`<Link>` at render time (`renderFaqAnswer()` in `LocationPage.tsx`). It
inherits the surrounding text's color, so it's visually identical to
plain text until hovered — a functional fix, not a visual one.

## Heading hierarchy

Verified via rendered HTML, not assumed: exactly one `<h1>` per page (the
hero), `<h2>` for every major section including the newer "Explore by
State/City" and "Explore GooglixLabs" blocks. `<h3>` appears in two
places, both correctly nested under a preceding `<h2>`: FAQ questions
under the FAQ heading, and each tool-card title (`ToolCard.tsx`) under
"Try Our Free Tools" — a grid of cards is exactly the case an `<h3>`
subsection is for, not a violation. No skipped levels (no `<h1>` straight
to `<h3>`), no duplicate `<h1>`s introduced by the OG-image or schema
additions (those render in `<head>`/off-DOM, not the document body).

## Image alt suggestions

**No images currently exist on any location page** — no photos, no
illustrations, nothing beyond inline SVG icons (which are already either
decorative and `aria-hidden` or accompanied by real text). There is
nothing to retroactively add alt text to without inventing an image
element, which would be a UI change explicitly out of scope here.

What *was* added, because it's real and invisible on the page itself: a
unique **dynamic Open Graph image per location**
(`app/locations/[slug]/opengraph-image.tsx`), rendering the city name
into the same visual template the homepage already uses. This is the one
"image" lever available without touching the page's visible design —
it's what renders in a social-share card or a rich search snippet, not on
the page.

If/when real photography or illustration is added to these pages later,
suggested alt text patterns to follow:
- Hero/location photo: `"[City name] business district"` or a specific,
  real description of what's actually in the photo — never a generic
  stock phrase like "city skyline" if that's not literally what's shown.
  Include the practical detail that would help both accessibility and
  images-search relevance (e.g., `"Retail market street in Raipur,
  Chhattisgarh"` rather than just `"Raipur"`).
- Any staff/team photo: the real name and role, not "our team."
- Any client logo strip: `"[Client name] logo"` per logo, not one alt
  text covering the whole row.
- Never keyword-stuff alt text with the target search phrase if it
  doesn't actually describe the image — that's an accessibility failure
  masquerading as an SEO tactic, and modern Google discounts it anyway.

## Search intent

Titles/keywords now match how this is actually searched
(`"website design company in raipur"`, not a formal restated service
description). FAQ questions were already written as real questions a
prospective customer searches or asks ("How much does a website cost in
Raipur?", "Can you help my shop or clinic get found on Google Maps?"),
which was already solid before this pass — left unchanged. The new tool
links inside those answers close the loop: someone whose actual intent
is "get a real number" is now one click from the calculator that gives
them one, instead of reading a mention of it.

## "Every page can rank independently" — verification, not assertion

Checked, not assumed:
- All 7 titles and all 7 meta descriptions are textually unique (no two
  pages share a title or description).
- All 7 have a unique, self-referencing canonical URL.
- No two pages target an identical primary keyword phrase — each city
  page targets its own city name; the state and country pages
  deliberately use broader, non-competing phrasing precisely so they
  don't cannibalize the city pages' rankings.
- Each page's on-page content (About/Why sections) was already confirmed
  genuinely unique per page in the previous pass — unaffected by this one.
