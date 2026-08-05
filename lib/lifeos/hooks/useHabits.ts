"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { habitRepository, habitLogRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import { calculateStreak } from "../utils/streak";
import type { Habit, HabitDraft } from "../types/habit";

export function useHabits() {
  const habits = useLiveQuery(() => habitRepository.getActive(), []);

  async function createHabit(draft: HabitDraft) {
    const now = Date.now();
    const all = await habitRepository.getAll();
    const habit: Habit = { ...draft, id: generateId(), order: all.length, createdAt: now, updatedAt: now };
    await habitRepository.add(habit);
    return habit;
  }

  async function updateHabit(id: string, changes: Partial<Habit>) {
    await habitRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function archiveHabit(id: string) {
    await habitRepository.update(id, { archived: true, updatedAt: Date.now() });
  }

  return { habits: habits ?? [], loading: habits === undefined, createHabit, updateHabit, archiveHabit };
}

export function useHabitLogsForDate(date: string) {
  const logs = useLiveQuery(() => habitLogRepository.getByDate(date), [date]);

  async function toggleHabit(habitId: string, targetPerDay: number) {
    const existing = await habitLogRepository.getByHabitAndDate(habitId, date);
    if (existing) {
      await habitLogRepository.update(existing.id, { done: !existing.done, count: !existing.done ? targetPerDay : 0 });
    } else {
      await habitLogRepository.add({ id: generateId(), habitId, date, count: targetPerDay, done: true });
    }
  }

  async function setHabitCount(habitId: string, count: number, targetPerDay: number) {
    const existing = await habitLogRepository.getByHabitAndDate(habitId, date);
    const done = count >= targetPerDay;
    if (existing) {
      await habitLogRepository.update(existing.id, { count, done });
    } else {
      await habitLogRepository.add({ id: generateId(), habitId, date, count, done });
    }
  }

  return { logs: logs ?? [], loading: logs === undefined, toggleHabit, setHabitCount };
}

export function useHabitStreak(habitId: string) {
  const logs = useLiveQuery(() => habitLogRepository.getByHabit(habitId), [habitId]);
  const doneDates = (logs ?? []).filter((l) => l.done).map((l) => l.date);
  return calculateStreak(doneDates);
}

export function useHabitLogsAll(habitId: string) {
  const logs = useLiveQuery(() => habitLogRepository.getByHabit(habitId), [habitId]);
  return logs ?? [];
}

export function useAllHabitStreaks() {
  const logs = useLiveQuery(() => habitLogRepository.getAll(), []);

  const byHabit = new Map<string, string[]>();
  (logs ?? []).forEach((log) => {
    if (!log.done) return;
    const list = byHabit.get(log.habitId) ?? [];
    list.push(log.date);
    byHabit.set(log.habitId, list);
  });

  const streaksByHabitId = new Map<string, ReturnType<typeof calculateStreak>>();
  byHabit.forEach((dates, habitId) => {
    streaksByHabitId.set(habitId, calculateStreak(dates));
  });

  return streaksByHabitId;
}
