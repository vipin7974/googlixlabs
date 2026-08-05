"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { goalRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { Goal, GoalDraft, GoalLevel } from "../types/goal";

export function useGoals(level?: GoalLevel) {
  const goals = useLiveQuery(
    () => (level ? goalRepository.getByLevel(level) : goalRepository.getAll()),
    [level]
  );

  async function createGoal(draft: GoalDraft) {
    const now = Date.now();
    const goal: Goal = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await goalRepository.add(goal);
    return goal;
  }

  async function updateGoal(id: string, changes: Partial<Goal>) {
    await goalRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function deleteGoal(id: string) {
    const children = await goalRepository.getChildren(id);
    await Promise.all(children.map((child) => goalRepository.remove(child.id)));
    await goalRepository.remove(id);
  }

  return {
    goals: (goals ?? []).filter((g) => !g.archived),
    loading: goals === undefined,
    createGoal,
    updateGoal,
    deleteGoal,
  };
}

export function useGoalChildren(parentId: string) {
  const children = useLiveQuery(() => goalRepository.getChildren(parentId), [parentId]);
  return children ?? [];
}
