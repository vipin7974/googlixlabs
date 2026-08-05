"use client";

import { Box, Checkbox, TextField, Typography } from "@mui/material";
import { RatingInput } from "@/components/lifeos/ui/RatingInput";
import type { DailyAnswerValue, DailyQuestionDefinition } from "@/lib/lifeos/types/daily";

export function DailyAnswerField({
  question,
  value,
  onChange,
}: {
  question: DailyQuestionDefinition;
  value: DailyAnswerValue | undefined;
  onChange: (value: DailyAnswerValue) => void;
}) {
  if (question.type === "checkbox") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <Typography sx={{ fontSize: 14 }}>{question.prompt}</Typography>
      </Box>
    );
  }

  if (question.type === "rating") {
    return (
      <Box>
        <Typography sx={{ fontSize: 14, mb: 0.75 }}>{question.prompt}</Typography>
        <RatingInput value={typeof value === "number" ? value : 0} onChange={onChange} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={{ fontSize: 14, mb: 0.75 }}>{question.prompt}</Typography>
      <TextField
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        multiline={question.type === "notes"}
        minRows={question.type === "notes" ? 3 : 1}
      />
    </Box>
  );
}
