// A business type's base cost must never bundle a named feature that also
// exists as its own FEATURE_KEYS checkbox below (e.g. a former "Portfolio
// with CMS" tier + the separate "cms" checkbox meant a user selecting both
// paid for CMS twice). Anyone who wants "portfolio + CMS" selects
// "Single Page Portfolio" and checks the CMS feature — priced once.
export const BUSINESS_TYPES = [
  "Single Page Portfolio",
  "Small Business",
  "E-commerce",
  "SaaS / Startup",
  "Enterprise",
] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];

export const FEATURE_KEYS = [
  "authentication",
  "adminPanel",
  "paymentGateway",
  "booking",
  "seo",
  "blog",
  "dashboard",
  "cms",
  "hosting",
  "support",
] as const;
export type FeatureKey = (typeof FEATURE_KEYS)[number];

export const FEATURE_LABELS: Record<FeatureKey, string> = {
  authentication: "Authentication",
  adminPanel: "Admin Panel",
  paymentGateway: "Payment Gateway",
  booking: "Booking System",
  seo: "SEO Setup",
  blog: "Blog",
  dashboard: "Dashboard",
  cms: "CMS",
  hosting: "Hosting Setup",
  support: "3-Month Support",
};

export interface CostCalculatorInput {
  businessType: BusinessType;
  pages: number;
  features: Record<FeatureKey, boolean>;
}

export interface CostCalculatorResult {
  costMin: number;
  costMax: number;
  timelineWeeksMin: number;
  timelineWeeksMax: number;
  complexity: "Simple" | "Moderate" | "Complex" | "Enterprise-grade";
  recommendedPackage: "Starter" | "Growth" | "Pro" | "Enterprise";
}

const BASE_COST: Record<BusinessType, number> = {
  "Single Page Portfolio": 5500,
  "Small Business": 35000,
  "E-commerce": 60000,
  "SaaS / Startup": 90000,
  Enterprise: 150000,
};

const BASE_WEEKS: Record<BusinessType, number> = {
  "Single Page Portfolio": 1,
  "Small Business": 4,
  "E-commerce": 6,
  "SaaS / Startup": 8,
  Enterprise: 10,
};

const FEATURE_COST: Record<FeatureKey, number> = {
  authentication: 12000,
  adminPanel: 20000,
  paymentGateway: 15000,
  booking: 18000,
  seo: 8000,
  blog: 10000,
  dashboard: 25000,
  cms: 15000,
  hosting: 6000,
  support: 10000,
};

const FEATURE_WEEKS: Record<FeatureKey, number> = {
  authentication: 1,
  adminPanel: 1.5,
  paymentGateway: 1,
  booking: 1.5,
  seo: 0.5,
  blog: 0.5,
  dashboard: 2,
  cms: 1,
  hosting: 0.3,
  support: 0.3,
};

const FEATURE_COMPLEXITY_POINTS: Record<FeatureKey, number> = {
  authentication: 2,
  adminPanel: 3,
  paymentGateway: 3,
  booking: 3,
  seo: 1,
  blog: 1,
  dashboard: 4,
  cms: 2,
  hosting: 1,
  support: 1,
};

const PAGE_COST = 1500;
const PAGE_WEEKS = 0.3;
const INCLUDED_PAGES = 3;

export const MIN_PAGES = 1;
export const MAX_PAGES = 60;

export function calculateWebsiteCost(input: CostCalculatorInput): CostCalculatorResult {
  const pages = Math.min(Math.max(input.pages, MIN_PAGES), MAX_PAGES);
  const extraPages = Math.max(pages - INCLUDED_PAGES, 0);

  const selectedFeatures = FEATURE_KEYS.filter((key) => input.features[key]);

  const featureCost = selectedFeatures.reduce((sum, key) => sum + FEATURE_COST[key], 0);
  const featureWeeks = selectedFeatures.reduce((sum, key) => sum + FEATURE_WEEKS[key], 0);
  const complexityPoints =
    selectedFeatures.reduce((sum, key) => sum + FEATURE_COMPLEXITY_POINTS[key], 0) +
    Math.floor(pages / 5) +
    BUSINESS_TYPES.indexOf(input.businessType) * 2;

  const baseCost = BASE_COST[input.businessType] + extraPages * PAGE_COST + featureCost;
  const baseWeeks = BASE_WEEKS[input.businessType] + extraPages * PAGE_WEEKS + featureWeeks;

  const costMin = Math.round((baseCost * 0.9) / 500) * 500;
  const costMax = Math.round((baseCost * 1.2) / 500) * 500;
  const timelineWeeksMin = Math.max(1, Math.round(baseWeeks * 0.85));
  const timelineWeeksMax = Math.max(timelineWeeksMin + 1, Math.round(baseWeeks * 1.25));

  let complexity: CostCalculatorResult["complexity"] = "Simple";
  if (complexityPoints >= 18) complexity = "Enterprise-grade";
  else if (complexityPoints >= 11) complexity = "Complex";
  else if (complexityPoints >= 5) complexity = "Moderate";

  let recommendedPackage: CostCalculatorResult["recommendedPackage"] = "Starter";
  if (baseCost >= 250000) recommendedPackage = "Enterprise";
  else if (baseCost >= 120000) recommendedPackage = "Pro";
  else if (baseCost >= 50000) recommendedPackage = "Growth";

  return { costMin, costMax, timelineWeeksMin, timelineWeeksMax, complexity, recommendedPackage };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
