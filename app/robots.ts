import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://googlixlabs.com/sitemap.xml",
    host: "https://googlixlabs.com",
  };
}
