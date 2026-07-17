export type LocationLevel = "country" | "state" | "city";

export interface LocationFaq {
  question: string;
  answer: string;
  /**
   * If set, the first exact occurrence of this substring inside `answer`
   * renders as a real link to /tools/{relatedToolSlug} instead of plain
   * text — several FAQ answers already mention a tool by name.
   */
  linkText?: string;
  relatedToolSlug?: string;
}

export interface LocationBenefit {
  title: string;
  desc: string;
}

export interface LocationIndustryTag {
  /** Display label — resolved from the canonical industry name in lib/industries/registry.ts. */
  label: string;
  /** References an IndustryContent slug in lib/industries/registry.ts. */
  slug: string;
}

/**
 * The fully-generated shape every UI component and JSON-LD builder
 * consumes. Every location page is built from one of these, whether it
 * came from 7 cities or 5,000 — nothing downstream of this type knows or
 * cares that the text was templated rather than hand-typed.
 */
export interface LocationContent {
  slug: string;
  name: string;
  level: LocationLevel;
  /** For a city: its state. For a state: its country. Omitted for the country page. */
  parentName?: string;
  parentSlug?: string;
  /** True only for the one location GooglixLabs is physically based in — drives LocalBusiness schema. */
  isHeadquarters: boolean;
  /** Hex accent color — assigned per state (deterministically, from lib/content.ts's ACCENTS), inherited by every city in it, so each state reads as visually distinct. */
  accent: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow: string;
  heroHeadingPlain: string;
  heroHeadingAccent: string;
  heroSubheading: string;
  aboutHeading: string;
  aboutBody: string[];
  whyHeading: string;
  whyBody: string[];
  industriesIntro: string;
  industries: LocationIndustryTag[];
  servicesIntro: string;
  benefits: LocationBenefit[];
  faqs: LocationFaq[];
  /**
   * Strict hierarchy children only — a country's states, a state's cities.
   * Absent on city pages (cities have no children in this hierarchy).
   */
  childSlugs?: string[];
  /** Lateral cross-links (sibling cities, a nearby out-of-state hub) — never a parent/child relationship, that's `childSlugs` + `parentSlug`. */
  relatedSlugs: string[];
}

/**
 * ---- Raw authoring input (the actual CMS data file) ----
 *
 * This is the ONLY shape a human ever writes by hand. Everything in
 * `LocationContent` above — hero copy, paragraphs, FAQs, benefit cards,
 * meta title/description/keywords — is generated from these few fields
 * by lib/locations/generate.ts. Adding a new city is adding one
 * `CityInput` object; nothing else.
 *
 * `facts` is the one place for genuinely real, verifiable detail about a
 * place (e.g. "is the state capital", "grew up around a steel plant").
 * Never invent a fact to fill this in — omit it and the generator falls
 * back to honest, industry-derived copy instead.
 */
export interface CityInput {
  name: string;
  slug: string;
  /** Real, public city-centre coordinates — used only for "find my nearest location", never to auto-redirect. */
  lat?: number;
  lng?: number;
  /** Industry slugs from lib/industries/registry.ts this city's businesses fall into. */
  industries: string[];
  /** Real, verifiable one-line facts about this specific city. Never invented statistics. */
  facts?: string[];
  /**
   * Explicit override for lateral "Also Serving Nearby" links (e.g. a
   * cross-state hub like Nagpur linking to Raipur). When omitted, this is
   * auto-derived from sibling cities in the same state.
   */
  nearbyCities?: string[];
  /** True for the single city GooglixLabs is physically based in. */
  isHeadquarters?: boolean;
}

export interface StateInput {
  name: string;
  slug: string;
  /** Industry slugs shown on the state-level page (usually broader than any one city's list). */
  industries: string[];
  facts?: string[];
  cities: CityInput[];
}

export interface CountryInput {
  name: string;
  slug: string;
  industries: string[];
  facts?: string[];
  states: StateInput[];
}
