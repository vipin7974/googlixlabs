import { ACCENTS } from "@/lib/content";
import { getIndustryBySlug } from "@/lib/industries/registry";
import * as templates from "./content-templates";
import { pickVariant } from "./content-templates";
import type { CityInput, CountryInput, LocationContent, LocationIndustryTag, LocationLevel, StateInput } from "./types";

const ACCENT_VALUES = Object.values(ACCENTS);

interface PreparedNode {
  slug: string;
  name: string;
  level: LocationLevel;
  parentSlug?: string;
  parentName?: string;
  childSlugs: string[];
  siblingSlugs: string[];
  facts: string[];
  industrySlugs: string[];
  nearbyOverride?: string[];
  lat?: number;
  lng?: number;
  isHeadquarters: boolean;
  accent: string;
}

/** Walks the nested country → state → city tree once, producing a flat list with all structural relationships (parent/children/siblings) computed rather than hand-authored. */
function flatten(countries: CountryInput[]): PreparedNode[] {
  const nodes: PreparedNode[] = [];

  for (const country of countries) {
    const stateSlugs = country.states.map((s) => s.slug);

    nodes.push({
      slug: country.slug,
      name: country.name,
      level: "country",
      childSlugs: stateSlugs,
      siblingSlugs: [],
      facts: country.facts ?? [],
      industrySlugs: country.industries,
      isHeadquarters: false,
      // The country page aggregates every state, so it stays on the brand's default accent rather than any one state's color.
      accent: ACCENTS.Signal,
    });

    for (const state of country.states) {
      const citySlugs = state.cities.map((c) => c.slug);
      // Deterministic per state (not per city) — every city in a state shares its state's identity, which is the "unique per state" signal, not a random per-page color.
      const stateAccent = pickVariant(`accent:${state.slug}`, ACCENT_VALUES);

      nodes.push({
        slug: state.slug,
        name: state.name,
        level: "state",
        parentSlug: country.slug,
        parentName: country.name,
        childSlugs: citySlugs,
        siblingSlugs: stateSlugs.filter((slug) => slug !== state.slug),
        facts: state.facts ?? [],
        industrySlugs: state.industries,
        isHeadquarters: false,
        accent: stateAccent,
      });

      for (const city of state.cities) {
        nodes.push({
          slug: city.slug,
          name: city.name,
          level: "city",
          parentSlug: state.slug,
          parentName: state.name,
          childSlugs: [],
          siblingSlugs: citySlugs.filter((slug) => slug !== city.slug),
          facts: city.facts ?? [],
          industrySlugs: city.industries,
          nearbyOverride: city.nearbyCities,
          lat: city.lat,
          lng: city.lng,
          isHeadquarters: city.isHeadquarters ?? false,
          accent: stateAccent,
        });
      }
    }
  }

  return nodes;
}

function resolveIndustries(slugs: string[]): LocationIndustryTag[] {
  return slugs
    .map((slug) => {
      const industry = getIndustryBySlug(slug);
      return industry ? { slug, label: industry.name } : undefined;
    })
    .filter((tag): tag is LocationIndustryTag => tag !== undefined);
}

function buildLocationContent(node: PreparedNode): LocationContent {
  const industries = resolveIndustries(node.industrySlugs);
  const ctx: templates.GenContext = {
    slug: node.slug,
    name: node.name,
    level: node.level,
    parentName: node.parentName,
    facts: node.facts,
    industryNames: industries.map((tag) => tag.label),
    isHeadquarters: node.isHeadquarters,
  };

  return {
    slug: node.slug,
    name: node.name,
    level: node.level,
    parentName: node.parentName,
    parentSlug: node.parentSlug,
    isHeadquarters: node.isHeadquarters,
    accent: node.accent,
    metaTitle: templates.generateMetaTitle(ctx),
    metaDescription: templates.generateMetaDescription(ctx),
    keywords: templates.generateKeywords(ctx),
    heroEyebrow: templates.generateHeroEyebrow(ctx),
    heroHeadingPlain: templates.HERO_HEADING_PLAIN,
    heroHeadingAccent: templates.generateHeroHeadingAccent(ctx),
    heroSubheading: templates.generateHeroSubheading(ctx),
    aboutHeading: templates.generateAboutHeading(ctx),
    aboutBody: templates.generateAboutBody(ctx),
    whyHeading: templates.generateWhyHeading(ctx),
    whyBody: templates.generateWhyBody(ctx),
    industriesIntro: templates.generateIndustriesIntro(ctx),
    industries,
    servicesIntro: templates.generateServicesIntro(ctx),
    benefits: templates.generateBenefits(ctx),
    faqs: templates.generateFaqs(ctx),
    childSlugs: node.childSlugs.length > 0 ? node.childSlugs : undefined,
    relatedSlugs: (node.nearbyOverride ?? node.siblingSlugs.slice(0, 3)),
  };
}

export interface GeneratedLocation {
  content: LocationContent;
  lat?: number;
  lng?: number;
}

/** Generates a full LocationContent (plus coordinates, when known) for every node in the tree. */
export function buildLocationTree(countries: CountryInput[]): GeneratedLocation[] {
  return flatten(countries).map((node) => ({
    content: buildLocationContent(node),
    lat: node.lat,
    lng: node.lng,
  }));
}
