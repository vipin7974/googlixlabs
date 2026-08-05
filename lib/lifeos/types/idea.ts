import type { ID, Priority, EntityTimestamps } from "./common";

export type IdeaStatus = "new" | "considering" | "in_progress" | "done" | "archived";

export type BusinessPotential = "none" | "low" | "medium" | "high";

export type Idea = EntityTimestamps & {
  id: ID;
  title: string;
  category: string;
  priority: Priority;
  businessPotential: BusinessPotential;
  actionLater: string;
  date: string;
  status: IdeaStatus;
};

export type IdeaDraft = Omit<Idea, "id" | "createdAt" | "updatedAt">;

export const IDEA_STATUS_LABELS: Record<IdeaStatus, string> = {
  new: "New",
  considering: "Considering",
  in_progress: "In Progress",
  done: "Done",
  archived: "Archived",
};
