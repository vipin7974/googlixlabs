import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { CTASection } from "@/components/CTASection";
import { getFeaturedLocations } from "@/lib/locations/registry";
import type { ToolMeta } from "@/lib/tools/types";
import { ToolIcon } from "./icons";
import { ToolVisitRecorder } from "./ToolVisitRecorder";

export function ToolLayout({ tool, children }: { tool: ToolMeta; children: ReactNode }) {
  const featuredLocations = getFeaturedLocations();

  return (
    <>
      <ToolVisitRecorder slug={tool.slug} />
      <Nav />
      <main>
        <section
          className="gx-tool-section"
          style={{ position: "relative", zIndex: 2, padding: "140px clamp(20px,5vw,60px) 60px" }}
        >
          <div className="gx-tool-header" style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
            <Link
              href="/tools"
              data-cursor
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".04em",
                color: "var(--muted)",
              }}
            >
              ← All tools
            </Link>

            <div data-fade style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0 18px" }}>
              <span
                className="gx-tool-icon"
                style={{ color: tool.accent, borderColor: `${tool.accent}33` }}
              >
                <ToolIcon name={tool.icon} size={24} />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Business Growth Tools
              </span>
            </div>

            <h1
              data-fade
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2rem,5vw,3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-.03em",
                color: "var(--ink)",
                margin: "0 0 16px",
              }}
            >
              {tool.title}
            </h1>
            <p
              data-fade
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(1rem,1.4vw,1.1rem)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "56ch",
                margin: 0,
              }}
            >
              {tool.description}
            </p>
          </div>

          <div data-fade style={{ maxWidth: 900, margin: "44px auto 0", width: "100%" }}>
            {children}
          </div>

          {featuredLocations.length > 0 ? (
            <div style={{ maxWidth: 900, margin: "56px auto 0", width: "100%" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                  color: "var(--faint)",
                  marginBottom: 14,
                }}
              >
                Serving businesses across
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {featuredLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    data-cursor
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      color: "var(--muted)",
                      border: "1px solid var(--line)",
                      borderRadius: 100,
                      padding: "7px 15px",
                    }}
                  >
                    {loc.name}
                  </Link>
                ))}
                <Link
                  href="/locations"
                  data-cursor
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    color: "var(--accent)",
                    padding: "7px 4px",
                  }}
                >
                  View all locations ↗
                </Link>
              </div>
            </div>
          ) : null}

          <div style={{ maxWidth: 900, margin: "56px auto 0", width: "100%" }}>
            <CTASection />
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
