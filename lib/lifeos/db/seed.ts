import { getLifeOsDb } from "./schema";
import { DEFAULT_DAILY_QUESTIONS } from "../types/daily";
import { DEFAULT_HABITS } from "../types/habit";
import { DEFAULT_SETTINGS } from "../types/settings";
import { generateId } from "../utils/id";

let seedPromise: Promise<void> | null = null;

export function ensureLifeOsSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed();
  }
  return seedPromise;
}

async function runSeed(): Promise<void> {
  const db = getLifeOsDb();
  const now = Date.now();

  await db.transaction(
    "rw",
    [db.daily_questions, db.habits, db.settings],
    async () => {
      const questionCount = await db.daily_questions.count();
      if (questionCount === 0) {
        await db.daily_questions.bulkAdd(
          DEFAULT_DAILY_QUESTIONS.map((q) => ({ ...q, id: generateId() }))
        );
      }

      const habitCount = await db.habits.count();
      if (habitCount === 0) {
        await db.habits.bulkAdd(
          DEFAULT_HABITS.map((h, index) => ({
            ...h,
            id: generateId(),
            order: index,
            createdAt: now,
            updatedAt: now,
          }))
        );
      }

      const settings = await db.settings.get("singleton");
      if (!settings) {
        await db.settings.put(DEFAULT_SETTINGS);
      }
    }
  );
}
