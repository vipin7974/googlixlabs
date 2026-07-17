import type { IndustryContent } from "./types";

// Canonical industry taxonomy. Each location's `industries` list (in
// lib/locations/registry.ts) references these slugs — which locations
// serve a given industry is computed from that data (see
// getLocationsForIndustry in lib/locations/registry.ts), not hand-kept
// in sync here, so the two can never drift apart.
export const industriesRegistry: IndustryContent[] = [
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    shortDesc: "Physical stores and online sellers competing for the same searches.",
    metaTitle: "Website & Digital Growth Services for Retail & E-commerce Businesses",
    metaDescription:
      "GooglixLabs helps retail and e-commerce businesses build websites and an online presence that turns browsers into buyers.",
    body: [
      "Retail today competes on two fronts at once — the shop floor and the search result. A customer often decides where to buy before they ever walk in, based on what they find (or don't find) online.",
      "We build websites and online storefronts that make it easy to browse, compare and buy — whether that means a simple catalogue site or a full online store.",
    ],
  },
  {
    slug: "hospitality-restaurants",
    name: "Hospitality & Restaurants",
    shortDesc: "Restaurants, hotels and travel businesses where first impressions are everything.",
    metaTitle: "Website & Digital Growth Services for Hospitality & Restaurants",
    metaDescription:
      "GooglixLabs helps restaurants, hotels and hospitality businesses build websites that convert searches into bookings and visits.",
    body: [
      "In hospitality, most decisions happen before a customer arrives — while comparing menus, reviews and photos on a phone.",
      "We build websites and booking flows that make that decision easy, and reduce reliance on third-party platforms and the commissions that come with them.",
    ],
  },
  {
    slug: "healthcare-clinics",
    name: "Healthcare & Clinics",
    shortDesc: "Clinics, doctors and healthcare providers building patient trust online.",
    metaTitle: "Website & Digital Growth Services for Healthcare & Clinics",
    metaDescription:
      "GooglixLabs helps clinics and healthcare providers build professional websites that build patient trust and make booking easy.",
    body: [
      "For a clinic or healthcare provider, a website often has to do one specific job: reassure a worried patient that they're making the right choice, quickly.",
      "We build clean, trustworthy healthcare websites with clear information, credentials and an easy way to book or enquire.",
    ],
  },
  {
    slug: "education-coaching",
    name: "Education & Coaching",
    shortDesc: "Schools, coaching institutes and educators building enrolment through trust.",
    metaTitle: "Website & Digital Growth Services for Education & Coaching",
    metaDescription:
      "GooglixLabs helps schools and coaching institutes build websites that build parent and student trust and drive enrolment enquiries.",
    body: [
      "Parents and students research heavily before choosing a school or coaching institute — results, faculty, facilities, reviews.",
      "We build websites that present that information clearly, so a good institute's reputation actually reaches the people searching for it.",
    ],
  },
  {
    slug: "real-estate-construction",
    name: "Real Estate & Construction",
    shortDesc: "Developers, agents and construction businesses showcasing serious projects.",
    metaTitle: "Website & Digital Growth Services for Real Estate & Construction",
    metaDescription:
      "GooglixLabs helps real estate developers, agents and construction businesses build websites that present projects credibly and generate enquiries.",
    body: [
      "Real estate decisions are high-value and research-heavy — a buyer or investor will look up a developer online long before making contact.",
      "We build websites that present projects, listings and past work credibly, with a clear path to enquire.",
    ],
  },
  {
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    shortDesc: "Manufacturers and industrial suppliers building B2B credibility.",
    metaTitle: "Website & Digital Growth Services for Manufacturing & Industrial Businesses",
    metaDescription:
      "GooglixLabs helps manufacturers and industrial businesses build websites that establish credibility with new B2B buyers and partners.",
    body: [
      "Industrial and manufacturing businesses often win work through relationships — but a new buyer or partner will still look the business up online before the first meeting.",
      "We build straightforward, credible websites that confirm a manufacturer is a serious, established business worth working with.",
    ],
  },
  {
    slug: "professional-legal-services",
    name: "Professional & Legal Services",
    shortDesc: "Law firms, consultants and professional services building client trust.",
    metaTitle: "Website & Digital Growth Services for Professional & Legal Services",
    metaDescription:
      "GooglixLabs helps law firms, consultants and professional services build websites that project credibility and generate qualified enquiries.",
    body: [
      "For a law firm, consultant or professional services business, the website often has to substitute for a referral — proving credibility to someone who's never met the team.",
      "We build professional, information-clear websites that make that first impression count.",
    ],
  },
  {
    slug: "transport-logistics",
    name: "Transport & Logistics",
    shortDesc: "Transport, warehousing and logistics businesses reaching new B2B customers.",
    metaTitle: "Website & Digital Growth Services for Transport & Logistics Businesses",
    metaDescription:
      "GooglixLabs helps transport, logistics and warehousing businesses build websites that reach new B2B customers and partners.",
    body: [
      "Logistics and transport businesses often rely on long-standing contracts — but new routes and new customers increasingly start with an online search.",
      "We build clear, credible websites that help a logistics business win business beyond its existing network.",
    ],
  },
  {
    slug: "agriculture-agri-trade",
    name: "Agriculture & Agri-Trade",
    shortDesc: "Agricultural producers and agri-trade businesses reaching wider buyers.",
    metaTitle: "Website & Digital Growth Services for Agriculture & Agri-Trade Businesses",
    metaDescription:
      "GooglixLabs helps agricultural and agri-trade businesses build websites that reach buyers beyond their existing local network.",
    body: [
      "Agricultural and agri-trade businesses often sell through established local relationships — a website extends that reach to buyers further afield.",
      "We build simple, clear websites that present what a business grows, produces or trades, and how to get in touch.",
    ],
  },
  {
    slug: "it-technology-services",
    name: "IT & Technology Services",
    shortDesc: "IT service providers and emerging tech businesses building online credibility.",
    metaTitle: "Website & Digital Growth Services for IT & Technology Businesses",
    metaDescription:
      "GooglixLabs helps IT service providers and technology businesses build websites and platforms that match the credibility of their work.",
    body: [
      "An IT or technology business is judged partly by its own website — a dated or generic-looking site undercuts the credibility of the work it's trying to sell.",
      "We build websites and platforms for tech businesses that actually reflect the quality of what they do.",
    ],
  },
  {
    slug: "salons-gyms-wellness",
    name: "Salons, Gyms & Wellness",
    shortDesc: "Salons, gyms and wellness businesses turning searches into bookings.",
    metaTitle: "Website & Digital Growth Services for Salons, Gyms & Wellness Businesses",
    metaDescription:
      "GooglixLabs helps salons, gyms and wellness businesses build websites that turn local searches into real bookings and memberships.",
    body: [
      "Salons, gyms and wellness businesses win a lot of their new customers from a single local search — and lose them just as easily to whichever competitor is easier to find and book.",
      "We build websites with clear services, pricing and an easy way to book, so that search turns into a customer.",
    ],
  },
  {
    slug: "government-institutional",
    name: "Government & Institutional Services",
    shortDesc: "Institutions and government-linked services communicating clearly with the public.",
    metaTitle: "Website & Digital Growth Services for Government & Institutional Bodies",
    metaDescription:
      "GooglixLabs helps government-linked and institutional bodies build clear, accessible websites that communicate effectively with the public.",
    body: [
      "Institutional and government-linked bodies need to communicate clearly and accessibly with a wide public audience, often across a range of technical familiarity.",
      "We build clear, accessible websites focused on making information easy to find, not just easy to publish.",
    ],
  },
];

export function getIndustryBySlug(slug: string): IndustryContent | undefined {
  return industriesRegistry.find((industry) => industry.slug === slug);
}

export function getIndustryOrThrow(slug: string): IndustryContent {
  const industry = getIndustryBySlug(slug);
  if (!industry) throw new Error(`Unknown industry slug: "${slug}"`);
  return industry;
}
