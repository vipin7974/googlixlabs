export const BUSINESS_AGE_OPTIONS = ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"] as const;
export type BusinessAge = (typeof BUSINESS_AGE_OPTIONS)[number];

export const EMPLOYEE_OPTIONS = ["Just me", "2–5", "6–20", "20+"] as const;
export type EmployeeRange = (typeof EMPLOYEE_OPTIONS)[number];

export const REVENUE_OPTIONS = [
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹10,00,000",
  "Above ₹10,00,000",
] as const;
export type RevenueRange = (typeof REVENUE_OPTIONS)[number];

export const INDUSTRY_OPTIONS = [
  "Retail / E-commerce",
  "Food & Hospitality",
  "Healthcare",
  "Education",
  "Professional Services",
  "Real Estate",
  "Manufacturing",
  "Technology / SaaS",
  "Other",
] as const;
export type Industry = (typeof INDUSTRY_OPTIONS)[number];

export const COMPETITION_OPTIONS = ["Low", "Medium", "High"] as const;
export type CompetitionLevel = (typeof COMPETITION_OPTIONS)[number];

export interface BusinessReadinessInput {
  businessAge: BusinessAge;
  employees: EmployeeRange;
  monthlyRevenue: RevenueRange;
  industry: Industry;
  competition: CompetitionLevel;
}

export interface BusinessReadinessResult {
  score: number;
  band: "Excellent" | "Average" | "Needs Improvement";
  bandLabel: string;
  recommendation: string;
}

const AGE_POINTS: Record<BusinessAge, number> = {
  "Less than 1 year": 5,
  "1–3 years": 10,
  "3–5 years": 15,
  "5+ years": 20,
};

const EMPLOYEE_POINTS: Record<EmployeeRange, number> = {
  "Just me": 5,
  "2–5": 10,
  "6–20": 15,
  "20+": 20,
};

const REVENUE_POINTS: Record<RevenueRange, number> = {
  "Under ₹50,000": 5,
  "₹50,000 – ₹2,00,000": 10,
  "₹2,00,000 – ₹10,00,000": 15,
  "Above ₹10,00,000": 20,
};

// Industry and competition intentionally don't score points — there's no
// objectively "better" industry, so they only shape the recommendation text.
const MAX_POINTS = 20 + 20 + 20;

export function calculateBusinessReadiness(input: BusinessReadinessInput): BusinessReadinessResult {
  const points = AGE_POINTS[input.businessAge] + EMPLOYEE_POINTS[input.employees] + REVENUE_POINTS[input.monthlyRevenue];
  const score = Math.round((points / MAX_POINTS) * 100);

  let band: BusinessReadinessResult["band"] = "Needs Improvement";
  let bandLabel = "Foundational stage";
  if (score >= 80) {
    band = "Excellent";
    bandLabel = "Ready to scale";
  } else if (score >= 50) {
    band = "Average";
    bandLabel = "Building momentum";
  }

  const industryLower = input.industry.toLowerCase();
  const competitionNote =
    input.competition === "High"
      ? `In a highly competitive ${industryLower} market, focus on differentiation and retention before increasing ad spend.`
      : input.competition === "Medium"
      ? `With moderate competition in ${industryLower}, consistent marketing usually outperforms one-off campaigns.`
      : `Low competition in ${industryLower} means early, consistent investment in visibility can compound quickly.`;

  const recommendation =
    band === "Excellent"
      ? `You're well-positioned to invest in growth. ${competitionNote}`
      : band === "Average"
      ? `You have a solid base to build on. ${competitionNote}`
      : `Focus on strengthening the fundamentals — consistent revenue and a small core team — before scaling spend. ${competitionNote}`;

  return { score, band, bandLabel, recommendation };
}
