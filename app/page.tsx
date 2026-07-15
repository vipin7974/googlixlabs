import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Studio from "@/components/sections/Studio";
import Work from "@/components/sections/Work";
import Capabilities from "@/components/sections/Capabilities";
import Approach from "@/components/sections/Approach";
import ContactFooter from "@/components/sections/ContactFooter";

const ACCENT = "#2B5CFF";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero accent={ACCENT} />
        <Marquee />
        <Studio />
        <Work accent={ACCENT} />
        <Capabilities />
        <Approach />
        <ContactFooter />
      </main>
      <Interactions />
    </>
  );
}
