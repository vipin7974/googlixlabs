"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";
import { StatusChip } from "@/components/lifeos/ui/StatusChip";
import { formatDisplayDate } from "@/lib/lifeos/utils/date";
import type { FitnessEntry } from "@/lib/lifeos/types/fitness";

export function FitnessHistoryItem({
  entry,
  onDelete,
}: {
  entry: FitnessEntry;
  onDelete: () => void;
}) {
  const chips: string[] = [];
  if (entry.weightKg != null) chips.push(`${entry.weightKg} kg`);
  if (entry.bodyFatPercent != null) chips.push(`${entry.bodyFatPercent}% BF`);
  if (entry.calories != null) chips.push(`${entry.calories} kcal`);
  if (entry.proteinGrams != null) chips.push(`${entry.proteinGrams}g protein`);
  if (entry.waterLiters != null) chips.push(`${entry.waterLiters}L water`);
  if (entry.sleepHours != null) chips.push(`${entry.sleepHours}h sleep`);

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>{formatDisplayDate(entry.date)}</Typography>
          {entry.workout && (
            <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.25 }}>{entry.workout}</Typography>
          )}
          {chips.length > 0 && (
            <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mt: 1 }}>
              {chips.map((label) => (
                <StatusChip key={label} label={label} />
              ))}
            </Box>
          )}
          {entry.notes && (
            <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 1 }}>{entry.notes}</Typography>
          )}
        </Box>
        <IconButton size="small" onClick={onDelete}>
          <Trash2 size={15} />
        </IconButton>
      </Box>
    </Card>
  );
}
