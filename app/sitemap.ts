import type { MetadataRoute } from "next";

// Google does not index URL fragments (#section) as separate documents, so a
// single-page site should only list its real, crawlable document here.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://googlixlabs.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/play`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
