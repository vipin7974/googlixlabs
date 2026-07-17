import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceBySlug, servicesRegistry } from "@/lib/services/registry";
import { serviceBreadcrumbJsonLd, serviceJsonLd } from "@/lib/services/jsonld";

export function generateStaticParams() {
  return servicesRegistry.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} · GooglixLabs`,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} · GooglixLabs`,
      description: service.metaDescription,
    },
  };
}

export default function ServiceSlugPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceBreadcrumbJsonLd(service)) }}
      />
      <ServicePage service={service} />
    </>
  );
}
