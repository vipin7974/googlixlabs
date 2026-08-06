"use client";

import { useEffect, useState } from "react";

/**
 * Ticks every second while a session is running, deriving elapsed seconds
 * from a persisted `startedAt` timestamp rather than local state — so the
 * timer reads correctly even after a reload or navigating away and back.
 */
export function useElapsedTime(startedAt: number | null, endedAt: number | null): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!startedAt || endedAt) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [startedAt, endedAt]);

  if (!startedAt) return 0;
  const end = endedAt ?? now;
  return Math.max(0, Math.floor((end - startedAt) / 1000));
}

export function formatElapsed(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}
