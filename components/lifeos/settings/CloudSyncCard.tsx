"use client";

import { useState } from "react";
import { Box, Button, Card, Chip, TextField, Typography } from "@mui/material";
import { Check, CloudUpload, Copy, RefreshCw } from "lucide-react";
import { ConfirmDialog } from "@/components/lifeos/ui/ConfirmDialog";
import { useCloudSync } from "@/lib/lifeos/hooks/useCloudSync";
import { formatDateTime } from "@/lib/lifeos/utils/date";

export function CloudSyncCard() {
  const { code, status, error, lastSyncedAt, push, pull } = useCloudSync();
  const [copied, setCopied] = useState(false);
  const [pasteCode, setPasteCode] = useState("");
  const [pushMessage, setPushMessage] = useState<string | null>(null);
  const [pullMessage, setPullMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleCopy() {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleSyncNow() {
    setPushMessage(null);
    const ok = await push();
    setPushMessage(ok ? "Synced just now." : error ?? "Sync failed.");
  }

  async function handleRestore() {
    const result = await pull(pasteCode);
    setPullMessage(result.message);
    if (result.ok) {
      setTimeout(() => window.location.reload(), 800);
    }
  }

  return (
    <Card sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>Cloud Sync</Typography>
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 2 }}>
        Data lives on this device first, but auto-syncs to the cloud under the code below every few minutes.
        Open LifeOS on another browser or device and enter the same code to pull it down.
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
        <Chip
          label={code || "generating…"}
          sx={{ fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em", fontSize: 13.5 }}
        />
        <Button size="small" startIcon={copied ? <Check size={14} /> : <Copy size={14} />} onClick={handleCopy} disabled={!code}>
          {copied ? "Copied" : "Copy code"}
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<CloudUpload size={15} />}
          onClick={handleSyncNow}
          disabled={status === "syncing"}
        >
          {status === "syncing" ? "Syncing…" : "Sync now"}
        </Button>
      </Box>

      {(pushMessage || lastSyncedAt) && (
        <Typography sx={{ fontSize: 12, color: pushMessage && !lastSyncedAt ? "error.main" : "text.secondary", mb: 2 }}>
          {pushMessage ?? `Last synced ${formatDateTime(lastSyncedAt as number)}`}
        </Typography>
      )}

      <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1 }}>Restore from another device</Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <TextField
          size="small"
          placeholder="Paste sync code"
          value={pasteCode}
          onChange={(e) => setPasteCode(e.target.value)}
          sx={{ maxWidth: 220 }}
        />
        <Button
          variant="outlined"
          startIcon={<RefreshCw size={16} />}
          onClick={() => setConfirmOpen(true)}
          disabled={!pasteCode.trim()}
        >
          Restore
        </Button>
      </Box>
      {pullMessage && <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 1 }}>{pullMessage}</Typography>}

      <ConfirmDialog
        open={confirmOpen}
        title="Restore from this code?"
        description="This replaces everything currently stored on this device with the cloud backup saved under that code. This cannot be undone."
        confirmLabel="Restore"
        onConfirm={handleRestore}
        onClose={() => setConfirmOpen(false)}
      />
    </Card>
  );
}
