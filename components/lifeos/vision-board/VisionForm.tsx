"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { ImagePlus, X } from "lucide-react";
import { FormDialog } from "@/components/lifeos/ui/FormDialog";
import { VISION_CATEGORY_LABELS, type VisionDraft, type VisionItem } from "@/lib/lifeos/types/vision";

const visionSchema = z.object({
  category: z.enum(["dream_house", "dream_car", "dream_business", "dream_lifestyle", "quote", "other"]),
  quote: z.string().max(2000).optional(),
  caption: z.string().max(200).optional(),
});

type VisionFormValues = z.infer<typeof visionSchema>;

export function VisionForm({
  open,
  onClose,
  onSubmit,
  initialItem,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: VisionDraft) => void;
  initialItem?: VisionItem;
}) {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(initialItem?.imageDataUrl ?? null);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<VisionFormValues>({
    resolver: zodResolver(visionSchema),
    defaultValues: {
      category: initialItem?.category ?? "dream_house",
      quote: initialItem?.quote ?? "",
      caption: initialItem?.caption ?? "",
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function submit(values: VisionFormValues) {
    onSubmit({
      category: values.category,
      imageDataUrl,
      quote: values.quote?.trim() ?? "",
      caption: values.caption?.trim() ?? "",
    });
    reset();
    setImageDataUrl(null);
  }

  return (
    <FormDialog
      open={open}
      title={initialItem ? "Edit Vision Item" : "New Vision Item"}
      onClose={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit(submit)}
      submitLabel={initialItem ? "Save Changes" : "Add to Board"}
    >
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Category" fullWidth>
            {Object.entries(VISION_CATEGORY_LABELS).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary", mb: 0.75 }}>IMAGE</Typography>
        {imageDataUrl ? (
          <Box>
            <Box
              component="img"
              src={imageDataUrl}
              alt="Preview"
              sx={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: "12px", display: "block", mb: 1 }}
            />
            <Button
              size="small"
              color="error"
              startIcon={<X size={14} />}
              onClick={() => setImageDataUrl(null)}
            >
              Remove image
            </Button>
          </Box>
        ) : (
          <Button component="label" variant="outlined" startIcon={<ImagePlus size={16} />}>
            Upload image
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </Button>
        )}
      </Box>

      <Controller
        name="quote"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Quote / Inspiration" fullWidth multiline minRows={2} />
        )}
      />

      <Controller
        name="caption"
        control={control}
        render={({ field }) => <TextField {...field} label="Caption" fullWidth />}
      />
    </FormDialog>
  );
}
