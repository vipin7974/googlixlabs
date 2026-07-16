"use client";

import { useEffect, useMemo } from "react";
import { MAX_GROWTH_PERCENT, MIN_GROWTH_PERCENT, calculateRoi } from "@/lib/tools/roiCalculator";
import { formatInr } from "@/lib/tools/format";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { useNumberField } from "@/lib/tools/useNumberField";
import { FormField } from "@/components/tools/FormField";
import { ResultCard } from "@/components/tools/ResultCard";
import { BarChart } from "@/components/tools/BarChart";

interface StoredInput {
  monthlyCustomers: number;
  avgOrderValue: number;
  growthPercent: number;
}

const DEFAULT_INPUT: StoredInput = { monthlyCustomers: 100, avgOrderValue: 1500, growthPercent: 20 };

function compactInr(value: number): string {
  if (Math.abs(value) >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (Math.abs(value) >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
  return formatInr(value);
}

export function RoiCalculatorClient() {
  const [stored, setStored, hydrated] = useLocalStorageState<StoredInput>("gx_tool_roi_calculator", DEFAULT_INPUT);

  const customers = useNumberField(DEFAULT_INPUT.monthlyCustomers, { min: 0, max: 1000000, integer: true });
  const aov = useNumberField(DEFAULT_INPUT.avgOrderValue, { min: 0, max: 100000000 });
  const growth = useNumberField(DEFAULT_INPUT.growthPercent, { min: MIN_GROWTH_PERCENT, max: MAX_GROWTH_PERCENT });

  // Pull in whatever was persisted exactly once, right when hydration
  // completes — not on every keystroke.
  useEffect(() => {
    if (!hydrated) return;
    customers.reset(stored.monthlyCustomers);
    aov.reset(stored.avgOrderValue);
    growth.reset(stored.growthPercent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setStored({ monthlyCustomers: customers.value, avgOrderValue: aov.value, growthPercent: growth.value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers.value, aov.value, growth.value, hydrated]);

  const result = useMemo(
    () =>
      calculateRoi({
        monthlyCustomers: customers.value,
        avgOrderValue: aov.value,
        growthPercent: growth.value,
      }),
    [customers.value, aov.value, growth.value]
  );

  if (!hydrated) {
    return (
      <div className="gx-result-grid" aria-busy="true" aria-label="Loading calculator">
        {[0, 1].map((i) => (
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

  const chartData = result.monthlyBreakdown.map((value, i) => ({ label: `M${i + 1}`, value }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <FormField label="Monthly Customers" htmlFor="roi-customers" error={customers.error}>
          <input
            id="roi-customers"
            type="number"
            inputMode="numeric"
            min={0}
            className="gx-tool-input"
            value={customers.draft}
            aria-invalid={customers.error ? "true" : "false"}
            onChange={(e) => customers.onChange(e.target.value)}
          />
        </FormField>

        <FormField label="Average Order Value" htmlFor="roi-aov" error={aov.error} hint={aov.error ? undefined : "In ₹"}>
          <input
            id="roi-aov"
            type="number"
            inputMode="decimal"
            min={0}
            className="gx-tool-input"
            value={aov.draft}
            aria-invalid={aov.error ? "true" : "false"}
            onChange={(e) => aov.onChange(e.target.value)}
          />
        </FormField>

        <FormField
          label="Expected Growth %"
          htmlFor="roi-growth"
          error={growth.error}
          hint={growth.error ? undefined : `Between ${MIN_GROWTH_PERCENT} and ${MAX_GROWTH_PERCENT}%`}
        >
          <input
            id="roi-growth"
            type="number"
            inputMode="decimal"
            min={MIN_GROWTH_PERCENT}
            max={MAX_GROWTH_PERCENT}
            className="gx-tool-input"
            value={growth.draft}
            aria-invalid={growth.error ? "true" : "false"}
            onChange={(e) => growth.onChange(e.target.value)}
          />
        </FormField>
      </div>

      <div className="gx-result-grid">
        <ResultCard label="Monthly Revenue Increase" value={formatInr(result.monthlyIncrease)} accent="var(--accent)" />
        <ResultCard label="Yearly Revenue Increase" value={formatInr(result.yearlyIncrease)} accent="var(--accent)" />
        <ResultCard label="Current Monthly Revenue" value={formatInr(result.currentMonthlyRevenue)} />
        <ResultCard label="Projected Monthly Revenue" value={formatInr(result.projectedMonthlyRevenue)} />
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
          Cumulative revenue gain over 12 months
        </span>
        <BarChart data={chartData} formatValue={compactInr} />
      </div>

      <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 12.5, color: "var(--faint)", margin: 0 }}>
        This assumes the growth % is a sustained uplift to your current monthly revenue, not
        compounding month-over-month growth.
      </p>

      <a
        href="/#contact"
        data-cursor
        data-magnetic
        className="gx-nav-cta gx-tool-cta-btn"
        style={{ alignSelf: "flex-start" }}
      >
        Book Consultation
      </a>
    </div>
  );
}
