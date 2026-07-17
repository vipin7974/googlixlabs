import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/industries/IndustryPage";
import { getIndustryBySlug, industriesRegistry } from "@/lib/industries/registry";
import { industryBreadcrumbJsonLd } from "@/lib/industries/jsonld";

export function generateStaticParams() {
  return industriesRegistry.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: `${industry.metaTitle} · GooglixLabs`,
      description: industry.metaDescription,
      url: `/industries/${industry.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.metaTitle} · GooglixLabs`,
      description: industry.metaDescription,
    },
  };
}

export default function IndustrySlugPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industryBreadcrumbJsonLd(industry)) }}
      />
      <IndustryPage industry={industry} />
    </>
  );
}
