"use client";

import { useState } from "react";

interface NumberFieldOptions {
  min?: number;
  max?: number;
  integer?: boolean;
  errorMessage?: string;
}

/**
 * A text-backed numeric field: keeps the raw string the user is typing
 * (`draft`) separate from the last-known-valid parsed number (`value`), so
 * an invalid or out-of-range keystroke shows an inline error instead of
 * corrupting the calculation the rest of the form depends on.
 */
export function useNumberField(initial: number, options: NumberFieldOptions = {}) {
  const [draft, setDraft] = useState(String(initial));
  const [value, setValue] = useState(initial);
  const [error, setError] = useState<string | undefined>();

  function onChange(raw: string) {
    setDraft(raw);
    const parsed = Number(raw);
    const { min, max, integer, errorMessage } = options;

    if (raw.trim() === "" || Number.isNaN(parsed) || (integer && !Number.isInteger(parsed))) {
      setError(errorMessage ?? (integer ? "Enter a whole number." : "Enter a valid number."));
      return;
    }
    if (min !== undefined && parsed < min) {
      setError(errorMessage ?? `Enter a number of at least ${min}.`);
      return;
    }
    if (max !== undefined && parsed > max) {
      setError(errorMessage ?? `Enter a number no more than ${max}.`);
      return;
    }
    setError(undefined);
    setValue(parsed);
  }

  function reset(newValue: number) {
    setDraft(String(newValue));
    setValue(newValue);
    setError(undefined);
  }

  return { draft, value, error, onChange, reset };
}
