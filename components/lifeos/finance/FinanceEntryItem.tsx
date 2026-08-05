"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { StatusChip } from "@/components/lifeos/ui/StatusChip";
import { FINANCE_TYPE_LABELS, type FinanceEntry } from "@/lib/lifeos/types/finance";
import { formatShortDate } from "@/lib/lifeos/utils/date";

const TYPE_COLORS: Record<FinanceEntry["type"], string> = {
  income: "#10b981",
  expense: "#e5484d",
  savings: "#2b5cff",
  investment: "#8b5cf6",
};

export function FinanceEntryItem({
  entry,
  onEdit,
  onDelete,
}: {
  entry: FinanceEntry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isOutflow = entry.type === "expense";

  return (
    <Card sx={{ p: 2, mb: 1.25 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>{entry.category}</Typography>
            <StatusChip label={FINANCE_TYPE_LABELS[entry.type]} color={TYPE_COLORS[entry.type]} />
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, mt: 0.5, flexWrap: "wrap" }}>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{formatShortDate(entry.date)}</Typography>
            {entry.notes && (
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{entry.notes}</Typography>
            )}
          </Box>
        </Box>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 15,
            color: isOutflow ? "#e5484d" : "#10b981",
            whiteSpace: "nowrap",
          }}
        >
          {isOutflow ? "-" : "+"}₹{entry.amount.toFixed(2)}
        </Typography>

        <IconButton size="small" onClick={onEdit}>
          <Pencil size={15} />
        </IconButton>
        <IconButton size="small" onClick={onDelete}>
          <Trash2 size={15} />
        </IconButton>
      </Box>
    </Card>
  );
}
