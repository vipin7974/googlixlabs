"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { StatusChip } from "@/components/lifeos/ui/StatusChip";
import { ProgressBar } from "@/components/lifeos/ui/ProgressBar";
import { BOOK_MEDIA_LABELS, type BookEntry, type BookMediaType } from "@/lib/lifeos/types/book";

const MEDIA_COLORS: Record<BookMediaType, string> = {
  book: "#2b5cff",
  course: "#f5a623",
  video: "#e5484d",
};

export function BookCard({
  book,
  onEdit,
  onDelete,
}: {
  book: BookEntry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card sx={{ p: 2.25, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 15.5, mb: 0.5 }}>{book.title}</Typography>
          {book.author && (
            <Typography sx={{ fontSize: 12.5, color: "text.secondary", mb: 0.5 }}>{book.author}</Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 0.25 }}>
          <IconButton size="small" onClick={onEdit}>
            <Pencil size={14} />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <Trash2 size={14} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mb: 1.25 }}>
        <StatusChip label={BOOK_MEDIA_LABELS[book.mediaType]} color={MEDIA_COLORS[book.mediaType]} />
      </Box>

      <Box sx={{ mb: book.notes ? 1.5 : 0 }}>
        <ProgressBar value={book.completion} />
      </Box>

      {book.notes && (
        <Typography
          sx={{
            fontSize: 13,
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {book.notes}
        </Typography>
      )}
    </Card>
  );
}
