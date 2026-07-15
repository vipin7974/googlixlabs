import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GooglixLabs — Digital Product Studio";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F3EE",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="46" height="46" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10.5" fill="#17181B" />
            <path
              d="M28.6 24.6 A10 10 0 1 1 28.6 15.4"
              fill="none"
              stroke="#F4F3EE"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <path d="M29.2 20 H21.8" stroke="#F4F3EE" strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="30.4" cy="10" r="2.7" fill="#2B5CFF" />
          </svg>
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "#17181B" }}>
            googlixlabs
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 28, fontStyle: "italic", color: "#2B5CFF" }}>
            Digital product studio — Raipur, IN
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.03em", color: "#17181B", lineHeight: 1.05 }}>
            We design &amp; engineer
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.03em", color: "#17181B", lineHeight: 1.05 }}>
            intelligent products.
          </span>
          <span style={{ fontSize: 22, color: "#77776F", marginTop: 8 }}>
            Web &amp; App Engineering · Product &amp; UX Design · Applied AI · SaaS
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#A6A69D",
            borderTop: "1px solid rgba(23,24,27,0.13)",
            paddingTop: 26,
          }}
        >
          <span>googlixlabs.com</span>
          <span>Raipur, India</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
