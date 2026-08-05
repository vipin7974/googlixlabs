"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Check } from "lucide-react";
import { useFitnessEntry } from "@/lib/lifeos/hooks/useFitness";
import { todayKey } from "@/lib/lifeos/utils/date";
import type { FitnessDraft } from "@/lib/lifeos/types/fitness";

type NumericField = "weightKg" | "bodyFatPercent" | "calories" | "proteinGrams" | "waterLiters" | "sleepHours";

const NUMERIC_FIELDS: { key: NumericField; label: string; step?: string }[] = [
  { key: "weightKg", label: "Weight (kg)", step: "0.1" },
  { key: "bodyFatPercent", label: "Body Fat (%)", step: "0.1" },
  { key: "calories", label: "Calories" },
  { key: "proteinGrams", label: "Protein (g)" },
  { key: "waterLiters", label: "Water (L)", step: "0.1" },
  { key: "sleepHours", label: "Sleep (hrs)", step: "0.1" },
];

export function TodayFitnessEditor({
  saveEntryForDate,
}: {
  saveEntryForDate: (date: string, draft: Omit<FitnessDraft, "date">) => Promise<void>;
}) {
  const date = todayKey();
  const entry = useFitnessEntry(date);

  const [workout, setWorkout] = useState("");
  const [notes, setNotes] = useState("");
  const [numbers, setNumbers] = useState<Record<NumericField, string>>({
    weightKg: "",
    bodyFatPercent: "",
    calories: "",
    proteinGrams: "",
    waterLiters: "",
    sleepHours: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setWorkout(entry?.workout ?? "");
    setNotes(entry?.notes ?? "");
    setNumbers({
      weightKg: entry?.weightKg != null ? String(entry.weightKg) : "",
      bodyFatPercent: entry?.bodyFatPercent != null ? String(entry.bodyFatPercent) : "",
      calories: entry?.calories != null ? String(entry.calories) : "",
      proteinGrams: entry?.proteinGrams != null ? String(entry.proteinGrams) : "",
      waterLiters: entry?.waterLiters != null ? String(entry.waterLiters) : "",
      sleepHours: entry?.sleepHours != null ? String(entry.sleepHours) : "",
    });
  }, [entry?.id, date]);

  function updateNumber(key: NumericField, value: string) {
    setNumbers((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    await saveEntryForDate(date, {
      workout,
      notes,
      weightKg: numbers.weightKg === "" ? null : Number(numbers.weightKg),
      bodyFatPercent: numbers.bodyFatPercent === "" ? null : Number(numbers.bodyFatPercent),
      calories: numbers.calories === "" ? null : Number(numbers.calories),
      proteinGrams: numbers.proteinGrams === "" ? null : Number(numbers.proteinGrams),
      waterLiters: numbers.waterLiters === "" ? null : Number(numbers.waterLiters),
      sleepHours: numbers.sleepHours === "" ? null : Number(numbers.sleepHours),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.25 }}>
      <TextField
        label="Workout"
        placeholder="e.g. Push day, 5k run, Rest day"
        value={workout}
        onChange={(e) => setWorkout(e.target.value)}
        fullWidth
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
        {NUMERIC_FIELDS.map((field) => (
          <TextField
            key={field.key}
            label={field.label}
            type="number"
            value={numbers[field.key]}
            onChange={(e) => updateNumber(field.key, e.target.value)}
            slotProps={{ htmlInput: { step: field.step ?? "1" } }}
            fullWidth
          />
        ))}
      </Box>

      <TextField
        label="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        multiline
        minRows={3}
        fullWidth
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button variant="contained" onClick={handleSave}>
          Save Today's Entry
        </Button>
        {saved && (
          <Typography sx={{ fontSize: 13, color: "success.main", display: "flex", alignItems: "center", gap: 0.5 }}>
            <Check size={14} /> Saved
          </Typography>
        )}
      </Box>
    </Card>
  );
}
