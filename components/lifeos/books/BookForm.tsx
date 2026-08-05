"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, MenuItem, Slider, TextField, Typography } from "@mui/material";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { BOOK_MEDIA_LABELS, type BookEntry, type BookMediaType } from "@/lib/lifeos/types/book";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  mediaType: z.enum(["book", "course", "video"]),
  author: z.string().max(150).optional(),
  completion: z.number().min(0).max(100),
  startedDate: z.string().optional(),
  finishedDate: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

export function BookForm({
  open,
  onClose,
  onSubmit,
  initialBook,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    mediaType: BookMediaType;
    author: string;
    completion: number;
    startedDate: string | null;
    finishedDate: string | null;
    notes: string;
  }) => void;
  initialBook?: BookEntry;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialBook?.title ?? "",
      mediaType: initialBook?.mediaType ?? "book",
      author: initialBook?.author ?? "",
      completion: initialBook?.completion ?? 0,
      startedDate: initialBook?.startedDate ?? "",
      finishedDate: initialBook?.finishedDate ?? "",
      notes: initialBook?.notes ?? "",
    },
  });

  function submit(values: BookFormValues) {
    onSubmit({
      title: values.title.trim(),
      mediaType: values.mediaType,
      author: values.author?.trim() ?? "",
      completion: values.completion,
      startedDate: values.startedDate || null,
      finishedDate: values.finishedDate || null,
      notes: values.notes?.trim() ?? "",
    });
    reset();
  }

  return (
    <FormDialog
      open={open}
      title={initialBook ? "Edit Entry" : "New Entry"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialBook ? "Save Changes" : "Add Entry"}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            autoFocus
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="mediaType"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Type" sx={{ flex: 1 }}>
              {Object.entries(BOOK_MEDIA_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="author"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Author / Instructor / Channel" sx={{ flex: 1 }} />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="startedDate"
          control={control}
          render={({ field }) => (
            <TextField {...field} type="date" label="Started" sx={{ flex: 1 }} slotProps={{ inputLabel: { shrink: true } }} />
          )}
        />
        <Controller
          name="finishedDate"
          control={control}
          render={({ field }) => (
            <TextField {...field} type="date" label="Finished" sx={{ flex: 1 }} slotProps={{ inputLabel: { shrink: true } }} />
          )}
        />
      </Box>

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
