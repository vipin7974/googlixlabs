"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Slider, TextField, Typography } from "@mui/material";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { todayKey } from "@/lib/lifeos/utils/date";
import type { LearningEntry } from "@/lib/lifeos/types/learning";

const learningSchema = z.object({
  date: z.string().min(1, "Date is required"),
  technology: z.string().min(1, "Technology is required").max(120),
  project: z.string().max(150).optional(),
  hours: z.coerce.number().min(0, "Hours must be 0 or more"),
  completion: z.number().min(0).max(100),
  notes: z.string().max(2000).optional(),
});

export type LearningFormValues = z.infer<typeof learningSchema>;

export function LearningForm({
  open,
  onClose,
  onSubmit,
  initialEntry,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    date: string;
    technology: string;
    project: string;
    hours: number;
    completion: number;
    notes: string;
  }) => void;
  initialEntry?: LearningEntry;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LearningFormValues>({
    resolver: zodResolver(learningSchema),
    defaultValues: {
      date: initialEntry?.date ?? todayKey(),
      technology: initialEntry?.technology ?? "",
      project: initialEntry?.project ?? "",
      hours: initialEntry?.hours ?? 0,
      completion: initialEntry?.completion ?? 0,
      notes: initialEntry?.notes ?? "",
    },
  });

  function submit(values: LearningFormValues) {
    onSubmit({
      date: values.date,
      technology: values.technology.trim(),
      project: values.project?.trim() ?? "",
      hours: values.hours,
      completion: values.completion,
      notes: values.notes?.trim() ?? "",
    });
    reset();
  }

  return (
    <FormDialog
      open={open}
      title={initialEntry ? "Edit Learning Entry" : "New Learning Entry"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialEntry ? "Save Changes" : "Add Entry"}
    >
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="Date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="technology"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Technology"
              placeholder="e.g. React, Rust"
              autoFocus
              sx={{ flex: 1, minWidth: 160 }}
              error={!!errors.technology}
              helperText={errors.technology?.message}
            />
          )}
        />
        <Controller
          name="project"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Project" placeholder="What are you applying it to?" sx={{ flex: 1, minWidth: 160 }} />
          )}
        />
      </Box>

      <Controller
        name="hours"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Hours"
            slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
            error={!!errors.hours}
            helperText={errors.hours?.message}
          />
        )}
      />

      <Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>Completion</Typography>
        <Controller
          name="completion"
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
