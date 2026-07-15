import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "80px 24px",
        background: "var(--paper)",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-instrument), serif",
            fontStyle: "italic",
            fontSize: "clamp(4rem,14vw,8rem)",
            color: "var(--accent)",
            lineHeight: 1,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.6rem,4vw,2.4rem)",
            letterSpacing: "-.03em",
            color: "var(--ink)",
            margin: "18px 0 10px",
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: "36ch",
            margin: "0 auto",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back home.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 32 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 100,
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
            }}
          >
            Back to home
          </Link>
          <Link
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 100,
              border: "1px solid var(--line)",
              color: "var(--ink)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
            }}
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
