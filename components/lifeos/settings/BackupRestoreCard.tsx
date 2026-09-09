"use client";

import { useRef, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { Download, Upload, RotateCcw } from "lucide-react";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { exportLifeOsData, importLifeOsData, downloadJson, readJsonFile } from "@/lib/lifeos/utils/backup";
import { getLifeOsDb } from "@/lib/lifeos/db/schema";
import { ensureLifeOsSeeded } from "@/lib/lifeos/db/seed";

export function BackupRestoreCard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [restoreFile, setRestoreFile] = useState<File | null>(null);

  async function handleExport() {
    const backup = await exportLifeOsData();
    downloadJson(`lifeos-backup-${new Date(backup.exportedAt).toISOString().slice(0, 10)}.json`, backup);
    setStatus("Backup downloaded.");
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setRestoreFile(file);
    e.target.value = "";
  }

  async function confirmRestore() {
    if (!restoreFile) return;
    const backup = await readJsonFile(restoreFile);
    await importLifeOsData(backup);
    setStatus("Backup restored. Reloading…");
    setTimeout(() => window.location.reload(), 800);
  }

  async function confirmReset() {
    const db = getLifeOsDb();
    await Promise.all(db.tables.map((table) => table.clear()));
    await ensureLifeOsSeeded();
    setStatus("All data reset. Reloading…");
    setTimeout(() => window.location.reload(), 800);
  }

  return (
    <Card sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>Backup & Restore</Typography>
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 2 }}>
        Cloud Sync above covers most cases, but a downloaded file is the safest copy — keep one somewhere outside the browser.
      </Typography>

      <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<Download size={16} />} onClick={handleExport}>
          Export JSON
        </Button>
        <Button variant="outlined" startIcon={<Upload size={16} />} onClick={handleImportClick}>
          Import JSON
        </Button>
        <Button variant="text" color="error" startIcon={<RotateCcw size={16} />} onClick={() => setResetOpen(true)}>
          Reset All Data
        </Button>
      </Box>

      <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleFileSelected} />

      {status && (
        <Typography sx={{ fontSize: 12.5, color: "success.main", mt: 1.5 }}>{status}</Typography>
      )}

      <ConfirmDialog
        open={restoreFile !== null}
        title="Restore from backup?"
        description="This replaces all current LifeOS data with the contents of the selected file. This cannot be undone."
        confirmLabel="Restore"
        onConfirm={confirmRestore}
        onClose={() => setRestoreFile(null)}
      />

      <ConfirmDialog
        open={resetOpen}
        title="Reset all LifeOS data?"
        description="This permanently deletes every task, goal, habit, journal entry and everything else stored in LifeOS. This cannot be undone."
        confirmLabel="Reset Everything"
        onConfirm={confirmReset}
        onClose={() => setResetOpen(false)}
      />
    </Card>
  );
}
