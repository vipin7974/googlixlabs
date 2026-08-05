"use client";

import { Box } from "@mui/material";
import { SectionHeader } from "@/components/lifeos/ui/SectionHeader";
import { ThemeSettingsCard } from "./ThemeSettingsCard";
import { LifeMissionCard } from "./LifeMissionCard";
import { DailyQuestionsSettingsCard } from "./DailyQuestionsSettingsCard";
import { BackupRestoreCard } from "./BackupRestoreCard";

export function SettingsPageClient() {
  return (
    <>
      <SectionHeader title="Settings" subtitle="Everything runs and stays entirely on this device" />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, maxWidth: 640 }}>
        <ThemeSettingsCard />
        <LifeMissionCard />
        <DailyQuestionsSettingsCard />
        <BackupRestoreCard />
      </Box>
    </>
  );
}
