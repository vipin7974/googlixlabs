import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollControls from "@/components/ScrollControls";

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Cta from "@/components/sections/Cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Services />
        <About />
        <Projects />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
        <Cta />
      </main>
      <Footer />
      <ScrollControls />
    </>
  );
}
