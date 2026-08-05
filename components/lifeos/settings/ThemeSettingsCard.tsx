"use client";

import { Box, Card, MenuItem, TextField, Typography } from "@mui/material";
import { useLifeOsTheme } from "@/lib/lifeos/context/ThemeContext";
import { ACCENT_HEX, type AccentColor, type ThemeMode } from "@/lib/lifeos/types/settings";

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "Match system" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeSettingsCard() {
  const { themeMode, accentColor, setThemeMode, setAccentColor } = useLifeOsTheme();

  return (
    <Card sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 2 }}>Appearance</Typography>

      <TextField
        select
        label="Theme"
        value={themeMode}
        onChange={(e) => setThemeMode(e.target.value as ThemeMode)}
        sx={{ minWidth: 220, mb: 2.5, display: "block" }}
      >
        {THEME_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>Accent color</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {(Object.keys(ACCENT_HEX) as AccentColor[]).map((color) => (
          <Box
            key={color}
            onClick={() => setAccentColor(color)}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              bgcolor: ACCENT_HEX[color],
              cursor: "pointer",
              border: "2px solid",
              borderColor: accentColor === color ? "text.primary" : "transparent",
            }}
          />
        ))}
      </Box>
    </Card>
  );
}
