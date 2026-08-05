"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { visionRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { VisionItem, VisionDraft } from "../types/vision";

export function useVisionBoard() {
  const items = useLiveQuery(() => visionRepository.getAll(), []);

  async function createItem(draft: VisionDraft) {
    const now = Date.now();
    const all = await visionRepository.getAll();
    const item: VisionItem = { ...draft, id: generateId(), order: all.length, createdAt: now, updatedAt: now };
    await visionRepository.add(item);
    return item;
  }

  async function updateItem(id: string, changes: Partial<VisionItem>) {
    await visionRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function deleteItem(id: string) {
    await visionRepository.remove(id);
  }

  const sorted = (items ?? []).slice().sort((a, b) => a.order - b.order);

  return { items: sorted, loading: items === undefined, createItem, updateItem, deleteItem };
}
