import { CITY_COORDINATES } from "./geo";
import { getLocationBySlug } from "./registry";
import type { LocationContent } from "./types";

const SITE_URL = "https://googlixlabs.com";

/**
 * GooglixLabs has one physical base (Raipur — see the Organization schema
 * in app/layout.tsx). Every other location here is a service area, not a
 * branch office, so this deliberately uses Service + areaServed rather
 * than declaring a LocalBusiness (with an address) per city — that would
 * be a false local-listing claim.
 */
export function locationServiceJsonLd(location: LocationContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web design, development and digital growth services",
    name: `GooglixLabs — Web & Digital Growth Services in ${location.name}`,
    description: location.metaDescription,
    areaServed: {
      "@type": location.level === "country" ? "Country" : location.level === "state" ? "State" : "City",
      name: location.name,
    },
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/locations/${location.slug}`,
  };
}

export function locationFaqJsonLd(location: LocationContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Mirrors the *visible* breadcrumb in LocationPage.tsx exactly (Home /
 * Locations / [State] / [City]) — structured data that contradicts what's
 * actually on the page is a real problem for Google, not just untidy, so
 * this walks the same parentSlug chain the UI uses rather than
 * hardcoding 3 levels.
 */
export function locationBreadcrumbJsonLd(location: LocationContent) {
  const items = [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Locations", url: `${SITE_URL}/locations` },
  ];

  const parent = location.parentSlug ? getLocationBySlug(location.parentSlug) : undefined;
  if (parent) {
    items.push({ name: parent.name, url: `${SITE_URL}/locations/${parent.slug}` });
  }
  items.push({ name: location.name, url: `${SITE_URL}/locations/${location.slug}` });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Only ever called for the Raipur page — that's the one location where a
 * physical-address claim is true. Reuses the exact same @id as the global
 * Organization/ProfessionalService entity in app/layout.tsx (repeating an
 * entity with the same @id across pages is normal, expected practice, not
 * duplicate content) rather than declaring a second, competing entity.
 * Opening hours are deliberately omitted — inventing them would risk
 * telling a customer the business is open when it isn't.
 */
export function locationLocalBusinessJsonLd() {
  const coords = CITY_COORDINATES.find((c) => c.slug === "raipur");
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "GooglixLabs",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    email: "googlixlabs@gmail.com",
    telephone: "+91-70004-98574",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Raipur",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
    ...(coords
      ? { geo: { "@type": "GeoCoordinates", latitude: coords.lat, longitude: coords.lng } }
      : {}),
    areaServed: "Worldwide",
  };
}
