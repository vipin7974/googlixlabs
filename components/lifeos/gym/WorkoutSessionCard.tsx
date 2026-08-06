"use client";

import { useState } from "react";
import { Box, Card, Checkbox, Collapse, IconButton, Typography } from "@mui/material";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { formatElapsed } from "@/lib/lifeos/hooks/useElapsedTime";
import { formatDisplayDate } from "@/lib/lifeos/utils/date";
import { totalSetsCompleted, totalVolumeKg, type WorkoutSession } from "@/lib/lifeos/types/workout";

export function WorkoutSessionCard({ session, onDelete }: { session: WorkoutSession; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const durationSeconds = session.durationMinutes != null ? Math.round(session.durationMinutes * 60) : 0;
  const sets = totalSetsCompleted(session);
  const volume = totalVolumeKg(session);

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 14.5 }}>{session.name}</Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {formatDisplayDate(session.date)} · {formatElapsed(durationSeconds)} · {sets} sets · {volume.toLocaleString()} kg volume
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => setExpanded((v) => !v)}>
          {expanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
        </IconButton>
        <IconButton size="small" onClick={onDelete}>
          <Trash2 size={15} />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1.25 }}>
          {session.exercises.map((exercise) => (
            <Box key={exercise.id}>
              <Typography sx={{ fontWeight: 600, fontSize: 13.5, mb: 0.5 }}>{exercise.name}</Typography>
              {exercise.sets.map((set, index) => (
                <Box key={set.id} sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1 }}>
                  <Checkbox size="small" checked={set.completed} disabled sx={{ p: 0.25 }} />
                  <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                    Set {index + 1}: {set.reps} reps × {set.weightKg} kg
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
          {session.notes && (
            <Typography sx={{ fontSize: 13, color: "text.secondary", whiteSpace: "pre-wrap" }}>
              {session.notes}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Card>
  );
}
