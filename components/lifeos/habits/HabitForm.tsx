"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { LifeOsIcon, HABIT_ICON_OPTIONS } from "@/components/lifeos/ui/Icon";
import type { Habit, HabitFrequency } from "@/lib/lifeos/types/habit";

const habitSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  icon: z.string(),
  color: z.string(),
  frequency: z.enum(["daily", "weekdays", "custom"]),
  targetPerDay: z.coerce.number().min(1).max(1000),
  unit: z.string().max(20),
});

type HabitFormValues = z.infer<typeof habitSchema>;

const FREQUENCY_OPTIONS: { value: HabitFrequency; label: string }[] = [
  { value: "daily", label: "Every day" },
  { value: "weekdays", label: "Weekdays only" },
  { value: "custom", label: "Custom" },
];

const COLOR_OPTIONS = ["#e5484d", "#f5a623", "#8b5cf6", "#3b82f6", "#10b981", "#0ea5e9", "#06b6d4", "#ec4899"];

export function HabitForm({
  open,
  onClose,
  onSubmit,
  initialHabit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    name: string;
    icon: string;
    color: string;
    frequency: HabitFrequency;
    customDays: number[];
    targetPerDay: number;
    unit: string;
    archived: boolean;
  }) => void;
  initialHabit?: Habit;
}) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: initialHabit?.name ?? "",
      icon: initialHabit?.icon ?? "flame",
      color: initialHabit?.color ?? "#2b5cff",
      frequency: initialHabit?.frequency ?? "daily",
      targetPerDay: initialHabit?.targetPerDay ?? 1,
      unit: initialHabit?.unit ?? "day",
    },
  });

  const icon = watch("icon");
  const color = watch("color");

  function submit(values: HabitFormValues) {
    onSubmit({
      name: values.name.trim(),
      icon: values.icon,
      color: values.color,
      frequency: values.frequency,
      customDays: [],
      targetPerDay: values.targetPerDay,
      unit: values.unit.trim() || "time",
      archived: false,
    });
    reset();
  }

  return (
    <FormDialog
      open={open}
      title={initialHabit ? "Edit Habit" : "New Habit"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialHabit ? "Save Changes" : "Add Habit"}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Habit name" autoFocus fullWidth error={!!errors.name} helperText={errors.name?.message} />
        )}
      />

      <Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>Icon</Typography>
        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
          {HABIT_ICON_OPTIONS.map((name) => (
            <Box
              key={name}
              onClick={() => setValue("icon", name)}
              sx={{
                width: 34,
                height: 34,
                borderRadius: "9px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: icon === name ? "primary.main" : "action.hover",
                color: icon === name ? "#fff" : "text.primary",
              }}
            >
              <LifeOsIcon name={name} size={16} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>Color</Typography>
        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
          {COLOR_OPTIONS.map((c) => (
            <Box
              key={c}
              onClick={() => setValue("color", c)}
              sx={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                bgcolor: c,
                cursor: "pointer",
                border: color === c ? "2px solid" : "2px solid transparent",
                borderColor: color === c ? "text.primary" : "transparent",
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="frequency"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Frequency" sx={{ flex: 1 }}>
              {FREQUENCY_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="targetPerDay"
          control={control}
          render={({ field }) => <TextField {...field} type="number" label="Daily target" sx={{ flex: 1 }} />}
        />
        <Controller
          name="unit"
          control={control}
          render={({ field }) => <TextField {...field} label="Unit" placeholder="min, glass, session" sx={{ flex: 1 }} />}
        />
      </Box>
    </FormDialog>
  );
}
