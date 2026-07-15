import { marquee } from "@/lib/content";

export default function Marquee() {
  const loop = marquee.concat(marquee);
  return (
    <section
      aria-label="Clients"
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--paper)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "20px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", width: "max-content", animation: "gxMq 34s linear infinite" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 42, paddingRight: 42 }}>
          {loop.map((m, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 42,
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "-.01em",
                color: "var(--faint)",
                whiteSpace: "nowrap",
              }}
            >
              {m}
              <span style={{ color: "var(--accent)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
