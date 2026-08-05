export type ThemeMode = "light" | "dark" | "system";

export type AccentColor = "blue" | "purple" | "green" | "orange" | "pink" | "red";

export type Settings = {
  id: "singleton";
  themeMode: ThemeMode;
  accentColor: AccentColor;
  lifeMission: string;
  autoBackupEnabled: boolean;
  autoBackupIntervalDays: number;
  lastAutoBackupAt: number | null;
  lastBackupSnapshot: string | null;
  onboardingComplete: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  id: "singleton",
  themeMode: "system",
  accentColor: "blue",
  lifeMission: "Build a life of focus, discipline and compounding growth.",
  autoBackupEnabled: true,
  autoBackupIntervalDays: 1,
  lastAutoBackupAt: null,
  lastBackupSnapshot: null,
  onboardingComplete: false,
};

export const ACCENT_HEX: Record<AccentColor, string> = {
  blue: "#2b5cff",
  purple: "#8b5cf6",
  green: "#10b981",
  orange: "#f5a623",
  pink: "#ec4899",
  red: "#e5484d",
};
