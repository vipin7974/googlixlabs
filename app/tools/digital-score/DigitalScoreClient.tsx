"use client";

import { useMemo } from "react";
import { DIGITAL_SCORE_QUESTIONS, calculateDigitalScore } from "@/lib/tools/digitalScore";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { ScoreCircle } from "@/components/tools/ScoreCircle";

type Answers = Record<string, boolean>;

const DEFAULT_ANSWERS: Answers = DIGITAL_SCORE_QUESTIONS.reduce(
  (acc, q) => ({ ...acc, [q.key]: false }),
  {} as Answers
);

const BAND_ACCENT: Record<string, string> = {
  Excellent: "#1F9B57",
  Average: "#FF5B2E",
  "Needs Improvement": "#FF5B2E",
};

export function DigitalScoreClient() {
  const [answers, setAnswers, hydrated] = useLocalStorageState<Answers>("gx_tool_digital_score", DEFAULT_ANSWERS);

  const result = useMemo(() => calculateDigitalScore(answers), [answers]);

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

  function toggle(key: string) {
    setAnswers({ ...answers, [key]: !answers[key] });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          flexWrap: "wrap",
          padding: 28,
          border: "1px solid var(--line)",
          borderRadius: 18,
          background: "var(--paper)",
        }}
      >
        <ScoreCircle score={result.score} label={result.band} accent={BAND_ACCENT[result.band] ?? "#2B5CFF"} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <p
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.1rem,2vw,1.4rem)",
              color: "var(--ink)",
              margin: "0 0 8px",
            }}
          >
            {result.band === "Excellent"
              ? "Your digital presence is in great shape."
              : result.band === "Average"
              ? "You've got a foundation — a few gaps are holding you back."
              : "There's real room to grow your digital presence."}
          </p>
          <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 14, color: "var(--muted)", margin: 0 }}>
            Toggle what applies to your business below — your score and recommendations update live.
          </p>
        </div>
      </div>

      <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        <legend className="gx-field-label" style={{ padding: 0, marginBottom: 2 }}>
          Where you stand today
        </legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {DIGITAL_SCORE_QUESTIONS.map((q) => (
            <button
              key={q.key}
              type="button"
              className="gx-toggle-chip"
              aria-pressed={answers[q.key]}
              onClick={() => toggle(q.key)}
            >
              {q.label}
            </button>
          ))}
        </div>
      </fieldset>

      {result.recommendations.length > 0 ? (
        <div>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: ".05em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 16,
            }}
          >
            Personalized recommendations
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {result.recommendations.map((rec) => (
              <div
                key={rec}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "16px 18px",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  background: "var(--paper)",
                }}
              >
                <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono), monospace", fontSize: 13 }}>
                  →
                </span>
                <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 14, lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
                  {rec}
                </p>
              </div>
            ))}
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
          You&apos;ve checked every box — that&apos;s a perfect digital presence score.
        </div>
      )}
    </div>
  );
}
