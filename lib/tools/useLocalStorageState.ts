"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe localStorage-backed state. Renders with `initialValue` on both
 * server and first client paint (so hydration matches), then swaps in the
 * persisted value — if any — right after mount.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // Corrupt value or storage unavailable (private mode) — keep default.
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable or quota exceeded — fail silently.
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
