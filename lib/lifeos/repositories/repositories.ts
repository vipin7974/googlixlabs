import { getLifeOsDb } from "../db/schema";
import { DexieRepository } from "./base.repository";
import type { Task } from "../types/task";
import type { Goal, GoalLevel } from "../types/goal";
import type { DailyEntry, DailyQuestionDefinition } from "../types/daily";
import type { Idea } from "../types/idea";
import type { Habit, HabitLog } from "../types/habit";
import type { JournalEntry, JournalType } from "../types/journal";
import type { WeeklyReview, MonthlyReview } from "../types/review";
import type { LearningEntry } from "../types/learning";
import type { FitnessEntry } from "../types/fitness";
import type { FinanceEntry } from "../types/finance";
import type { BookEntry } from "../types/book";
import type { VisionItem } from "../types/vision";
import type { DeepWorkSession } from "../types/timer";
import type { WorkoutSession } from "../types/workout";
import { DEFAULT_SETTINGS, type Settings } from "../types/settings";

export class TaskRepository extends DexieRepository<Task> {
  constructor() {
    super(() => getLifeOsDb().tasks);
  }

  async getByDate(date: string): Promise<Task[]> {
    const rows = await this.table.where("date").equals(date).toArray();
    return rows.sort((a, b) => a.order - b.order);
  }

  async reorder(orderedIds: string[]): Promise<void> {
    await getLifeOsDb().transaction("rw", this.table, async () => {
      await Promise.all(orderedIds.map((id, index) => this.table.update(id, { order: index })));
    });
  }
}

export class GoalRepository extends DexieRepository<Goal> {
  constructor() {
    super(() => getLifeOsDb().goals);
  }

  async getByLevel(level: GoalLevel): Promise<Goal[]> {
    return this.table.where("level").equals(level).and((g) => !g.archived).toArray();
  }

  async getChildren(parentId: string): Promise<Goal[]> {
    return this.table.where("parentId").equals(parentId).toArray();
  }

  async getRoots(): Promise<Goal[]> {
    return this.table.filter((g) => g.parentId === null).toArray();
  }
}

export class DailyEntryRepository extends DexieRepository<DailyEntry> {
  constructor() {
    super(() => getLifeOsDb().daily_entries);
  }

  async getByDate(date: string): Promise<DailyEntry | undefined> {
    return this.table.where("date").equals(date).first();
  }
}

export class DailyQuestionRepository extends DexieRepository<DailyQuestionDefinition> {
  constructor() {
    super(() => getLifeOsDb().daily_questions);
  }

  async getActive(): Promise<DailyQuestionDefinition[]> {
    const rows = await this.table.toArray();
    return rows.filter((q) => q.active).sort((a, b) => a.order - b.order);
  }
}

export class IdeaRepository extends DexieRepository<Idea> {
  constructor() {
    super(() => getLifeOsDb().ideas);
  }
}

export class HabitRepository extends DexieRepository<Habit> {
  constructor() {
    super(() => getLifeOsDb().habits);
  }

  async getActive(): Promise<Habit[]> {
    const rows = await this.table.filter((h) => !h.archived).toArray();
    return rows.sort((a, b) => a.order - b.order);
  }
}

export class HabitLogRepository extends DexieRepository<HabitLog> {
  constructor() {
    super(() => getLifeOsDb().habit_logs);
  }

  async getByHabitAndDate(habitId: string, date: string): Promise<HabitLog | undefined> {
    return this.table.where("[habitId+date]").equals([habitId, date]).first();
  }

  async getByHabit(habitId: string): Promise<HabitLog[]> {
    return this.table.where("habitId").equals(habitId).toArray();
  }

  async getByDate(date: string): Promise<HabitLog[]> {
    return this.table.where("date").equals(date).toArray();
  }
}

export class JournalRepository extends DexieRepository<JournalEntry> {
  constructor() {
    super(() => getLifeOsDb().journal);
  }

  async getByDateAndType(date: string, type: JournalType): Promise<JournalEntry | undefined> {
    return this.table.where("[date+type]").equals([date, type]).first();
  }

