"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import { Check, X as XIcon } from "lucide-react";
import { buildMonthGrid, challengeDateKeys, challengeDayStatus } from "@/lib/lifeos/utils/challenge";
import { formatDisplayDate, formatMonthLabel } from "@/lib/lifeos/utils/date";
import type { Challenge } from "@/lib/lifeos/types/challenge";

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function ChallengeCalendar({
  challenge,
  doneDates,
  today,
  onToggle,
}: {
  challenge: Challenge;
  doneDates: Set<string>;
  today: string;
  onToggle: (date: string) => void;
}) {
  const dayKeys = challengeDateKeys(challenge);
  const rangeSet = new Set(dayKeys);
  const months = Array.from(new Set(dayKeys.map((k) => k.slice(0, 7))));

  return (
    <Box sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 0.5 }}>
      {months.map((month) => (
        <Box key={month} sx={{ minWidth: 216, flexShrink: 0 }}>
          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 700,
              color: "text.secondary",
              mb: 0.85,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {formatMonthLabel(month)}
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", mb: "5px" }}>
            {WEEKDAY_LABELS.map((label, i) => (
              <Typography key={i} sx={{ fontSize: 10, textAlign: "center", color: "text.secondary", opacity: 0.55 }}>
                {label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
            {buildMonthGrid(month).map((key, i) => {
              if (!key) return <Box key={`blank-${i}`} />;

              const dayNum = Number(key.slice(-2));

              if (!rangeSet.has(key)) {
                return (
                  <Box
                    key={key}
                    sx={{
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "text.secondary",
                      opacity: 0.25,
                    }}
                  >
                    {dayNum}
                  </Box>
                );
              }

              const status = challengeDayStatus(key, doneDates.has(key), today);
              const isToday = key === today;
              const interactive = status !== "locked";

              return (
                <Tooltip key={key} title={formatDisplayDate(key)} arrow>
                  <Box
                    onClick={() => interactive && onToggle(key)}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      userSelect: "none",
                      cursor: interactive ? "pointer" : "default",
                      transition: "transform 0.12s ease, box-shadow 0.12s ease",
                      boxShadow: isToday ? `inset 0 0 0 2px ${challenge.color}` : "none",
                      bgcolor:
                        status === "done"
                          ? challenge.color
                          : status === "missed"
                          ? "error.main"
                          : status === "pending"
                          ? "action.hover"
                          : "transparent",
                      opacity: status === "locked" ? 0.35 : 1,
                      color: status === "done" || status === "missed" ? "#fff" : "text.primary",
                      "&:hover": interactive ? { transform: "scale(1.14)" } : {},
                    }}
                  >
                    {status === "done" ? <Check size={14} strokeWidth={3} /> : status === "missed" ? <XIcon size={13} strokeWidth={3} /> : dayNum}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
