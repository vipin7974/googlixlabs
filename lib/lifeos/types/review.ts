import type { ID, EntityTimestamps } from "./common";

export type WeeklyReview = EntityTimestamps & {
  id: ID;
  weekStart: string;
  wentWell: string;
  wastedTime: string;
  shouldStop: string;
  shouldContinue: string;
  shouldImprove: string;
  biggestAchievement: string;
  biggestMistake: string;
  topDistraction: string;
  topLearning: string;
  nextWeekFocus: string;
  rating: number;
};

export type WeeklyReviewDraft = Omit<WeeklyReview, "id" | "createdAt" | "updatedAt">;

export type MonthlyReview = EntityTimestamps & {
  id: ID;
  month: string;
  revenue: string;
  learning: string;
  fitness: string;
  career: string;
  family: string;
  business: string;
  books: string;
  habits: string;
  failures: string;
  achievements: string;
  overallRating: number;
};

export type MonthlyReviewDraft = Omit<MonthlyReview, "id" | "createdAt" | "updatedAt">;
