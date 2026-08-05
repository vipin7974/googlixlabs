"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Checkbox, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { Plus, X } from "lucide-react";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { PRIORITY_LABELS } from "@/lib/lifeos/types/common";
import { GOAL_LEVEL_LABELS, type GoalLevel } from "@/lib/lifeos/types/goal";
import { generateId } from "@/lib/lifeos/utils/id";
import type { Goal, Milestone } from "@/lib/lifeos/types/goal";

const goalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  level: z.enum(["life_vision", "five_year", "one_year", "quarter", "monthly", "weekly", "today"]),
  parentId: z.string(),
  reason: z.string().max(1000).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  deadlineDate: z.string().optional(),
  progress: z.number().min(0).max(100),
});

type GoalFormValues = z.infer<typeof goalSchema>;

export function GoalForm({
  open,
  onClose,
  onSubmit,
  initialGoal,
  defaultLevel,
  defaultParentId,
  parentOptions,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    level: GoalLevel;
    parentId: string | null;
    reason: string;
    priority: Goal["priority"];
    deadline: number | null;
    progress: number;
    milestones: Milestone[];
  }) => void;
  initialGoal?: Goal;
  defaultLevel: GoalLevel;
  defaultParentId?: string | null;
  parentOptions: Goal[];
}) {
  const [milestones, setMilestones] = useState<Milestone[]>(initialGoal?.milestones ?? []);
  const [newMilestone, setNewMilestone] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: initialGoal?.title ?? "",
      level: initialGoal?.level ?? defaultLevel,
      parentId: initialGoal?.parentId ?? defaultParentId ?? "",
      reason: initialGoal?.reason ?? "",
      priority: initialGoal?.priority ?? "medium",
      deadlineDate: initialGoal?.deadline ? new Date(initialGoal.deadline).toISOString().slice(0, 10) : "",
      progress: initialGoal?.progress ?? 0,
    },
  });

  function addMilestone() {
    const title = newMilestone.trim();
    if (!title) return;
    setMilestones((prev) => [...prev, { id: generateId(), title, done: false, targetDate: null }]);
    setNewMilestone("");
  }

  function submit(values: GoalFormValues) {
    onSubmit({
      title: values.title.trim(),
      level: values.level,
      parentId: values.parentId || null,
      reason: values.reason?.trim() ?? "",
      priority: values.priority,
      deadline: values.deadlineDate ? new Date(values.deadlineDate).getTime() : null,
      progress: values.progress,
      milestones,
    });
    reset();
    setMilestones([]);
  }

  return (
    <FormDialog
      open={open}
      title={initialGoal ? "Edit Goal" : "New Goal"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialGoal ? "Save Changes" : "Add Goal"}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Goal title" autoFocus fullWidth error={!!errors.title} helperText={errors.title?.message} />
        )}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Level" sx={{ flex: 1 }}>
              {Object.entries(GOAL_LEVEL_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Priority" sx={{ flex: 1 }}>
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      {parentOptions.length > 0 && (
        <Controller
          name="parentId"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Parent goal (optional)" fullWidth>
              <MenuItem value="">No parent</MenuItem>
              {parentOptions.map((goal) => (
                <MenuItem key={goal.id} value={goal.id}>
                  {goal.title}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}

      <Controller
        name="reason"
        control={control}
        render={({ field }) => <TextField {...field} label="Why does this matter?" fullWidth multiline minRows={2} />}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="deadlineDate"
          control={control}
          render={({ field }) => (
            <TextField {...field} type="date" label="Deadline" sx={{ flex: 1 }} slotProps={{ inputLabel: { shrink: true } }} />
          )}
        />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary", mb: 0.75 }}>MILESTONES</Typography>
        {milestones.map((m) => (
          <Box key={m.id} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Checkbox
              size="small"
              checked={m.done}
              onChange={() =>
                setMilestones((prev) => prev.map((x) => (x.id === m.id ? { ...x, done: !x.done } : x)))
              }
            />
            <Typography sx={{ fontSize: 13.5, flex: 1, textDecoration: m.done ? "line-through" : "none" }}>
              {m.title}
            </Typography>
            <IconButton size="small" onClick={() => setMilestones((prev) => prev.filter((x) => x.id !== m.id))}>
              <X size={14} />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            size="small"
            placeholder="Add milestone"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addMilestone();
              }
            }}
            fullWidth
          />
          <IconButton size="small" onClick={addMilestone}>
            <Plus size={16} />
          </IconButton>
        </Box>
      </Box>
    </FormDialog>
  );
}
