import type { ID, EntityTimestamps } from "./common";

export type FitnessEntry = EntityTimestamps & {
  id: ID;
  date: string;
  workout: string;
  weightKg: number | null;
  bodyFatPercent: number | null;
  calories: number | null;
  proteinGrams: number | null;
  waterLiters: number | null;
  sleepHours: number | null;
  notes: string;
};

export type FitnessDraft = Omit<FitnessEntry, "id" | "createdAt" | "updatedAt">;
