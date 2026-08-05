"use client";

import { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Plus, Trash2, X } from "lucide-react";
import { useDailyQuestions } from "@/lib/lifeos/hooks/useDaily";
import type { DailyQuestionType } from "@/lib/lifeos/types/daily";

const TYPE_OPTIONS: { value: DailyQuestionType; label: string }[] = [
  { value: "text", label: "Short text" },
  { value: "notes", label: "Long notes" },
  { value: "checkbox", label: "Yes / No" },
  { value: "rating", label: "Rating (1-5)" },
];

export function QuestionManagerDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { questions, addQuestion, updateQuestion, removeQuestion } = useDailyQuestions();
  const [newPrompt, setNewPrompt] = useState("");
  const [newType, setNewType] = useState<DailyQuestionType>("text");

  function handleAdd() {
    const prompt = newPrompt.trim();
    if (!prompt) return;
    addQuestion(prompt, newType);
    setNewPrompt("");
    setNewType("text");
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700 }}>
        Manage Daily Questions
        <IconButton size="small" onClick={onClose}>
          <X size={18} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {questions.map((q) => (
          <Box key={q.id} sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.75 }}>
            <TextField
              value={q.prompt}
              onChange={(e) => updateQuestion(q.id, { prompt: e.target.value })}
              size="small"
              fullWidth
            />
            <TextField
              value={q.type}
              onChange={(e) => updateQuestion(q.id, { type: e.target.value as DailyQuestionType })}
              select
              size="small"
              sx={{ minWidth: 130 }}
            >
              {TYPE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
            <IconButton size="small" onClick={() => removeQuestion(q.id)}>
              <Trash2 size={15} />
            </IconButton>
          </Box>
        ))}

        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary", mt: 2, mb: 1 }}>
          ADD NEW QUESTION
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            placeholder="Your question"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            size="small"
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <TextField
            value={newType}
            onChange={(e) => setNewType(e.target.value as DailyQuestionType)}
            select
            size="small"
            sx={{ minWidth: 130 }}
          >
            {TYPE_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <IconButton size="small" onClick={handleAdd} sx={{ color: "primary.main" }}>
            <Plus size={18} />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
