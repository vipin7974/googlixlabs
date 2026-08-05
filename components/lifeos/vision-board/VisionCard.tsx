"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { StatusChip } from "@/components/lifeos/ui/StatusChip";
import { VISION_CATEGORY_LABELS, type VisionCategory, type VisionItem } from "@/lib/lifeos/types/vision";

const CATEGORY_COLORS: Record<VisionCategory, string> = {
  dream_house: "#2b5cff",
  dream_car: "#e5484d",
  dream_business: "#10b981",
  dream_lifestyle: "#8b5cf6",
  quote: "#f5a623",
  other: "#8a8a83",
};

export function VisionCard({
  item,
  onEdit,
  onDelete,
}: {
  item: VisionItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const color = CATEGORY_COLORS[item.category];

  return (
    <Card sx={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "relative" }}>
        {item.imageDataUrl ? (
          <Box
            component="img"
            src={item.imageDataUrl}
            alt={item.caption || VISION_CATEGORY_LABELS[item.category]}
            sx={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              minHeight: 200,
              bgcolor: `${color}14`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: 19,
                textAlign: "center",
                color: "text.primary",
                lineHeight: 1.5,
              }}
            >
              {item.quote || "No quote yet"}
            </Typography>
          </Box>
        )}

        <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{ bgcolor: "background.paper", opacity: 0.85, "&:hover": { opacity: 1 } }}
          >
            <Pencil size={14} />
          </IconButton>
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{ bgcolor: "background.paper", opacity: 0.85, "&:hover": { opacity: 1 } }}
          >
            <Trash2 size={14} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {item.imageDataUrl && item.quote && (
          <Typography sx={{ fontStyle: "italic", fontSize: 13.5, color: "text.secondary" }}>
            {item.quote}
          </Typography>
        )}
        {item.caption && (
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{item.caption}</Typography>
        )}
        <Box sx={{ mt: "auto", pt: 0.5 }}>
          <StatusChip label={VISION_CATEGORY_LABELS[item.category]} color={color} />
        </Box>
      </Box>
    </Card>
  );
}
