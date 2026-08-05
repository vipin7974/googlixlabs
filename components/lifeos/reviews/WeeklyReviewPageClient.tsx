"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { RatingInput } from "@/components/lifeos/ui/RatingInput";
import { useWeeklyReview, useWeeklyReviewHistory } from "@/lib/lifeos/hooks/useReviews";
import { weekStartKey, formatShortDate } from "@/lib/lifeos/utils/date";

const FIELDS: { key: keyof typeof EMPTY; label: string }[] = [
  { key: "wentWell", label: "What went well?" },
  { key: "wastedTime", label: "What wasted my time?" },
  { key: "shouldStop", label: "What should I stop?" },
  { key: "shouldContinue", label: "What should I continue?" },
  { key: "shouldImprove", label: "What should I improve?" },
  { key: "biggestAchievement", label: "Biggest achievement" },
  { key: "biggestMistake", label: "Biggest mistake" },
  { key: "topDistraction", label: "Top distraction" },
  { key: "topLearning", label: "Top learning" },
  { key: "nextWeekFocus", label: "Next week's focus" },
];

const EMPTY = {
  wentWell: "",
  wastedTime: "",
  shouldStop: "",
  shouldContinue: "",
  shouldImprove: "",
  biggestAchievement: "",
  biggestMistake: "",
  topDistraction: "",
  topLearning: "",
  nextWeekFocus: "",
};

export function WeeklyReviewPageClient() {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekStart = weekStartKey(new Date(Date.now() + weekOffset * 7 * 86_400_000));
  const { review, save } = useWeeklyReview(weekStart);
  const history = useWeeklyReviewHistory();
  const [form, setForm] = useState(EMPTY);
  const [rating, setRating] = useState(3);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({
      wentWell: review?.wentWell ?? "",
      wastedTime: review?.wastedTime ?? "",
      shouldStop: review?.shouldStop ?? "",
      shouldContinue: review?.shouldContinue ?? "",
      shouldImprove: review?.shouldImprove ?? "",
      biggestAchievement: review?.biggestAchievement ?? "",
      biggestMistake: review?.biggestMistake ?? "",
      topDistraction: review?.topDistraction ?? "",
      topLearning: review?.topLearning ?? "",
      nextWeekFocus: review?.nextWeekFocus ?? "",
    });
    setRating(review?.rating ?? 3);
  }, [review?.id, weekStart]);

  async function handleSave() {
    await save({ ...form, rating });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <>
      <SectionHeader
        title="Weekly Review"
        subtitle={`Week of ${formatShortDate(weekStart)}`}
        action={
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" onClick={() => setWeekOffset((v) => v - 1)}>
              <ChevronLeft size={18} />
            </IconButton>
            <IconButton size="small" onClick={() => setWeekOffset((v) => v + 1)} disabled={weekOffset >= 0}>
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
          <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.75 }}>Overall week rating</Typography>
          <RatingInput value={rating} onChange={setRating} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Weekly Review
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
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>Week of {formatShortDate(item.weekStart)}</Typography>
                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Rating {item.rating}/5</Typography>
                </Box>
                {item.biggestAchievement && (
                  <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                    {item.biggestAchievement}
                  </Typography>
                )}
              </Card>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
