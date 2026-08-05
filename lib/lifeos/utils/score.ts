import type { Task } from "../types/task";
import type { Habit, HabitLog } from "../types/habit";
import type { DailyEntry } from "../types/daily";

export function taskCompletionPercent(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.status === "done").length;
  return Math.round((done / tasks.length) * 100);
}

export function habitCompletionPercent(habits: Habit[], logsForDate: HabitLog[]): number {
  if (habits.length === 0) return 0;
  const doneById = new Set(logsForDate.filter((l) => l.done).map((l) => l.habitId));
  const completed = habits.filter((h) => doneById.has(h.id)).length;
  return Math.round((completed / habits.length) * 100);
}

export function dailyQuestionsAnsweredPercent(entry: DailyEntry | undefined, totalQuestions: number): number {
  if (!entry || totalQuestions === 0) return 0;
  const answered = entry.answers.filter((a) => {
    if (typeof a.value === "string") return a.value.trim().length > 0;
    if (typeof a.value === "boolean") return a.value;
    if (typeof a.value === "number") return a.value > 0;
    return false;
  }).length;
  return Math.round((answered / totalQuestions) * 100);
}

export function computeFocusScore(parts: {
  taskCompletion: number;
  habitCompletion: number;
  dailyQuestionsAnswered: number;
}): number {
  const weighted =
    parts.taskCompletion * 0.5 + parts.habitCompletion * 0.3 + parts.dailyQuestionsAnswered * 0.2;
  return Math.round(weighted);
}
