"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = document.getElementById("nav");
    const upd = () => {
      if (!nav) return;
      // The mobile menu sits just behind the nav bar (lower z-index), so
      // while it's open the bar must stay opaque even at scrollY 0 —
      // otherwise its "transparent at the top" resting state lets menu
      // content show straight through the logo/toggle row.
      if (window.scrollY > 20 || open) {
        nav.style.background = "rgba(244,243,238,.92)";
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
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
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
        href="/#top"
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
          googlix<span style={{color:'#2b5cff'}}>labs</span>
        </span>
      </a>

      <div className="gx-navlinks" style={{ alignItems: "center", gap: "clamp(14px,2vw,30px)" }}>
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

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a
          href="/#contact"
          data-cursor
          data-magnetic
          className="gx-nav-cta gx-nav-cta-bar"
          style={{
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: ".02em",
            whiteSpace: "nowrap",
            border: "1px solid var(--line)",
            borderRadius: 100,
            padding: "9px 16px",
          }}
        >
          Start a project
        </a>

        <button
          type="button"
          data-cursor
          className="gx-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          style={{
            width: 38,
            height: 38,
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--line)",
            borderRadius: "50%",
            background: "transparent",
            color: "var(--ink)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {open ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </nav>

    <div
      id="mobile-menu"
      className={`gx-mobile-menu${open ? " gx-mobile-menu-open" : ""}`}
      aria-hidden={!open}
      onClick={() => setOpen(false)}
    >
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 18,
        }}
      >
        Menu
      </span>
      {navLinks.map((l) => (
        <a key={l.href} href={l.href}>
          {l.label}
        </a>
      ))}
      <a
        href="/#contact"
        className="gx-nav-cta"
        style={{
          display: "inline-flex",
          marginTop: 22,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 13,
          letterSpacing: ".02em",
          border: "1px solid var(--line)",
          borderRadius: 100,
          padding: "12px 22px",
        }}
      >
        Start a project
      </a>
    </div>
    </>
  );
}
