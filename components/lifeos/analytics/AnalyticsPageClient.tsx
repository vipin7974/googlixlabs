"use client";

import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { GraduationCap, Dumbbell, Timer, AlertCircle, Target } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { StatCard } from "@/components/lifeos/ui/StatCard";
import { ChartCard } from "./ChartCard";
import { useAnalyticsRange } from "@/lib/lifeos/hooks/useAnalytics";
import { formatShortDate } from "@/lib/lifeos/utils/date";

export function AnalyticsPageClient() {
  const [days, setDays] = useState(30);
  const data = useAnalyticsRange(days);

  const tasksByDay = (data?.tasksByDay ?? []).map((d) => ({ ...d, label: formatShortDate(d.date) }));
  const habitsByDay = (data?.habitsByDay ?? []).map((d) => ({
    ...d,
    label: formatShortDate(d.date),
    percent: d.possible ? Math.round((d.count / d.possible) * 100) : 0,
  }));
  const moodByDay = (data?.moodByDay ?? []).map((d) => ({ ...d, label: formatShortDate(d.date) }));
  const deepWorkByDay = (data?.deepWorkByDay ?? []).map((d) => ({ ...d, label: formatShortDate(d.date) }));
  const distractionsByDay = (data?.distractionsByDay ?? []).map((d) => ({ ...d, label: formatShortDate(d.date) }));

  return (
    <>
      <SectionHeader
        title="Life Dashboard"
        subtitle="Your growth trends over time"
        action={
          <TextField select size="small" value={days} onChange={(e) => setDays(Number(e.target.value))} sx={{ minWidth: 140 }}>
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={90}>Last 90 days</MenuItem>
          </TextField>
        }
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(5, 1fr)" }, gap: 2, mb: 3 }}>
        <StatCard icon={Target} label="Goal Completion" value={`${data?.avgGoalProgress ?? 0}%`} color="#2b5cff" />
        <StatCard icon={GraduationCap} label="Learning Hours" value={data?.learningHours ?? 0} color="#3b82f6" />
        <StatCard icon={Dumbbell} label="Gym Days" value={data?.gymDays ?? 0} color="#e5484d" />
        <StatCard
          icon={Timer}
          label="Deep Work Hours"
          value={Math.round(((data?.totalDeepWorkMinutes ?? 0) / 60) * 10) / 10}
          color="#8b5cf6"
        />
        <StatCard icon={AlertCircle} label="Distractions Logged" value={data?.totalDistractions ?? 0} color="#f5a623" />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
        <ChartCard title="Tasks Completed">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tasksByDay}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" fontSize={11} interval="preserveStartEnd" />
              <YAxis fontSize={11} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Total" fill="#d4d4d0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="done" name="Done" fill="#2b5cff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Habit Completion %">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={habitsByDay}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" fontSize={11} interval="preserveStartEnd" />
              <YAxis fontSize={11} domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="percent" name="Completion %" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mood, Energy & Stress">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodByDay}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" fontSize={11} interval="preserveStartEnd" />
              <YAxis fontSize={11} domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="mood" stroke="#2b5cff" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="stress" stroke="#e5484d" strokeWidth={2} dot={false} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Deep Work Minutes">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deepWorkByDay}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" fontSize={11} interval="preserveStartEnd" />
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="minutes" name="Minutes" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distraction Count">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distractionsByDay}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" fontSize={11} interval="preserveStartEnd" />
              <YAxis fontSize={11} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" name="Ideas parked" fill="#f5a623" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>
    </>
  );
}
