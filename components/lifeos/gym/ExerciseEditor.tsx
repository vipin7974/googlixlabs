"use client";

import { useState } from "react";
import { Box, Card, Checkbox, IconButton, TextField, Typography } from "@mui/material";
import { Plus, Trash2, X } from "lucide-react";
import { generateId } from "@/lib/lifeos/utils/id";
import type { ExerciseSet, WorkoutExercise } from "@/lib/lifeos/types/workout";

function SetRow({
  set,
  index,
  onChange,
  onRemove,
}: {
  set: ExerciseSet;
  index: number;
  onChange: (changes: Partial<ExerciseSet>) => void;
  onRemove: () => void;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ fontSize: 12.5, color: "text.secondary", width: 20 }}>{index + 1}</Typography>
      <Checkbox
        size="small"
        checked={set.completed}
        onChange={(e) => onChange({ completed: e.target.checked })}
        sx={{ p: 0.5 }}
      />
      <TextField
        type="number"
        size="small"
        label="Reps"
        value={set.reps}
        onChange={(e) => onChange({ reps: Number(e.target.value) })}
        sx={{ width: 90 }}
      />
      <TextField
        type="number"
        size="small"
        label="Weight (kg)"
        value={set.weightKg}
        onChange={(e) => onChange({ weightKg: Number(e.target.value) })}
        sx={{ width: 120 }}
      />
      <IconButton size="small" onClick={onRemove} aria-label={`Remove set ${index + 1}`}>
        <X size={14} />
      </IconButton>
    </Box>
  );
}

export function ExerciseBlock({
  exercise,
  onChange,
  onRemove,
}: {
  exercise: WorkoutExercise;
  onChange: (changes: Partial<WorkoutExercise>) => void;
  onRemove: () => void;
}) {
  const [nameDraft, setNameDraft] = useState(exercise.name);

  function updateSet(setId: string, changes: Partial<ExerciseSet>) {
    onChange({ sets: exercise.sets.map((s) => (s.id === setId ? { ...s, ...changes } : s)) });
  }

  function removeSet(setId: string) {
    onChange({ sets: exercise.sets.filter((s) => s.id !== setId) });
  }

  function addSet() {
    const last = exercise.sets[exercise.sets.length - 1];
    onChange({
      sets: [
        ...exercise.sets,
        { id: generateId(), reps: last?.reps ?? 10, weightKg: last?.weightKg ?? 0, completed: false },
      ],
    });
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25 }}>
        <TextField
          size="small"
          value={nameDraft}
          onChange={(e) => setNameDraft(e.target.value)}
          onBlur={() => onChange({ name: nameDraft.trim() || "Exercise" })}
          placeholder="Exercise name"
          fullWidth
          variant="standard"
          sx={{ "& .MuiInputBase-input": { fontWeight: 700, fontSize: 15 } }}
        />
        <IconButton size="small" onClick={onRemove} aria-label={`Delete ${exercise.name || "exercise"}`}>
          <Trash2 size={15} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        {exercise.sets.map((set, index) => (
          <SetRow
            key={set.id}
            set={set}
            index={index}
            onChange={(changes) => updateSet(set.id, changes)}
            onRemove={() => removeSet(set.id)}
          />
        ))}
      </Box>

      <Box sx={{ mt: 1 }}>
        <IconButton size="small" onClick={addSet} sx={{ color: "primary.main" }} aria-label="Add set">
          <Plus size={16} />
        </IconButton>
      </Box>
    </Card>
  );
}
