"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Dumbbell, Moon, Droplets } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { StatCard } from "@/components/lifeos/ui/StatCard";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { TodayFitnessEditor } from "./TodayFitnessEditor";
import { FitnessHistoryItem } from "./FitnessHistoryItem";
import { useFitnessEntries } from "@/lib/lifeos/hooks/useFitness";
import { todayKey } from "@/lib/lifeos/utils/date";

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function FitnessPageClient() {
  const { entries, saveEntryForDate, deleteEntry } = useFitnessEntries();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const date = todayKey();

  const latestWeight = entries.find((e) => e.weightKg != null)?.weightKg ?? null;

  const recentSleep = entries
    .filter((e) => e.sleepHours != null)
    .slice(0, 7)
    .map((e) => e.sleepHours as number);
  const avgSleep = average(recentSleep);

  const recentWater = entries
    .filter((e) => e.waterLiters != null)
    .slice(0, 7)
    .map((e) => e.waterLiters as number);
  const avgWater = average(recentWater);

  const history = entries.filter((e) => e.date !== date);

  return (
    <>
      <SectionHeader title="Fitness" subtitle="Today's stats and your recent trend" />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2, mb: 3 }}>
        <StatCard
          icon={Dumbbell}
          label="Latest Weight"
          value={latestWeight != null ? latestWeight : "–"}
          sublabel={latestWeight != null ? "kg" : undefined}
          color="#2b5cff"
        />
        <StatCard
          icon={Moon}
          label="Avg Sleep"
          value={avgSleep != null ? avgSleep.toFixed(1) : "–"}
          sublabel={avgSleep != null ? "hrs / last 7 logged" : undefined}
          color="#8b5cf6"
        />
        <StatCard
          icon={Droplets}
          label="Avg Water"
          value={avgWater != null ? avgWater.toFixed(1) : "–"}
          sublabel={avgWater != null ? "L / last 7 logged" : undefined}
          color="#10b981"
        />
      </Box>

      <TodayFitnessEditor saveEntryForDate={saveEntryForDate} />

      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "text.secondary", mt: 4, mb: 1.5 }}>
        PAST ENTRIES
      </Typography>

      {history.length === 0 ? (
        <EmptyState icon={Dumbbell} title="No past entries" description="Your fitness history will appear here." />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {history.slice(0, 30).map((entry) => (
            <FitnessHistoryItem key={entry.id} entry={entry} onDelete={() => setDeletingId(entry.id)} />
          ))}
        </Box>
      )}

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete fitness entry?"
        description="This entry will be permanently removed."
        onConfirm={() => {
          if (deletingId) deleteEntry(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
