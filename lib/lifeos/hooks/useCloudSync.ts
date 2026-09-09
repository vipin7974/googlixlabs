"use client";

import { useCallback, useEffect, useState } from "react";
import { exportLifeOsData, importLifeOsData, type LifeOsBackup } from "../utils/backup";
import { ensureSyncCode, isValidSyncCode, setSyncCode } from "../utils/syncCode";
import { useSettings } from "./useSettings";

export type CloudSyncStatus = "idle" | "syncing" | "error";

export function useCloudSync() {
  const { settings, saveSettings } = useSettings();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<CloudSyncStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCode(ensureSyncCode());
  }, []);

  const push = useCallback(async (): Promise<boolean> => {
    const activeCode = code || ensureSyncCode();
    if (!activeCode) return false;

    setStatus("syncing");
    setError(null);
    try {
      const backup = await exportLifeOsData();
      const res = await fetch("/api/lifeos/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: activeCode, backup }),
      });
      const data = await res.json();

      if (!data.configured) {
        setStatus("error");
        setError("Cloud sync isn't configured for this deployment yet.");
        return false;
      }
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError("Sync failed.");
        return false;
      }

      await saveSettings({ lastAutoBackupAt: Date.now() });
      setStatus("idle");
      return true;
    } catch {
      setStatus("error");
      setError("Sync failed — check your connection.");
      return false;
    }
  }, [code, saveSettings]);

  const pull = useCallback(async (targetCode: string): Promise<{ ok: boolean; message: string }> => {
    const normalized = targetCode.trim().toLowerCase();
    if (!isValidSyncCode(normalized)) {
      return { ok: false, message: "That code doesn't look right — codes are 6+ letters/numbers." };
    }

    try {
      const res = await fetch(`/api/lifeos/sync?code=${encodeURIComponent(normalized)}`);
      const data = await res.json();

      if (!data.configured) {
        return { ok: false, message: "Cloud sync isn't configured for this deployment yet." };
      }
      if (!res.ok || !data.found) {
        return { ok: false, message: "No backup found for that code yet." };
      }

      await importLifeOsData(data.backup as LifeOsBackup);
      setSyncCode(normalized);
      setCode(normalized);
      return { ok: true, message: "Restored. Reloading…" };
    } catch {
      return { ok: false, message: "Restore failed — check your connection." };
    }
  }, []);

  return { code, status, error, lastSyncedAt: settings.lastAutoBackupAt, push, pull };
}
