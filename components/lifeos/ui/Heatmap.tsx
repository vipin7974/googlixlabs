import { Box, Tooltip, Typography } from "@mui/material";
import { formatShortDate } from "@/lib/lifeos/utils/date";

export function Heatmap({
  dayKeys,
  valueByDate,
  color = "#2b5cff",
  maxValue,
}: {
  dayKeys: string[];
  valueByDate: Record<string, number>;
  color?: string;
  maxValue?: number;
}) {
  const max = maxValue ?? Math.max(1, ...Object.values(valueByDate));

  const weeks: string[][] = [];
  let currentWeek: string[] = [];
  dayKeys.forEach((key, index) => {
    currentWeek.push(key);
    if (currentWeek.length === 7 || index === dayKeys.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <Box sx={{ display: "flex", gap: "3px", overflowX: "auto", py: 0.5 }}>
      {weeks.map((week, wi) => (
        <Box key={wi} sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {week.map((key) => {
            const value = valueByDate[key] ?? 0;
            const intensity = value === 0 ? 0 : Math.min(1, value / max);
            return (
              <Tooltip key={key} title={`${formatShortDate(key)}: ${value}`} arrow>
                <Box
                  sx={{
                    width: 13,
                    height: 13,
                    borderRadius: "3px",
                    bgcolor: intensity === 0 ? "action.hover" : color,
                    opacity: intensity === 0 ? 1 : 0.25 + intensity * 0.75,
                  }}
                />
              </Tooltip>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

export function HeatmapLegend() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
      <Typography sx={{ fontSize: 11, color: "text.secondary" }}>Less</Typography>
      {[0, 0.25, 0.5, 0.75, 1].map((opacity) => (
        <Box
          key={opacity}
          sx={{
            width: 11,
            height: 11,
            borderRadius: "2px",
            bgcolor: opacity === 0 ? "action.hover" : "#2b5cff",
            opacity: opacity === 0 ? 1 : opacity,
          }}
        />
      ))}
      <Typography sx={{ fontSize: 11, color: "text.secondary" }}>More</Typography>
    </Box>
  );
}
