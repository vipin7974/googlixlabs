"use client";

import { useEffect, useState } from "react";

const KEY = "gx_recent_tools";
const MAX_RECENT = 4;

export function recordToolVisit(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    const list: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    const next = [slug, ...list.filter((s) => s !== slug)].slice(0, MAX_RECENT);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — recent-tools is a nice-to-have, fail silently.
  }
}

/** Reads recently-visited tool slugs, newest first. Empty on first paint (SSR-safe). */
export function useRecentTools(): string[] {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw) as string[]);
    } catch {
      // ignore
    }
  }, []);

  return slugs;
}
