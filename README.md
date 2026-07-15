# GooglixLabs — Digital Product Studio

A Next.js 14 (App Router) site for **GooglixLabs**, built with TypeScript. The
design, copy, and every interaction here are a direct port of the supplied
"GooglixLabs Studio" mockup — an editorial, ink/paper studio aesthetic with a
canvas 2D flow-field background, text-mask reveal animations, a magnetic
custom cursor, and a hover-preview project list.

---

## Stack

- **Next.js 14** App Router + TypeScript
- **Fonts**: Bricolage Grotesque, Instrument Serif (italic accents), Manrope,
  JetBrains Mono — all via `next/font/google`
- No component library / animation library dependency — every interaction
  (scroll reveals, counters, magnetic buttons, custom cursor, flow-field
  canvas, hover preview) is hand-rolled in `components/Interactions.tsx` and
  `components/FlowCanvas.tsx`, mirroring the original design's own vanilla-DOM
  controller.
- Tailwind is present only for the base reset layer — all layout/visual
  styling is inline styles + `app/globals.css`, matching the source design.

## Structure

```
app/
  layout.tsx          Fonts, SEO metadata, JSON-LD
  page.tsx             Composes the page
  globals.css          Design tokens, keyframes, reveal/hover mechanics
  not-found.tsx         404 page
  sitemap.ts / robots.ts
components/
  Nav.tsx              Sticky nav, scroll-aware background
  Interactions.tsx     Site-wide: reveals, counters, progress bar, magnetic buttons, custom cursor
  FlowCanvas.tsx       Canvas 2D flow-field background (hero)
  sections/
    Hero.tsx, Marquee.tsx, Studio.tsx, Work.tsx, Capabilities.tsx, Approach.tsx, ContactFooter.tsx
lib/
  content.ts           All copy/data (nav links, stats, projects, capabilities, etc.)
  hex.ts               hex → rgba() helper used by the flow canvas
```

## Editing content

Everything text/data-driven lives in `lib/content.ts` — nav links, hero
stats, the marquee client list, manifesto lines, studio pillars, project
list, capabilities, process/approach steps, and social links.

Project links: internal/NDA projects point at `#contact`; live projects link
out with `target="_blank"`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deployment

Any Node.js host works (Vercel recommended — `next build` then `next start`,
or import directly on vercel.com/new).

---

Built with care. © GooglixLabs.
