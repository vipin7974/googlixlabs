import Dexie, { type Table } from "dexie";
import type { Task } from "../types/task";
import type { Goal } from "../types/goal";
import type { DailyEntry, DailyQuestionDefinition } from "../types/daily";
import type { Idea } from "../types/idea";
import type { Habit, HabitLog } from "../types/habit";
import type { JournalEntry } from "../types/journal";
import type { WeeklyReview, MonthlyReview } from "../types/review";
import type { LearningEntry } from "../types/learning";
import type { FitnessEntry } from "../types/fitness";
import type { FinanceEntry } from "../types/finance";
import type { BookEntry } from "../types/book";
import type { VisionItem } from "../types/vision";
import type { DeepWorkSession } from "../types/timer";
import type { WorkoutSession } from "../types/workout";
import type { Settings } from "../types/settings";
import type { Challenge, ChallengeLog } from "../types/challenge";

export class LifeOsDatabase extends Dexie {
  tasks!: Table<Task, string>;
  goals!: Table<Goal, string>;
  daily_entries!: Table<DailyEntry, string>;
  daily_questions!: Table<DailyQuestionDefinition, string>;
  ideas!: Table<Idea, string>;
  habits!: Table<Habit, string>;
  habit_logs!: Table<HabitLog, string>;
  journal!: Table<JournalEntry, string>;
  weekly_reviews!: Table<WeeklyReview, string>;
  monthly_reviews!: Table<MonthlyReview, string>;
  learning!: Table<LearningEntry, string>;
  fitness!: Table<FitnessEntry, string>;
  finance!: Table<FinanceEntry, string>;
  books!: Table<BookEntry, string>;
  vision_board!: Table<VisionItem, string>;
  deep_work_sessions!: Table<DeepWorkSession, string>;
  workout_sessions!: Table<WorkoutSession, string>;
  settings!: Table<Settings, string>;
  challenges!: Table<Challenge, string>;
  challenge_logs!: Table<ChallengeLog, string>;

  constructor() {
    super("lifeos");

    this.version(1).stores({
      tasks: "id, date, status, priority, order, deadline",
      goals: "id, parentId, level, archived, deadline",
      daily_entries: "id, date",
      daily_questions: "id, order, active",
      ideas: "id, date, status, category, priority",
      habits: "id, order, archived",
      habit_logs: "id, habitId, date, [habitId+date]",
      journal: "id, date, type, [date+type]",
      weekly_reviews: "id, weekStart",
      monthly_reviews: "id, month",
      learning: "id, date, technology",
      fitness: "id, date",
      finance: "id, date, type, category",
      books: "id, mediaType, completion",
      vision_board: "id, order, category",
      deep_work_sessions: "id, date",
      settings: "id",
    });

    // Additive only: existing tables from v1 carry forward untouched: only
    // the new workout_sessions store needs declaring here.
    this.version(2).stores({
      workout_sessions: "id, date, startedAt",
    });

    // Additive only: fixed-duration challenge trackers (e.g. "no sugar for
    // 30 days"), distinct from the recurring habits above.
    this.version(3).stores({
      challenges: "id, archived, startDate",
      challenge_logs: "id, challengeId, date, [challengeId+date]",
    });
  }
}

let dbInstance: LifeOsDatabase | null = null;

export function getLifeOsDb(): LifeOsDatabase {
  if (typeof window === "undefined") {
    throw new Error("LifeOS database can only be accessed in the browser");
  }
  if (!dbInstance) {
    dbInstance = new LifeOsDatabase();
  }
  return dbInstance;
}
