import type { ID, EntityTimestamps } from "./common";

export type LearningEntry = EntityTimestamps & {
  id: ID;
  date: string;
  technology: string;
  hours: number;
  project: string;
  notes: string;
  completion: number;
};

export type LearningDraft = Omit<LearningEntry, "id" | "createdAt" | "updatedAt">;
