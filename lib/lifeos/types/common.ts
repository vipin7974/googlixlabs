export type ID = string;

export type Priority = "low" | "medium" | "high" | "critical";

export type TaskStatus = "todo" | "in_progress" | "done" | "skipped";

export type EntityTimestamps = {
  createdAt: number;
  updatedAt: number;
};

export type WithId<T> = T & { id: ID; };

export const PRIORITY_ORDER: Record<Priority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  critical: "#e5484d",
  high: "#f5a623",
  medium: "#3b82f6",
  low: "#8a8a83",
};
