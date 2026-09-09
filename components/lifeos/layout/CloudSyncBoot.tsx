"use client";

import { useEffect, useRef } from "react";
import { useCloudSync } from "@/lib/lifeos/hooks/useCloudSync";

const AUTO_SYNC_INTERVAL_MS = 5 * 60 * 1000;
const INITIAL_SYNC_DELAY_MS = 4000;

/**
 * Mounted once inside the seeded LifeOS app tree. Pushes a full backup to the
 * cloud (keyed by this device's sync code, see lib/lifeos/utils/syncCode.ts)
 * on load, every few minutes, and whenever the tab is hidden/closed — so
 * data survives a cleared browser, a new device, or IndexedDB eviction.
 */
export function CloudSyncBoot() {
  const { push } = useCloudSync();
  const pushRef = useRef(push);
  pushRef.current = push;

  useEffect(() => {
    if ("storage" in navigator && "persist" in navigator.storage) {
      navigator.storage.persist().catch(() => {});
    }

    const initial = window.setTimeout(() => pushRef.current(), INITIAL_SYNC_DELAY_MS);
    const interval = window.setInterval(() => pushRef.current(), AUTO_SYNC_INTERVAL_MS);

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") pushRef.current();
    }
    function handlePageHide() {
      pushRef.current();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return null;
}
