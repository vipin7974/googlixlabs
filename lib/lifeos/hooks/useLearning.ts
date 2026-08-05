"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { learningRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { LearningEntry, LearningDraft } from "../types/learning";

export function useLearningEntries() {
  const entries = useLiveQuery(() => learningRepository.getAll(), []);

  async function createEntry(draft: LearningDraft) {
    const now = Date.now();
    const entry: LearningEntry = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await learningRepository.add(entry);
    return entry;
  }

  async function updateEntry(id: string, changes: Partial<LearningEntry>) {
    await learningRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function deleteEntry(id: string) {
    await learningRepository.remove(id);
  }

  const sorted = (entries ?? []).slice().sort((a, b) => b.date.localeCompare(a.date));

  return { entries: sorted, loading: entries === undefined, createEntry, updateEntry, deleteEntry };
}
