"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { ideaRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { Idea, IdeaDraft } from "../types/idea";

export function useIdeas() {
  const ideas = useLiveQuery(() => ideaRepository.getAll(), []);

  async function createIdea(draft: IdeaDraft) {
    const now = Date.now();
    const idea: Idea = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await ideaRepository.add(idea);
    return idea;
  }

  async function updateIdea(id: string, changes: Partial<Idea>) {
    await ideaRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function deleteIdea(id: string) {
    await ideaRepository.remove(id);
  }

  const sorted = (ideas ?? []).slice().sort((a, b) => b.createdAt - a.createdAt);

  return { ideas: sorted, loading: ideas === undefined, createIdea, updateIdea, deleteIdea };
}
