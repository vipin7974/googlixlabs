"use client";

import { Box, Card, Checkbox, IconButton, Typography } from "@mui/material";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { PriorityBadge } from "@/components/lifeos/ui/PriorityBadge";
import { ProgressBar } from "@/components/lifeos/ui/ProgressBar";
import type { Goal, Milestone } from "@/lib/lifeos/types/goal";

export function GoalCard({
  goal,
  onEdit,
  onDelete,
  onAddChild,
  onToggleMilestone,
  parentTitle,
}: {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
  onAddChild?: () => void;
  onToggleMilestone: (milestone: Milestone) => void;
  parentTitle?: string;
}) {
  return (
    <Card sx={{ p: 2.25, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 15.5, mb: 0.5 }}>{goal.title}</Typography>
          {parentTitle && (
            <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 0.5 }}>
              Under: {parentTitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 0.25 }}>
          <IconButton size="small" onClick={onEdit}>
            <Pencil size={14} />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <Trash2 size={14} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1.25 }}>
        <PriorityBadge priority={goal.priority} />
        {goal.deadline && (
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {new Date(goal.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </Typography>
        )}
      </Box>

      {goal.reason && (
        <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1.5, flex: "0 0 auto" }}>
          {goal.reason}
        </Typography>
      )}

      <Box sx={{ mb: goal.milestones.length > 0 ? 1.5 : 0 }}>
        <ProgressBar value={goal.progress} />
      </Box>

      {goal.milestones.length > 0 && (
        <Box sx={{ mb: 1 }}>
          {goal.milestones.map((m) => (
            <Box key={m.id} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Checkbox size="small" checked={m.done} onChange={() => onToggleMilestone(m)} sx={{ p: 0.4 }} />
              <Typography sx={{ fontSize: 13, textDecoration: m.done ? "line-through" : "none" }}>
                {m.title}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {onAddChild && (
        <Box sx={{ mt: "auto", pt: 1 }}>
          <IconButton size="small" onClick={onAddChild} sx={{ color: "primary.main" }}>
            <Plus size={16} />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}
