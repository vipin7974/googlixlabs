import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPage } from "@/components/locations/LocationPage";
import { getLocationBySlug, locationsRegistry } from "@/lib/locations/registry";
import {
  locationBreadcrumbJsonLd,
  locationFaqJsonLd,
  locationLocalBusinessJsonLd,
  locationServiceJsonLd,
} from "@/lib/locations/jsonld";

export function generateStaticParams() {
  return locationsRegistry.map((location) => ({ slug: location.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const location = getLocationBySlug(params.slug);
  if (!location) return {};

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: location.keywords,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title: `${location.metaTitle} · GooglixLabs`,
      description: location.metaDescription,
      url: `/locations/${location.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${location.metaTitle} · GooglixLabs`,
      description: location.metaDescription,
    },
  };
}

export default function LocationSlugPage({ params }: { params: { slug: string } }) {
  const location = getLocationBySlug(params.slug);
  if (!location) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationServiceJsonLd(location)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationBreadcrumbJsonLd(location)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationFaqJsonLd(location)) }}
      />
      {location.isHeadquarters ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationLocalBusinessJsonLd()) }}
        />
      ) : null}
      <LocationPage location={location} />
    </>
  );
}
