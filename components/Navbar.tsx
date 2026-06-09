"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-soft dark:bg-[#08091A]/85 dark:border-white/5"
            : "bg-white/60 backdrop-blur-md border-b border-transparent dark:bg-[#08091A]/60"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between sm:h-[68px]">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-sec transition hover:bg-surface-alt hover:text-ink dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-blue-300"
            >
              Contact
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple px-5 py-2.5 text-sm font-semibold text-white shadow-brand-blue transition hover:-translate-y-0.5"
            >
              Start a Project <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt text-ink lg:hidden dark:bg-white/10 dark:text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top transition-all duration-300 sm:top-[68px] lg:hidden ${
          open
            ? "scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        <div className="mx-3 mt-2 max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden rounded-2xl border border-black/5 bg-white/95 p-3 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-[#0F1226]/95">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink-sec transition hover:bg-surface-alt hover:text-ink dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple px-5 py-3.5 text-sm font-semibold text-white"
            >
              Start a Project <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
