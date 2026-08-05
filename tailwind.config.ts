import type { Config } from "tailwindcss";

// This project is styled almost entirely with inline styles + globals.css
// (mirroring the supplied design as-is). Tailwind is kept only for the
// base reset layer; no custom utilities are relied on.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // "class" only matters where a `dark` class is actually present in the
  // DOM tree — today that's just the LifeOS root wrapper — so this has no
  // effect on the rest of the (light-only) marketing site.
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
