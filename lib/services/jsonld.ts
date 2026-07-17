import type { ServiceContent } from "./types";

const SITE_URL = "https://googlixlabs.com";

export function serviceJsonLd(service: ServiceContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

export function serviceBreadcrumbJsonLd(service: ServiceContent) {
  const items = [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
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
