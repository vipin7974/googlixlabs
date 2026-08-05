"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Box, Card, Chip, Typography } from "@mui/material";
import {
  Flame,
  Gauge,
  CheckSquare,
  Target,
  ListTodo,
  Quote as QuoteIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { StatCard } from "@/components/lifeos/ui/StatCard";
import { ProgressBar } from "@/components/lifeos/ui/ProgressBar";
import { PriorityBadge } from "@/components/lifeos/ui/PriorityBadge";
import { useTasks } from "@/lib/lifeos/hooks/useTasks";
import { useGoals } from "@/lib/lifeos/hooks/useGoals";
import { useHabits, useHabitLogsForDate, useAllHabitStreaks } from "@/lib/lifeos/hooks/useHabits";
import { useDailyEntry, useDailyQuestions } from "@/lib/lifeos/hooks/useDaily";
import { useSettings } from "@/lib/lifeos/hooks/useSettings";
import { todayKey, formatDisplayDate } from "@/lib/lifeos/utils/date";
import {
  taskCompletionPercent,
  habitCompletionPercent,
  dailyQuestionsAnsweredPercent,
  computeFocusScore,
} from "@/lib/lifeos/utils/score";
import { quoteForDayOfYear } from "@/lib/lifeos/constants/quotes";

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export function DashboardPageClient() {
  const date = todayKey();
  const { tasks } = useTasks(date);
  const { goals } = useGoals();
  const { habits } = useHabits();
  const { logs } = useHabitLogsForDate(date);
  const streaksByHabitId = useAllHabitStreaks();
  const { questions } = useDailyQuestions();
  const { entry } = useDailyEntry(date);
  const { settings } = useSettings();

  const taskCompletion = taskCompletionPercent(tasks);
  const habitCompletion = habitCompletionPercent(habits, logs);
  const questionsAnswered = dailyQuestionsAnsweredPercent(entry, questions.length);
  const focusScore = computeFocusScore({
    taskCompletion,
    habitCompletion,
    dailyQuestionsAnswered: questionsAnswered,
  });

  const activeGoals = goals.filter((g) => g.level === "today" || g.level === "weekly");
  const avgGoalProgress = activeGoals.length
    ? Math.round(activeGoals.reduce((sum, g) => sum + g.progress, 0) / activeGoals.length)
    : 0;

  const pendingTasks = tasks.filter((t) => t.status !== "done").slice(0, 6);

  const bestStreak = useMemo(() => {
    let best = { habitName: "", current: 0 };
    habits.forEach((h) => {
      const current = streaksByHabitId.get(h.id)?.current ?? 0;
      if (current > best.current) best = { habitName: h.name, current };
    });
    return best;
  }, [habits, streaksByHabitId]);

  const quote = quoteForDayOfYear(dayOfYear(new Date()));

  return (
    <>
      <SectionHeader title="Dashboard" subtitle={formatDisplayDate(date)} />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", lg: "repeat(7, 1fr)" }, gap: 2, mb: 3 }}>
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={bestStreak.current}
          sublabel={bestStreak.habitName || "No active streak"}
          color="#f5a623"
        />
        <StatCard icon={Gauge} label="Focus Score" value={`${focusScore}`} sublabel="out of 100" color="#2b5cff" />
        <StatCard icon={CheckSquare} label="Task Completion" value={`${taskCompletion}%`} color="#10b981" />
        <StatCard icon={Flame} label="Habit Completion" value={`${habitCompletion}%`} color="#f5a623" />
        <StatCard icon={Target} label="Goal Progress" value={`${avgGoalProgress}%`} color="#8b5cf6" />
        <StatCard icon={ListTodo} label="Pending Tasks" value={tasks.filter((t) => t.status !== "done").length} color="#e5484d" />
        <StatCard icon={CheckSquare} label="Daily Qs Answered" value={`${questionsAnswered}%`} color="#0ea5e9" />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 2.5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Card sx={{ p: 2.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1.5 }}>Today&apos;s Focus</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
              <ProgressBar label="Tasks" value={taskCompletion} />
              <ProgressBar label="Habits" value={habitCompletion} color="#f5a623" />
              <ProgressBar label="Daily Questions" value={questionsAnswered} color="#0ea5e9" />
            </Box>
          </Card>

          <Card sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>Pending Tasks</Typography>
              <Link href="/lifeos/tasks" style={{ fontSize: 13, color: "inherit" }}>
                View all →
              </Link>
            </Box>
            {pendingTasks.length === 0 ? (
              <Typography sx={{ fontSize: 13.5, color: "text.secondary" }}>
                Nothing pending — nice work today.
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {pendingTasks.map((task) => (
                  <Box key={task.id} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <Typography sx={{ fontSize: 13.5, flex: 1 }}>{task.title}</Typography>
                    <PriorityBadge priority={task.priority} />
                  </Box>
                ))}
              </Box>
            )}
          </Card>

          {habits.length > 0 && (
            <Card sx={{ p: 2.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1.5 }}>Habits Today</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {habits.map((h) => {
                  const done = logs.find((l) => l.habitId === h.id)?.done;
                  return (
                    <Chip
                      key={h.id}
                      label={h.name}
                      size="small"
                      sx={{
                        bgcolor: done ? `${h.color}1a` : "action.hover",
                        color: done ? h.color : "text.secondary",
                        fontWeight: 600,
                      }}
                    />
                  );
                })}
              </Box>
            </Card>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Card sx={{ p: 2.5 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary", mb: 1 }}>
              LIFE MISSION
            </Typography>
            <Typography sx={{ fontSize: 14.5, fontStyle: "italic" }}>{settings.lifeMission}</Typography>
          </Card>

          <Card sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <QuoteIcon size={16} />
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary" }}>TODAY&apos;S QUOTE</Typography>
            </Box>
            <Typography sx={{ fontSize: 14.5, mb: 0.75 }}>&ldquo;{quote.quote}&rdquo;</Typography>
            <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>— {quote.author}</Typography>
          </Card>

          <Card sx={{ p: 2.5 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary", mb: 1 }}>
              QUICK LINKS
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              <Link href="/lifeos/focus" style={{ fontSize: 13.5 }}>
                Enter Focus Mode →
              </Link>
              <Link href="/lifeos/daily" style={{ fontSize: 13.5 }}>
                Answer daily questions →
              </Link>
              <Link href="/lifeos/analytics" style={{ fontSize: 13.5 }}>
                View life dashboard →
              </Link>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}
