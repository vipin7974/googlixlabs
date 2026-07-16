"use client";

import { useEffect, useRef, useState } from "react";
import { CARD_HEIGHT, CARD_WIDTH, drawBusinessCard, type BusinessCardData } from "@/lib/tools/businessCard";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { FormField } from "@/components/tools/FormField";
import { ACCENTS } from "@/lib/content";

const DEFAULT_CARD: BusinessCardData = { name: "", title: "", phone: "", website: "", email: "" };

function resolveFonts() {
  const root = document.documentElement;
  const read = (name: string, fallback: string) => getComputedStyle(root).getPropertyValue(name).trim() || fallback;
  return {
    heading: read("--font-bricolage", "sans-serif"),
    italic: read("--font-instrument", "serif"),
    mono: read("--font-mono", "monospace"),
  };
}

export function BusinessCardGeneratorClient() {
  const [card, setCard, hydrated] = useLocalStorageState<BusinessCardData>("gx_tool_business_card", DEFAULT_CARD);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CARD_WIDTH * dpr;
    canvas.height = CARD_HEIGHT * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawBusinessCard(ctx, card, ACCENTS.Signal, resolveFonts());
  }, [card, hydrated]);

  if (!hydrated) {
    return (
      <div
        className="gx-result-card"
        aria-busy="true"
        aria-label="Loading tool"
        style={{ opacity: 0.5, animation: "gxPulse 1.4s ease-in-out infinite", maxWidth: 320 }}
      >
        <span className="gx-result-label">Loading…</span>
        <span className="gx-result-value" style={{ color: "var(--faint)" }}>
          —
        </span>
      </div>
    );
  }

  async function handleDownload() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    setDownloading(true);
    try {
      // Guarantee the web fonts are fully loaded before the export redraw —
      // avoids a canvas that silently fell back to a system font because it
      // was drawn a frame before next/font finished loading.
      await document.fonts.ready;
      drawBusinessCard(ctx, card, ACCENTS.Signal, resolveFonts());

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${(card.name || "business-card").trim().replace(/\s+/g, "-").toLowerCase()}.png`;
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <FormField label="Business Name" htmlFor="bc-name">
          <input
            id="bc-name"
            className="gx-tool-input"
            placeholder="Jane Doe"
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
          />
        </FormField>
        <FormField label="Title / Role (optional)" htmlFor="bc-title">
          <input
            id="bc-title"
            className="gx-tool-input"
            placeholder="Founder, Studio Name"
            value={card.title}
            onChange={(e) => setCard({ ...card, title: e.target.value })}
          />
        </FormField>
        <FormField label="Phone" htmlFor="bc-phone">
          <input
            id="bc-phone"
            type="tel"
            className="gx-tool-input"
            placeholder="+91 98765 43210"
            value={card.phone}
            onChange={(e) => setCard({ ...card, phone: e.target.value })}
          />
        </FormField>
        <FormField label="Website" htmlFor="bc-website">
          <input
            id="bc-website"
            className="gx-tool-input"
            placeholder="yourwebsite.com"
            value={card.website}
            onChange={(e) => setCard({ ...card, website: e.target.value })}
          />
        </FormField>
        <FormField label="Email" htmlFor="bc-email">
          <input
            id="bc-email"
            type="email"
            className="gx-tool-input"
            placeholder="you@email.com"
            value={card.email}
            onChange={(e) => setCard({ ...card, email: e.target.value })}
          />
        </FormField>
      </div>

      <div style={{ maxWidth: 560, width: "100%" }}>
        <canvas
          ref={canvasRef}
          aria-label="Business card preview"
          style={{
            width: "100%",
            aspectRatio: `${CARD_WIDTH} / ${CARD_HEIGHT}`,
            borderRadius: 14,
            display: "block",
            boxShadow: "0 20px 50px rgba(23,24,27,.15)",
          }}
        />
      </div>

      <button
        type="button"
        data-cursor
        data-magnetic
        className="gx-nav-cta gx-tool-cta-btn"
        style={{ alignSelf: "flex-start" }}
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading ? "Preparing…" : "Download PNG"}
      </button>
    </div>
  );
}
