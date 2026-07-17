import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { servicesRegistry } from "@/lib/services/registry";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design and development, branding, applied AI automation, custom software and ongoing support — from GooglixLabs.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services · GooglixLabs",
    description: "Website design, branding, AI automation, custom software and ongoing support.",
    url: "/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ position: "relative", zIndex: 2, padding: "140px clamp(20px,5vw,60px) 60px" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <div
              data-fade
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 20,
              }}
            >
              Services
            </div>
            <h1
              data-fade
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2.2rem,6vw,4rem)",
                lineHeight: 1,
                letterSpacing: "-.035em",
                color: "var(--ink)",
                margin: "0 0 18px",
              }}
            >
              How we{" "}
              <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                help.
              </span>
            </h1>
            <p
              data-fade
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(1rem,1.4vw,1.15rem)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "56ch",
                margin: "0 0 48px",
              }}
            >
              Five ways we help businesses grow online — pick the one that matches where you are
              today.
            </p>

            <div className="gx-tools-grid">
              {servicesRegistry.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  data-cursor
                  data-fade
                  className="gx-tool-card"
                >
                  <h2 className="gx-tool-card-title">{service.title}</h2>
                  <p className="gx-tool-card-desc">{service.shortDesc}</p>
                  <span className="gx-tool-card-cta" style={{ color: "var(--accent)" }}>
                    Learn more ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
