import { Box, IconButton } from "@mui/material";
import { Star } from "lucide-react";

export function RatingInput({
  value,
  onChange,
  max = 5,
  size = 22,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: number;
}) {
  return (
    <Box sx={{ display: "flex", gap: 0.25 }}>
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <IconButton key={star} size="small" onClick={() => onChange(star)} sx={{ p: 0.4 }}>
          <Star
            size={size}
            fill={star <= value ? "#f5a623" : "none"}
            color={star <= value ? "#f5a623" : "currentColor"}
            strokeWidth={1.5}
            opacity={star <= value ? 1 : 0.4}
          />
        </IconButton>
      ))}
    </Box>
  );
}
