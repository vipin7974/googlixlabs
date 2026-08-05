"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { journalRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { JournalEntry, JournalDraft, JournalType } from "../types/journal";

export function useJournalEntry(date: string, type: JournalType) {
  const entry = useLiveQuery(() => journalRepository.getByDateAndType(date, type), [date, type]);

  async function save(draft: Omit<JournalDraft, "date" | "type">) {
    const now = Date.now();
    if (entry) {
      await journalRepository.update(entry.id, { ...draft, updatedAt: now });
    } else {
      const newEntry: JournalEntry = { ...draft, date, type, id: generateId(), createdAt: now, updatedAt: now };
      await journalRepository.add(newEntry);
    }
  }

  return { entry, loading: entry === undefined, save };
}

export function useJournalHistory() {
  const entries = useLiveQuery(() => journalRepository.getAll(), []);
  return (entries ?? []).slice().sort((a, b) => b.createdAt - a.createdAt);
}
