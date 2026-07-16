import type { MetadataRoute } from "next";
import { availableTools } from "@/lib/tools/registry";

// Google does not index URL fragments (#section) as separate documents, so a
// single-page site should only list its real, crawlable document here.
// Only `availableTools` (live pages) are listed — "coming soon" tools don't
// have a route yet, so linking them in the sitemap would just point Google
// at a 404.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://googlixlabs.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/play`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...availableTools.map((tool) => ({
      url: `${base}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
