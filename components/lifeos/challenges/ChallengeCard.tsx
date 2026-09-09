"use client";

import { Box, Card, IconButton, Typography, useTheme } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { LifeOsIcon } from "@/components/lifeos/ui/Icon";
import { ChallengeCalendar } from "./ChallengeCalendar";
import { useChallengeLogs } from "@/lib/lifeos/hooks/useChallenges";
import { computeChallengeStats } from "@/lib/lifeos/utils/challenge";
import { formatShortDate, todayKey } from "@/lib/lifeos/utils/date";
import type { Challenge } from "@/lib/lifeos/types/challenge";

export function ChallengeCard({
  challenge,
  onEdit,
  onArchive,
}: {
  challenge: Challenge;
  onEdit: () => void;
  onArchive: () => void;
}) {
  const theme = useTheme();
  const { logs, toggleDay } = useChallengeLogs(challenge.id);
  const stats = computeChallengeStats(challenge, logs);
  const doneDates = new Set(logs.filter((l) => l.done).map((l) => l.date));
  const today = todayKey();
  const track = theme.palette.action.hover;

  const statusLabel = stats.notStarted
    ? `Starts ${formatShortDate(challenge.startDate)}`
    : stats.completed
    ? "Challenge complete"
    : `Day ${stats.elapsed} of ${challenge.durationDays} · ${stats.daysLeft} ${stats.daysLeft === 1 ? "day" : "days"} left`;

  return (
    <Card sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.25 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "11px",
            bgcolor: `${challenge.color}1a`,
            color: challenge.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <LifeOsIcon name={challenge.icon} size={19} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15.5 }} noWrap>
            {challenge.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 12.5,
              color: stats.completed ? challenge.color : "text.secondary",
              fontWeight: stats.completed ? 700 : 400,
            }}
          >
            {statusLabel}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: `conic-gradient(${challenge.color} ${stats.percent * 3.6}deg, ${track} 0deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              bgcolor: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 800 }}>{stats.percent}%</Typography>
          </Box>
        </Box>

        <IconButton size="small" onClick={onEdit}>
          <Pencil size={14} />
        </IconButton>
        <IconButton size="small" onClick={onArchive}>
          <Trash2 size={14} />
        </IconButton>
      </Box>

      <ChallengeCalendar challenge={challenge} doneDates={doneDates} today={today} onToggle={toggleDay} />
    </Card>
  );
}
