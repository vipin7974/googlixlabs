"use client";

import { useState } from "react";
import { buildWhatsAppLink, type WhatsAppLinkResult } from "@/lib/tools/whatsapp";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { FormField } from "@/components/tools/FormField";

interface StoredInput {
  phone: string;
  message: string;
}

const DEFAULT_INPUT: StoredInput = { phone: "", message: "" };

export function WhatsAppGeneratorClient() {
  const [input, setInput, hydrated] = useLocalStorageState<StoredInput>(
    "gx_tool_whatsapp_generator",
    DEFAULT_INPUT
  );
  const [generated, setGenerated] = useState<WhatsAppLinkResult | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [copied, setCopied] = useState(false);

  if (!hydrated) {
    return (
      <div
        className="gx-result-card"
        aria-busy="true"
        aria-label="Loading tool"
        style={{ opacity: 0.5, animation: "gxPulse 1.4s ease-in-out infinite", maxWidth: 420 }}
      >
        <span className="gx-result-label">Loading…</span>
        <span className="gx-result-value" style={{ color: "var(--faint)" }}>
          —
        </span>
      </div>
    );
  }

  function updateField(patch: Partial<StoredInput>) {
    setInput({ ...input, ...patch });
    setGenerated(null);
    setCopied(false);
  }

  function handleGenerate() {
    const result = buildWhatsAppLink(input.phone, input.message);
    if (result.ok) {
      setGenerated(result);
      setError(undefined);
    } else {
      setGenerated(null);
      setError(result.error);
    }
  }

  async function handleCopy() {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(generated.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the link is still visible/selectable, so no hard failure.
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 520 }}>
      <FormField
        label="Phone Number"
        htmlFor="wa-phone"
        error={error}
        hint={error ? undefined : "10-digit Indian number, or any number with country code."}
      >
        <input
          id="wa-phone"
          type="tel"
          inputMode="tel"
          placeholder="e.g. 9876543210"
          className="gx-tool-input"
          value={input.phone}
          aria-invalid={error ? "true" : "false"}
          onChange={(e) => updateField({ phone: e.target.value })}
        />
      </FormField>

      <FormField label="Message (optional)" htmlFor="wa-message" hint="Pre-filled text the visitor can edit before sending.">
        <textarea
          id="wa-message"
          rows={3}
          placeholder="Hi! I'm interested in your services."
          className="gx-tool-input"
          style={{ resize: "vertical", fontFamily: "var(--font-manrope), sans-serif" }}
          value={input.message}
          onChange={(e) => updateField({ message: e.target.value })}
        />
      </FormField>

      <button
        type="button"
        data-cursor
        data-magnetic
        className="gx-nav-cta gx-tool-cta-btn"
        style={{ alignSelf: "flex-start" }}
        onClick={handleGenerate}
      >
        Generate Link
      </button>

      {generated ? (
        <div className="gx-result-card" style={{ gap: 14 }}>
          <span className="gx-result-label">Your WhatsApp Link — {generated.displayPhone}</span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              color: "var(--ink)",
              wordBreak: "break-all",
            }}
          >
            {generated.url}
          </span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" data-cursor className="gx-nav-cta" style={{ fontSize: 12 }} onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <a
              href={generated.url}
              target="_blank"
              rel="noopener"
              data-cursor
              className="gx-nav-cta"
              style={{ fontSize: 12 }}
            >
              Open ↗
            </a>
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px dashed var(--line)",
            borderRadius: 14,
            padding: "28px 22px",
            textAlign: "center",
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 13.5,
            color: "var(--faint)",
          }}
        >
          Your WhatsApp link will appear here.
        </div>
      )}
    </div>
  );
}
