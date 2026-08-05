"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { bookRepository } from "../repositories/repositories";
import { generateId } from "../utils/id";
import type { BookEntry, BookDraft } from "../types/book";

export function useBooks() {
  const books = useLiveQuery(() => bookRepository.getAll(), []);

  async function createBook(draft: BookDraft) {
    const now = Date.now();
    const book: BookEntry = { ...draft, id: generateId(), createdAt: now, updatedAt: now };
    await bookRepository.add(book);
    return book;
  }

  async function updateBook(id: string, changes: Partial<BookEntry>) {
    await bookRepository.update(id, { ...changes, updatedAt: Date.now() });
  }

  async function deleteBook(id: string) {
    await bookRepository.remove(id);
  }

  const sorted = (books ?? []).slice().sort((a, b) => b.updatedAt - a.updatedAt);

  return { books: sorted, loading: books === undefined, createBook, updateBook, deleteBook };
}
