import Link from "next/link";
import { socials } from "@/lib/content";
import { getFeaturedLocations } from "@/lib/locations/registry";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "clamp(80px,12vw,150px) clamp(20px,5vw,60px) 40px",
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
            color: "rgba(244,243,238,.5)",
            margin: "0 0 clamp(30px,4vw,48px)",
          }}
        >
          (06) — Let&apos;s talk
        </h2>

        <a
          href="mailto:googlixlabs@gmail.com"
          data-cursor
          data-magnetic
          style={{
            display: "block",
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(2.4rem,9vw,7.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-.04em",
            margin: "0 0 clamp(40px,6vw,70px)",
          }}
        >
          Start a{" "}
          <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
            project
          </span>{" "}
          ↗
        </a>

        <div
          className="gx-foot-grid"
          style={{
            display: "grid",
            gap: 36,
            borderTop: "1px solid rgba(244,243,238,.16)",
            paddingTop: 44,
          }}
        >
          <div data-fade>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "rgba(244,243,238,.4)",
                marginBottom: 14,
              }}
            >
              Email
            </div>
            <a href="mailto:googlixlabs@gmail.com" data-cursor style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 15 }}>
              googlixlabs@gmail.com
            </a>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "rgba(244,243,238,.4)",
                margin: "22px 0 14px",
              }}
            >
              Phone
            </div>
            <a href="tel:+917000498574" data-cursor style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 15 }}>
              +91 70004 98574
            </a>
          </div>

          <div data-fade>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "rgba(244,243,238,.4)",
                marginBottom: 14,
              }}
            >
              Studio
            </div>
            <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 15, lineHeight: 1.6, color: "rgba(244,243,238,.75)", margin: 0, maxWidth: "26ch" }}>
              Raipur, Chhattisgarh
              <br />
              India — working worldwide
            </p>
          </div>

          <div data-fade>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "rgba(244,243,238,.4)",
                marginBottom: 14,
              }}
            >
              Social
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  data-cursor
                  className="gx-social-link"
                  style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 15 }}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div data-fade>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "rgba(244,243,238,.4)",
                marginBottom: 14,
              }}
            >
              Locations
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 10px" }}>
              {getFeaturedLocations().map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  data-cursor
                  className="gx-social-link"
                  style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 14 }}
                >
                  {location.name}
                </Link>
              ))}
              <Link
                href="/locations"
                data-cursor
                className="gx-social-link"
                style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 14 }}
              >
                All locations ↗
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            marginTop: 60,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11.5,
            color: "rgba(244,243,238,.4)",
          }}
        >
          <span>© {new Date().getFullYear()} GooglixLabs</span>
          <span>Designed &amp; engineered in Raipur, India</span>
        </div>
      </div>
    </footer>
  );
}
