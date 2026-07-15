import FlowCanvas from "@/components/FlowCanvas";
import { heroStats } from "@/lib/content";

export default function Hero({ accent = "#2B5CFF" }: { accent?: string }) {
  return (
    <header
      id="top"
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "140px clamp(20px,5vw,60px) 70px",
      }}
    >
      <FlowCanvas accent={accent} />

      {/* content sits in its own stacking context, above the flow canvas */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <div data-fade style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 38 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
                animation: "gxBlink 2.4s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Digital product studio — Raipur, IN
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2.9rem,10vw,9rem)",
              lineHeight: 0.92,
              letterSpacing: "-.04em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            <span className="gx-mask">
              <span>We design &amp;</span>
            </span>
            <span className="gx-mask">
              <span>
                engineer{" "}
                <span
                  style={{
                    fontFamily: "var(--font-instrument), serif",
                    fontWeight: 400,
                    fontStyle: "italic",
                    letterSpacing: "-.01em",
                  }}
                >
                  intelligent
                </span>
              </span>
            </span>
            <span className="gx-mask">
              <span>digital products.</span>
            </span>
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 30,
              marginTop: "clamp(40px,6vw,72px)",
            }}
          >
            <p
              data-fade
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(1rem,1.5vw,1.22rem)",
                lineHeight: 1.55,
                color: "var(--ink)",
                maxWidth: "44ch",
                margin: 0,
              }}
            >
              A small studio pairing modern engineering with applied AI — building web apps, SaaS
              platforms and brands that feel effortless and scale without limits.
            </p>
            <a
              href="#work"
              data-cursor
              data-magnetic
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                letterSpacing: ".03em",
                color: "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                className="gx-hero-arrow"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                }}
              >
                ↓
              </span>
              Selected work
            </a>
          </div>
        </div>

        <div
          data-fade
          style={{
            maxWidth: 1300,
            margin: "clamp(48px,7vw,90px) auto 0",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(24px,5vw,72px)",
            borderTop: "1px solid var(--line)",
            paddingTop: 26,
          }}
        >
          {heroStats.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span
                style={{
                  fontFamily: "var(--font-bricolage), sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem,2.4vw,2rem)",
                  letterSpacing: "-.03em",
                  color: "var(--ink)",
                }}
              >
                <span data-count={s.target}>0</span>
                {s.suffix}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11.5,
                  color: "var(--muted)",
                  maxWidth: "16ch",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
