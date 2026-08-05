"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { taskRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { Task, TaskDraft } from "../types/task";

export function useTasks(date: string) {
  const tasks = useLiveQuery(() => taskRepository.getByDate(date), [date]);

  async function createTask(draft: TaskDraft) {
    const now = Date.now();
    const existing = await taskRepository.getByDate(draft.date);
    const task: Task = {
      ...draft,
      id: generateId(),
      order: existing.length,
      createdAt: now,
      updatedAt: now,
    };
    await taskRepository.add(task);
    return task;
  }

  async function updateTask(id: string, changes: Partial<Task>) {
    await taskRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function toggleTaskDone(task: Task) {
    const done = task.status !== "done";
    await taskRepository.update(task.id, {
      status: done ? "done" : "todo",
      progress: done ? 100 : task.progress,
      completedAt: done ? Date.now() : null,
      updatedAt: Date.now(),
    });
  }

  async function deleteTask(id: string) {
    await taskRepository.remove(id);
  }

  async function reorderTasks(orderedIds: string[]) {
    await taskRepository.reorder(orderedIds);
  }

  return {
    tasks: tasks ?? [],
    loading: tasks === undefined,
    createTask,
    updateTask,
    toggleTaskDone,
    deleteTask,
    reorderTasks,
  };
}
