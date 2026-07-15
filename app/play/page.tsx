import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import SignalRun from "@/components/game/SignalRun";
import ContactFooter from "@/components/sections/ContactFooter";

export const metadata: Metadata = {
  title: "Play Signal Run — a quick arcade break",
  description:
    "Dodge the bugs, catch the signal. A tiny free browser game from GooglixLabs — no install, no sign-up, just a high score saved in your browser.",
  alternates: { canonical: "/play" },
  openGraph: {
    title: "Signal Run · GooglixLabs",
    description: "Dodge the bugs, catch the signal — a quick arcade break from GooglixLabs.",
    url: "/play",
  },
};

const tips = [
  { n: "01", title: "Jump", desc: "Space, ↑ or tap the game to hop over incoming bugs." },
  { n: "02", title: "Chain packets", desc: "Grab blue signal packets in a row to grow your combo bonus." },
  { n: "03", title: "Survive", desc: "Speed ramps up the longer you last — one hit ends the run." },
];

export default function PlayPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            position: "relative",
            zIndex: 2,
            padding: "140px clamp(20px,5vw,60px) 50px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
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
              (06) — Just for fun
            </div>
            <h1
              data-fade
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2.2rem,6vw,4.2rem)",
                lineHeight: 1,
                letterSpacing: "-.035em",
                color: "var(--ink)",
                margin: "0 0 18px",
              }}
            >
              Dodge the bugs.{" "}
              <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                Catch the signal.
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
                margin: "0 0 44px",
              }}
            >
              A tiny arcade game built by the same studio that ships your next product — because
              shipping great work should also be a little fun. Your high score lives right in this
              browser, no sign-up required.
            </p>
          </div>

          <div data-fade>
            <SignalRun />
          </div>

          <div style={{ maxWidth: 900, margin: "56px auto 0", width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 1,
                background: "var(--line)",
                border: "1px solid var(--line)",
              }}
            >
              {tips.map((t) => (
                <div
                  key={t.n}
                  data-fade
                  style={{ background: "var(--paper)", padding: "clamp(24px,3vw,32px)" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-instrument), serif",
                      fontStyle: "italic",
                      fontSize: "clamp(1.8rem,3vw,2.4rem)",
                      color: "var(--accent)",
                      lineHeight: 1,
                      marginBottom: 16,
                    }}
                  >
                    {t.n}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontWeight: 600,
                      fontSize: 17,
                      letterSpacing: "-.02em",
                      color: "var(--ink)",
                      margin: "0 0 8px",
                    }}
                  >
                    {t.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {t.desc}
                  </p>
                </div>
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
