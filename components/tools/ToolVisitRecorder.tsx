"use client";

import { useEffect } from "react";
import { recordToolVisit } from "@/lib/tools/useRecentTools";

/** Invisible client-only side effect so ToolLayout itself can stay a server component. */
export function ToolVisitRecorder({ slug }: { slug: string }) {
  useEffect(() => {
    recordToolVisit(slug);
  }, [slug]);
  return null;
}
