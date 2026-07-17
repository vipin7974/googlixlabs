import Link from "next/link";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import FlowCanvas from "@/components/FlowCanvas";
import Cube3D from "@/components/Cube3D";
import ContactFooter from "@/components/sections/ContactFooter";
import { CTASection } from "@/components/CTASection";
import { ToolCard } from "@/components/tools/ToolCard";
import { getToolBySlug } from "@/lib/tools/registry";
import { locationsRegistry } from "@/lib/locations/registry";
import type { LocationContent, LocationFaq } from "@/lib/locations/types";
import type { ToolMeta } from "@/lib/tools/types";
import { servicesRegistry } from "@/lib/services/registry";
import { getIndustryBySlug } from "@/lib/industries/registry";
import { buildDigitalGrowthReport } from "@/lib/locations/digital-report";
import { hexA } from "@/lib/hex";
import { Breadcrumb } from "./Breadcrumb";

const FEATURED_TOOL_SLUGS = ["website-cost-calculator", "digital-score", "roi-calculator", "qr-generator"];

const eyebrowStyle = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 12,
  letterSpacing: ".06em",
  textTransform: "uppercase" as const,
  color: "var(--muted)",
};

const sectionHeadingStyle = {
  fontFamily: "var(--font-bricolage), sans-serif",
  fontWeight: 600,
  fontSize: "clamp(1.6rem,3.4vw,2.3rem)",
  letterSpacing: "-.03em",
  color: "var(--ink)",
  margin: "0 0 20px",
};

const bodyTextStyle = {
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: 15,
  lineHeight: 1.7,
  color: "var(--muted)",
  margin: "0 0 14px",
};

const tagLinkStyle = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 11.5,
  color: "var(--muted)",
  border: "1px solid var(--line)",
  borderRadius: 100,
  padding: "6px 14px",
};

/**
 * `.gx-nav-cta` (globals.css) only defines color + hover transition — the
 * actual pill/button look (border, radius, padding, inline-flex) comes
 * from inline styles wherever it's used (see Nav.tsx's real CTA button).
 * The location pills were using the className alone, which is why they
 * rendered as plain text instead of buttons.
 */
const pillButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  fontFamily: "var(--font-mono), monospace",
  fontSize: 13,
  border: "1px solid var(--line)",
  borderRadius: 100,
  padding: "9px 16px",
};

/** Prose paragraphs (About/Why/report intro) get a readable line-length cap — the wider 1300px page container is meant for grids and cards, not 100+ character lines of running text. */
const proseTextStyle = { ...bodyTextStyle, maxWidth: "68ch" };

const inlineLinkRowStyle = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 12.5,
  color: "var(--accent)",
};

const reportCardTitleStyle = {
  fontFamily: "var(--font-bricolage), sans-serif",
  fontWeight: 600,
  fontSize: 15.5,
  color: "var(--ink)",
};

const reportListStyle = {
  margin: "4px 0 0",
  padding: "0 0 0 18px",
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "var(--muted)",
};

const CHILD_LABEL: Record<string, string> = {
  country: "Explore by State",
  state: "Explore by City",
};

/**
 * Renders an FAQ answer as plain text, unless it names a specific tool
 * (`linkText`/`relatedToolSlug`), in which case that exact substring
 * becomes a real link — inherits the surrounding text color so it's
 * visually identical to plain text until hovered.
 */
function renderFaqAnswer(faq: LocationFaq) {
  if (!faq.linkText || !faq.relatedToolSlug) return faq.answer;
  const index = faq.answer.indexOf(faq.linkText);
  if (index === -1) return faq.answer;

  const before = faq.answer.slice(0, index);
  const after = faq.answer.slice(index + faq.linkText.length);
  return (
    <>
      {before}
      <Link href={`/tools/${faq.relatedToolSlug}`} data-cursor>
        {faq.linkText}
      </Link>
      {after}
    </>
  );
}

