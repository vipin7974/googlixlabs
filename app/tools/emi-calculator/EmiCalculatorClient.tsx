"use client";

import { useEffect, useMemo } from "react";
import { calculateEmi } from "@/lib/tools/emiCalculator";
import { formatInr } from "@/lib/tools/format";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { useNumberField } from "@/lib/tools/useNumberField";
import { FormField } from "@/components/tools/FormField";
import { ResultCard } from "@/components/tools/ResultCard";
import { BarChart } from "@/components/tools/BarChart";

interface StoredInput {
  principal: number;
  annualRatePercent: number;
  tenureYears: number;
}

const DEFAULT_INPUT: StoredInput = { principal: 500000, annualRatePercent: 10.5, tenureYears: 5 };

export function EmiCalculatorClient() {
  const [stored, setStored, hydrated] = useLocalStorageState<StoredInput>("gx_tool_emi_calculator", DEFAULT_INPUT);

  const principal = useNumberField(DEFAULT_INPUT.principal, { min: 0, max: 1000000000 });
  const rate = useNumberField(DEFAULT_INPUT.annualRatePercent, { min: 0, max: 60 });
  const years = useNumberField(DEFAULT_INPUT.tenureYears, { min: 0.5, max: 40 });

  useEffect(() => {
    if (!hydrated) return;
    principal.reset(stored.principal);
    rate.reset(stored.annualRatePercent);
    years.reset(stored.tenureYears);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setStored({ principal: principal.value, annualRatePercent: rate.value, tenureYears: years.value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal.value, rate.value, years.value, hydrated]);

  const result = useMemo(
    () => calculateEmi({ principal: principal.value, annualRatePercent: rate.value, tenureYears: years.value }),
    [principal.value, rate.value, years.value]
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
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <FormField label="Loan Amount" htmlFor="emi-principal" error={principal.error} hint={principal.error ? undefined : "In ₹"}>
          <input
            id="emi-principal"
            type="number"
            inputMode="decimal"
            min={0}
            className="gx-tool-input"
            value={principal.draft}
            aria-invalid={principal.error ? "true" : "false"}
            onChange={(e) => principal.onChange(e.target.value)}
          />
        </FormField>

        <FormField label="Interest Rate" htmlFor="emi-rate" error={rate.error} hint={rate.error ? undefined : "% per year"}>
          <input
            id="emi-rate"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.1"
            className="gx-tool-input"
            value={rate.draft}
            aria-invalid={rate.error ? "true" : "false"}
            onChange={(e) => rate.onChange(e.target.value)}
          />
        </FormField>

        <FormField label="Tenure" htmlFor="emi-years" error={years.error} hint={years.error ? undefined : "In years"}>
          <input
            id="emi-years"
            type="number"
            inputMode="decimal"
            min={0.5}
            step="0.5"
            className="gx-tool-input"
            value={years.draft}
            aria-invalid={years.error ? "true" : "false"}
            onChange={(e) => years.onChange(e.target.value)}
          />
        </FormField>
      </div>

      <div className="gx-result-grid">
        <ResultCard label="Monthly EMI" value={formatInr(result.emi)} accent="var(--accent)" />
        <ResultCard label="Total Interest" value={formatInr(result.totalInterest)} />
        <ResultCard label="Total Payment" value={formatInr(result.totalPayment)} />
      </div>

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
          Principal vs. interest over {result.months} months
        </span>
        <BarChart
          data={[
            { label: "Principal", value: principal.value },
            { label: "Interest", value: result.totalInterest },
          ]}
          formatValue={formatInr}
        />
      </div>
    </div>
  );
}
