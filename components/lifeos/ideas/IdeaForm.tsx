"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, MenuItem, TextField } from "@mui/material";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { PRIORITY_LABELS } from "@/lib/lifeos/types/common";
import { IDEA_STATUS_LABELS, type BusinessPotential, type Idea, type IdeaStatus } from "@/lib/lifeos/types/idea";

const BUSINESS_POTENTIAL_LABELS: Record<BusinessPotential, string> = {
  none: "None",
  low: "Low",
  medium: "Medium",
  high: "High",
};

const ideaSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  category: z.string().max(60).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  businessPotential: z.enum(["none", "low", "medium", "high"]),
  actionLater: z.string().max(2000).optional(),
  status: z.enum(["new", "considering", "in_progress", "done", "archived"]),
});

type IdeaFormValues = z.infer<typeof ideaSchema>;

export function IdeaForm({
  open,
  onClose,
  onSubmit,
  initialIdea,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    category: string;
    priority: Idea["priority"];
    businessPotential: BusinessPotential;
    actionLater: string;
    status: IdeaStatus;
  }) => void;
  initialIdea?: Idea;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: initialIdea?.title ?? "",
      category: initialIdea?.category ?? "",
      priority: initialIdea?.priority ?? "medium",
      businessPotential: initialIdea?.businessPotential ?? "none",
      actionLater: initialIdea?.actionLater ?? "",
      status: initialIdea?.status ?? "new",
    },
  });

  function submit(values: IdeaFormValues) {
    onSubmit({
      title: values.title.trim(),
      category: values.category?.trim() ?? "",
      priority: values.priority,
      businessPotential: values.businessPotential,
      actionLater: values.actionLater?.trim() ?? "",
      status: values.status,
    });
    reset();
  }

  return (
    <FormDialog
      open={open}
      title={initialIdea ? "Edit Idea" : "New Idea"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialIdea ? "Save Changes" : "Add Idea"}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Idea title"
            autoFocus
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Category" fullWidth placeholder="e.g. Product, Marketing, Side Project" />
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
          name="businessPotential"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Business Potential" sx={{ minWidth: 150, flex: 1 }}>
              {Object.entries(BUSINESS_POTENTIAL_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Status" fullWidth>
            {Object.entries(IDEA_STATUS_LABELS).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="actionLater"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="What to do about this later" fullWidth multiline minRows={3} />
        )}
      />
    </FormDialog>
  );
}
