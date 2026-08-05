"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Plus, Flame } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { HeatmapLegend } from "@/components/lifeos/ui/Heatmap";
import { HabitCard } from "./HabitCard";
import { HabitForm } from "./HabitForm";
import { useHabits, useHabitLogsForDate } from "@/lib/lifeos/hooks/useHabits";
import { todayKey } from "@/lib/lifeos/utils/date";
import { habitCompletionPercent } from "@/lib/lifeos/utils/score";
import type { Habit } from "@/lib/lifeos/types/habit";

export function HabitsPageClient() {
  const date = todayKey();
  const { habits, createHabit, updateHabit, archiveHabit } = useHabits();
  const { logs, toggleHabit, setHabitCount } = useHabitLogsForDate(date);
  const [formOpen, setFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  const completion = habitCompletionPercent(habits, logs);

  return (
    <>
      <SectionHeader
        title="Habit Tracker"
        subtitle={`${completion}% of today's habits complete`}
        action={
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => {
              setEditingHabit(undefined);
              setFormOpen(true);
            }}
          >
            Add Habit
          </Button>
        }
      />

      {habits.length === 0 ? (
        <EmptyState
          icon={Flame}
          title="No habits yet"
          description="Track the small daily actions that compound into who you become."
          actionLabel="Add Habit"
          onAction={() => setFormOpen(true)}
        />
      ) : (
        <>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 2 }}>
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                todayLog={logs.find((l) => l.habitId === habit.id)}
                onToggle={() => toggleHabit(habit.id, habit.targetPerDay)}
                onSetCount={(count) => setHabitCount(habit.id, count, habit.targetPerDay)}
                onEdit={() => {
                  setEditingHabit(habit);
                  setFormOpen(true);
                }}
                onArchive={() => archiveHabit(habit.id)}
              />
            ))}
          </Box>
          <HeatmapLegend />
        </>
      )}

      <HabitForm
        key={editingHabit?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialHabit={editingHabit}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingHabit) {
            await updateHabit(editingHabit.id, values);
          } else {
            await createHabit(values);
          }
          setFormOpen(false);
        }}
      />
    </>
  );
}
