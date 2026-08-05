import { Box, Slider, Typography } from "@mui/material";

function Row({
  label,
  value,
  onChange,
  color,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color: string;
}) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{label}</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{value}/10</Typography>
      </Box>
      <Slider
        value={value}
        onChange={(_, v) => onChange(v as number)}
        min={1}
        max={10}
        step={1}
        sx={{ color }}
      />
    </Box>
  );
}

export function MoodEnergyStress({
  mood,
  energy,
  stress,
  onChange,
}: {
  mood: number;
  energy: number;
  stress: number;
  onChange: (field: "mood" | "energy" | "stress", value: number) => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Row label="Mood" value={mood} onChange={(v) => onChange("mood", v)} color="#2b5cff" />
      <Row label="Energy" value={energy} onChange={(v) => onChange("energy", v)} color="#10b981" />
      <Row label="Stress" value={stress} onChange={(v) => onChange("stress", v)} color="#e5484d" />
    </Box>
  );
}
