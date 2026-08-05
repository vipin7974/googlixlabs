"use client";

import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Pause, Play, RotateCcw, Square } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { StatCard } from "@/components/lifeos/ui/StatCard";
import { useCountdown } from "@/lib/lifeos/hooks/useCountdown";
import { useDeepWorkSessions } from "@/lib/lifeos/hooks/useDeepWork";
import { todayKey } from "@/lib/lifeos/utils/date";
import { POMODORO_PRESETS } from "@/lib/lifeos/types/timer";
import { Timer as TimerIcon, Flame } from "lucide-react";

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function TimerPageClient() {
  const date = todayKey();
  const { sessions, startSession, completeSession, discardSession } = useDeepWorkSessions(date);
  const [label, setLabel] = useState("");
  const [customMinutes, setCustomMinutes] = useState(45);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [plannedMinutes, setPlannedMinutes] = useState(0);

  const { remainingSeconds, totalSeconds, running, elapsedMinutes, start, pause, resume, reset } = useCountdown(() => {
    if (activeSessionId) {
      completeSession(activeSessionId, plannedMinutes);
      setActiveSessionId(null);
    }
  });

  const isActive = totalSeconds > 0;

  async function handleStart(minutes: number) {
    const session = await startSession({
      date,
      durationMinutes: 0,
      plannedMinutes: minutes,
      label: label.trim() || "Deep Work Session",
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
      if (markComplete) {
        await completeSession(activeSessionId, Math.max(1, elapsedMinutes));
      } else {
        await discardSession(activeSessionId);
      }
    }
    setActiveSessionId(null);
    reset();
  }

  const totalTodayMinutes = sessions.filter((s) => s.completed).reduce((sum, s) => sum + s.durationMinutes, 0);
  const progressPercent = totalSeconds > 0 ? Math.round(((totalSeconds - remainingSeconds) / totalSeconds) * 100) : 0;

  return (
    <>
      <SectionHeader title="Deep Work Timer" subtitle="Track focused, uninterrupted work sessions" />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
        <StatCard icon={TimerIcon} label="Deep Work Today" value={`${totalTodayMinutes}m`} color="#8b5cf6" />
        <StatCard icon={Flame} label="Sessions Today" value={sessions.filter((s) => s.completed).length} color="#f5a623" />
      </Box>

      <Card sx={{ p: 4, textAlign: "center" }}>
        {!isActive ? (
          <>
            <TextField
              placeholder="What are you working on?"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              fullWidth
              sx={{ maxWidth: 420, mx: "auto", mb: 3 }}
            />
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap", mb: 2.5 }}>
              {POMODORO_PRESETS.map((preset) => (
                <Button key={preset} variant="outlined" onClick={() => handleStart(preset)} sx={{ minWidth: 90 }}>
                  {preset} min
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
              <TextField
                type="number"
                size="small"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Number(e.target.value))}
                sx={{ width: 100 }}
              />
              <Button variant="contained" startIcon={<Play size={16} />} onClick={() => handleStart(customMinutes)}>
                Start Custom
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 1 }}>
              {label || "Deep Work Session"}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 56, sm: 76 },
                fontWeight: 800,
                fontFamily: "var(--font-mono), monospace",
                lineHeight: 1,
                mb: 3,
              }}
            >
              {formatClock(remainingSeconds)}
            </Typography>
            <Box sx={{ maxWidth: 320, mx: "auto", mb: 3 }}>
              <Box
                sx={{
                  height: 6,
                  borderRadius: 6,
                  bgcolor: "action.hover",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ height: "100%", width: `${progressPercent}%`, bgcolor: "primary.main", transition: "width 0.3s" }} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
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
              <Button variant="text" color="error" startIcon={<RotateCcw size={16} />} onClick={() => handleStop(false)}>
                Discard
              </Button>
            </Box>
          </>
        )}
      </Card>

      {sessions.length > 0 && (
        <>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "text.secondary", mt: 4, mb: 1.5 }}>
            TODAY&apos;S SESSIONS
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {sessions.map((s) => (
              <Card key={s.id} sx={{ p: 1.75, display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 13.5 }}>{s.label}</Typography>
                <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
                  {s.completed ? `${s.durationMinutes}m completed` : "Discarded"}
                </Typography>
              </Card>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
