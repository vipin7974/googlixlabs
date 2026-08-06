"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Dumbbell, Plus } from "lucide-react";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { WorkoutTimer } from "./WorkoutTimer";
import { ExerciseBlock } from "./ExerciseEditor";
import { WorkoutSessionCard } from "./WorkoutSessionCard";
import { useActiveWorkoutSession, useWorkoutSessions } from "@/lib/lifeos/hooks/useWorkouts";
import { generateId } from "@/lib/lifeos/utils/id";
import { todayKey } from "@/lib/lifeos/utils/date";
import type { WorkoutExercise } from "@/lib/lifeos/types/workout";

export function WorkoutsPanel() {
  const { session: activeSession } = useActiveWorkoutSession();
  const { sessions, createSession, updateSession, deleteSession } = useWorkoutSessions();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const pastSessions = sessions.filter((s) => s.id !== activeSession?.id && s.endedAt !== null);

  async function startWorkout() {
    await createSession({
      date: todayKey(),
      name: "Workout",
      exercises: [],
      startedAt: Date.now(),
      endedAt: null,
      durationMinutes: null,
      notes: "",
    });
  }

  async function finishWorkout() {
    if (!activeSession || !activeSession.startedAt) return;
    const endedAt = Date.now();
    await updateSession(activeSession.id, {
      endedAt,
      durationMinutes: (endedAt - activeSession.startedAt) / 60000,
    });
  }

  function addExercise() {
    if (!activeSession) return;
    const newExercise: WorkoutExercise = { id: generateId(), name: "Exercise", sets: [], notes: "" };
    updateSession(activeSession.id, { exercises: [...activeSession.exercises, newExercise] });
  }

  function updateExercise(exerciseId: string, changes: Partial<WorkoutExercise>) {
    if (!activeSession) return;
    updateSession(activeSession.id, {
      exercises: activeSession.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, ...changes } : ex)),
    });
  }

  function removeExercise(exerciseId: string) {
    if (!activeSession) return;
    updateSession(activeSession.id, {
      exercises: activeSession.exercises.filter((ex) => ex.id !== exerciseId),
    });
  }

  return (
    <>
      {activeSession ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <WorkoutTimer
            session={activeSession}
            onRename={(name) => updateSession(activeSession.id, { name })}
            onFinish={finishWorkout}
          />

          {activeSession.exercises.map((exercise) => (
            <ExerciseBlock
              key={exercise.id}
              exercise={exercise}
              onChange={(changes) => updateExercise(exercise.id, changes)}
              onRemove={() => removeExercise(exercise.id)}
            />
          ))}

          <Button variant="outlined" startIcon={<Plus size={16} />} onClick={addExercise} sx={{ alignSelf: "flex-start" }}>
            Add Exercise
          </Button>
        </Box>
      ) : (
        <EmptyState
          icon={Dumbbell}
          title="No workout in progress"
          description="Start a session to time your workout and log exercises, sets, reps and weight as you go."
          actionLabel="Start Workout"
          onAction={startWorkout}
        />
      )}

      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "text.secondary", mt: 4, mb: 1.5 }}>
        PAST WORKOUTS
      </Typography>

      {pastSessions.length === 0 ? (
        <EmptyState icon={Dumbbell} title="No workouts yet" description="Completed workouts will appear here." />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {pastSessions.map((session) => (
            <WorkoutSessionCard key={session.id} session={session} onDelete={() => setDeletingId(session.id)} />
          ))}
        </Box>
      )}

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete workout?"
        description="This workout session and its logged exercises will be permanently removed."
        onConfirm={() => {
          if (deletingId) deleteSession(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
