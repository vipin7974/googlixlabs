import type { ID, EntityTimestamps } from "./common";

export type BookMediaType = "book" | "course" | "video";

export type BookEntry = EntityTimestamps & {
  id: ID;
  title: string;
  mediaType: BookMediaType;
  author: string;
  completion: number;
  notes: string;
  startedDate: string | null;
  finishedDate: string | null;
};

export type BookDraft = Omit<BookEntry, "id" | "createdAt" | "updatedAt">;

export const BOOK_MEDIA_LABELS: Record<BookMediaType, string> = {
  book: "Book",
  course: "Course",
  video: "Video",
};
