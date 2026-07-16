export function CTASection() {
  return (
    <section className="gx-tool-cta" data-fade>
      <p className="gx-tool-cta-eyebrow">Want professionals to build this for you?</p>
      <h2 className="gx-tool-cta-heading">
        Book a free 30-minute{" "}
        <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
          consultation.
        </span>
      </h2>
      <a href="/#contact" data-cursor data-magnetic className="gx-nav-cta gx-tool-cta-btn">
        Book Now
      </a>
    </section>
  );
}
