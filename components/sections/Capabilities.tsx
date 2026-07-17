import Link from "next/link";
import { capabilities } from "@/lib/content";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--paper)",
        padding: "clamp(80px,12vw,150px) clamp(20px,5vw,60px)",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <h2
          data-fade
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "var(--muted)",
            margin: "0 0 clamp(40px,6vw,64px)",
          }}
        >
          (03) — What we do
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          {capabilities.map((c) => (
            <div
              data-fade
              key={c.no}
              className="gx-cap-row"
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: "clamp(16px,3vw,40px)",
                alignItems: "start",
                padding: "clamp(28px,4vw,44px) 6px",
                borderTop: "1px solid var(--line)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--accent)", paddingTop: 8 }}>
                {c.no}
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.5rem,3vw,2.2rem)",
                    letterSpacing: "-.03em",
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    margin: 0,
                    maxWidth: "52ch",
                  }}
                >
                  {c.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "var(--muted)",
                        border: "1px solid var(--line)",
                        borderRadius: 100,
                        padding: "4px 11px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <Link
            href="/services"
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
            See all services ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
