import type { ReactNode } from "react";
import type { ToolIconName } from "@/lib/tools/types";

type IconProps = { size?: number; className?: string };

// Minimal stroke icons matching the nav/hamburger visual language
// (currentColor, ~1.6 stroke, rounded caps) — no icon library dependency.
const paths: Record<ToolIconName, ReactNode> = {
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8 7h8M8 11h1M11.5 11h1M15 11h1M8 14.5h1M11.5 14.5h1M15 14.5h1M8 18h1M11.5 18h1M15 15v5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12.5 16V8M17 16v-7" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
      <path d="M12 13l3-3.5" />
      <circle cx="12" cy="13" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  qrcode: (
    <>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
      <path d="M14 15h2.6M14 18.4h6M19 15v5.4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 4a8 8 0 0 0-6.9 12.1L4 20l4.1-1.1A8 8 0 1 0 12 4Z" />
      <path d="M9.2 9.7c.3-.7 1.4-.7 1.7 0l.3.9c.2.5 0 1-.4 1.3-.2.2-.3.5-.1.8.6.9 1.3 1.5 2.3 2 .3.1.6 0 .8-.2.3-.4.8-.5 1.2-.3l.9.4c.6.3.7 1.2.2 1.6-1.2 1.1-3 1-4.6.1-1.5-.9-2.7-2.2-3.4-3.8-.7-1.6-.6-3 .1-3.8Z" fill="currentColor" stroke="none" />
    </>
  ),
  percent: (
    <>
      <path d="M6 18L18 6" />
      <circle cx="7.5" cy="7.5" r="2.2" />
      <circle cx="16.5" cy="16.5" r="2.2" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="8" rx="5.5" ry="3" />
      <path d="M3.5 8v4c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3V8" />
      <ellipse cx="15.5" cy="14.5" rx="4.5" ry="2.4" />
      <path d="M11 14.5v2.2c0 1.33 2.01 2.4 4.5 2.4s4.5-1.07 4.5-2.4v-2.2" />
    </>
  ),
  document: (
    <>
      <path d="M7 3.5h7l3.5 3.5V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V7h3.5" />
      <path d="M8.5 12h7M8.5 15h7M8.5 9h3" />
    </>
  ),
  idcard: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <circle cx="8.5" cy="11" r="1.9" />
      <path d="M5.8 15.8c.5-1.5 1.6-2.3 2.7-2.3s2.2.8 2.7 2.3" />
      <path d="M14.5 9.5h4M14.5 12.5h4M14.5 15.5h2.5" />
    </>
  ),
};

export function ToolIcon({ name, size = 22, className }: { name: ToolIconName } & IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
