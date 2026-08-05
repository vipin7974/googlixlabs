import type { ID, EntityTimestamps } from "./common";

export type HabitFrequency = "daily" | "weekdays" | "custom";

export type Habit = EntityTimestamps & {
  id: ID;
  name: string;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  customDays: number[];
  targetPerDay: number;
  unit: string;
  archived: boolean;
  order: number;
};

export type HabitDraft = Omit<Habit, "id" | "createdAt" | "updatedAt" | "order">;

export type HabitLog = {
  id: ID;
  habitId: ID;
  date: string;
  count: number;
  done: boolean;
};

export const DEFAULT_HABITS: HabitDraft[] = [
  { name: "Gym", icon: "dumbbell", color: "#e5484d", frequency: "daily", customDays: [], targetPerDay: 1, unit: "session", archived: false },
  { name: "Wake up early", icon: "sunrise", color: "#f5a623", frequency: "daily", customDays: [], targetPerDay: 1, unit: "day", archived: false },
  { name: "Sleep before 11", icon: "moon", color: "#8b5cf6", frequency: "daily", customDays: [], targetPerDay: 1, unit: "day", archived: false },
  { name: "Reading", icon: "book-open", color: "#3b82f6", frequency: "daily", customDays: [], targetPerDay: 20, unit: "min", archived: false },
  { name: "Coding", icon: "code", color: "#16171a", frequency: "daily", customDays: [], targetPerDay: 60, unit: "min", archived: false },
  { name: "Meditation", icon: "flower-2", color: "#10b981", frequency: "daily", customDays: [], targetPerDay: 10, unit: "min", archived: false },
  { name: "Walking", icon: "footprints", color: "#0ea5e9", frequency: "daily", customDays: [], targetPerDay: 30, unit: "min", archived: false },
  { name: "Water Intake", icon: "droplets", color: "#06b6d4", frequency: "daily", customDays: [], targetPerDay: 8, unit: "glass", archived: false },
];
