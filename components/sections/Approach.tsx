import { approach } from "@/lib/content";

export default function Approach() {
  return (
    <section
      id="approach"
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--paper)",
        padding: "0 clamp(20px,5vw,60px) clamp(80px,12vw,150px)",
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
            borderTop: "1px solid var(--line)",
            paddingTop: "clamp(40px,6vw,64px)",
          }}
        >
          (04) — How we work
        </h2>

        <div
          className="gx-approach-grid"
          style={{ display: "grid", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}
        >
          {approach.map((a) => (
            <div key={a.n} data-fade style={{ background: "var(--paper)", padding: "clamp(30px,3.5vw,44px) clamp(24px,3vw,36px)" }}>
              <div
                style={{
                  fontFamily: "var(--font-instrument), serif",
                  fontStyle: "italic",
                  fontSize: "clamp(2.4rem,4vw,3.4rem)",
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 22,
                }}
              >
                {a.n}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-bricolage), sans-serif",
                  fontWeight: 600,
                  fontSize: 19,
                  letterSpacing: "-.02em",
                  color: "var(--ink)",
                  margin: "0 0 10px",
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
