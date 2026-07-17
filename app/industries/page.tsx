import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { industriesRegistry } from "@/lib/industries/registry";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "GooglixLabs builds websites and digital growth tools for retail, healthcare, education, hospitality, manufacturing and more.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries We Serve · GooglixLabs",
    description: "Website design and digital growth services tailored to your industry.",
    url: "/industries",
  },
};

export default function IndustriesIndexPage() {
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
              Industries We Serve
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
              Built for your{" "}
              <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                industry.
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
              Every industry searches, buys and trusts differently online — here&apos;s how we approach
              each one.
            </p>

            <div className="gx-tools-grid">
              {industriesRegistry.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  data-cursor
                  data-fade
                  className="gx-tool-card"
                >
                  <h2 className="gx-tool-card-title">{industry.name}</h2>
                  <p className="gx-tool-card-desc">{industry.shortDesc}</p>
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
