"use client";

import { useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { QR_TYPES, isLikelyUrl, normalizeUrl, type QrType } from "@/lib/tools/qrGenerator";
import { buildWhatsAppLink } from "@/lib/tools/whatsapp";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { FormField } from "@/components/tools/FormField";

interface StoredInput {
  type: QrType;
  websiteUrl: string;
  whatsappPhone: string;
  whatsappMessage: string;
  googleReviewUrl: string;
}

const DEFAULT_INPUT: StoredInput = {
  type: "website",
  websiteUrl: "",
  whatsappPhone: "",
  whatsappMessage: "",
  googleReviewUrl: "",
};

type Target = { ok: true; value: string } | { ok: false; error: string };

function resolveTarget(input: StoredInput): Target {
  if (input.type === "website") {
    if (!input.websiteUrl.trim()) return { ok: false, error: "Enter a website URL." };
    if (!isLikelyUrl(input.websiteUrl)) return { ok: false, error: "Enter a valid URL, e.g. yourwebsite.com" };
    return { ok: true, value: normalizeUrl(input.websiteUrl) };
  }
  if (input.type === "whatsapp") {
    const result = buildWhatsAppLink(input.whatsappPhone, input.whatsappMessage);
    return result.ok ? { ok: true, value: result.url } : { ok: false, error: result.error };
  }
  if (!input.googleReviewUrl.trim()) return { ok: false, error: "Paste your Google review link." };
  if (!isLikelyUrl(input.googleReviewUrl)) return { ok: false, error: "Enter a valid URL." };
  return { ok: true, value: normalizeUrl(input.googleReviewUrl) };
}

export function QrGeneratorClient() {
  const [input, setInput, hydrated] = useLocalStorageState<StoredInput>("gx_tool_qr_generator", DEFAULT_INPUT);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [generating, setGenerating] = useState(false);

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

  function updateField(patch: Partial<StoredInput>) {
    setInput({ ...input, ...patch });
    setDataUrl(null);
    setError(undefined);
  }

  async function handleGenerate() {
    const target = resolveTarget(input);
    if (!target.ok) {
      setError(target.error);
      setDataUrl(null);
      return;
    }
    setError(undefined);
    setGenerating(true);
    try {
      const url = await QRCode.toDataURL(target.value, {
        width: 480,
        margin: 2,
        color: { dark: "#17181B", light: "#F4F3EE" },
      });
      setDataUrl(url);
    } catch {
      setError("Couldn't generate a QR code for that value — please check it and try again.");
      setDataUrl(null);
    } finally {
      setGenerating(false);
    }
  }

  function handleDownload() {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${input.type}-qr-code.png`;
    link.click();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 520 }}>
      <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        <legend className="gx-field-label" style={{ padding: 0, marginBottom: 2 }}>
          QR Type
        </legend>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {QR_TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              className="gx-toggle-chip"
              aria-pressed={input.type === t.key}
              onClick={() => updateField({ type: t.key })}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      {input.type === "website" && (
        <FormField label="Website URL" htmlFor="qr-website" error={error}>
          <input
            id="qr-website"
            className="gx-tool-input"
            placeholder="yourwebsite.com"
            value={input.websiteUrl}
            aria-invalid={error ? "true" : "false"}
            onChange={(e) => updateField({ websiteUrl: e.target.value })}
          />
        </FormField>
      )}

      {input.type === "whatsapp" && (
        <>
          <FormField
            label="Phone Number"
            htmlFor="qr-wa-phone"
            error={error}
            hint={error ? undefined : "10-digit Indian number, or with country code"}
          >
            <input
              id="qr-wa-phone"
              type="tel"
              className="gx-tool-input"
              value={input.whatsappPhone}
              aria-invalid={error ? "true" : "false"}
              onChange={(e) => updateField({ whatsappPhone: e.target.value })}
            />
          </FormField>
          <FormField label="Message (optional)" htmlFor="qr-wa-message">
            <input
              id="qr-wa-message"
              className="gx-tool-input"
              value={input.whatsappMessage}
              onChange={(e) => updateField({ whatsappMessage: e.target.value })}
            />
          </FormField>
        </>
      )}

      {input.type === "googleReview" && (
        <FormField
          label="Google Review Link"
          htmlFor="qr-google"
          error={error}
          hint={error ? undefined : "Find this in Google Business Profile → Ask for reviews → Get link"}
        >
          <input
            id="qr-google"
            className="gx-tool-input"
            placeholder="https://g.page/r/..."
            value={input.googleReviewUrl}
            aria-invalid={error ? "true" : "false"}
            onChange={(e) => updateField({ googleReviewUrl: e.target.value })}
          />
        </FormField>
      )}

      <button
        type="button"
        data-cursor
        data-magnetic
        className="gx-nav-cta gx-tool-cta-btn"
        style={{ alignSelf: "flex-start" }}
        onClick={handleGenerate}
        disabled={generating}
      >
        {generating ? "Generating…" : "Generate QR Code"}
      </button>

      {dataUrl ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
          <Image
            src={dataUrl}
            alt="Generated QR code"
            width={220}
            height={220}
            unoptimized
            style={{ borderRadius: 12, border: "1px solid var(--line)" }}
          />
          <button type="button" data-cursor className="gx-nav-cta" style={{ fontSize: 12 }} onClick={handleDownload}>
            Download PNG
          </button>
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
          Your QR code will appear here.
        </div>
      )}
    </div>
  );
}
