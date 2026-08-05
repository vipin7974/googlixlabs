"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography, Divider } from "@mui/material";
import { LIFEOS_NAV } from "@/lib/lifeos/constants/nav";
import { LifeOsIcon } from "@/components/lifeos/ui/Icon";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", py: 3, px: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
          }}
        >
          L
        </Box>
        <Typography sx={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: 18 }}>
          LifeOS
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {LIFEOS_NAV.map((group, groupIndex) => (
          <Box key={group.label} sx={{ mb: 2 }}>
            <Typography
              sx={{
                px: 1.5,
                mb: 0.5,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "text.secondary",
                opacity: 0.6,
              }}
            >
              {group.label}
            </Typography>
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={onNavigate} style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      px: 1.5,
                      py: 1,
                      borderRadius: "10px",
                      mb: 0.25,
                      color: active ? "primary.main" : "text.primary",
                      bgcolor: active ? "action.selected" : "transparent",
                      fontWeight: active ? 600 : 500,
                      fontSize: 14,
                      transition: "background-color 0.15s ease",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <LifeOsIcon name={item.icon} size={17} />
                    {item.label}
                  </Box>
                </Link>
              );
            })}
            {groupIndex < LIFEOS_NAV.length - 1 && <Divider sx={{ my: 1.5, opacity: 0.4 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
