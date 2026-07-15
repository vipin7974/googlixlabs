"use client";

import { useEffect } from "react";
import { navLinks } from "@/lib/content";

export default function Nav() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const upd = () => {
      if (!nav) return;
      if (window.scrollY > 20) {
        nav.style.background = "rgba(244,243,238,.82)";
        nav.style.backdropFilter = "blur(14px)";
        nav.style.borderBottomColor = "var(--line)";
        nav.style.padding = "14px clamp(20px,5vw,60px)";
      } else {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        nav.style.borderBottomColor = "transparent";
        nav.style.padding = "22px clamp(20px,5vw,60px)";
      }
    };
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    return () => window.removeEventListener("scroll", upd);
  }, []);

  return (
    <nav
      id="nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px clamp(20px,5vw,60px)",
        transition: "padding .4s,background .4s,backdrop-filter .4s,border-color .4s",
        borderBottom: "1px solid transparent",
      }}
    >
      <a
        href="#top"
        data-cursor
        aria-label="GooglixLabs home"
        style={{ display: "flex", alignItems: "center", gap: 11 }}
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="37" height="37" rx="10.5" fill="var(--ink)" />
          <path
            d="M28.6 24.6 A10 10 0 1 1 28.6 15.4"
            fill="none"
            stroke="var(--paper)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path d="M29.2 20 H21.8" stroke="var(--paper)" strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="30.4" cy="10" r="2.7" fill="var(--accent)" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "-.02em",
            color: "var(--ink)",
          }}
        >
          googlixlabs
        </span>
      </a>

      <div className="gx-navlinks" style={{ alignItems: "center", gap: 30 }}>
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor
            className="gx-nav-link"
            style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: ".02em" }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        data-cursor
        data-magnetic
        className="gx-nav-cta"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          letterSpacing: ".02em",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: 100,
          padding: "9px 16px",
        }}
      >
        Start a project
      </a>
    </nav>
  );
}
