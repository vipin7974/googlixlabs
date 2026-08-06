import type { ID, EntityTimestamps } from "./common";

export type ExerciseSet = {
  id: ID;
  reps: number;
  weightKg: number;
  completed: boolean;
};

export type WorkoutExercise = {
  id: ID;
  name: string;
  sets: ExerciseSet[];
  notes: string;
};

export type WorkoutSession = EntityTimestamps & {
  id: ID;
  date: string;
  name: string;
  exercises: WorkoutExercise[];
  startedAt: number | null;
  endedAt: number | null;
  durationMinutes: number | null;
  notes: string;
};

export type WorkoutSessionDraft = Omit<WorkoutSession, "id" | "createdAt" | "updatedAt">;

export function totalSetsCompleted(session: WorkoutSession): number {
  return session.exercises.reduce((sum, ex) => sum + ex.sets.filter((s) => s.completed).length, 0);
}

export function totalVolumeKg(session: WorkoutSession): number {
  return session.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.completed).reduce((s, set) => s + set.reps * set.weightKg, 0),
    0
  );
}
