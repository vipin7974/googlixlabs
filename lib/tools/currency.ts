export const CURRENCY_CODES = [
  "INR",
  "USD",
  "SGD",
  "CNY",
  "KRW",
  "BRL",
  "JPY",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
] as const;
export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export interface CurrencyOption {
  code: CurrencyCode;
  label: string;
  locale: string;
}

// Ordered roughly by actual site traffic (US, India, Singapore, China,
// South Korea, Brazil, Japan per analytics), then a few other common ones.
export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: "INR", label: "₹ INR — Indian Rupee", locale: "en-IN" },
  { code: "USD", label: "$ USD — US Dollar", locale: "en-US" },
  { code: "SGD", label: "S$ SGD — Singapore Dollar", locale: "en-SG" },
  { code: "CNY", label: "¥ CNY — Chinese Yuan", locale: "zh-CN" },
  { code: "KRW", label: "₩ KRW — South Korean Won", locale: "ko-KR" },
  { code: "BRL", label: "R$ BRL — Brazilian Real", locale: "pt-BR" },
  { code: "JPY", label: "¥ JPY — Japanese Yen", locale: "ja-JP" },
  { code: "EUR", label: "€ EUR — Euro", locale: "en-IE" },
  { code: "GBP", label: "£ GBP — British Pound", locale: "en-GB" },
  { code: "AUD", label: "A$ AUD — Australian Dollar", locale: "en-AU" },
  { code: "CAD", label: "C$ CAD — Canadian Dollar", locale: "en-CA" },
];

/**
 * 1 INR expressed in each currency. Used only when the live fetch hasn't
 * completed or has failed — GooglixLabs prices and invoices in INR
 * regardless, so these are purely a "see it in your currency" convenience
 * on a tool that's already labeled an estimate, not a source of truth.
 * Last manually reviewed: 2026-07.
 */
export const FALLBACK_RATES_FROM_INR: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  SGD: 0.0155,
  CNY: 0.086,
  KRW: 16.5,
  BRL: 0.066,
  JPY: 1.8,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
  CAD: 0.016,
};

const RATES_ENDPOINT = "https://open.er-api.com/v6/latest/INR";
const RATES_CACHE_KEY = "gx_currency_rates_inr";
const RATES_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;

interface RatesCache {
  rates: Partial<Record<CurrencyCode, number>>;
  fetchedAt: number;
}

interface OpenErApiResponse {
  result?: string;
  rates?: Record<string, number>;
}

/** Fetches live rates (base INR) from a free, no-key-required API. Never throws — returns null on any failure. */
export async function fetchLiveRates(): Promise<Partial<Record<CurrencyCode, number>> | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(RATES_ENDPOINT, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const data = (await res.json()) as OpenErApiResponse;
    if (data.result !== "success" || !data.rates) return null;

    const picked: Partial<Record<CurrencyCode, number>> = {};
    for (const code of CURRENCY_CODES) {
      if (typeof data.rates[code] === "number") picked[code] = data.rates[code];
    }
    return picked;
  } catch {
    return null;
  }
}

export function loadCachedRates(): Partial<Record<CurrencyCode, number>> | null {
  try {
    const raw = window.localStorage.getItem(RATES_CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as RatesCache;
    if (Date.now() - cache.fetchedAt > RATES_CACHE_MAX_AGE_MS) return null;
    return cache.rates;
  } catch {
    return null;
  }
}

export function saveCachedRates(rates: Partial<Record<CurrencyCode, number>>): void {
  try {
    const cache: RatesCache = { rates, fetchedAt: Date.now() };
    window.localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Storage unavailable — live rates just won't be cached this session.
  }
}

/** Converts and formats an INR amount into the target currency. Always whole-unit — this is a rough estimate, not an invoice. */
export function formatInCurrency(
  amountInInr: number,
  code: CurrencyCode,
  rates: Partial<Record<CurrencyCode, number>>
): string {
  const rate = rates[code] ?? FALLBACK_RATES_FROM_INR[code];
  const option = CURRENCY_OPTIONS.find((o) => o.code === code);
  const converted = amountInInr * rate;
  return new Intl.NumberFormat(option?.locale ?? "en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(converted);
}
