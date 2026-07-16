export interface RoiInput {
  monthlyCustomers: number;
  avgOrderValue: number;
  growthPercent: number;
}

export interface RoiResult {
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;
  monthlyIncrease: number;
  yearlyIncrease: number;
  /** Cumulative revenue increase after each of the next 12 months. */
  monthlyBreakdown: number[];
}

export const MIN_GROWTH_PERCENT = 0;
export const MAX_GROWTH_PERCENT = 500;

/**
 * Models the growth % as a one-time uplift to monthly revenue that's then
 * sustained for a year — not compounding month-over-month growth, which
 * would need retention/churn assumptions this tool doesn't collect and
 * would overstate precision it doesn't have.
 */
export function calculateRoi(input: RoiInput): RoiResult {
  const customers = Math.max(0, input.monthlyCustomers);
  const aov = Math.max(0, input.avgOrderValue);
  const growth = Math.min(Math.max(input.growthPercent, MIN_GROWTH_PERCENT), MAX_GROWTH_PERCENT);

  const currentMonthlyRevenue = customers * aov;
  const projectedMonthlyRevenue = currentMonthlyRevenue * (1 + growth / 100);
  const monthlyIncrease = projectedMonthlyRevenue - currentMonthlyRevenue;
  const yearlyIncrease = monthlyIncrease * 12;
  const monthlyBreakdown = Array.from({ length: 12 }, (_, i) => monthlyIncrease * (i + 1));

  return { currentMonthlyRevenue, projectedMonthlyRevenue, monthlyIncrease, yearlyIncrease, monthlyBreakdown };
}
