"use client";

import { useState } from "react";
import { Box, Button, Card } from "@mui/material";
import { Settings } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { ProgressBar } from "@/components/lifeos/ui/ProgressBar";
import { DailyAnswerField } from "./DailyAnswerField";
import { QuestionManagerDialog } from "./QuestionManagerDialog";
import { useDailyQuestions, useDailyEntry } from "@/lib/lifeos/hooks/useDaily";
import { todayKey, formatDisplayDate } from "@/lib/lifeos/utils/date";
import { dailyQuestionsAnsweredPercent } from "@/lib/lifeos/utils/score";

export function DailyPageClient() {
  const date = todayKey();
  const { questions } = useDailyQuestions();
  const { entry, setAnswer } = useDailyEntry(date);
  const [manageOpen, setManageOpen] = useState(false);

  const answered = dailyQuestionsAnsweredPercent(entry, questions.length);

  return (
    <>
      <SectionHeader
        title="Daily Questions"
        subtitle={formatDisplayDate(date)}
        action={
          <Button variant="outlined" startIcon={<Settings size={16} />} onClick={() => setManageOpen(true)}>
            Manage Questions
          </Button>
        }
      />

      <Box sx={{ maxWidth: 420, mb: 3 }}>
        <ProgressBar value={answered} label="Answered today" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {questions.map((question) => (
          <Card key={question.id} sx={{ p: 2.5 }}>
            <DailyAnswerField
              question={question}
              value={entry?.answers.find((a) => a.questionId === question.id)?.value}
              onChange={(value) => setAnswer(question.id, value)}
            />
          </Card>
        ))}
      </Box>

      <QuestionManagerDialog open={manageOpen} onClose={() => setManageOpen(false)} />
    </>
  );
}
