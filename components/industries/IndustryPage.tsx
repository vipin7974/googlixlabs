import Link from "next/link";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { CTASection } from "@/components/CTASection";
import { getLocationsForIndustry } from "@/lib/locations/registry";
import { industriesRegistry } from "@/lib/industries/registry";
import type { IndustryContent } from "@/lib/industries/types";

export function IndustryPage({ industry }: { industry: IndustryContent }) {
  const servedLocations = getLocationsForIndustry(industry.slug);
  const otherIndustries = industriesRegistry.filter((i) => i.slug !== industry.slug).slice(0, 6);

  return (
    <>
      <Nav />
      <main>
        <section style={{ position: "relative", zIndex: 2, padding: "140px clamp(20px,5vw,60px) 0" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
            <nav aria-label="Breadcrumb" data-fade style={{ marginBottom: 26 }}>
              <ol
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                <li>
                  <Link href="/" data-cursor style={{ color: "var(--muted)" }}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/industries" data-cursor style={{ color: "var(--muted)" }}>
                    Industries
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span style={{ color: "var(--ink)" }} aria-current="page">
                    {industry.name}
                  </span>
                </li>
              </ol>
            </nav>

            <h1
              data-fade
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2rem,5vw,3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-.03em",
                color: "var(--ink)",
                margin: "0 0 20px",
              }}
            >
              {industry.name}
            </h1>
            <p
              data-fade
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(1rem,1.4vw,1.1rem)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "58ch",
                margin: 0,
              }}
            >
              {industry.shortDesc}
            </p>
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", padding: "0 clamp(20px,5vw,60px)" }}>
            <div data-fade style={{ padding: "56px 0", borderTop: "1px solid var(--line)", marginTop: 56 }}>
              {industry.body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    margin: "0 0 14px",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {servedLocations.length > 0 ? (
              <div data-fade style={{ paddingBottom: 56 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.4rem,3vw,1.9rem)",
                    color: "var(--ink)",
                    margin: "0 0 20px",
                  }}
                >
                  Where We Serve This Industry
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {servedLocations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      data-cursor
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        color: "var(--muted)",
                        border: "1px solid var(--line)",
                        borderRadius: 100,
                        padding: "8px 16px",
                      }}
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div data-fade style={{ paddingBottom: 56 }}>
              <h2
                style={{
                  fontFamily: "var(--font-bricolage), sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem,3vw,1.9rem)",
                  color: "var(--ink)",
                  margin: "0 0 20px",
                }}
              >
                Other Industries
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {otherIndustries.map((i) => (
                  <Link key={i.slug} href={`/industries/${i.slug}`} data-cursor className="gx-nav-cta" style={{ fontSize: 12.5 }}>
                    {i.name}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ paddingBottom: 64 }}>
              <CTASection eyebrow={`Ready to grow your ${industry.name.toLowerCase()} business online?`} />
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
