import type { ID, EntityTimestamps } from "./common";

export type DailyQuestionType = "text" | "checkbox" | "rating" | "notes";

export type DailyQuestionDefinition = {
  id: ID;
  prompt: string;
  type: DailyQuestionType;
  order: number;
  active: boolean;
};

export type DailyAnswerValue = string | boolean | number;

export type DailyAnswer = {
  questionId: ID;
  value: DailyAnswerValue;
};

export type DailyEntry = EntityTimestamps & {
  id: ID;
  date: string;
  answers: DailyAnswer[];
  focusScore: number | null;
};

export const DEFAULT_DAILY_QUESTIONS: Omit<DailyQuestionDefinition, "id">[] = [
  { prompt: "What is my ONE mission today?", type: "text", order: 0, active: true },
  { prompt: "What will make today successful?", type: "text", order: 1, active: true },
  { prompt: "What distraction should I avoid?", type: "text", order: 2, active: true },
  { prompt: "What is today's biggest priority?", type: "text", order: 3, active: true },
  { prompt: "How can I become 1% better today?", type: "text", order: 4, active: true },
  { prompt: "What am I grateful for?", type: "notes", order: 5, active: true },
  { prompt: "What am I avoiding?", type: "text", order: 6, active: true },
  { prompt: "What would my future self do today?", type: "text", order: 7, active: true },
  { prompt: "Did I exercise?", type: "checkbox", order: 8, active: true },
  { prompt: "Did I learn something useful?", type: "checkbox", order: 9, active: true },
];
