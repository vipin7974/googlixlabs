import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GooglixLabs — Digital Product Studio",
    short_name: "GooglixLabs",
    description:
      "Digital product studio in Bhilai, Chhattisgarh, India, building intelligent web apps, SaaS platforms and AI products.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F3EE",
    theme_color: "#17181B",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