  async getByDate(date: string): Promise<JournalEntry[]> {
    return this.table.where("date").equals(date).toArray();
  }
}

export class WeeklyReviewRepository extends DexieRepository<WeeklyReview> {
  constructor() {
    super(() => getLifeOsDb().weekly_reviews);
  }

  async getByWeekStart(weekStart: string): Promise<WeeklyReview | undefined> {
    return this.table.where("weekStart").equals(weekStart).first();
  }
}

export class MonthlyReviewRepository extends DexieRepository<MonthlyReview> {
  constructor() {
    super(() => getLifeOsDb().monthly_reviews);
  }

  async getByMonth(month: string): Promise<MonthlyReview | undefined> {
    return this.table.where("month").equals(month).first();
  }
}

export class LearningRepository extends DexieRepository<LearningEntry> {
  constructor() {
    super(() => getLifeOsDb().learning);
  }
}

export class FitnessRepository extends DexieRepository<FitnessEntry> {
  constructor() {
    super(() => getLifeOsDb().fitness);
  }

  async getByDate(date: string): Promise<FitnessEntry | undefined> {
    return this.table.where("date").equals(date).first();
  }
}

export class FinanceRepository extends DexieRepository<FinanceEntry> {
  constructor() {
    super(() => getLifeOsDb().finance);
  }
}

export class BookRepository extends DexieRepository<BookEntry> {
  constructor() {
    super(() => getLifeOsDb().books);
  }
}

export class VisionRepository extends DexieRepository<VisionItem> {
  constructor() {
    super(() => getLifeOsDb().vision_board);
  }
}

export class DeepWorkSessionRepository extends DexieRepository<DeepWorkSession> {
  constructor() {
    super(() => getLifeOsDb().deep_work_sessions);
  }

  async getByDate(date: string): Promise<DeepWorkSession[]> {
    return this.table.where("date").equals(date).toArray();
  }
}

export class WorkoutSessionRepository extends DexieRepository<WorkoutSession> {
  constructor() {
    super(() => getLifeOsDb().workout_sessions);
  }

  async getByDate(date: string): Promise<WorkoutSession[]> {
    return this.table.where("date").equals(date).toArray();
  }

  async getActive(): Promise<WorkoutSession | undefined> {
    return this.table.filter((s) => s.startedAt !== null && s.endedAt === null).first();
  }
}

export class SettingsRepository extends DexieRepository<Settings> {
  constructor() {
    super(() => getLifeOsDb().settings);
  }

  async getSettings(): Promise<Settings> {
    // Read-only by design: this is called from useLiveQuery's querier, which
    // dexie-react-hooks runs in a read-only transaction — writing here throws
    // ReadOnlyError. Seeding the default row happens once in db/seed.ts instead.
    const existing = await this.table.get("singleton");
    return existing ?? DEFAULT_SETTINGS;
  }

  async saveSettings(changes: Partial<Settings>): Promise<Settings> {
    const current = await this.getSettings();
    const next: Settings = { ...current, ...changes, id: "singleton" };
    await this.table.put(next);
    return next;
  }
}

export const taskRepository = new TaskRepository();
export const goalRepository = new GoalRepository();
export const dailyEntryRepository = new DailyEntryRepository();
export const dailyQuestionRepository = new DailyQuestionRepository();
export const ideaRepository = new IdeaRepository();
export const habitRepository = new HabitRepository();
export const habitLogRepository = new HabitLogRepository();
export const journalRepository = new JournalRepository();
export const weeklyReviewRepository = new WeeklyReviewRepository();
export const monthlyReviewRepository = new MonthlyReviewRepository();
export const learningRepository = new LearningRepository();
export const fitnessRepository = new FitnessRepository();
export const financeRepository = new FinanceRepository();
export const bookRepository = new BookRepository();
export const visionRepository = new VisionRepository();
export const deepWorkSessionRepository = new DeepWorkSessionRepository();
export const workoutSessionRepository = new WorkoutSessionRepository();
export const settingsRepository = new SettingsRepository();
