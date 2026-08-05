"use client";

import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { CheckSquare, GraduationCap, Plus } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { StatCard } from "@/components/lifeos/ui/StatCard";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { LearningItem } from "./LearningItem";
import { LearningForm } from "./LearningForm";
import { useLearningEntries } from "@/lib/lifeos/hooks/useLearning";
import type { LearningEntry } from "@/lib/lifeos/types/learning";

export function LearningPageClient() {
  const { entries, loading, createEntry, updateEntry, deleteEntry } = useLearningEntries();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LearningEntry | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const totalHours = useMemo(
    () => Math.round(entries.reduce((sum, e) => sum + e.hours, 0) * 10) / 10,
    [entries]
  );
  const completedCount = useMemo(() => entries.filter((e) => e.completion >= 100).length, [entries]);

  return (
    <>
      <SectionHeader
        title="Learning Tracker"
        subtitle="Log the skills you're building and where you're applying them"
        action={
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => {
              setEditingEntry(undefined);
              setFormOpen(true);
            }}
          >
            Add Entry
          </Button>
        }
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(2, 1fr)" }, gap: 2, mb: 3, maxWidth: 560 }}>
        <StatCard icon={GraduationCap} label="Total Hours Logged" value={totalHours} color="#3b82f6" />
        <StatCard icon={CheckSquare} label="Completed" value={completedCount} color="#10b981" />
      </Box>

      {!loading && entries.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          title="No learning entries yet"
          description="Log the skills and technologies you're learning to track your progress over time."
          actionLabel="Add Entry"
          onAction={() => setFormOpen(true)}
        />
      )}

      {entries.map((entry) => (
        <LearningItem
          key={entry.id}
          entry={entry}
          onEdit={() => {
            setEditingEntry(entry);
            setFormOpen(true);
          }}
          onDelete={() => setDeletingId(entry.id)}
        />
      ))}

      <LearningForm
        key={editingEntry?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialEntry={editingEntry}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingEntry) {
            await updateEntry(editingEntry.id, values);
          } else {
            await createEntry(values);
          }
          setFormOpen(false);
        }}
      />

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete learning entry?"
        description="This entry will be permanently removed."
        onConfirm={() => {
          if (deletingId) deleteEntry(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
