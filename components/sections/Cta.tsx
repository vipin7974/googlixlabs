import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import Reveal from "../Reveal";

export default function Cta() {
  return (
    <section className="section-pad relative overflow-hidden bg-surface-alt dark:bg-[#0F1226]">
      <div className="blob-bg left-[20%] top-[10%] h-72 w-72 bg-brand-blue/25" />
      <div className="blob-bg right-[15%] bottom-[10%] h-72 w-72 bg-brand-red/20" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      <Reveal className="container-x relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-ink-sec dark:text-slate-300 shadow-soft sm:px-4 sm:py-1.5 sm:text-xs">
          <Sparkles size={12} className="text-brand-yellow" />
          Available for Q3 &amp; Q4 2026 Projects
        </span>

        <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-ink dark:text-white sm:mt-7 sm:text-4xl md:text-5xl lg:text-6xl">
          Let&apos;s Build Something
          <br />
          <span className="gradient-text">Extraordinary</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-sec dark:text-slate-300 sm:mt-6 sm:text-base md:text-lg">
          Whether you&apos;re a startup with a bold vision or an enterprise
          ready to evolve — we&apos;re the team that makes it happen.
        </p>

        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="https://calendly.com/googlixlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group justify-center"
          >
            <Calendar size={16} />
            Book a Discovery Call
          </a>
          <a href="#contact" className="btn-ghost group justify-center">
            Get a Free Quote
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
