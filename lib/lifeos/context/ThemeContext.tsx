"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme, type Theme } from "@mui/material/styles";
import { useSettings } from "../hooks/useSettings";
import { ACCENT_HEX, type AccentColor, type ThemeMode } from "../types/settings";

type LifeOsThemeContextValue = {
  mode: "light" | "dark";
  themeMode: ThemeMode;
  accentColor: AccentColor;
  setThemeMode: (mode: ThemeMode) => void;
  setAccentColor: (color: AccentColor) => void;
};

const LifeOsThemeContext = createContext<LifeOsThemeContextValue | null>(null);

export function useLifeOsTheme(): LifeOsThemeContextValue {
  const ctx = useContext(LifeOsThemeContext);
  if (!ctx) throw new Error("useLifeOsTheme must be used within LifeOsThemeProvider");
  return ctx;
}

export function LifeOsThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings, saveSettings } = useSettings();
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mql.matches);
    const handler = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const mode: "light" | "dark" =
    settings.themeMode === "system" ? (systemDark ? "dark" : "light") : settings.themeMode;

  const theme = useMemo<Theme>(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: ACCENT_HEX[settings.accentColor] },
          background:
            mode === "dark"
              ? { default: "#111214", paper: "#1b1c1f" }
              : { default: "#f6f6f3", paper: "#ffffff" },
        },
        shape: { borderRadius: 16 },
        typography: {
          fontFamily: "var(--font-manrope), -apple-system, BlinkMacSystemFont, sans-serif",
          h1: { fontFamily: "var(--font-bricolage), sans-serif" },
          h2: { fontFamily: "var(--font-bricolage), sans-serif" },
          h3: { fontFamily: "var(--font-bricolage), sans-serif" },
          h4: { fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700 },
          h5: { fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700 },
          h6: { fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700 },
        },
        components: {
          MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
          MuiButton: {
            styleOverrides: { root: { textTransform: "none", borderRadius: 12, fontWeight: 600 } },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 20,
                boxShadow: mode === "dark" ? "none" : "0 1px 2px rgba(23,24,27,0.04)",
                border: mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(23,24,27,0.07)",
              },
            },
          },
          MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
        },
      }),
    [mode, settings.accentColor]
  );

  const value: LifeOsThemeContextValue = {
    mode,
    themeMode: settings.themeMode,
    accentColor: settings.accentColor,
    setThemeMode: (nextMode) => {
      void saveSettings({ themeMode: nextMode });
    },
    setAccentColor: (color) => {
      void saveSettings({ accentColor: color });
    },
  };

  return (
    <LifeOsThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <div
          className={mode === "dark" ? "dark" : ""}
          style={{
            minHeight: "100vh",
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </LifeOsThemeContext.Provider>
  );
}
