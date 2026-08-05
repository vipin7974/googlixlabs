"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { deepWorkSessionRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { DeepWorkSession, DeepWorkSessionDraft } from "../types/timer";

export function useDeepWorkSessions(date?: string) {
  const sessions = useLiveQuery(
    () => (date ? deepWorkSessionRepository.getByDate(date) : deepWorkSessionRepository.getAll()),
    [date]
  );

  async function startSession(draft: DeepWorkSessionDraft) {
    const now = Date.now();
    const session: DeepWorkSession = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await deepWorkSessionRepository.add(session);
    return session;
  }

  async function completeSession(id: string, actualMinutes: number) {
    await deepWorkSessionRepository.update(id, {
      completed: true,
      endedAt: Date.now(),
      durationMinutes: actualMinutes,
      updatedAt: Date.now(),
    });
  }

  async function discardSession(id: string) {
    await deepWorkSessionRepository.remove(id);
  }

  const sorted = (sessions ?? []).slice().sort((a, b) => b.startedAt - a.startedAt);

  return { sessions: sorted, loading: sessions === undefined, startSession, completeSession, discardSession };
}
