import Link from "next/link";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { CTASection } from "@/components/CTASection";
import { servicesRegistry } from "@/lib/services/registry";
import { locationsRegistry } from "@/lib/locations/registry";
import type { ServiceContent } from "@/lib/services/types";

export function ServicePage({ service }: { service: ServiceContent }) {
  const cityLocations = locationsRegistry.filter((loc) => loc.level === "city");
  const otherServices = servicesRegistry.filter((s) => s.slug !== service.slug);

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
                  <Link href="/services" data-cursor style={{ color: "var(--muted)" }}>
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span style={{ color: "var(--ink)" }} aria-current="page">
                    {service.title}
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
              {service.title}
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
              {service.shortDesc}
            </p>
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", padding: "0 clamp(20px,5vw,60px)" }}>
            <div data-fade style={{ padding: "56px 0", borderTop: "1px solid var(--line)", marginTop: 56 }}>
              {service.intro.map((para, i) => (
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
                This is a good fit if you&apos;re
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {service.idealFor.map((point) => (
                  <li
                    key={point}
                    style={{
                      display: "flex",
                      gap: 12,
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: "var(--ink)",
                    }}
                  >
                    <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono), monospace" }}>→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

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
                Available Wherever You Are
              </h2>
              <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 14.5, color: "var(--muted)", margin: "0 0 20px" }}>
                We deliver this the same way for businesses in:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {cityLocations.map((loc) => (
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
                Other Services
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    data-cursor
                    className="gx-nav-cta"
                    style={{ fontSize: 12.5 }}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ paddingBottom: 64 }}>
              <CTASection eyebrow={`Ready to get started with ${service.title.toLowerCase()}?`} />
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
