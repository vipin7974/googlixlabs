"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { settingsRepository } from "../repositories/repositories";
import { DEFAULT_SETTINGS, type Settings } from "../types/settings";

export function useSettings() {
  const settings = useLiveQuery(() => settingsRepository.getSettings(), []);

  async function saveSettings(changes: Partial<Settings>) {
    return settingsRepository.saveSettings(changes);
  }

  return { settings: settings ?? DEFAULT_SETTINGS, loading: settings === undefined, saveSettings };
}
