"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { RatingInput } from "@/components/lifeos/ui/RatingInput";
import { useMonthlyReview, useMonthlyReviewHistory } from "@/lib/lifeos/hooks/useReviews";
import { monthKey } from "@/lib/lifeos/utils/date";

const EMPTY = {
  revenue: "",
  learning: "",
  fitness: "",
  career: "",
  family: "",
  business: "",
  books: "",
  habits: "",
  failures: "",
  achievements: "",
};

const FIELDS: { key: keyof typeof EMPTY; label: string }[] = [
  { key: "revenue", label: "Revenue" },
  { key: "learning", label: "Learning" },
  { key: "fitness", label: "Fitness" },
  { key: "career", label: "Career" },
  { key: "family", label: "Family" },
  { key: "business", label: "Business" },
  { key: "books", label: "Books" },
  { key: "habits", label: "Habits" },
  { key: "failures", label: "Failures" },
  { key: "achievements", label: "Achievements" },
];

function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function MonthlyReviewPageClient() {
  const [monthOffset, setMonthOffset] = useState(0);
  const refDate = new Date();
  refDate.setMonth(refDate.getMonth() + monthOffset);
  const month = monthKey(refDate);
  const { review, save } = useMonthlyReview(month);
  const history = useMonthlyReviewHistory();
  const [form, setForm] = useState(EMPTY);
  const [rating, setRating] = useState(3);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({
      revenue: review?.revenue ?? "",
      learning: review?.learning ?? "",
      fitness: review?.fitness ?? "",
      career: review?.career ?? "",
      family: review?.family ?? "",
      business: review?.business ?? "",
      books: review?.books ?? "",
      habits: review?.habits ?? "",
      failures: review?.failures ?? "",
      achievements: review?.achievements ?? "",
    });
    setRating(review?.overallRating ?? 3);
  }, [review?.id, month]);

  async function handleSave() {
    await save({ ...form, overallRating: rating });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <>
      <SectionHeader
        title="Monthly Review"
        subtitle={monthLabel(month)}
        action={
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" onClick={() => setMonthOffset((v) => v - 1)}>
              <ChevronLeft size={18} />
            </IconButton>
            <IconButton size="small" onClick={() => setMonthOffset((v) => v + 1)} disabled={monthOffset >= 0}>
              <ChevronRight size={18} />
            </IconButton>
          </Box>
        }
      />

      <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.25 }}>
        {FIELDS.map((f) => (
          <TextField
            key={f.key}
            label={f.label}
            value={form[f.key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
            multiline
            minRows={2}
            fullWidth
          />
        ))}

        <Box>
          <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.75 }}>Overall month rating</Typography>
          <RatingInput value={rating} onChange={setRating} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Monthly Review
          </Button>
          {saved && (
            <Typography sx={{ fontSize: 13, color: "success.main", display: "flex", alignItems: "center", gap: 0.5 }}>
              <Check size={14} /> Saved
            </Typography>
          )}
        </Box>
      </Card>

      {history.length > 0 && (
        <>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "text.secondary", mt: 4, mb: 1.5 }}>
            PAST REVIEWS
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {history.slice(0, 12).map((item) => (
              <Card key={item.id} sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>{monthLabel(item.month)}</Typography>
                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Rating {item.overallRating}/5</Typography>
                </Box>
                {item.achievements && (
                  <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>{item.achievements}</Typography>
                )}
              </Card>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
