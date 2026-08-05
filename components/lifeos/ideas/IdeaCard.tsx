"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { PriorityBadge } from "@/components/lifeos/ui/PriorityBadge";
import { StatusChip } from "@/components/lifeos/ui/StatusChip";
import { formatShortDate } from "@/lib/lifeos/utils/date";
import type { BusinessPotential, Idea } from "@/lib/lifeos/types/idea";

const BUSINESS_POTENTIAL_LABELS: Record<BusinessPotential, string> = {
  none: "No Biz Potential",
  low: "Low Biz Potential",
  medium: "Medium Biz Potential",
  high: "High Biz Potential",
};

const BUSINESS_POTENTIAL_COLORS: Record<BusinessPotential, string> = {
  none: "#8a8a83",
  low: "#3b82f6",
  medium: "#f5a623",
  high: "#10b981",
};

export function IdeaCard({
  idea,
  onEdit,
  onDelete,
}: {
  idea: Idea;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card sx={{ p: 2, mb: 1.25 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>{idea.title}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mt: 0.75 }}>
            <PriorityBadge priority={idea.priority} />
            {idea.category && <StatusChip label={idea.category} color="#8a8a83" />}
            <StatusChip
              label={BUSINESS_POTENTIAL_LABELS[idea.businessPotential]}
              color={BUSINESS_POTENTIAL_COLORS[idea.businessPotential]}
            />
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              {formatShortDate(idea.date)}
            </Typography>
          </Box>

          {idea.actionLater && (
            <Typography
              sx={{
                fontSize: 13,
                color: "text.secondary",
                mt: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {idea.actionLater}
            </Typography>
          )}
        </Box>

        <IconButton size="small" onClick={onEdit}>
          <Pencil size={15} />
        </IconButton>
        <IconButton size="small" onClick={onDelete}>
          <Trash2 size={15} />
        </IconButton>
      </Box>
    </Card>
  );
}
