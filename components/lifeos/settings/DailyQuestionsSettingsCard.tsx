"use client";

import { useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { ListChecks } from "lucide-react";
import { QuestionManagerDialog } from "@/components/lifeos/daily/QuestionManagerDialog";

export function DailyQuestionsSettingsCard() {
  const [open, setOpen] = useState(false);

  return (
    <Card sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>Daily Questions</Typography>
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1.5 }}>
        Add, edit, or retire the questions you answer every day.
      </Typography>
      <Button variant="outlined" startIcon={<ListChecks size={16} />} onClick={() => setOpen(true)}>
        Manage Questions
      </Button>
      <QuestionManagerDialog open={open} onClose={() => setOpen(false)} />
    </Card>
  );
}
