"use client";

import { useMemo, useState } from "react";
import { Box, Button, Card, Tab, Tabs, TextField } from "@mui/material";
import { Lightbulb, Plus, Zap } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { IdeaCard } from "./IdeaCard";
import { IdeaForm } from "./IdeaForm";
import { useIdeas } from "@/lib/lifeos/hooks/useIdeas";
import { todayKey } from "@/lib/lifeos/utils/date";
import { IDEA_STATUS_LABELS, type Idea, type IdeaStatus } from "@/lib/lifeos/types/idea";

type StatusFilter = "all" | IdeaStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: IDEA_STATUS_LABELS.new },
  { value: "considering", label: IDEA_STATUS_LABELS.considering },
  { value: "in_progress", label: IDEA_STATUS_LABELS.in_progress },
  { value: "done", label: IDEA_STATUS_LABELS.done },
  { value: "archived", label: IDEA_STATUS_LABELS.archived },
];

export function IdeasPageClient() {
  const { ideas, loading, createIdea, updateIdea, deleteIdea } = useIdeas();
  const [quickTitle, setQuickTitle] = useState("");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredIdeas = useMemo(
    () => (activeStatus === "all" ? ideas : ideas.filter((idea) => idea.status === activeStatus)),
    [ideas, activeStatus]
  );

  async function handleQuickCapture() {
    const title = quickTitle.trim();
    if (!title) return;
    setQuickTitle("");
    await createIdea({
      title,
      category: "",
      priority: "medium",
      businessPotential: "none",
      actionLater: "",
      date: todayKey(),
      status: "new",
    });
  }

  return (
    <>
      <SectionHeader
        title="Idea Parking Lot"
        subtitle="Capture it, don't chase it — come back when you're ready."
        action={
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => {
              setEditingIdea(undefined);
              setFormOpen(true);
            }}
          >
            Add Idea
          </Button>
        }
      />

      <Card sx={{ p: 2, mb: 3, display: "flex", gap: 1.5, alignItems: "center" }}>
        <TextField
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleQuickCapture();
            }
          }}
          placeholder="Capture a distraction before it derails you…"
          fullWidth
          autoFocus
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<Zap size={16} />}
          onClick={handleQuickCapture}
          disabled={!quickTitle.trim()}
          sx={{ flexShrink: 0 }}
        >
          Capture
        </Button>
      </Card>

      <Tabs
        value={activeStatus}
        onChange={(_, value) => setActiveStatus(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        {STATUS_TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} sx={{ textTransform: "none", fontWeight: 600 }} />
        ))}
      </Tabs>

      {!loading && filteredIdeas.length === 0 && (
        <EmptyState
          icon={Lightbulb}
          title="No ideas here yet"
          description="Use the quick capture bar above to park a distraction the moment it hits, then come back when you're ready to act on it."
          actionLabel={activeStatus === "all" ? "Add Idea" : undefined}
          onAction={activeStatus === "all" ? () => setFormOpen(true) : undefined}
        />
      )}

      <Box>
        {filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onEdit={() => {
              setEditingIdea(idea);
              setFormOpen(true);
            }}
            onDelete={() => setDeletingId(idea.id)}
          />
        ))}
      </Box>

      <IdeaForm
        key={editingIdea?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialIdea={editingIdea}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingIdea) {
            await updateIdea(editingIdea.id, values);
          } else {
            await createIdea({ ...values, date: todayKey() });
          }
          setFormOpen(false);
        }}
      />

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete idea?"
        description="This idea will be permanently removed from your parking lot."
        onConfirm={() => {
          if (deletingId) deleteIdea(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
