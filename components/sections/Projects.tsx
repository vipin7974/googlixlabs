"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import Reveal from "../Reveal";
import { projects, projectCategories, type ProjectCategory } from "@/lib/projects";

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category.includes(active as any));
  }, [active]);

  return (
    <section id="projects" className="section-pad relative overflow-hidden bg-white dark:bg-[#08091A]">
      {/* faint backdrop */}
      <div className="blob-bg right-[-10%] top-[10%] h-80 w-80 bg-brand-purple/20" />
      <div className="blob-bg left-[-10%] bottom-[10%] h-80 w-80 bg-brand-yellow/20" />

      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Featured Work</span>
          <h2 className="mt-4 font-display text-[26px] font-bold leading-[1.15] tracking-tight text-ink dark:text-white [text-wrap:balance] sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
            Products We&apos;re <span className="gradient-text">Proud Of</span>
          </h2>
          <p className="section-sub mx-auto">
            From live pharmaceutical websites to inventory platforms and apps
            for building developers — here&apos;s a slice of what we ship.
          </p>
        </Reveal>

        {/* Filters — horizontally scrollable on small screens */}
        <div className="relative mt-7 sm:mt-10">
          <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 h-scroll sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider transition sm:px-4 sm:text-xs ${
                  active === cat
                    ? "bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-brand-blue"
                    : "border border-black/10 bg-white text-ink-sec hover:border-brand-blue hover:text-brand-blue dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:text-blue-300"
                }`}
              >
                {cat === "RealEstate" ? "Real Estate" : cat}
              </button>
            ))}
          </div>
          {/* mobile scroll fade hint */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:hidden dark:from-[#08091A]" />
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const isExternal = p.url.startsWith("http");
            return (
              <Reveal key={p.slug} delay={i * 60}>
                <a
                  href={p.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  {/* Thumb */}
                  <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${p.accent}`}>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-6xl drop-shadow-sm transition-transform duration-500 group-hover:scale-110 sm:text-7xl">
                        {p.emoji}
                      </div>
                    </div>

                    {/* live badge */}
                    {p.live && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700 shadow-sm ring-1 ring-emerald-200 sm:left-4 sm:top-4 sm:px-2.5 sm:text-[10px]">
                        <span className="relative grid h-1.5 w-1.5 place-items-center">
                          <span className="absolute inset-0 animate-pulse-dot rounded-full bg-emerald-500" />
                          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Live Site
                      </span>
                    )}

                    {/* overlay CTA */}
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-card dark:bg-[#11142B] dark:text-white">
                        {p.live ? (
                          <>Visit Live Site <ExternalLink size={14} /></>
                        ) : (
                          <>Discuss Project <ArrowUpRight size={14} /></>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {p.category.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:text-[10px] ${p.bgTint} ${p.textColor}`}
                        >
                          {c === "RealEstate" ? "Real Estate" : c}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-ink dark:text-white sm:mt-3 sm:text-lg md:text-xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500 sm:text-[11px]">
                      {p.client}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-sec dark:text-slate-300 line-clamp-3 sm:mt-3 sm:text-sm">
                      {p.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 text-[13px] sm:mt-6 sm:pt-4 sm:text-sm dark:border-white/10">
                      {p.live ? (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-brand-blue uline">
                          Visit Site <ExternalLink size={14} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-brand-purple uline">
                          Get a Quote <MessageSquare size={14} />
                        </span>
                      )}
                      <ArrowUpRight size={16} className="text-ink-muted dark:text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-8 max-w-md text-center text-[11px] leading-relaxed text-ink-muted sm:mt-10 sm:max-w-none sm:text-xs dark:text-slate-500">
          Live sites open in a new tab. Internal &amp; under-NDA projects can be
          shared on request — <a href="#contact" className="text-brand-blue uline">get in touch</a>.
        </p>
      </div>
    </section>
  );
}
