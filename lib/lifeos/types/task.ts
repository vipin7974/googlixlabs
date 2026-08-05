import type { ID, Priority, TaskStatus, EntityTimestamps } from "./common";

export type Subtask = {
  id: ID;
  title: string;
  done: boolean;
};

export type Task = EntityTimestamps & {
  id: ID;
  title: string;
  priority: Priority;
  category: string;
  estimatedMinutes: number | null;
  actualMinutes: number | null;
  deadline: number | null;
  status: TaskStatus;
  progress: number;
  notes: string;
  subtasks: Subtask[];
  order: number;
  date: string;
  completedAt: number | null;
};

export type TaskDraft = Omit<Task, "id" | "createdAt" | "updatedAt" | "order">;
