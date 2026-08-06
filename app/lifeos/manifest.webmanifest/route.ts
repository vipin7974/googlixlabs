import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    {
      name: "LifeOS",
      short_name: "LifeOS",
      description: "A personal operating system for focus, discipline and long-term goals.",
      start_url: "/lifeos",
      scope: "/lifeos",
      id: "/lifeos",
      display: "standalone",
      orientation: "portrait",
      background_color: "#f6f6f3",
      theme_color: "#2b5cff",
      icons: [
        { src: "/lifeos-icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/lifeos-icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/lifeos-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } }
  );
}
