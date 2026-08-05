"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MenuItem,
  Slider,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { PRIORITY_LABELS, type Priority, type TaskStatus } from "@/lib/lifeos/types/common";
import type { Task } from "@/lib/lifeos/types/task";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  priority: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum(["todo", "in_progress", "done", "skipped"]),
  category: z.string().max(60).optional(),
  estimatedMinutes: z.coerce.number().min(0).max(1440).optional(),
  actualMinutes: z.coerce.number().min(0).max(1440).optional(),
  deadlineTime: z.string().optional(),
  progress: z.number().min(0).max(100),
  notes: z.string().max(2000).optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "skipped", label: "Skipped" },
];

function toDeadlineInput(deadline: number | null): string {
  if (!deadline) return "";
  const d = new Date(deadline);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function TaskForm({
  open,
  onClose,
  onSubmit,
  initialTask,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    priority: Priority;
    status: TaskStatus;
    category: string;
    estimatedMinutes: number | null;
    actualMinutes: number | null;
    deadline: number | null;
    progress: number;
    notes: string;
  }) => void;
  initialTask?: Task;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialTask?.title ?? "",
      priority: initialTask?.priority ?? "medium",
      status: initialTask?.status ?? "todo",
      category: initialTask?.category ?? "",
      estimatedMinutes: initialTask?.estimatedMinutes ?? undefined,
      actualMinutes: initialTask?.actualMinutes ?? undefined,
      deadlineTime: toDeadlineInput(initialTask?.deadline ?? null),
      progress: initialTask?.progress ?? 0,
      notes: initialTask?.notes ?? "",
    },
  });

  function submit(values: TaskFormValues) {
    onSubmit({
      title: values.title.trim(),
      priority: values.priority,
      status: values.status,
      category: values.category?.trim() ?? "",
      estimatedMinutes: values.estimatedMinutes ?? null,
      actualMinutes: values.actualMinutes ?? null,
      deadline: values.deadlineTime ? new Date(values.deadlineTime).getTime() : null,
      progress: values.progress,
      notes: values.notes?.trim() ?? "",
    });
    reset();
  }

  return (
    <FormDialog
      open={open}
      title={initialTask ? "Edit Task" : "New Task"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialTask ? "Save Changes" : "Add Task"}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Task title"
            autoFocus
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Priority" sx={{ minWidth: 150, flex: 1 }}>
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Status" sx={{ minWidth: 150, flex: 1 }}>
              {STATUS_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      <Controller
        name="category"
        control={control}
        render={({ field }) => <TextField {...field} label="Category" fullWidth placeholder="e.g. Work, Health, Learning" />}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="estimatedMinutes"
          control={control}
          render={({ field }) => (
            <TextField {...field} type="number" label="Estimated (min)" sx={{ flex: 1 }} />
          )}
        />
        <Controller
          name="actualMinutes"
          control={control}
          render={({ field }) => (
            <TextField {...field} type="number" label="Actual (min)" sx={{ flex: 1 }} />
          )}
        />
      </Box>

      <Controller
        name="deadlineTime"
        control={control}
        render={({ field }) => (
          <TextField {...field} type="datetime-local" label="Deadline" fullWidth slotProps={{ inputLabel: { shrink: true } }} />
        )}
      />

      <Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>Progress</Typography>
        <Controller
          name="progress"
          control={control}
          render={({ field }) => (
            <Slider
              value={field.value}
              onChange={(_, v) => field.onChange(v as number)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          )}
        />
      </Box>

      <Controller
        name="notes"
        control={control}
        render={({ field }) => <TextField {...field} label="Notes" fullWidth multiline minRows={3} />}
      />
    </FormDialog>
  );
}
