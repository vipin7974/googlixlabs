import type { LocationBenefit, LocationFaq, LocationLevel } from "./types";

/**
 * Every piece of prose on a location page is generated from here, not
 * typed by hand per city. Each slot has a small bank of variants; which
 * variant a given location gets is picked deterministically from a hash
 * of its slug, so the same city always renders the same copy (stable
 * across builds) while neighbouring cities don't read identically.
 *
 * This is the standard, legitimate way large local-SEO page sets are
 * built (the alternative — hand-writing prose for hundreds of cities —
 * is what this whole refactor exists to avoid). Real per-city facts
 * (`ctx.facts`) are woven in wherever available so pages with genuine
 * detail read as more specific than pages without it, rather than every
 * page reading identically once the city name is swapped out.
 */
export interface GenContext {
  slug: string;
  name: string;
  level: LocationLevel;
  parentName?: string;
  facts: string[];
  industryNames: string[];
  isHeadquarters: boolean;
}

function stableHash(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function pickVariant<T>(seed: string, variants: readonly T[]): T {
  if (variants.length === 0) throw new Error(`pickVariant: empty variant list for seed "${seed}"`);
  return variants[stableHash(seed) % variants.length];
}

function joinList(items: string[]): string {
  if (items.length === 0) return "a wide range of local businesses";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

// ---------- Hero ----------

export function generateHeroEyebrow(ctx: GenContext): string {
  if (ctx.level === "city" && ctx.isHeadquarters) {
    return `${ctx.name}, ${ctx.parentName} — our home base`;
  }
  const cityVariants = [
    (c: GenContext) => `Serving businesses in ${c.name}`,
    (c: GenContext) => `${c.name}, ${c.parentName}`,
    (c: GenContext) => `Website design for ${c.name} businesses`,
  ];
  const broaderVariants = [
    (c: GenContext) => `Serving businesses across ${c.name}`,
    (c: GenContext) => `Website design & digital growth in ${c.name}`,
  ];
  const variants = ctx.level === "city" ? cityVariants : broaderVariants;
  return pickVariant(`${ctx.slug}:eyebrow`, variants)(ctx);
}

export const HERO_HEADING_PLAIN = "Digital growth for";

export function generateHeroHeadingAccent(ctx: GenContext): string {
  return `${ctx.name} businesses.`;
}

export function generateHeroSubheading(ctx: GenContext): string {
  const cityVariants = [
    (c: GenContext) =>
      `We help ${c.name} businesses — from local shops to established firms — build a website and online presence that turns nearby searches into real customers.`,
    (c: GenContext) =>
      `We help ${c.name} businesses build a website and online presence that gets found by the customers who are already searching for them.`,
    (c: GenContext) =>
      `Whether you run a shop, a clinic or a growing service business in ${c.name}, we help you build an online presence that brings in real enquiries.`,
    (c: GenContext) =>
      `We help ${c.name} businesses build a website that works as hard as they do — turning searches into customers, not lost opportunities.`,
    (c: GenContext) =>
      `From first-time businesses to established names, we help ${c.name} build a website and online presence that actually brings in customers.`,
  ];
  const stateVariants = [
    (c: GenContext) =>
      `We help businesses across ${c.name} — from established names to new ventures — get found by the customers already searching for them online.`,
    (c: GenContext) =>
      `From city centres to smaller towns, we help ${c.name} businesses build a website and online presence that brings in real customers.`,
    (c: GenContext) =>
      `We work with businesses across ${c.name}, helping everyday searches turn into real, local customers.`,
  ];
  const countryVariants = [
    (c: GenContext) =>
      `From metro cities to growing towns, we help small and mid-sized businesses across ${c.name} build a website and online presence that actually brings in customers.`,
    (c: GenContext) =>
      `We help businesses across ${c.name} — in any city, of any size — get found by the customers already searching for them online.`,
    (c: GenContext) =>
      `Wherever your business is in ${c.name}, we help you build a website and online presence that brings in real customers, not just visitors.`,
  ];
  const variants = ctx.level === "city" ? cityVariants : ctx.level === "state" ? stateVariants : countryVariants;
  return pickVariant(`${ctx.slug}:subheading`, variants)(ctx);
}

// ---------- About ----------

export function generateAboutHeading(ctx: GenContext): string {
  const cityVariants = [
    (c: GenContext) => `A closer look at ${c.name}`,
    (c: GenContext) => `Business in ${c.name}`,
    (c: GenContext) => `${c.name}'s business landscape`,
  ];
  const stateVariants = [(c: GenContext) => `Business across ${c.name}`, (c: GenContext) => `A closer look at ${c.name}`];
  const countryVariants = [(c: GenContext) => `Business, everywhere in ${c.name}`];
  const variants = ctx.level === "city" ? cityVariants : ctx.level === "state" ? stateVariants : countryVariants;
  return pickVariant(`${ctx.slug}:aboutHeading`, variants)(ctx);
}

export function generateAboutBody(ctx: GenContext): string[] {
  const industryPhrase = joinList(ctx.industryNames.slice(0, 4));
  const firstPara = ctx.facts.length
    ? `${ctx.name} ${joinList(ctx.facts)}, alongside a growing base of ${industryPhrase} businesses.`
    : `${ctx.name} is home to a wide mix of businesses, with a growing base of ${industryPhrase} businesses serving the local community.`;

  const secondParaVariants = ctx.isHeadquarters
    ? [
        (c: GenContext) =>
          `GooglixLabs is based here too — which means when a ${c.name} business works with us, they're working with a team that actually understands the local market, not a remote agency guessing at it.`,
      ]
    : [
        (c: GenContext) =>
          `A growing share of ${c.name} customers now start with a search on their phone before they ever call or visit — no matter how established a business already is offline.`,
        (c: GenContext) =>
          `What's changed for many ${c.name} businesses isn't the product or service — it's where the first impression happens, increasingly online rather than in person.`,
        (c: GenContext) =>
          `Word of mouth still carries weight in ${c.name}, but it doesn't reach a customer who's new to the area or comparing options online before they ever call.`,
      ];
  const secondPara = pickVariant(`${ctx.slug}:about2`, secondParaVariants)(ctx);
  return [firstPara, secondPara];
}

// ---------- Why a website ----------

export function generateWhyHeading(ctx: GenContext): string {
  const variants = [
    (c: GenContext) => `Why ${c.name} businesses need more than word of mouth now`,
    (c: GenContext) => `Why every ${c.name} business needs a website today`,
    (c: GenContext) => `Being easy to find matters more in ${c.name} than ever`,
  ];
  return pickVariant(`${ctx.slug}:whyHeading`, variants)(ctx);
}

export function generateWhyBody(ctx: GenContext): string[] {
  const firstVariants: Array<(c: GenContext) => string> = [
    () =>
      "Word of mouth still matters, but it doesn't scale the way a search result does. A customer comparing options on Google, Maps or Instagram will simply move to the next name if yours doesn't show up clearly — with the right information, at the right time.",
    (c) =>
      `As ${c.name} grows, more customers compare businesses on Google and Google Maps before they ever call or visit — checking reviews, photos, and whether a business even shows up at all.`,
  ];
  const secondVariants: Array<(c: GenContext) => string> = [
    () =>
      "A website doesn't replace your reputation. It's what lets someone who's never heard of you find it in the first place.",
    () =>
      "A business with no real website is easy to overlook, however good its reputation, in favour of a competitor who shows up first with clear information and real reviews.",
  ];
  return [pickVariant(`${ctx.slug}:why1`, firstVariants)(ctx), pickVariant(`${ctx.slug}:why2`, secondVariants)(ctx)];
}

// ---------- Industries / services intros ----------

export function generateIndustriesIntro(ctx: GenContext): string {
  return ctx.level === "city"
    ? `In and around ${ctx.name}, we work with businesses in:`
    : `Across ${ctx.name}, we work with businesses in:`;
}

export function generateServicesIntro(ctx: GenContext): string {
  return `For businesses in ${ctx.name}, we help with:`;
}

// ---------- Benefits ----------

export function generateBenefits(ctx: GenContext): LocationBenefit[] {
  if (ctx.isHeadquarters) {
    return [
      {
        title: "Work with a team based right here",
        desc: `No time-zone gaps or guesswork about the local market — we're in ${ctx.name} too.`,
      },
      { title: `Show up when ${ctx.name} customers search`, desc: "Be visible on Google and Maps exactly when someone nearby is looking." },
      { title: "A site that works on any device", desc: "Most local searches happen on a phone — yours should be built for that first." },
      { title: "Support that continues after launch", desc: "We're a phone call away, not a one-time freelancer who disappears." },
    ];
  }
  return [
    { title: "Reach beyond your immediate area", desc: `A website works for you across ${ctx.name}, not just on your street.` },
    { title: "Look as credible as bigger competitors", desc: "Good design signals trust before a customer ever speaks to you." },
    { title: "One site, every device", desc: "Most searches happen on a phone — your site should work like it too." },
    { title: "Support that doesn't disappear", desc: "We stay reachable after launch, not just during the project." },
  ];
}

// ---------- FAQs ----------

export function generateFaqs(ctx: GenContext): LocationFaq[] {
  const faqs: LocationFaq[] = [
    {
      question: `Do I need a website if my ${ctx.level === "city" ? "shop" : "business"} already gets customers through word of mouth?`,
      answer:
        "Word of mouth is still valuable — a website just makes sure it can travel further than the people who already know you. It's often the first thing a referred customer checks before calling.",
    },
    {
      question: `How much does a website cost in ${ctx.name}?`,
      answer:
        "It depends on what you need — a simple one-page site costs far less than a full platform with bookings or payments. Try our free Website Cost Calculator for an instant, honest estimate based on your exact requirements.",
      linkText: "Website Cost Calculator",
      relatedToolSlug: "website-cost-calculator",
    },
    {
      question: `How long does it take to get a website live in ${ctx.name}?`,
      answer:
        "A simple business website typically takes a few weeks from first conversation to launch. Our Website Cost Calculator also gives you a realistic timeline estimate up front.",
      linkText: "Website Cost Calculator",
      relatedToolSlug: "website-cost-calculator",
    },
  ];

  if (ctx.level === "city") {
    faqs.push({
      question: "Can you help my shop or clinic get found on Google Maps?",
      answer:
        "Yes — a well-set-up Google Business Profile alongside your website is often what makes the biggest difference for a local, walk-in business. Our free Digital Presence Score tool is a good place to see where you currently stand.",
      linkText: "Digital Presence Score",
      relatedToolSlug: "digital-score",
    });
  }

  return faqs;
}

// ---------- Meta ----------

function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

const TITLE_SUFFIX_LENGTH = " · GooglixLabs".length;

export function generateMetaTitle(ctx: GenContext): string {
  const raw =
    ctx.level === "city"
      ? `Website Design Company in ${ctx.name}`
      : ctx.level === "state"
      ? `Website Design Services in ${ctx.name}`
      : `Website Design & Growth Services in ${ctx.name}`;
  return clamp(raw, 60 - TITLE_SUFFIX_LENGTH);
}

export function generateMetaDescription(ctx: GenContext): string {
  const raw = ctx.isHeadquarters
    ? `GooglixLabs is a ${ctx.name}-based studio helping local businesses build a website and online presence that brings in real customers — meet the team.`
    : ctx.level === "city"
    ? `GooglixLabs helps ${ctx.name} businesses build a website and online presence that turns local searches into real, paying customers.`
    : `GooglixLabs helps businesses across ${ctx.name} build a website and online presence that brings in real customers, in any city.`;
  return clamp(raw, 158);
}

export function generateKeywords(ctx: GenContext): string[] {
  const n = ctx.name.toLowerCase();
  const parent = ctx.parentName ? ` ${ctx.parentName.toLowerCase()}` : "";
  return [
    `website design company ${n}`,
    `web development ${n}${parent}`,
    `digital marketing agency ${n}`,
    `website designer near me ${n}`,
  ];
}
