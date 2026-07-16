import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { ToolCard } from "@/components/tools/ToolCard";
import { RecentTools } from "@/components/tools/RecentTools";
import { toolsRegistry } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Business Growth Tools",
  description:
    "Free, practical tools from GooglixLabs — estimate a website build, generate a WhatsApp link and more, with no sign-up required.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Business Growth Tools · GooglixLabs",
    description: "Free tools for costing, planning and growing your business online.",
    url: "/tools",
  },
};

export default function ToolsIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ position: "relative", zIndex: 2, padding: "140px clamp(20px,5vw,60px) 60px" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <div
              data-fade
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 20,
              }}
            >
              Business Growth Tools
            </div>
            <h1
              data-fade
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2.2rem,6vw,4rem)",
                lineHeight: 1,
                letterSpacing: "-.035em",
                color: "var(--ink)",
                margin: "0 0 18px",
              }}
            >
              Free tools,{" "}
              <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                real numbers.
              </span>
            </h1>
            <p
              data-fade
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(1rem,1.4vw,1.15rem)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "56ch",
                margin: "0 0 48px",
              }}
            >
              Ten practical tools for costing, planning and growing your business online — free to
              use, no sign-up required. More are being added regularly.
            </p>

            <div className="gx-tools-grid">
              {toolsRegistry.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>

            <RecentTools />
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
