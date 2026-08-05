"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronDown, ChevronRight, Pencil, Plus, Trash2, X } from "lucide-react";
import { PriorityBadge } from "@/components/lifeos/ui/PriorityBadge";
import { StatusChip } from "@/components/lifeos/ui/StatusChip";
import { ProgressBar } from "@/components/lifeos/ui/ProgressBar";
import { generateId } from "@/lib/lifeos/utils/id";
import type { Task, Subtask } from "@/lib/lifeos/types/task";

const STATUS_LABELS: Record<Task["status"], string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
  skipped: "Skipped",
};

export function TaskItem({
  task,
  dragHandle,
  onToggleDone,
  onEdit,
  onDelete,
  onUpdateSubtasks,
}: {
  task: Task;
  dragHandle: React.ReactNode;
  onToggleDone: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateSubtasks: (subtasks: Subtask[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  const subtaskProgress =
    task.subtasks.length > 0
      ? Math.round((task.subtasks.filter((s) => s.done).length / task.subtasks.length) * 100)
      : task.progress;

  function addSubtask() {
    const title = newSubtask.trim();
    if (!title) return;
    onUpdateSubtasks([...task.subtasks, { id: generateId(), title, done: false }]);
    setNewSubtask("");
  }

  function toggleSubtask(id: string) {
    onUpdateSubtasks(task.subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  }

  function removeSubtask(id: string) {
    onUpdateSubtasks(task.subtasks.filter((s) => s.id !== id));
  }

  const isDone = task.status === "done";

  return (
    <Card sx={{ p: 2, mb: 1.25 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        {dragHandle}
        <Checkbox checked={isDone} onChange={onToggleDone} sx={{ p: 0.5, mt: -0.25 }} />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14.5,
                textDecoration: isDone ? "line-through" : "none",
                color: isDone ? "text.secondary" : "text.primary",
              }}
            >
              {task.title}
            </Typography>
            <PriorityBadge priority={task.priority} />
            <StatusChip label={STATUS_LABELS[task.status]} />
            {task.category && <StatusChip label={task.category} color="#8a8a83" />}
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 0.5, flexWrap: "wrap" }}>
            {task.deadline && (
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Due {new Date(task.deadline).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
              </Typography>
            )}
            {task.estimatedMinutes != null && (
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Est {task.estimatedMinutes}m{task.actualMinutes != null ? ` / Actual ${task.actualMinutes}m` : ""}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 1.25, maxWidth: 320 }}>
            <ProgressBar value={subtaskProgress} showPercent={false} height={6} />
          </Box>
        </Box>

        <IconButton size="small" onClick={() => setExpanded((v) => !v)}>
          {expanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
        </IconButton>
        <IconButton size="small" onClick={onEdit}>
          <Pencil size={15} />
        </IconButton>
        <IconButton size="small" onClick={onDelete}>
          <Trash2 size={15} />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ pl: { xs: 0, sm: 6 }, pt: 1.5 }}>
          {task.notes && (
            <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1.5, whiteSpace: "pre-wrap" }}>
              {task.notes}
            </Typography>
          )}

          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary", mb: 0.75 }}>
            SUBTASKS
          </Typography>
          {task.subtasks.map((subtask) => (
            <Box key={subtask.id} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Checkbox size="small" checked={subtask.done} onChange={() => toggleSubtask(subtask.id)} />
              <Typography
                sx={{
                  fontSize: 13.5,
                  flex: 1,
                  textDecoration: subtask.done ? "line-through" : "none",
                  color: subtask.done ? "text.secondary" : "text.primary",
                }}
              >
                {subtask.title}
              </Typography>
              <IconButton size="small" onClick={() => removeSubtask(subtask.id)}>
                <X size={14} />
              </IconButton>
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              size="small"
              placeholder="Add subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSubtask();
                }
              }}
              fullWidth
            />
            <IconButton size="small" onClick={addSubtask}>
              <Plus size={16} />
            </IconButton>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
}
