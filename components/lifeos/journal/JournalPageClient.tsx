"use client";

import { useState } from "react";
import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { JournalEditor } from "./JournalEditor";
import { useJournalHistory } from "@/lib/lifeos/hooks/useJournal";
import { todayKey, formatDisplayDate } from "@/lib/lifeos/utils/date";
import { BookText } from "lucide-react";
import type { JournalType } from "@/lib/lifeos/types/journal";

export function JournalPageClient() {
  const date = todayKey();
  const [type, setType] = useState<JournalType>("morning");
  const history = useJournalHistory();

  return (
    <>
      <SectionHeader title="Journal" subtitle={formatDisplayDate(date)} />

      <Tabs value={type} onChange={(_, v) => setType(v)} sx={{ mb: 2.5, borderBottom: 1, borderColor: "divider" }}>
        <Tab value="morning" label="Morning Journal" sx={{ textTransform: "none", fontWeight: 600 }} />
        <Tab value="evening" label="Evening Reflection" sx={{ textTransform: "none", fontWeight: 600 }} />
      </Tabs>

      <JournalEditor date={date} type={type} />

      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "text.secondary", mt: 4, mb: 1.5 }}>
        PAST ENTRIES
      </Typography>

      {history.length === 0 ? (
        <EmptyState icon={BookText} title="No past entries" description="Your journal history will appear here." />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {history.slice(0, 20).map((item) => (
            <Card key={item.id} sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>
                  {formatDisplayDate(item.date)} · {item.type === "morning" ? "Morning" : "Evening"}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  Mood {item.mood} · Energy {item.energy} · Stress {item.stress}
                </Typography>
              </Box>
              {item.wins && <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{item.wins}</Typography>}
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
