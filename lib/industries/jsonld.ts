import type { IndustryContent } from "./types";

const SITE_URL = "https://googlixlabs.com";

export function industryBreadcrumbJsonLd(industry: IndustryContent) {
  const items = [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Industries", url: `${SITE_URL}/industries` },
    { name: industry.name, url: `${SITE_URL}/industries/${industry.slug}` },
  ];
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
