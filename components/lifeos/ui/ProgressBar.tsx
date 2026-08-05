import { Box, LinearProgress, Typography } from "@mui/material";

export function ProgressBar({
  value,
  label,
  showPercent = true,
  height = 8,
  color,
}: {
  value: number;
  label?: string;
  showPercent?: boolean;
  height?: number;
  color?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <Box sx={{ width: "100%" }}>
      {(label || showPercent) && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
          {label && <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{label}</Typography>}
          {showPercent && (
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{clamped}%</Typography>
          )}
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={clamped}
        sx={{
          height,
          borderRadius: height,
          bgcolor: "action.hover",
          "& .MuiLinearProgress-bar": { borderRadius: height, ...(color ? { bgcolor: color } : {}) },
        }}
      />
    </Box>
  );
}
