import Link from "next/link";
import { toolsRegistry } from "@/lib/tools/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { RecentTools } from "@/components/tools/RecentTools";

export default function Tools() {
  return (
    <section
      id="tools"
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--paper)",
        padding: "clamp(80px,12vw,150px) clamp(20px,5vw,60px)",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div
          data-fade
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: "clamp(40px,6vw,64px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 16,
              }}
            >
              (04) — Business Growth Tools
            </div>
            <h2
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2rem,5vw,3.6rem)",
                lineHeight: 1,
                letterSpacing: "-.035em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Free tools,{" "}
              <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                real numbers.
              </span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "38ch",
              margin: 0,
            }}
          >
            Ten practical tools for costing, planning and growing your business online — free to
            use, no sign-up required.
          </p>
        </div>

        <div className="gx-tools-grid">
          {toolsRegistry.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <RecentTools />

        <div style={{ marginTop: 40 }}>
          <Link
            href="/tools"
            data-cursor
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              letterSpacing: ".02em",
              color: "var(--ink)",
            }}
          >
            View all tools ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
