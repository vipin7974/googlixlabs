import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { getToolOrThrow } from "@/lib/tools/registry";
import { toolJsonLd } from "@/lib/tools/jsonld";
import { CostCalculatorClient } from "./CostCalculatorClient";

const tool = getToolOrThrow("website-cost-calculator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `${tool.title} · GooglixLabs`,
    description: tool.description,
    url: `/tools/${tool.slug}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${tool.title} · GooglixLabs`,
    description: tool.description,
  },
};

export default function WebsiteCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd(tool)) }}
      />
      <ToolLayout tool={tool}>
        <CostCalculatorClient />
      </ToolLayout>
    </>
  );
}
