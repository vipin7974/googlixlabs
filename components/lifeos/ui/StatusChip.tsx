import { Chip } from "@mui/material";

const PALETTE = ["#2b5cff", "#10b981", "#f5a623", "#8a8a83", "#e5484d", "#8b5cf6"];

function hashColor(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

export function StatusChip({ label, color }: { label: string; color?: string }) {
  const resolved = color ?? hashColor(label);
  return (
    <Chip
      label={label}
      size="small"
      sx={{ bgcolor: `${resolved}1a`, color: resolved, fontSize: 12, height: 22 }}
    />
  );
}
