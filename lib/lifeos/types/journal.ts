import type { ID, EntityTimestamps } from "./common";

export type JournalType = "morning" | "evening";

export type JournalEntry = EntityTimestamps & {
  id: ID;
  date: string;
  type: JournalType;
  wins: string;
  failures: string;
  lessonsLearned: string;
  mood: number;
  energy: number;
  stress: number;
  notes: string;
};

export type JournalDraft = Omit<JournalEntry, "id" | "createdAt" | "updatedAt">;
