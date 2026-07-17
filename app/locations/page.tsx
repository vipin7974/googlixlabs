import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { NearestLocation } from "@/components/locations/NearestLocation";
import { locationsRegistry } from "@/lib/locations/registry";

export const metadata: Metadata = {
  title: "Locations We Serve",
  description:
    "GooglixLabs helps businesses build websites and grow online across India, Chhattisgarh, Raipur, Bhilai, Durg, Bilaspur and Nagpur.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Locations We Serve · GooglixLabs",
    description: "Website design and digital growth services across India, Chhattisgarh and neighbouring cities.",
    url: "/locations",
  },
};

const LEVEL_LABEL: Record<string, string> = {
  country: "Country",
  state: "State",
  city: "City",
};

export default function LocationsIndexPage() {
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
              Locations We Serve
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
              Wherever your{" "}
              <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                business is.
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
              We&apos;re based in Raipur, Chhattisgarh, and work with businesses across the region and
              beyond.
            </p>

            <NearestLocation />

            <div className="gx-tools-grid">
              {locationsRegistry.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  data-cursor
                  data-fade
                  className="gx-tool-card"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    {LEVEL_LABEL[location.level]}
                  </span>
                  <h2 className="gx-tool-card-title">{location.name}</h2>
                  <p className="gx-tool-card-desc">{location.heroSubheading}</p>
                  <span className="gx-tool-card-cta" style={{ color: "var(--accent)" }}>
                    View page ↗
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
