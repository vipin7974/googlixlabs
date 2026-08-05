import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LifeOsThemeProvider } from "@/lib/lifeos/context/ThemeContext";
import { LifeOsAppGate } from "@/components/lifeos/layout/LifeOsAppGate";

export const metadata: Metadata = {
  title: { default: "LifeOS", template: "%s · LifeOS" },
  description: "A personal operating system for focus, discipline and long-term goals.",
  robots: { index: false, follow: false },
};

export default function LifeOsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "lifeos-mui" }}>
      <LifeOsThemeProvider>
        <LifeOsAppGate>{children}</LifeOsAppGate>
      </LifeOsThemeProvider>
    </AppRouterCacheProvider>
  );
}
