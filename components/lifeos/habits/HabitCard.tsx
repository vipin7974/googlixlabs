"use client";

import { Box, Card, Checkbox, IconButton, Typography } from "@mui/material";
import { Flame, Minus, Pencil, Plus, Trash2 } from "lucide-react";
import { LifeOsIcon } from "@/components/lifeos/ui/Icon";
import { Heatmap } from "@/components/lifeos/ui/Heatmap";
import { useHabitLogsAll, useHabitStreak } from "@/lib/lifeos/hooks/useHabits";
import { lastNDayKeys } from "@/lib/lifeos/utils/date";
import type { Habit, HabitLog } from "@/lib/lifeos/types/habit";

export function HabitCard({
  habit,
  todayLog,
  onToggle,
  onSetCount,
  onEdit,
  onArchive,
}: {
  habit: Habit;
  todayLog: HabitLog | undefined;
  onToggle: () => void;
  onSetCount: (count: number) => void;
  onEdit: () => void;
  onArchive: () => void;
}) {
  const streak = useHabitStreak(habit.id);
  const logs = useHabitLogsAll(habit.id);
  const dayKeys = lastNDayKeys(84);
  const valueByDate: Record<string, number> = {};
  logs.forEach((log) => {
    if (log.done) valueByDate[log.date] = log.count || 1;
  });

  const currentCount = todayLog?.count ?? 0;
  const isCounter = habit.targetPerDay > 1;

  return (
    <Card sx={{ p: 2.25 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: `${habit.color}1a`,
            color: habit.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LifeOsIcon name={habit.icon} size={18} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{habit.name}</Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary", display: "flex", alignItems: "center", gap: 0.4 }}>
            <Flame size={12} color="#f5a623" /> {streak.current} day streak · best {streak.longest}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onEdit}>
          <Pencil size={14} />
        </IconButton>
        <IconButton size="small" onClick={onArchive}>
          <Trash2 size={14} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        {isCounter ? (
          <>
            <IconButton size="small" onClick={() => onSetCount(Math.max(0, currentCount - 1))}>
              <Minus size={14} />
            </IconButton>
            <Typography sx={{ fontWeight: 700, minWidth: 60, textAlign: "center" }}>
              {currentCount}/{habit.targetPerDay} {habit.unit}
            </Typography>
            <IconButton size="small" onClick={() => onSetCount(currentCount + 1)}>
              <Plus size={14} />
            </IconButton>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox checked={Boolean(todayLog?.done)} onChange={onToggle} sx={{ p: 0.5 }} />
            <Typography sx={{ fontSize: 13.5 }}>{todayLog?.done ? "Done today" : "Mark as done"}</Typography>
          </Box>
        )}
      </Box>

      <Heatmap dayKeys={dayKeys} valueByDate={valueByDate} color={habit.color} />
    </Card>
  );
}
