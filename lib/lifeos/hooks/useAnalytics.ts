"use client";

import { useLiveQuery } from "dexie-react-hooks";
import {
  taskRepository,
  habitRepository,
  habitLogRepository,
  journalRepository,
  deepWorkSessionRepository,
  learningRepository,
  fitnessRepository,
  goalRepository,
  ideaRepository,
} from "../repositories/repositories";
import { lastNDayKeys } from "../utils/date";

export function useAnalyticsRange(days = 30) {
  const dayKeys = lastNDayKeys(days);

  const data = useLiveQuery(async () => {
    const [tasks, habits, logs, journalEntries, sessions, learning, fitness, goals, ideas] = await Promise.all([
      taskRepository.getAll(),
      habitRepository.getActive(),
      habitLogRepository.getAll(),
      journalRepository.getAll(),
      deepWorkSessionRepository.getAll(),
      learningRepository.getAll(),
      fitnessRepository.getAll(),
      goalRepository.getAll(),
      ideaRepository.getAll(),
    ]);

    const keySet = new Set(dayKeys);

    const tasksByDay = dayKeys.map((date) => {
      const dayTasks = tasks.filter((t) => t.date === date);
      const done = dayTasks.filter((t) => t.status === "done").length;
      return { date, total: dayTasks.length, done };
    });

    const habitsByDay = dayKeys.map((date) => {
      const dayLogs = logs.filter((l) => l.date === date && l.done);
      return { date, count: dayLogs.length, possible: habits.length };
    });

    const moodByDay = dayKeys.map((date) => {
      const entries = journalEntries.filter((j) => j.date === date);
      const avgMood = entries.length
        ? Math.round(entries.reduce((sum, e) => sum + e.mood, 0) / entries.length)
        : null;
      const avgEnergy = entries.length
        ? Math.round(entries.reduce((sum, e) => sum + e.energy, 0) / entries.length)
        : null;
      const avgStress = entries.length
        ? Math.round(entries.reduce((sum, e) => sum + e.stress, 0) / entries.length)
        : null;
      return { date, mood: avgMood, energy: avgEnergy, stress: avgStress };
    });

    const deepWorkByDay = dayKeys.map((date) => {
      const daySessions = sessions.filter((s) => s.date === date && s.completed);
      const minutes = daySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
      return { date, minutes };
    });

    const learningInRange = learning.filter((l) => keySet.has(l.date));
    const learningHours = learningInRange.reduce((sum, l) => sum + l.hours, 0);

    const fitnessInRange = fitness.filter((f) => keySet.has(f.date));
    const gymDays = fitnessInRange.filter((f) => f.workout.trim().length > 0).length;

    const distractionsByDay = dayKeys.map((date) => ({
      date,
      count: ideas.filter((i) => i.date === date).length,
    }));

    const activeGoals = goals.filter((g) => !g.archived);
    const avgGoalProgress = activeGoals.length
      ? Math.round(activeGoals.reduce((sum, g) => sum + g.progress, 0) / activeGoals.length)
      : 0;

    return {
      tasksByDay,
      habitsByDay,
      moodByDay,
      deepWorkByDay,
      distractionsByDay,
      learningHours,
      gymDays,
      fitnessInRange,
      avgGoalProgress,
      totalDeepWorkMinutes: deepWorkByDay.reduce((sum, d) => sum + d.minutes, 0),
      totalDistractions: distractionsByDay.reduce((sum, d) => sum + d.count, 0),
    };
  }, [days]);

  return data;
}
