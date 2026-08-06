import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LifeOsThemeProvider } from "@/lib/lifeos/context/ThemeContext";
import { LifeOsAppGate } from "@/components/lifeos/layout/LifeOsAppGate";
import { ServiceWorkerRegister } from "@/components/lifeos/layout/ServiceWorkerRegister";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b5cff",
};

export const metadata: Metadata = {
  title: { default: "LifeOS", template: "%s · LifeOS" },
  description: "A personal operating system for focus, discipline and long-term goals.",
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: "/lifeos-icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/lifeos-apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "LifeOS",
    statusBarStyle: "black-translucent",
  },
};

export default function LifeOsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "lifeos-mui" }}>
      {/*
        The root layout's `app/manifest.ts` file convention always wins over a
        nested segment's `metadata.manifest` string in this Next version, so
        the LifeOS manifest is linked directly here instead — Next hoists any
        <link>/<meta> rendered in the tree into <head>, and de-dupes by rel,
        so this one (being deeper in the tree) takes precedence over the root's.
      */}
      <link rel="manifest" href="/lifeos/manifest.webmanifest" />
      <LifeOsThemeProvider>
        <ServiceWorkerRegister />
        <LifeOsAppGate>{children}</LifeOsAppGate>
      </LifeOsThemeProvider>
    </AppRouterCacheProvider>
  );
}
