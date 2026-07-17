import type { ServiceContent } from "./types";

// Same 5 services shown on every location page's "How We Help" section —
// this registry is the single source of truth now; location pages import
// title/shortDesc from here instead of keeping their own copy.
export const servicesRegistry: ServiceContent[] = [
  {
    slug: "website-design-development",
    title: "A Website That Works as Hard as You Do",
    shortDesc: "Fast, mobile-friendly websites built to bring in enquiries, not just look good.",
    metaTitle: "Website Design & Development Services",
    metaDescription:
      "Fast, mobile-friendly websites built to bring in enquiries — not just look good. GooglixLabs designs and builds websites for small and mid-sized businesses.",
    intro: [
      "A website's first job isn't to look impressive — it's to make it easy for someone who's never heard of your business to trust it, understand what you offer, and get in touch.",
      "We build websites that load fast, work properly on a phone (where most of your customers will actually see it), and are structured around the one thing that matters: turning a visit into an enquiry.",
    ],
    idealFor: [
      "A business with no website yet",
      "An outdated site that looks dated or loads slowly",
      "A business that's outgrown a template builder",
    ],
  },
  {
    slug: "branding-identity",
    title: "Look Instantly Credible",
    shortDesc: "Branding and design that makes a new customer trust you before they've even called.",
    metaTitle: "Branding & Identity Design Services",
    metaDescription:
      "Branding and design that makes a new customer trust you before they've even called — logo, identity and visual consistency from GooglixLabs.",
    intro: [
      "Before a customer reads a single word about your business, they've already formed an impression — from your logo, your colours, how your website and social profiles look together.",
      "We build a visual identity that's consistent everywhere a customer encounters your business, so that first impression works for you instead of against you.",
    ],
    idealFor: [
      "A business without a proper logo or brand guidelines",
      "A business whose branding looks different across its website, signage and social media",
      "A business rebranding after outgrowing its original name or look",
    ],
  },
  {
    slug: "ai-automation",
    title: "Automate the Repetitive Stuff",
    shortDesc: "Applied AI wired into real workflows — bookings, replies, follow-ups — so less falls on you.",
    metaTitle: "Applied AI & Business Automation Services",
    metaDescription:
      "Applied AI wired into real workflows — bookings, replies, follow-ups — so less falls on the business owner. Practical automation from GooglixLabs.",
    intro: [
      "Most small businesses lose hours a week to the same repetitive tasks — answering the same questions, chasing follow-ups, manually confirming bookings.",
      "We wire practical AI into the workflows you already have, so routine work happens automatically and you spend your time on the parts of the business only you can do.",
    ],
    idealFor: [
      "A business fielding the same customer questions over and over",
      "A business that loses bookings or leads to slow follow-up",
      "A business ready to automate one specific, repetitive process",
    ],
  },
  {
    slug: "custom-software",
    title: "Software Built Around Your Business",
    shortDesc: "Custom platforms and dashboards for businesses that have outgrown spreadsheets.",
    metaTitle: "Custom Software & SaaS Platform Development",
    metaDescription:
      "Custom platforms and dashboards for businesses that have outgrown spreadsheets — built around how your business actually works, from GooglixLabs.",
    intro: [
      "At some point, a spreadsheet or a generic off-the-shelf tool stops fitting how your business actually runs — and working around its limits costs more time than building something that fits.",
      "We build custom software and dashboards shaped around your specific operations, not the other way around.",
    ],
    idealFor: [
      "A business managing operations across multiple spreadsheets",
      "A business whose off-the-shelf software doesn't quite fit",
      "A business ready to offer its own product or service as a platform",
    ],
  },
  {
    slug: "ongoing-support",
    title: "Support That Doesn't End at Launch",
    shortDesc: "Ongoing care after your site goes live, not a one-time handoff.",
    metaTitle: "Ongoing Website Support & Maintenance",
    metaDescription:
      "Ongoing care after your site goes live — updates, fixes and support, not a one-time handoff. GooglixLabs stays reachable after launch.",
    intro: [
      "A website isn't a one-time project — it needs small updates, occasional fixes, and someone to call when something doesn't look right.",
      "We stay involved after launch, so a growing business always has a team that already knows its website, instead of starting over with someone new every time something needs to change.",
    ],
    idealFor: [
      "A business whose previous developer has gone quiet",
      "A business that needs regular content or product updates",
      "A business that wants one team responsible for its website long-term",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return servicesRegistry.find((service) => service.slug === slug);
}

export function getServiceOrThrow(slug: string): ServiceContent {
  const service = getServiceBySlug(slug);
  if (!service) throw new Error(`Unknown service slug: "${slug}"`);
  return service;
}
