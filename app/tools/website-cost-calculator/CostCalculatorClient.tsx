"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BUSINESS_TYPES,
  FEATURE_KEYS,
  FEATURE_LABELS,
  MAX_PAGES,
  MIN_PAGES,
  calculateWebsiteCost,
  formatInr,
  type BusinessType,
  type FeatureKey,
} from "@/lib/tools/costCalculator";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { FormField } from "@/components/tools/FormField";
import { ResultCard } from "@/components/tools/ResultCard";

interface StoredSelection {
  businessType: BusinessType;
  pages: number;
  features: Record<FeatureKey, boolean>;
}

const DEFAULT_FEATURES = FEATURE_KEYS.reduce(
  (acc, key) => ({ ...acc, [key]: false }),
  {} as Record<FeatureKey, boolean>
);

const DEFAULT_SELECTION: StoredSelection = {
  businessType: "Small Business",
  pages: 5,
  features: DEFAULT_FEATURES,
};

export function CostCalculatorClient() {
  const [selection, setSelection, hydrated] = useLocalStorageState<StoredSelection>(
    "gx_tool_cost_calculator",
    DEFAULT_SELECTION
  );
  const [pagesDraft, setPagesDraft] = useState(String(DEFAULT_SELECTION.pages));
  const [pagesError, setPagesError] = useState<string | undefined>();

  // Sync the editable draft from whatever was persisted, exactly once,
  // right when hydration flips true — not on every `selection.pages`
  // change, which would fight the user mid-keystroke.
  useEffect(() => {
    if (hydrated) setPagesDraft(String(selection.pages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const result = useMemo(() => calculateWebsiteCost(selection), [selection]);

  if (!hydrated) {
    return (
      <div className="gx-result-grid" aria-busy="true" aria-label="Loading calculator">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="gx-result-card"
            style={{ opacity: 0.5, animation: "gxPulse 1.4s ease-in-out infinite" }}
          >
            <span className="gx-result-label">Loading…</span>
            <span className="gx-result-value" style={{ color: "var(--faint)" }}>
              —
            </span>
          </div>
        ))}
      </div>
    );
  }

  function toggleFeature(key: FeatureKey) {
    setSelection({ ...selection, features: { ...selection.features, [key]: !selection.features[key] } });
  }

  function handlePagesChange(raw: string) {
    setPagesDraft(raw);
    const parsed = Number(raw);
    if (raw.trim() === "" || Number.isNaN(parsed) || !Number.isInteger(parsed)) {
      setPagesError("Enter a whole number of pages.");
      return;
    }
    if (parsed < MIN_PAGES || parsed > MAX_PAGES) {
      setPagesError(`Enter a number between ${MIN_PAGES} and ${MAX_PAGES}.`);
      return;
    }
    setPagesError(undefined);
    setSelection({ ...selection, pages: parsed });
  }

  const selectedFeatureLabels = FEATURE_KEYS.filter((key) => selection.features[key]).map(
    (key) => FEATURE_LABELS[key]
  );

  const quoteBody = [
    `Business type: ${selection.businessType}`,
    `Pages: ${selection.pages}`,
    `Features: ${selectedFeatureLabels.length > 0 ? selectedFeatureLabels.join(", ") : "None selected"}`,
    "",
    `Estimated cost: ${formatInr(result.costMin)} – ${formatInr(result.costMax)}`,
    `Estimated timeline: ${result.timelineWeeksMin}–${result.timelineWeeksMax} weeks`,
    `Complexity: ${result.complexity}`,
    `Recommended package: ${result.recommendedPackage}`,
    "",
    "I'd like a firm quote based on this estimate.",
  ].join("\n");

  const quoteHref = `mailto:googlixlabs@gmail.com?subject=${encodeURIComponent(
    "Website Quote Request"
  )}&body=${encodeURIComponent(quoteBody)}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <FormField label="Business Type" htmlFor="cc-business-type">
          <select
            id="cc-business-type"
            className="gx-tool-input"
            value={selection.businessType}
            onChange={(e) => setSelection({ ...selection, businessType: e.target.value as BusinessType })}
          >
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Number of Pages"
          htmlFor="cc-pages"
          error={pagesError}
          hint={pagesError ? undefined : `Between ${MIN_PAGES} and ${MAX_PAGES} pages`}
        >
          <input
            id="cc-pages"
            type="number"
            inputMode="numeric"
            min={MIN_PAGES}
            max={MAX_PAGES}
            className="gx-tool-input"
            value={pagesDraft}
            aria-invalid={pagesError ? "true" : "false"}
            onChange={(e) => handlePagesChange(e.target.value)}
          />
        </FormField>
      </div>

      <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        <legend className="gx-field-label" style={{ padding: 0, marginBottom: 2 }}>
          Features
        </legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {FEATURE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className="gx-toggle-chip"
              aria-pressed={selection.features[key]}
              onClick={() => toggleFeature(key)}
            >
              {FEATURE_LABELS[key]}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <div className="gx-result-grid">
          <ResultCard
            label="Estimated Cost"
            value={`${formatInr(result.costMin)} – ${formatInr(result.costMax)}`}
          />
          <ResultCard
            label="Estimated Timeline"
            value={`${result.timelineWeeksMin}–${result.timelineWeeksMax} weeks`}
          />
          <ResultCard label="Complexity" value={result.complexity} />
          <ResultCard
            label="Recommended Package"
            value={result.recommendedPackage}
            accent="var(--accent)"
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 12.5,
            color: "var(--faint)",
            margin: "14px 0 0",
          }}
        >
          This is an automated estimate, not a fixed quote — final pricing depends on the details
          of your project.
        </p>
      </div>

      <a
        href={quoteHref}
        data-cursor
        data-magnetic
        className="gx-nav-cta gx-tool-cta-btn"
        style={{ alignSelf: "flex-start" }}
      >
        Get Free Quote
      </a>
    </div>
  );
}
