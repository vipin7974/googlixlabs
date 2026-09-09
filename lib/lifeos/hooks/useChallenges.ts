"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { challengeRepository, challengeLogRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { Challenge, ChallengeDraft } from "../types/challenge";

export function useChallenges() {
  const challenges = useLiveQuery(() => challengeRepository.getActive(), []);

  async function createChallenge(draft: ChallengeDraft) {
    const now = Date.now();
    const challenge: Challenge = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await challengeRepository.add(challenge);
    return challenge;
  }

  async function updateChallenge(id: string, changes: Partial<Challenge>) {
    await challengeRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function archiveChallenge(id: string) {
    await challengeRepository.update(id, { archived: true, updatedAt: Date.now() });
  }

  return { challenges: challenges ?? [], loading: challenges === undefined, createChallenge, updateChallenge, archiveChallenge };
}

export function useChallengeLogs(challengeId: string) {
  const logs = useLiveQuery(() => challengeLogRepository.getByChallenge(challengeId), [challengeId]);

  async function toggleDay(date: string) {
    const existing = await challengeLogRepository.getByChallengeAndDate(challengeId, date);
    if (existing) {
      await challengeLogRepository.update(existing.id, { done: !existing.done });
    } else {
      await challengeLogRepository.add({ id: generateId(), challengeId, date, done: true });
    }
  }

  return { logs: logs ?? [], loading: logs === undefined, toggleDay };
}
