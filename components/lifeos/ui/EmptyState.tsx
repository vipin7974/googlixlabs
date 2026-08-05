import { Box, Button, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        px: 3,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "12px",
          bgcolor: "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 1.5,
          color: "text.secondary",
        }}
      >
        <Icon size={20} />
      </Box>
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
      <Typography sx={{ fontSize: 13.5, color: "text.secondary", maxWidth: 360, mx: "auto" }}>
        {description}
      </Typography>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="contained" sx={{ mt: 2.5 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
