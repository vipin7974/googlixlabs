"use client";

import { useMemo } from "react";
import {
  BUSINESS_AGE_OPTIONS,
  COMPETITION_OPTIONS,
  EMPLOYEE_OPTIONS,
  INDUSTRY_OPTIONS,
  REVENUE_OPTIONS,
  calculateBusinessReadiness,
  type BusinessAge,
  type BusinessReadinessInput,
  type CompetitionLevel,
  type EmployeeRange,
  type Industry,
  type RevenueRange,
} from "@/lib/tools/businessReadiness";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { FormField } from "@/components/tools/FormField";
import { ScoreCircle } from "@/components/tools/ScoreCircle";

const DEFAULT_INPUT: BusinessReadinessInput = {
  businessAge: "1–3 years",
  employees: "2–5",
  monthlyRevenue: "₹50,000 – ₹2,00,000",
  industry: "Retail / E-commerce",
  competition: "Medium",
};

const BAND_ACCENT: Record<string, string> = {
  Excellent: "#1F9B57",
  Average: "#FF5B2E",
  "Needs Improvement": "#FF5B2E",
};

export function BusinessReadinessClient() {
  const [input, setInput, hydrated] = useLocalStorageState<BusinessReadinessInput>(
    "gx_tool_business_readiness",
    DEFAULT_INPUT
  );

  const result = useMemo(() => calculateBusinessReadiness(input), [input]);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <FormField label="Business Age" htmlFor="br-age">
          <select
            id="br-age"
            className="gx-tool-input"
            value={input.businessAge}
            onChange={(e) => setInput({ ...input, businessAge: e.target.value as BusinessAge })}
          >
            {BUSINESS_AGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Employees" htmlFor="br-employees">
          <select
            id="br-employees"
            className="gx-tool-input"
            value={input.employees}
            onChange={(e) => setInput({ ...input, employees: e.target.value as EmployeeRange })}
          >
            {EMPLOYEE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Monthly Revenue" htmlFor="br-revenue">
          <select
            id="br-revenue"
            className="gx-tool-input"
            value={input.monthlyRevenue}
            onChange={(e) => setInput({ ...input, monthlyRevenue: e.target.value as RevenueRange })}
          >
            {REVENUE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Industry" htmlFor="br-industry">
          <select
            id="br-industry"
            className="gx-tool-input"
            value={input.industry}
            onChange={(e) => setInput({ ...input, industry: e.target.value as Industry })}
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Competition" htmlFor="br-competition">
          <select
            id="br-competition"
            className="gx-tool-input"
            value={input.competition}
            onChange={(e) => setInput({ ...input, competition: e.target.value as CompetitionLevel })}
          >
            {COMPETITION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>
      </div>

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
        <ScoreCircle score={result.score} label={result.bandLabel} accent={BAND_ACCENT[result.band] ?? "#2B5CFF"} />
        <p
          style={{
            flex: 1,
            minWidth: 200,
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 14.5,
            lineHeight: 1.65,
            color: "var(--ink)",
            margin: 0,
          }}
        >
          {result.recommendation}
        </p>
      </div>
    </div>
  );
}
