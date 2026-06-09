"use client";

import { ArrowUpRight, ArrowRight, Sparkles, Zap, Bot, Palette, Cloud, Smartphone } from "lucide-react";

// Floating chips are positioned within the Hero section. We avoid the top 96px
// (navbar height + breathing room) and the center text column, so they decorate
// the left/right edges without overlapping content.
const chips = [
  { label: "Next.js 15",   Icon: Zap,        color: "from-brand-blue/15 to-brand-purple/15 text-brand-blue",    pos: "left-[4%]  top-[28%]" },
  { label: "AI Powered",   Icon: Bot,        color: "from-brand-green/15 to-brand-cyan/15 text-emerald-600",   pos: "right-[4%] top-[24%]" },
  { label: "UI/UX Design", Icon: Palette,    color: "from-brand-red/15 to-brand-yellow/15 text-brand-red",      pos: "left-[6%]  bottom-[22%]" },
  { label: "Cloud Native", Icon: Cloud,      color: "from-brand-yellow/20 to-brand-red/15 text-amber-600",      pos: "right-[6%] bottom-[20%]" },
  { label: "Mobile First", Icon: Smartphone, color: "from-brand-purple/15 to-brand-blue/15 text-brand-purple",  pos: "left-[8%]  top-[55%]" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-soft-radial pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32"
    >
      {/* Decorative blobs */}
      <div className="blob-bg left-[-10%] top-[10%] h-80 w-80 bg-brand-blue/35" />
      <div className="blob-bg right-[-10%] top-[20%] h-96 w-96 bg-brand-red/25" />
      <div className="blob-bg left-[30%] bottom-[-10%] h-72 w-72 bg-brand-yellow/25" />

      {/* Floating chips */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {chips.map((c) => (
          <div
            key={c.label}
            className={`absolute ${c.pos} animate-float`}
            style={{ animationDelay: `${Math.random() * 2}s` }}
          >
            <div
              className={`flex items-center gap-2 rounded-full border border-black/5 bg-gradient-to-br ${c.color} bg-white/85 px-4 py-2 text-xs font-semibold shadow-card backdrop-blur dark:border-white/10 dark:bg-white/10`}
            >
              <c.Icon size={14} />
              {c.label}
            </div>
          </div>
        ))}
      </div>

      <div className="container-x relative z-10 text-center">
        {/* Badge */}
        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[11px] font-medium shadow-soft backdrop-blur sm:mb-7 sm:gap-3 sm:px-4 sm:py-2 sm:text-xs dark:border-white/10 dark:bg-white/[0.06]">
          <span className="relative grid h-2 w-2 flex-shrink-0 place-items-center">
            <span className="absolute inset-0 animate-pulse-dot rounded-full bg-brand-green" />
            <span className="relative h-2 w-2 rounded-full bg-brand-green" />
          </span>
          <span className="text-ink dark:text-white">Available for Projects</span>
          <span className="hidden h-3 w-px bg-black/10 dark:bg-white/15 sm:block" />
          <span className="hidden text-ink-sec dark:text-slate-300 sm:inline">50+ Products Shipped</span>
        </div>

        {/* H1 */}
        <h1 className="font-display text-[36px] font-extrabold leading-[1.08] tracking-tight text-ink dark:text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px]">
          Building Intelligent
          <br />
          <span className="gradient-text">Digital Experiences</span>
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-sec dark:text-slate-300 sm:mt-7 sm:text-lg md:text-xl">
          Full Stack Development, UI/UX Design &amp; AI Solutions for modern
          businesses. We turn complex ideas into products people love.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <a href="#contact" className="btn-primary group justify-center">
            Start a Project
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#projects" className="btn-ghost group justify-center">
            View Our Work
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </a>
        </div>

        {/* Sparkle stat row */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-sec dark:text-slate-300 sm:mt-16 sm:gap-x-10 sm:gap-y-4 sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2"><Sparkles size={12} className="text-brand-blue sm:hidden" /><Sparkles size={14} className="hidden text-brand-blue sm:block" /> 50+ Products</div>
          <div className="hidden h-3 w-px bg-black/10 dark:bg-white/15 sm:block" />
          <div className="flex items-center gap-1.5 sm:gap-2"><Sparkles size={12} className="text-brand-red sm:hidden" /><Sparkles size={14} className="hidden text-brand-red sm:block" /> 15+ Clients</div>
          <div className="hidden h-3 w-px bg-black/10 dark:bg-white/15 sm:block" />
          <div className="flex items-center gap-1.5 sm:gap-2"><Sparkles size={12} className="text-brand-green sm:hidden" /><Sparkles size={14} className="hidden text-brand-green sm:block" /> 99% Satisfaction</div>
        </div>
      </div>
    </section>
  );
}
