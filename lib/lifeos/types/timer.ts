import type { ID, EntityTimestamps } from "./common";

export type DeepWorkSession = EntityTimestamps & {
  id: ID;
  date: string;
  durationMinutes: number;
  plannedMinutes: number;
  label: string;
  completed: boolean;
  startedAt: number;
  endedAt: number | null;
};

export type DeepWorkSessionDraft = Omit<DeepWorkSession, "id" | "createdAt" | "updatedAt">;

export const POMODORO_PRESETS = [25, 50, 90, 120] as const;
