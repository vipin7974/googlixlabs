"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Reveal from "../Reveal";

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most projects range from 4–12 weeks depending on complexity. A landing page or MVP takes 3–4 weeks. A full SaaS platform typically takes 8–12 weeks. We provide detailed timelines in our proposal.",
  },
  {
    q: "What is your pricing structure?",
    a: "We offer fixed-price projects for well-defined scopes and retainer packages for ongoing work. Projects start at ₹50K for design and ₹1L for development. We provide transparent quotes with no hidden fees.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes — all projects include a 30-day free support period post-launch. We also offer monthly maintenance retainers covering bug fixes, updates, performance monitoring, and feature additions.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We frequently collaborate with in-house teams as an extension, handling specific verticals like UI/UX or AI integration while you manage core development. We adapt to your workflow.",
  },
  {
    q: "How do you handle revisions and feedback?",
    a: "We follow an agile process with weekly check-ins and demo sessions. All projects include unlimited revision rounds within scope. We use Figma for design feedback and GitHub for code reviews.",
  },
  {
    q: "What technologies do you specialise in?",
    a: "Our core stack is Next.js, React, TypeScript, Node.js, PostgreSQL, and AWS. For AI, we use OpenAI, LangChain, and custom ML models. We're framework-agnostic and can adapt to your stack.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-pad relative bg-surface-alt dark:bg-[#0F1226]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Got Questions?</span>
          <h2 className="section-title mt-4 sm:mt-5">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-sub mx-auto">
            Everything you need to know before we start building something
            extraordinary together.
          </p>
        </Reveal>

        <div className="mx-auto mt-8 max-w-3xl space-y-2.5 sm:mt-12 sm:space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 40}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 dark:bg-white/[0.04] ${
                    isOpen
                      ? "border-brand-blue/30 shadow-card dark:border-brand-blue/40"
                      : "border-black/5 shadow-soft dark:border-white/10 dark:shadow-none"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
                  >
                    <span className="font-display text-[15px] font-bold text-ink dark:text-white sm:text-base md:text-lg">
                      {item.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-white transition sm:h-9 sm:w-9 ${
                        isOpen
                          ? "bg-gradient-to-r from-brand-blue to-brand-purple"
                          : "bg-ink/80 dark:bg-white/15"
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 text-[13px] leading-relaxed text-ink-sec dark:text-slate-300 sm:px-6 sm:pb-6 sm:text-sm">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
