import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import type { ToolMeta } from "@/lib/tools/types";
import { CTASection } from "./CTASection";
import { ToolIcon } from "./icons";
import { ToolVisitRecorder } from "./ToolVisitRecorder";

export function ToolLayout({ tool, children }: { tool: ToolMeta; children: ReactNode }) {
  return (
    <>
      <ToolVisitRecorder slug={tool.slug} />
      <Nav />
      <main>
        <section style={{ position: "relative", zIndex: 2, padding: "140px clamp(20px,5vw,60px) 60px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
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

          <div style={{ maxWidth: 900, margin: "64px auto 0", width: "100%" }}>
            <CTASection />
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
