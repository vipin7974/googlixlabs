"use client";

import { useEffect, useState } from "react";
import {
  FALLBACK_RATES_FROM_INR,
  fetchLiveRates,
  loadCachedRates,
  saveCachedRates,
  type CurrencyCode,
} from "./currency";

export type RateSource = "fallback" | "cached" | "live";

/**
 * Always returns a usable rate table immediately (static fallback), then
 * silently upgrades to a cached or freshly-fetched live rate table if one
 * becomes available — the currency selector never has to show a loading
 * state or be disabled while waiting on the network.
 */
export function useCurrencyRates(): { rates: Record<CurrencyCode, number>; source: RateSource } {
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(FALLBACK_RATES_FROM_INR);
  const [source, setSource] = useState<RateSource>("fallback");

  useEffect(() => {
    const cached = loadCachedRates();
    if (cached) {
      setRates((prev) => ({ ...prev, ...cached }));
      setSource("cached");
      return;
    }

    let cancelled = false;
    fetchLiveRates().then((live) => {
      if (cancelled || !live) return;
      setRates((prev) => ({ ...prev, ...live }));
      setSource("live");
      saveCachedRates(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { rates, source };
}
