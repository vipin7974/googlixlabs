"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { fitnessRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { FitnessEntry, FitnessDraft } from "../types/fitness";

export function useFitnessEntries() {
  const entries = useLiveQuery(() => fitnessRepository.getAll(), []);

  async function saveEntryForDate(date: string, draft: Omit<FitnessDraft, "date">) {
    const now = Date.now();
    const existing = await fitnessRepository.getByDate(date);
    if (existing) {
      await fitnessRepository.update(existing.id, { ...draft, updatedAt: now });
    } else {
      const entry: FitnessEntry = { ...draft, date, id: generateId(), createdAt: now, updatedAt: now };
      await fitnessRepository.add(entry);
    }
  }

  async function deleteEntry(id: string) {
    await fitnessRepository.remove(id);
  }

  const sorted = (entries ?? []).slice().sort((a, b) => b.date.localeCompare(a.date));

  return { entries: sorted, loading: entries === undefined, saveEntryForDate, deleteEntry };
}

export function useFitnessEntry(date: string) {
  const entry = useLiveQuery(() => fitnessRepository.getByDate(date), [date]);
  return entry;
}
