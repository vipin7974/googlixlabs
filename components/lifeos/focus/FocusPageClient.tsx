"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Pause, Play, Square, X } from "lucide-react";
import { useDailyQuestions, useDailyEntry } from "@/lib/lifeos/hooks/useDaily";
import { useTasks } from "@/lib/lifeos/hooks/useTasks";
import { useSettings } from "@/lib/lifeos/hooks/useSettings";
import { useDeepWorkSessions } from "@/lib/lifeos/hooks/useDeepWork";
import { useCountdown } from "@/lib/lifeos/hooks/useCountdown";
import { todayKey } from "@/lib/lifeos/utils/date";
import { POMODORO_PRESETS } from "@/lib/lifeos/types/timer";

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function FocusPageClient() {
  const date = todayKey();
  const { questions } = useDailyQuestions();
  const { entry } = useDailyEntry(date);
  const { tasks } = useTasks(date);
  const { settings } = useSettings();
  const { startSession, completeSession, discardSession } = useDeepWorkSessions(date);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [plannedMinutes, setPlannedMinutes] = useState(0);

  const { remainingSeconds, totalSeconds, running, elapsedMinutes, start, pause, resume, reset } = useCountdown(() => {
    if (activeSessionId) {
      completeSession(activeSessionId, plannedMinutes);
      setActiveSessionId(null);
    }
  });

  const missionQuestion = questions.find((q) => q.prompt.toLowerCase().includes("mission"));
  const missionAnswer = missionQuestion
    ? entry?.answers.find((a) => a.questionId === missionQuestion.id)?.value
    : undefined;
  const mission = typeof missionAnswer === "string" && missionAnswer.trim() ? missionAnswer : settings.lifeMission;

  const currentTask = useMemo(() => {
    const inProgress = tasks.find((t) => t.status === "in_progress");
    if (inProgress) return inProgress;
    return tasks
      .filter((t) => t.status === "todo")
      .sort((a, b) => a.order - b.order)[0];
  }, [tasks]);

  const isActive = totalSeconds > 0;
  const progressPercent = totalSeconds > 0 ? Math.round(((totalSeconds - remainingSeconds) / totalSeconds) * 100) : 0;

  async function handleStart(minutes: number) {
    const session = await startSession({
      date,
      durationMinutes: 0,
      plannedMinutes: minutes,
      label: currentTask?.title ?? "Focus Session",
      completed: false,
      startedAt: Date.now(),
      endedAt: null,
    });
    setActiveSessionId(session.id);
    setPlannedMinutes(minutes);
    start(minutes);
  }

  async function handleStop(markComplete: boolean) {
    if (activeSessionId) {
      if (markComplete) await completeSession(activeSessionId, Math.max(1, elapsedMinutes));
      else await discardSession(activeSessionId);
    }
    setActiveSessionId(null);
    reset();
  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 3,
        textAlign: "center",
      }}
    >
      <Link href="/lifeos" style={{ position: "absolute", top: 24, right: 24 }}>
        <IconButton>
          <X size={22} />
        </IconButton>
      </Link>

      <Typography sx={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary", mb: 1.5 }}>
        Today&apos;s ONE Mission
      </Typography>
      <Typography
        sx={{
          fontFamily: "var(--font-bricolage)",
          fontWeight: 700,
          fontSize: { xs: 26, sm: 36 },
          maxWidth: 720,
          mb: 5,
        }}
      >
        {mission}
      </Typography>

      {currentTask && (
        <Box sx={{ mb: 5 }}>
          <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 0.5 }}>CURRENT TASK</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{currentTask.title}</Typography>
        </Box>
      )}

      {!isActive ? (
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
          {POMODORO_PRESETS.map((preset) => (
            <Button key={preset} variant="outlined" size="large" onClick={() => handleStart(preset)}>
              {preset} min
            </Button>
          ))}
        </Box>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: { xs: 64, sm: 96 },
              fontWeight: 800,
              fontFamily: "var(--font-mono), monospace",
              lineHeight: 1,
              mb: 3,
            }}
          >
            {formatClock(remainingSeconds)}
          </Typography>
          <Box sx={{ width: "100%", maxWidth: 360, mb: 3 }}>
            <Box sx={{ height: 6, borderRadius: 6, bgcolor: "action.hover", overflow: "hidden" }}>
              <Box sx={{ height: "100%", width: `${progressPercent}%`, bgcolor: "primary.main", transition: "width 0.3s" }} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {running ? (
              <Button variant="outlined" startIcon={<Pause size={16} />} onClick={pause}>
                Pause
              </Button>
            ) : (
              <Button variant="outlined" startIcon={<Play size={16} />} onClick={resume}>
                Resume
              </Button>
            )}
            <Button variant="contained" color="success" startIcon={<Square size={16} />} onClick={() => handleStop(true)}>
              Complete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
