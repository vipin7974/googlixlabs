"use client";

import { useMemo, useState } from "react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { Library, Plus } from "lucide-react";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { EmptyState } from "@/components/lifeos/ui/EmptyState";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { BookCard } from "./BookCard";
import { BookForm } from "./BookForm";
import { useBooks } from "@/lib/lifeos/hooks/useBooks";
import type { BookEntry, BookMediaType } from "@/lib/lifeos/types/book";

type FilterTab = "all" | BookMediaType;

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "book", label: "Books" },
  { value: "course", label: "Courses" },
  { value: "video", label: "Videos" },
];

export function BooksPageClient() {
  const { books, createBook, updateBook, deleteBook } = useBooks();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookEntry | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBooks = useMemo(
    () => (activeTab === "all" ? books : books.filter((b) => b.mediaType === activeTab)),
    [books, activeTab]
  );

  function openCreate() {
    setEditingBook(undefined);
    setFormOpen(true);
  }

  function openEdit(book: BookEntry) {
    setEditingBook(book);
    setFormOpen(true);
  }

  return (
    <>
      <SectionHeader
        title="Books & Courses"
        subtitle="Track what you're reading, watching, and learning"
        action={
          <Button variant="contained" startIcon={<Plus size={17} />} onClick={openCreate}>
            Add
          </Button>
        }
      />

      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} sx={{ textTransform: "none", fontWeight: 600 }} />
        ))}
      </Tabs>

      {filteredBooks.length === 0 ? (
        <EmptyState
          icon={Library}
          title="Nothing here yet"
          description="Add a book, course, or video you're working through and track your progress over time."
          actionLabel="Add Entry"
          onAction={openCreate}
        />
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 2 }}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => openEdit(book)}
              onDelete={() => setDeletingId(book.id)}
            />
          ))}
        </Box>
      )}

      <BookForm
        key={editingBook?.id ?? `new-${formOpen}`}
        open={formOpen}
        initialBook={editingBook}
        onClose={() => setFormOpen(false)}
        onSubmit={async (values) => {
          if (editingBook) {
            await updateBook(editingBook.id, values);
          } else {
            await createBook(values);
          }
          setFormOpen(false);
        }}
      />

      <ConfirmDialog
        open={deletingId !== null}
        title="Delete entry?"
        description="This book, course, or video entry will be permanently removed."
        onConfirm={() => {
          if (deletingId) deleteBook(deletingId);
        }}
        onClose={() => setDeletingId(null)}
      />
    </>
  );
}
