import type { ID, EntityTimestamps } from "./common";

export type VisionCategory = "dream_house" | "dream_car" | "dream_business" | "dream_lifestyle" | "quote" | "other";

export type VisionItem = EntityTimestamps & {
  id: ID;
  category: VisionCategory;
  imageDataUrl: string | null;
  quote: string;
  caption: string;
  order: number;
};

export type VisionDraft = Omit<VisionItem, "id" | "createdAt" | "updatedAt" | "order">;

export const VISION_CATEGORY_LABELS: Record<VisionCategory, string> = {
  dream_house: "Dream House",
  dream_car: "Dream Car",
  dream_business: "Dream Business",
  dream_lifestyle: "Dream Lifestyle",
  quote: "Quote",
  other: "Other",
};
