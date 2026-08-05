"use client";

import { useState } from "react";
import { Box, Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Menu, Moon, Sun, Crosshair } from "lucide-react";
import Link from "next/link";
import { SidebarContent } from "./Sidebar";
import { useLifeOsTheme } from "@/lib/lifeos/context/ThemeContext";
import { formatDisplayDate } from "@/lib/lifeos/utils/date";
import { todayKey } from "@/lib/lifeos/utils/date";

const SIDEBAR_WIDTH = 264;

export function LifeOsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const { mode, themeMode, setThemeMode } = useLifeOsTheme();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isDesktop ? (
        <Box
          component="aside"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            borderRight: mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(23,24,27,0.08)",
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <SidebarContent />
        </Box>
      ) : (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          slotProps={{ paper: { sx: { width: SIDEBAR_WIDTH } } }}
        >
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      )}

      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(23,24,27,0.08)",
            position: "sticky",
            top: 0,
            bgcolor: "background.default",
            zIndex: 10,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {!isDesktop && (
              <IconButton onClick={() => setMobileOpen(true)} size="small">
                <Menu size={20} />
              </IconButton>
            )}
            <Typography sx={{ fontSize: 14, color: "text.secondary", fontWeight: 500 }}>
              {formatDisplayDate(todayKey())}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Link href="/lifeos/focus">
              <IconButton size="small" title="Focus Mode">
                <Crosshair size={18} />
              </IconButton>
            </Link>
            <IconButton
              size="small"
              title={themeMode === "dark" ? "Switch to light" : "Switch to dark"}
              onClick={() => setThemeMode(mode === "dark" ? "light" : "dark")}
            >
              {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 }, maxWidth: 1280, mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
