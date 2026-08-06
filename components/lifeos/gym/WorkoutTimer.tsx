"use client";

import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Square, Timer as TimerIcon } from "lucide-react";
import { useElapsedTime, formatElapsed } from "@/lib/lifeos/hooks/useElapsedTime";
import type { WorkoutSession } from "@/lib/lifeos/types/workout";

export function WorkoutTimer({
  session,
  onRename,
  onFinish,
}: {
  session: WorkoutSession;
  onRename: (name: string) => void;
  onFinish: () => void;
}) {
  const [nameDraft, setNameDraft] = useState(session.name);
  const elapsed = useElapsedTime(session.startedAt, session.endedAt);

  return (
    <Card sx={{ p: 3, textAlign: "center" }}>
      <TextField
        value={nameDraft}
        onChange={(e) => setNameDraft(e.target.value)}
        onBlur={() => onRename(nameDraft.trim() || "Workout")}
        placeholder="Workout name (e.g. Push Day)"
        variant="standard"
        sx={{ mb: 2, "& .MuiInputBase-input": { textAlign: "center", fontSize: 16, fontWeight: 600 } }}
      />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
        <TimerIcon size={16} color="#2b5cff" />
        <Typography
          sx={{
            fontSize: { xs: 44, sm: 56 },
            fontWeight: 800,
            fontFamily: "var(--font-mono), monospace",
            lineHeight: 1,
          }}
        >
          {formatElapsed(elapsed)}
        </Typography>
      </Box>

      <Button variant="contained" color="success" startIcon={<Square size={16} />} onClick={onFinish}>
        Finish Workout
      </Button>
    </Card>
  );
}
