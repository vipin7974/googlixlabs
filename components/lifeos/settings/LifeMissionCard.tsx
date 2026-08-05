"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Check } from "lucide-react";
import { useSettings } from "@/lib/lifeos/hooks/useSettings";

export function LifeMissionCard() {
  const { settings, saveSettings } = useSettings();
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(settings.lifeMission);
  }, [settings.lifeMission]);

  async function handleSave() {
    await saveSettings({ lifeMission: value });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <Card sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>Life Mission</Typography>
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1.5 }}>
        Shown on your Dashboard and in Focus Mode when today&apos;s mission question is unanswered.
      </Typography>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        multiline
        minRows={2}
        fullWidth
        sx={{ mb: 1.5 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button variant="contained" onClick={handleSave}>
          Save
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
