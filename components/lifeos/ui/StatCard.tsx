import { Box, Card, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  color = "#2b5cff",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
  color?: string;
}) {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{ p: 2.5, height: "100%" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.5 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            bgcolor: `${color}1a`,
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={17} />
        </Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 500 }}>{label}</Typography>
      </Box>
      <Typography sx={{ fontSize: 26, fontWeight: 700, lineHeight: 1.1, fontFamily: "var(--font-bricolage)" }}>
        {value}
      </Typography>
      {sublabel && (
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.5 }}>{sublabel}</Typography>
      )}
    </Card>
  );
}
