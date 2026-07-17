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
  /** Location-specific display label — kept unique per page even though `slug` maps to a shared canonical industry. */
  label: string;
  /** References an IndustryContent slug in lib/industries/registry.ts. */
  slug: string;
}

export interface LocationContent {
  slug: string;
  name: string;
  level: LocationLevel;
  /** For a city: its state. For a state: its country. Omitted for the country page. */
  parentName?: string;
  parentSlug?: string;
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
