"use client";

import { useEffect, useState } from "react";
import { ensureLifeOsSeeded } from "../db/seed";

export function useLifeOsSeed(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    ensureLifeOsSeeded().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
