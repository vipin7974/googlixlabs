"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useLifeOsSeed } from "@/lib/lifeos/hooks/useSeed";

export function LifeOsAppGate({ children }: { children: React.ReactNode }) {
  const ready = useLifeOsSeed();

  if (!ready) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={28} thickness={4} />
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>Loading LifeOS…</Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
