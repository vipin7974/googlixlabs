import Cube3D from "@/components/Cube3D";
import { manifestoLines, studioPoints } from "@/lib/content";

export default function Studio() {
  return (
    <section
      id="studio"
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--paper)",
        padding: "clamp(56px,8vw,108px) clamp(20px,5vw,60px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        {/* floating 3D wireframe cube (pure CSS 3D transforms) */}
        <Cube3D />

        <div
          data-fade
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "clamp(22px,3vw,36px)",
          }}
        >
          (01) — The studio
        </div>

        <h2
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1.7rem,4.6vw,3.6rem)",
            lineHeight: 1.1,
            letterSpacing: "-.025em",
            color: "var(--ink)",
            margin: 0,
            maxWidth: "20ch",
            textWrap: "balance",
          }}
        >
          {manifestoLines.map((ln, i) => (
            <span className="gx-mask" data-fade key={i}>
              <span>{ln}</span>
            </span>
          ))}
        </h2>

        <div
          className="gx-manifesto-grid"
          style={{ display: "grid", gap: 28, marginTop: "clamp(34px,4.5vw,56px)" }}
        >
          {studioPoints.map((p) => (
            <div data-fade key={p.k} style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11.5,
                  color: "var(--accent)",
                  marginBottom: 12,
                }}
              >
                {p.k}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {p.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
