"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Check } from "lucide-react";
import { MoodEnergyStress } from "@/components/lifeos/ui/MoodEnergyStress";
import { useJournalEntry } from "@/lib/lifeos/hooks/useJournal";
import type { JournalType } from "@/lib/lifeos/types/journal";

const FIELD_LABELS: Record<JournalType, { wins: string; failures: string; lessons: string }> = {
  morning: {
    wins: "What would make today a win?",
    failures: "What could derail today?",
    lessons: "What do I want to remember going in?",
  },
  evening: {
    wins: "Wins today",
    failures: "Failures / what went wrong",
    lessons: "Lessons learned",
  },
};

export function JournalEditor({ date, type }: { date: string; type: JournalType }) {
  const { entry, save } = useJournalEntry(date, type);
  const [wins, setWins] = useState("");
  const [failures, setFailures] = useState("");
  const [lessonsLearned, setLessonsLearned] = useState("");
  const [notes, setNotes] = useState("");
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setWins(entry?.wins ?? "");
    setFailures(entry?.failures ?? "");
    setLessonsLearned(entry?.lessonsLearned ?? "");
    setNotes(entry?.notes ?? "");
    setMood(entry?.mood ?? 5);
    setEnergy(entry?.energy ?? 5);
    setStress(entry?.stress ?? 5);
  }, [entry?.id, date, type]);

  const labels = FIELD_LABELS[type];

  async function handleSave() {
    await save({ wins, failures, lessonsLearned, notes, mood, energy, stress });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.25 }}>
      <TextField label={labels.wins} value={wins} onChange={(e) => setWins(e.target.value)} multiline minRows={2} fullWidth />
      <TextField
        label={labels.failures}
        value={failures}
        onChange={(e) => setFailures(e.target.value)}
        multiline
        minRows={2}
        fullWidth
      />
      <TextField
        label={labels.lessons}
        value={lessonsLearned}
        onChange={(e) => setLessonsLearned(e.target.value)}
        multiline
        minRows={2}
        fullWidth
      />

      <MoodEnergyStress
        mood={mood}
        energy={energy}
        stress={stress}
        onChange={(field, value) => {
          if (field === "mood") setMood(value);
          if (field === "energy") setEnergy(value);
          if (field === "stress") setStress(value);
        }}
      />

      <TextField
        label="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        multiline
        minRows={3}
        fullWidth
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button variant="contained" onClick={handleSave}>
          Save {type === "morning" ? "Morning" : "Evening"} Entry
        </Button>
        {saved && (
          <Typography sx={{ fontSize: 13, color: "success.main", display: "flex", alignItems: "center", gap: 0.5 }}>
            <Check size={14} /> Saved
          </Typography>
        )}
      </Box>
    </Card>
  );
}
