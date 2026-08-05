"use client";

import { useLiveQuery } from "dexie-react-hooks";
import {
  dailyEntryRepository,
  dailyQuestionRepository,
} from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { DailyAnswerValue, DailyQuestionDefinition } from "../types/daily";

export function useDailyQuestions() {
  const questions = useLiveQuery(() => dailyQuestionRepository.getActive(), []);

  async function addQuestion(prompt: string, type: DailyQuestionDefinition["type"]) {
    const all = await dailyQuestionRepository.getAll();
    await dailyQuestionRepository.add({
      id: generateId(),
      prompt,
      type,
      order: all.length,
      active: true,
    });
  }

  async function updateQuestion(id: string, changes: Partial<DailyQuestionDefinition>) {
    await dailyQuestionRepository.update(id, changes);
  }

  async function removeQuestion(id: string) {
    await dailyQuestionRepository.update(id, { active: false });
  }

  return { questions: questions ?? [], loading: questions === undefined, addQuestion, updateQuestion, removeQuestion };
}

export function useDailyEntry(date: string) {
  const entry = useLiveQuery(() => dailyEntryRepository.getByDate(date), [date]);

  async function setAnswer(questionId: string, value: DailyAnswerValue) {
    const now = Date.now();
    const current = await dailyEntryRepository.getByDate(date);
    if (current) {
      const answers = current.answers.filter((a) => a.questionId !== questionId);
      answers.push({ questionId, value });
      await dailyEntryRepository.update(current.id, { answers, updatedAt: now });
    } else {
      await dailyEntryRepository.add({
        id: generateId(),
        date,
        answers: [{ questionId, value }],
        focusScore: null,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  return { entry, loading: entry === undefined, setAnswer };
}
