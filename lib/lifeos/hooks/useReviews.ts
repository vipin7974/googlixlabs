"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { weeklyReviewRepository, monthlyReviewRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { WeeklyReview, WeeklyReviewDraft, MonthlyReview, MonthlyReviewDraft } from "../types/review";

export function useWeeklyReview(weekStart: string) {
  const review = useLiveQuery(() => weeklyReviewRepository.getByWeekStart(weekStart), [weekStart]);

  async function save(draft: Omit<WeeklyReviewDraft, "weekStart">) {
    const now = Date.now();
    if (review) {
      await weeklyReviewRepository.update(review.id, { ...draft, updatedAt: now });
    } else {
      const entry: WeeklyReview = { ...draft, weekStart, id: generateId(), createdAt: now, updatedAt: now };
      await weeklyReviewRepository.add(entry);
    }
  }

  return { review, loading: review === undefined, save };
}

export function useWeeklyReviewHistory() {
  const reviews = useLiveQuery(() => weeklyReviewRepository.getAll(), []);
  return (reviews ?? []).slice().sort((a, b) => b.weekStart.localeCompare(a.weekStart));
}

export function useMonthlyReview(month: string) {
  const review = useLiveQuery(() => monthlyReviewRepository.getByMonth(month), [month]);

  async function save(draft: Omit<MonthlyReviewDraft, "month">) {
    const now = Date.now();
    if (review) {
      await monthlyReviewRepository.update(review.id, { ...draft, updatedAt: now });
    } else {
      const entry: MonthlyReview = { ...draft, month, id: generateId(), createdAt: now, updatedAt: now };
      await monthlyReviewRepository.add(entry);
    }
  }

  return { review, loading: review === undefined, save };
}

export function useMonthlyReviewHistory() {
  const reviews = useLiveQuery(() => monthlyReviewRepository.getAll(), []);
  return (reviews ?? []).slice().sort((a, b) => b.month.localeCompare(a.month));
}
