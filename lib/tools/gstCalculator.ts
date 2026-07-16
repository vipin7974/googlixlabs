export const GST_RATES = [5, 12, 18, 28] as const;
export type GstRate = (typeof GST_RATES)[number];

export type GstMode = "add" | "remove";

export interface GstResult {
  /** The GST-exclusive amount. */
  baseAmount: number;
  gstAmount: number;
  /** The GST-inclusive amount. */
  totalAmount: number;
}

/**
 * `mode: "add"` treats `amount` as GST-exclusive and adds tax on top.
 * `mode: "remove"` treats `amount` as GST-inclusive and backs the base
 * price out: base = total × 100 / (100 + rate) — not total × (1 - rate/100),
 * which is the classic GST-removal mistake (it under-subtracts).
 */
export function calculateGst(amount: number, ratePercent: number, mode: GstMode): GstResult {
  const amt = Math.max(0, amount);
  const rate = Math.max(0, ratePercent);

  if (mode === "add") {
    const gstAmount = (amt * rate) / 100;
    return { baseAmount: amt, gstAmount, totalAmount: amt + gstAmount };
  }

  const baseAmount = (amt * 100) / (100 + rate);
  const gstAmount = amt - baseAmount;
  return { baseAmount, gstAmount, totalAmount: amt };
}
