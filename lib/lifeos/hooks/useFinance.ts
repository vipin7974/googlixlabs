"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { financeRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { FinanceEntry, FinanceDraft } from "../types/finance";

export function useFinanceEntries() {
  const entries = useLiveQuery(() => financeRepository.getAll(), []);

  async function createEntry(draft: FinanceDraft) {
    const now = Date.now();
    const entry: FinanceEntry = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await financeRepository.add(entry);
    return entry;
  }

  async function updateEntry(id: string, changes: Partial<FinanceEntry>) {
    await financeRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function deleteEntry(id: string) {
    await financeRepository.remove(id);
  }

  const sorted = (entries ?? []).slice().sort((a, b) => b.date.localeCompare(a.date));

  return { entries: sorted, loading: entries === undefined, createEntry, updateEntry, deleteEntry };
}
