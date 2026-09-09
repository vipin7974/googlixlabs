"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Plus, CalendarDays } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ChallengeCard } from "./ChallengeCard";
import { ChallengeForm } from "./ChallengeForm";
import { useChallenges } from "@/lib/lifeos/hooks/useChallenges";
import type { Challenge } from "@/lib/lifeos/types/challenge";

export function ChallengesPageClient() {
  const { challenges, createChallenge, updateChallenge, archiveChallenge } = useChallenges();
  const [formOpen, setFormOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | undefined>(undefined);

  return (
    <>
      <SectionHeader
        title="Day Challenges"
        subtitle="Commit to a habit for a fixed number of days and watch the calendar fill in."
        action={
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => {
              setEditingChallenge(undefined);
              setFormOpen(true);
            }}
          >
            New Challenge
          </Button>
        }
      />

      {challenges.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No challenges yet"
          description={'Start a fixed-length challenge like "No sugar for 30 days" — pick a start date and duration, and a calendar builds itself.'}
          actionLabel="New Challenge"
          onAction={() => setFormOpen(true)}
        />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onEdit={() => {
                setEditingChallenge(challenge);
                setFormOpen(true);
              }}
              onArchive={() => archiveChallenge(challenge.id)}
            />
          ))}
        </Box>
      )}

      <ChallengeForm
        key={editingChallenge?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialChallenge={editingChallenge}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingChallenge) {
            await updateChallenge(editingChallenge.id, values);
          } else {
            await createChallenge(values);
          }
          setFormOpen(false);
        }}
      />
    </>
  );
}
