import { Chip } from "@mui/material";
import { PRIORITY_COLORS, PRIORITY_LABELS, type Priority } from "@/lib/lifeos/types/common";

export function PriorityBadge({ priority }: { priority: Priority }) {
  const color = PRIORITY_COLORS[priority];
  return (
    <Chip
      label={PRIORITY_LABELS[priority]}
      size="small"
      sx={{
        bgcolor: `${color}1a`,
        color,
        fontSize: 12,
        height: 22,
      }}
    />
  );
}
