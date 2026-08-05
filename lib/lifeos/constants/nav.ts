export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const LIFEOS_NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/lifeos", label: "Dashboard", icon: "layout-dashboard" },
      { href: "/lifeos/analytics", label: "Life Dashboard", icon: "bar-chart-3" },
    ],
  },
  {
    label: "Plan",
    items: [
      { href: "/lifeos/daily", label: "Daily Questions", icon: "sun" },
      { href: "/lifeos/tasks", label: "Tasks", icon: "check-square" },
      { href: "/lifeos/goals", label: "Life Goals", icon: "target" },
    ],
  },
  {
    label: "Capture",
    items: [{ href: "/lifeos/ideas", label: "Idea Parking Lot", icon: "lightbulb" }],
  },
  {
    label: "Build",
    items: [
      { href: "/lifeos/habits", label: "Habit Tracker", icon: "flame" },
      { href: "/lifeos/journal", label: "Journal", icon: "book-text" },
    ],
  },
  {
    label: "Reflect",
    items: [
      { href: "/lifeos/reviews/weekly", label: "Weekly Review", icon: "calendar-check" },
      { href: "/lifeos/reviews/monthly", label: "Monthly Review", icon: "calendar-range" },
    ],
  },
  {
    label: "Deep Work",
    items: [
      { href: "/lifeos/focus", label: "Focus Mode", icon: "crosshair" },
      { href: "/lifeos/timer", label: "Deep Work Timer", icon: "timer" },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/lifeos/learning", label: "Learning", icon: "graduation-cap" },
      { href: "/lifeos/fitness", label: "Fitness", icon: "dumbbell" },
      { href: "/lifeos/finance", label: "Finance", icon: "wallet" },
      { href: "/lifeos/books", label: "Books & Courses", icon: "library" },
    ],
  },
  {
    label: "Vision",
    items: [{ href: "/lifeos/vision-board", label: "Vision Board", icon: "sparkles" }],
  },
  {
    label: "System",
    items: [{ href: "/lifeos/settings", label: "Settings", icon: "settings" }],
  },
];
