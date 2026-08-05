import { Box, Card, Typography } from "@mui/material";

export function ChartCard({ title, height = 220, children }: { title: string; height?: number; children: React.ReactNode }) {
  return (
    <Card sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 14.5, mb: 1.5 }}>{title}</Typography>
      <Box sx={{ width: "100%", height }}>{children}</Box>
    </Card>
  );
}
