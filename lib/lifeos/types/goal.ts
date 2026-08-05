import type { ID, Priority, EntityTimestamps } from "./common";

export type GoalLevel =
  | "life_vision"
  | "five_year"
  | "one_year"
  | "quarter"
  | "monthly"
  | "weekly"
  | "today";

export const GOAL_LEVELS: GoalLevel[] = [
  "life_vision",
  "five_year",
  "one_year",
  "quarter",
  "monthly",
  "weekly",
  "today",
];

export const GOAL_LEVEL_LABELS: Record<GoalLevel, string> = {
  life_vision: "Life Vision",
  five_year: "5 Year Goal",
  one_year: "1 Year Goal",
  quarter: "Quarter Goal",
  monthly: "Monthly Goal",
  weekly: "Weekly Goal",
  today: "Today's Goal",
};

export type Milestone = {
  id: ID;
  title: string;
  done: boolean;
  targetDate: number | null;
};

export type Goal = EntityTimestamps & {
  id: ID;
  parentId: ID | null;
  level: GoalLevel;
  title: string;
  reason: string;
  priority: Priority;
  deadline: number | null;
  progress: number;
  milestones: Milestone[];
  archived: boolean;
};

export type GoalDraft = Omit<Goal, "id" | "createdAt" | "updatedAt">;
