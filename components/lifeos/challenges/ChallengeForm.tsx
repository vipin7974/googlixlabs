"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Chip, TextField, Typography } from "@mui/material";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { LifeOsIcon, HABIT_ICON_OPTIONS } from "@/components/lifeos/ui/Icon";
import { todayKey } from "@/lib/lifeos/utils/date";
import { CHALLENGE_DURATION_PRESETS } from "@/lib/lifeos/types/challenge";
import type { Challenge } from "@/lib/lifeos/types/challenge";

const challengeSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  icon: z.string(),
  color: z.string(),
  startDate: z.string().min(1, "Start date is required"),
  durationDays: z.coerce.number().min(1, "Must be at least 1 day").max(365, "Max 365 days"),
});

type ChallengeFormValues = z.infer<typeof challengeSchema>;

const COLOR_OPTIONS = ["#e5484d", "#f5a623", "#8b5cf6", "#3b82f6", "#10b981", "#0ea5e9", "#06b6d4", "#ec4899"];

export function ChallengeForm({
  open,
  onClose,
  onSubmit,
  initialChallenge,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    name: string;
    icon: string;
    color: string;
    startDate: string;
    durationDays: number;
    archived: boolean;
  }) => void;
  initialChallenge?: Challenge;
}) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      name: initialChallenge?.name ?? "",
      icon: initialChallenge?.icon ?? "target",
      color: initialChallenge?.color ?? "#2b5cff",
      startDate: initialChallenge?.startDate ?? todayKey(),
      durationDays: initialChallenge?.durationDays ?? 30,
    },
  });

  const icon = watch("icon");
  const color = watch("color");
  const durationDays = watch("durationDays");

  function submit(values: ChallengeFormValues) {
    onSubmit({
      name: values.name.trim(),
      icon: values.icon,
      color: values.color,
      startDate: values.startDate,
      durationDays: values.durationDays,
      archived: false,
    });
    reset();
  }

  return (
    <FormDialog
      open={open}
      title={initialChallenge ? "Edit Challenge" : "New Challenge"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialChallenge ? "Save Changes" : "Start Challenge"}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Challenge name"
            placeholder="No sugar, 6 AM wake up, no phone after 10pm…"
            autoFocus
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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

      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="Start date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
          />
        )}
      />

      <Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>Duration</Typography>
        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 1.25 }}>
          {CHALLENGE_DURATION_PRESETS.map((days) => (
            <Chip
              key={days}
              label={`${days} days`}
              onClick={() => setValue("durationDays", days)}
              color={durationDays === days ? "primary" : "default"}
              variant={durationDays === days ? "filled" : "outlined"}
              size="small"
            />
          ))}
        </Box>
        <Controller
          name="durationDays"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Custom days"
              fullWidth
              error={!!errors.durationDays}
              helperText={errors.durationDays?.message}
            />
          )}
        />
      </Box>
    </FormDialog>
  );
}
