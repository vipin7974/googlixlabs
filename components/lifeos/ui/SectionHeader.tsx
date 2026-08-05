import { Box, Typography } from "@mui/material";

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 1.5,
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontSize: { xs: 22, sm: 26 }, mb: subtitle ? 0.5 : 0 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: "text.secondary", fontSize: 14.5 }}>{subtitle}</Typography>
        )}
      </Box>
      {action}
    </Box>
  );
}
