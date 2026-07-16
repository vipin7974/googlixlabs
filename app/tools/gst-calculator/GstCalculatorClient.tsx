"use client";

import { useEffect, useMemo } from "react";
import { GST_RATES, calculateGst, type GstMode } from "@/lib/tools/gstCalculator";
import { formatInr } from "@/lib/tools/format";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { useNumberField } from "@/lib/tools/useNumberField";
import { FormField } from "@/components/tools/FormField";
import { ResultCard } from "@/components/tools/ResultCard";

interface StoredInput {
  amount: number;
  rate: number;
  mode: GstMode;
}

const DEFAULT_INPUT: StoredInput = { amount: 10000, rate: 18, mode: "add" };

export function GstCalculatorClient() {
  const [stored, setStored, hydrated] = useLocalStorageState<StoredInput>("gx_tool_gst_calculator", DEFAULT_INPUT);
  const amount = useNumberField(DEFAULT_INPUT.amount, { min: 0, max: 1000000000 });

  useEffect(() => {
    if (hydrated) amount.reset(stored.amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setStored((prev) => ({ ...prev, amount: amount.value }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount.value, hydrated]);

  const result = useMemo(
    () => calculateGst(amount.value, stored.rate, stored.mode),
    [amount.value, stored.rate, stored.mode]
  );

  if (!hydrated) {
    return (
      <div className="gx-result-grid" aria-busy="true" aria-label="Loading calculator">
        {[0, 1, 2].map((i) => (
          <div key={i} className="gx-result-card" style={{ opacity: 0.5, animation: "gxPulse 1.4s ease-in-out infinite" }}>
            <span className="gx-result-label">Loading…</span>
            <span className="gx-result-value" style={{ color: "var(--faint)" }}>
              —
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        <legend className="gx-field-label" style={{ padding: 0, marginBottom: 2 }}>
          I want to
        </legend>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="gx-toggle-chip"
            aria-pressed={stored.mode === "add"}
            onClick={() => setStored((prev) => ({ ...prev, mode: "add" }))}
          >
            Add GST to amount
          </button>
          <button
            type="button"
            className="gx-toggle-chip"
            aria-pressed={stored.mode === "remove"}
            onClick={() => setStored((prev) => ({ ...prev, mode: "remove" }))}
          >
            Remove GST from amount
          </button>
        </div>
      </fieldset>

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <FormField
          label={stored.mode === "add" ? "Amount (excl. GST)" : "Amount (incl. GST)"}
          htmlFor="gst-amount"
          error={amount.error}
          hint={amount.error ? undefined : "In ₹"}
        >
          <input
            id="gst-amount"
            type="number"
            inputMode="decimal"
            min={0}
            className="gx-tool-input"
            value={amount.draft}
            aria-invalid={amount.error ? "true" : "false"}
            onChange={(e) => amount.onChange(e.target.value)}
          />
        </FormField>

        <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          <legend className="gx-field-label" style={{ padding: 0, marginBottom: 2 }}>
            GST Rate
          </legend>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {GST_RATES.map((rate) => (
              <button
                key={rate}
                type="button"
                className="gx-toggle-chip"
                aria-pressed={stored.rate === rate}
                onClick={() => setStored((prev) => ({ ...prev, rate }))}
              >
                {rate}%
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="gx-result-grid">
        <ResultCard label="Base Amount" value={formatInr(result.baseAmount)} />
        <ResultCard label={`GST (${stored.rate}%)`} value={formatInr(result.gstAmount)} />
        <ResultCard label="Total Amount" value={formatInr(result.totalAmount)} accent="var(--accent)" />
      </div>
    </div>
  );
}
