"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { ProgressBar } from "@/components/lifeos/ui/ProgressBar";
import { formatShortDate } from "@/lib/lifeos/utils/date";
import type { LearningEntry } from "@/lib/lifeos/types/learning";

export function LearningItem({
  entry,
  onEdit,
  onDelete,
}: {
  entry: LearningEntry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card sx={{ p: 2.25, mb: 1.25 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15.5, mb: 0.25 }}>{entry.technology}</Typography>
          {entry.project && (
            <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.5 }}>{entry.project}</Typography>
          )}
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {entry.hours} {entry.hours === 1 ? "hour" : "hours"} · {formatShortDate(entry.date)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.25, flexShrink: 0 }}>
          <IconButton size="small" onClick={onEdit}>
            <Pencil size={14} />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <Trash2 size={14} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mt: 1.5, maxWidth: 360 }}>
        <ProgressBar value={entry.completion} height={6} />
      </Box>

      {entry.notes && (
        <Typography
          sx={{
            fontSize: 13,
            color: "text.secondary",
            mt: 1.25,
            whiteSpace: "pre-wrap",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {entry.notes}
        </Typography>
      )}
    </Card>
  );
}