export function LocationPage({ location }: { location: LocationContent }) {
  const relatedLocations = location.relatedSlugs
    .map((slug) => locationsRegistry.find((loc) => loc.slug === slug))
    .filter((loc): loc is LocationContent => loc !== undefined);

  const childLocations = (location.childSlugs ?? [])
    .map((slug) => locationsRegistry.find((loc) => loc.slug === slug))
    .filter((loc): loc is LocationContent => loc !== undefined);

  const featuredTools = FEATURED_TOOL_SLUGS.map((slug) => getToolBySlug(slug)).filter(
    (tool): tool is ToolMeta => tool !== undefined
  );

  // Only link the parent in the breadcrumb if it's a real page in our
  // registry — Nagpur's parentName is "Maharashtra", which we don't model
  // as a location page, so its breadcrumb correctly stops at Locations.
  const parentLocation = location.parentSlug ? locationsRegistry.find((loc) => loc.slug === location.parentSlug) : undefined;

  const report = buildDigitalGrowthReport(location);
  const hasReport = report.challenges.length > 0 || report.nextSteps.length > 0;
  const accentTagStyle = { ...tagLinkStyle, border: `1px solid ${hexA(location.accent, 0.35)}` };

  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            position: "relative",
            zIndex: 2,
            overflow: "hidden",
            minHeight: "clamp(520px,56vw,700px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "140px clamp(20px,5vw,60px) 60px",
          }}
        >
          <FlowCanvas accent={location.accent} heightCss="100%" />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1300, margin: "0 auto", width: "100%" }}>
            <Cube3D accent={location.accent} />

            <div data-fade style={{ marginBottom: 26 }}>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Locations", href: "/locations" },
                  ...(parentLocation ? [{ label: parentLocation.name, href: `/locations/${parentLocation.slug}` }] : []),
                  { label: location.name },
                ]}
              />
            </div>

            <div data-fade style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: location.accent,
                  animation: "gxBlink 2.4s infinite",
                }}
              />
              <span style={eyebrowStyle}>{location.heroEyebrow}</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2.2rem,6vw,4rem)",
                lineHeight: 1.05,
                letterSpacing: "-.035em",
                color: "var(--ink)",
                margin: "0 0 20px",
              }}
            >
              <span className="gx-mask">
                <span>
                  {location.heroHeadingPlain}{" "}
                  <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                    {location.heroHeadingAccent}
                  </span>
                </span>
              </span>
            </h1>

            <p data-fade style={{ ...bodyTextStyle, fontSize: "clamp(1rem,1.4vw,1.1rem)", maxWidth: "58ch" }}>
              {location.heroSubheading}
            </p>
          </div>
        </section>

        <div style={{ maxWidth: 1300, margin: "0 auto", width: "100%", padding: "0 clamp(20px,5vw,60px)" }}>
          {/* About */}
          <section data-fade style={{ padding: "56px 0", borderTop: "1px solid var(--line)", marginTop: 56 }}>
            <h2 style={sectionHeadingStyle}>{location.aboutHeading}</h2>
            {location.aboutBody.map((para, i) => (
              <p key={i} style={proseTextStyle}>
                {para}
              </p>
            ))}
          </section>

          {/* Why websites */}
          <section data-fade style={{ padding: "0 0 56px" }}>
            <h2 style={sectionHeadingStyle}>{location.whyHeading}</h2>
            {location.whyBody.map((para, i) => (
              <p key={i} style={proseTextStyle}>
                {para}
              </p>
            ))}
          </section>

          {/* Digital Growth Report — genuinely useful, not just SEO copy */}
          {hasReport && (
            <section data-fade style={{ padding: "0 0 56px" }}>
              <h2 style={sectionHeadingStyle}>Free Digital Growth Report — {location.name}</h2>
              <p style={proseTextStyle}>
                A quick, honest snapshot of what typically holds {location.name} businesses back online, based on
                the industries we see most here — and what to do about it.
              </p>

              <div className="gx-result-grid" style={{ marginTop: 8 }}>
                {report.challenges.length > 0 && (
                  <div className="gx-result-card" style={{ borderTop: `3px solid ${location.accent}` }}>
                    <span style={reportCardTitleStyle}>Common Online Visibility Challenges</span>
                    <ul style={reportListStyle}>
                      {report.challenges.map((challenge) => (
                        <li key={challenge}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {report.nextSteps.length > 0 && (
                  <div className="gx-result-card" style={{ borderTop: `3px solid ${location.accent}` }}>
                    <span style={reportCardTitleStyle}>Suggested Next Steps</span>
                    <ul style={reportListStyle}>
                      {report.nextSteps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {report.recommendedTools.length > 0 && (
                <>
                  <p style={{ ...bodyTextStyle, marginTop: 24 }}>
                    Recommended free tools for {location.name} businesses in these industries:
                  </p>
                  <div className="gx-tools-grid">
                    {report.recommendedTools.map((tool) => (
                      <ToolCard key={tool.slug} tool={tool} />
                    ))}
                  </div>
                </>
              )}
            </section>
          )}

          {/* Strict hierarchy: country -> states, state -> cities */}
          {childLocations.length > 0 && (
            <section data-fade style={{ padding: "0 0 56px" }}>
              <h2 style={sectionHeadingStyle}>{CHILD_LABEL[location.level] ?? "Explore"}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {childLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    data-cursor
                    data-magnetic
                    className="gx-nav-cta"
                    style={{ ...pillButtonStyle, borderColor: hexA(loc.accent, 0.4) }}
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Industries */}
          <section data-fade style={{ padding: "0 0 56px" }}>
            <h2 style={sectionHeadingStyle}>Industries We Serve</h2>
            <p style={bodyTextStyle}>{location.industriesIntro}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              {location.industries.map((tag, i) => {
                const industry = getIndustryBySlug(tag.slug);
                return industry ? (
                  <Link key={`${tag.slug}-${i}`} href={`/industries/${industry.slug}`} data-cursor style={accentTagStyle}>
                    {tag.label}
                  </Link>
                ) : (
                  <span key={`${tag.slug}-${i}`} style={accentTagStyle}>
                    {tag.label}
                  </span>
                );
              })}
            </div>
            <Link href="/industries" data-cursor style={{ ...inlineLinkRowStyle, display: "inline-block", marginTop: 16 }}>
              View all industries ↗
            </Link>
          </section>

          {/* Services */}
          <section data-fade style={{ padding: "0 0 56px" }}>
            <h2 style={sectionHeadingStyle}>How We Help</h2>
            <p style={bodyTextStyle}>{location.servicesIntro}</p>
            <div className="gx-result-grid" style={{ marginTop: 8 }}>
              {servicesRegistry.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} data-cursor className="gx-result-card" style={{ gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontWeight: 600,
                      fontSize: 15.5,
                      color: "var(--ink)",
                    }}
                  >
                    {service.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>
                    {service.shortDesc}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/services" data-cursor style={{ ...inlineLinkRowStyle, display: "inline-block", marginTop: 16 }}>
              View all services ↗
            </Link>
          </section>

          {/* Benefits */}
          <section data-fade style={{ padding: "0 0 56px" }}>
            <h2 style={sectionHeadingStyle}>Why Work With GooglixLabs</h2>
            <div className="gx-result-grid">
              {location.benefits.map((benefit) => (
                <div key={benefit.title} className="gx-result-card" style={{ gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontWeight: 600,
                      fontSize: 15.5,
                      color: "var(--ink)",
                    }}
                  >
                    {benefit.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>
                    {benefit.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Free tools */}
          <section data-fade style={{ padding: "0 0 56px" }}>
            <h2 style={sectionHeadingStyle}>Try Our Free Tools</h2>
            <p style={bodyTextStyle}>
              Not sure where to start? These free tools give you a real answer in a couple of
              minutes — no sign-up, no obligation.
            </p>
            <div className="gx-tools-grid">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
            <Link href="/tools" data-cursor style={{ ...inlineLinkRowStyle, display: "inline-block", marginTop: 16 }}>
              View all tools ↗
            </Link>
          </section>

          {/* FAQs */}
          <section data-fade style={{ padding: "0 0 56px" }}>
            <h2 style={sectionHeadingStyle}>Frequently Asked Questions</h2>
            <div style={{ borderTop: "1px solid var(--line)" }}>
              {location.faqs.map((faq) => (
                <div key={faq.question} style={{ borderBottom: "1px solid var(--line)", padding: "22px 0" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "var(--ink)",
                      margin: "0 0 8px",
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p style={{ ...bodyTextStyle, margin: 0 }}>{renderFaqAnswer(faq)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Lateral cross-links: sibling cities / nearby hub */}
          {relatedLocations.length > 0 && (
            <section data-fade style={{ padding: "0 0 56px" }}>
              <h2 style={sectionHeadingStyle}>Also Serving Nearby</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {relatedLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    data-cursor
                    data-magnetic
                    className="gx-nav-cta"
                    style={{ ...pillButtonStyle, borderColor: hexA(loc.accent, 0.4) }}
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Explore GooglixLabs: portfolio, case studies, contact */}
          <section data-fade style={{ padding: "0 0 56px" }}>
            <h2 style={sectionHeadingStyle}>Explore GooglixLabs</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link href="/#work" data-cursor data-magnetic className="gx-nav-cta" style={pillButtonStyle}>
                Portfolio ↗
              </Link>
              <Link href="/#work" data-cursor data-magnetic className="gx-nav-cta" style={pillButtonStyle}>
                Case Studies ↗
              </Link>
              <Link href="/#contact" data-cursor data-magnetic className="gx-nav-cta" style={pillButtonStyle}>
                Contact ↗
              </Link>
            </div>
          </section>

          <div style={{ paddingBottom: 64 }}>
            <CTASection eyebrow={`Ready to grow your ${location.name} business online?`} />
          </div>
        </div>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
