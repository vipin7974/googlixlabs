"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { workoutSessionRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { WorkoutSession, WorkoutSessionDraft } from "../types/workout";

export function useWorkoutSessions(date?: string) {
  const sessions = useLiveQuery(
    () => (date ? workoutSessionRepository.getByDate(date) : workoutSessionRepository.getAll()),
    [date]
  );

  async function createSession(draft: WorkoutSessionDraft) {
    const now = Date.now();
    const session: WorkoutSession = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await workoutSessionRepository.add(session);
    return session;
  }

  async function updateSession(id: string, changes: Partial<WorkoutSession>) {
    await workoutSessionRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function deleteSession(id: string) {
    await workoutSessionRepository.remove(id);
  }

  const sorted = (sessions ?? []).slice().sort((a, b) => b.createdAt - a.createdAt);

  return { sessions: sorted, loading: sessions === undefined, createSession, updateSession, deleteSession };
}

export function useActiveWorkoutSession() {
  const session = useLiveQuery(() => workoutSessionRepository.getActive(), []);
  return { session, loading: session === undefined };
}
