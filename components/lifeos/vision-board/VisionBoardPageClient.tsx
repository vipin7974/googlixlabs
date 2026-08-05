"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Plus, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { VisionCard } from "./VisionCard";
import { VisionForm } from "./VisionForm";
import { useVisionBoard } from "@/lib/lifeos/hooks/useVisionBoard";
import type { VisionItem } from "@/lib/lifeos/types/vision";

export function VisionBoardPageClient() {
  const { items, createItem, updateItem, deleteItem } = useVisionBoard();
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VisionItem | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openCreate() {
    setEditingItem(undefined);
    setFormOpen(true);
  }

  function openEdit(item: VisionItem) {
    setEditingItem(item);
    setFormOpen(true);
  }

  return (
    <>
      <SectionHeader
        title="Vision Board"
        subtitle="Dream House · Dream Car · Dream Business · Dream Lifestyle"
        action={
          <Button variant="contained" startIcon={<Plus size={17} />} onClick={openCreate}>
            Add
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Your vision board is empty"
          description="Add your first dream image or an inspiring quote to start visualizing the life you're building toward."
          actionLabel="Add to Board"
          onAction={openCreate}
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {items.map((item) => (
            <VisionCard
              key={item.id}
              item={item}
              onEdit={() => openEdit(item)}
              onDelete={() => setDeletingId(item.id)}
            />
          ))}
        </Box>
      )}

      <VisionForm
        key={editingItem?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialItem={editingItem}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingItem) {
            await updateItem(editingItem.id, values);
          } else {
            await createItem(values);
          }
          setFormOpen(false);
        }}
      />

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete vision item?"
        description="This image or quote will be permanently removed from your vision board."
        onConfirm={() => {
          if (deletingId) deleteItem(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
