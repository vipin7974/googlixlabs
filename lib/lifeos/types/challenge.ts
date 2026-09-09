import type { ID, EntityTimestamps } from "./common";

export type Challenge = EntityTimestamps & {
  id: ID;
  name: string;
  icon: string;
  color: string;
  startDate: string;
  durationDays: number;
  archived: boolean;
};

export type ChallengeDraft = Omit<Challenge, "id" | "createdAt" | "updatedAt">;

export type ChallengeLog = {
  id: ID;
  challengeId: ID;
  date: string;
  done: boolean;
};

export const CHALLENGE_DURATION_PRESETS = [7, 14, 21, 30, 60, 90];
