import { getToolBySlug } from "@/lib/tools/registry";
import type { ToolMeta } from "@/lib/tools/types";
import { industryPlaybook } from "./industry-playbook";
import type { LocationContent } from "./types";

export interface DigitalGrowthReport {
  topIndustries: string[];
  challenges: string[];
  recommendedTools: ToolMeta[];
  nextSteps: string[];
}

const MAX_CHALLENGES = 4;
const MAX_NEXT_STEPS = 4;
const MAX_TOOLS = 3;

/**
 * Builds the "Free Digital Growth Report" section entirely from data
 * already on the location — its `industries` list — run through the
 * industry playbook. No per-location authoring required, so this works
 * identically whether the registry has 7 locations or 5,000.
 */
export function buildDigitalGrowthReport(location: LocationContent): DigitalGrowthReport {
  const challenges: string[] = [];
  const nextSteps: string[] = [];
  const toolSlugs: string[] = [];

  for (const tag of location.industries) {
    const entry = industryPlaybook[tag.slug];
    if (!entry) continue;
    for (const challenge of entry.challenges) {
      if (!challenges.includes(challenge)) challenges.push(challenge);
    }
    for (const step of entry.nextSteps) {
      if (!nextSteps.includes(step)) nextSteps.push(step);
    }
    for (const toolSlug of entry.recommendedToolSlugs) {
      if (!toolSlugs.includes(toolSlug)) toolSlugs.push(toolSlug);
    }
  }

  const recommendedTools = toolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolMeta => tool !== undefined)
    .slice(0, MAX_TOOLS);

  return {
    topIndustries: location.industries.map((tag) => tag.label),
    challenges: challenges.slice(0, MAX_CHALLENGES),
    recommendedTools,
    nextSteps: nextSteps.slice(0, MAX_NEXT_STEPS),
  };
}
