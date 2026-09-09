"use client";

import { Box } from "@mui/material";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { ThemeSettingsCard } from "./ThemeSettingsCard";
import { LifeMissionCard } from "./LifeMissionCard";
import { DailyQuestionsSettingsCard } from "./DailyQuestionsSettingsCard";
import { BackupRestoreCard } from "./BackupRestoreCard";
import { CloudSyncCard } from "./CloudSyncCard";

export function SettingsPageClient() {
  return (
    <>
      <SectionHeader title="Settings" subtitle="Stored on this device and auto-synced to the cloud" />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, maxWidth: 640 }}>
        <ThemeSettingsCard />
        <LifeMissionCard />
        <DailyQuestionsSettingsCard />
        <CloudSyncCard />
        <BackupRestoreCard />
      </Box>
    </>
  );
}
