import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import FlowCanvas from "@/components/FlowCanvas";
import ContactFooter from "@/components/sections/ContactFooter";
import { NearestLocation } from "@/components/locations/NearestLocation";
import { getHeadquartersLocation, getLocationBySlug, locationsRegistry } from "@/lib/locations/registry";
import type { LocationContent } from "@/lib/locations/types";
import { hexA } from "@/lib/hex";

export const metadata: Metadata = {
  title: "Locations We Serve",
  description:
    "GooglixLabs helps businesses build websites and grow online across every city, state and country we serve — find your location.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Locations We Serve · GooglixLabs",
    description: "Website design and digital growth services across every location we serve.",
    url: "/locations",
  },
};

function resolveChildren(location: LocationContent): LocationContent[] {
  return (location.childSlugs ?? [])
    .map((slug) => getLocationBySlug(slug))
    .filter((loc): loc is LocationContent => loc !== undefined);
}

export default function LocationsIndexPage() {
  const countries = locationsRegistry.filter((loc) => loc.level === "country");
  const hq = getHeadquartersLocation();

  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            position: "relative",
            zIndex: 2,
            overflow: "hidden",
            minHeight: "clamp(480px,48vw,620px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "140px clamp(20px,5vw,60px) 60px",
          }}
        >
          <FlowCanvas heightCss="100%" />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1300, margin: "0 auto", width: "100%" }}>
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
              <span className="gx-mask">
                <span>
                  Wherever your{" "}
                  <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                    business is.
                  </span>
                </span>
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

            {hq && (
              <div data-fade style={{ marginBottom: 44 }}>
                <Link
                  href={`/locations/${hq.slug}`}
                  data-cursor
                  data-magnetic
                  className="gx-nav-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 13,
                    border: "1px solid var(--line)",
                    borderRadius: 100,
                    padding: "9px 16px",
                    borderColor: hexA(hq.accent, 0.4),
                  }}
                >
                  Our home base: {hq.name} ↗
                </Link>
              </div>
            )}

            {countries.map((country) => {
              const states = resolveChildren(country);
              return (
                <div key={country.slug} data-fade style={{ marginBottom: 48 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
                    <h2 className="gx-tool-card-title" style={{ margin: 0 }}>
                      {country.name}
                    </h2>
                    <Link
                      href={`/locations/${country.slug}`}
                      data-cursor
                      data-magnetic
                      style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12.5, color: "var(--accent)" }}
                    >
                      View {country.name} page ↗
                    </Link>
                  </div>

                  <div className="gx-tools-grid">
                    {states.map((state) => {
                      const cities = resolveChildren(state);
                      const cityPreview = cities
                        .slice(0, 3)
                        .map((city) => city.name)
                        .join(", ");
                      return (
                        <Link
                          key={state.slug}
                          href={`/locations/${state.slug}`}
                          data-cursor
                          data-magnetic
                          data-fade
                          className="gx-tool-card"
                          style={{ borderTop: `3px solid ${state.accent}` }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-mono), monospace",
                              fontSize: 11,
                              letterSpacing: ".05em",
                              textTransform: "uppercase",
                              color: state.accent,
                            }}
                          >
                            State
                          </span>
                          <h3 className="gx-tool-card-title">{state.name}</h3>
                          <p className="gx-tool-card-desc">
                            {cities.length === 0
                              ? "No cities listed yet."
                              : `${cities.length} ${cities.length === 1 ? "city" : "cities"} — ${cityPreview}${
                                  cities.length > 3 ? "…" : ""
                                }`}
                          </p>
                          <span className="gx-tool-card-cta" style={{ color: state.accent }}>
                            View {state.name} ↗
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
