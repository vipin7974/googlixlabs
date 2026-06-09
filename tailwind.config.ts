import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#4B7CFF",
          "blue-lt": "#EEF2FF",
          "blue-md": "#DBEAFE",
          red: "#FF5E57",
          "red-lt": "#FFF1F0",
          yellow: "#FFC947",
          "yel-lt": "#FFFBEB",
          green: "#3DDC91",
          "grn-lt": "#ECFDF5",
          purple: "#7C6EF5",
          cyan: "#22D3EE",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F7F9FC",
          muted: "#EEF2F8",
        },
        ink: {
          DEFAULT: "#0A0F1E",
          sec: "#4A5568",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "22px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.06)",
        card: "0 8px 32px rgba(0,0,0,0.08)",
        lift: "0 20px 64px rgba(0,0,0,0.10)",
        glow: "0 32px 80px rgba(0,0,0,0.12)",
        "brand-blue": "0 8px 28px rgba(75,124,255,0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        blob: "blob 14s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-20px,30px) scale(0.95)" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.4" },
        },
      },
      backgroundImage: {
        "brand-grad": "linear-gradient(135deg,#4B7CFF 0%,#7C6EF5 50%,#22D3EE 100%)",
        "warm-grad": "linear-gradient(135deg,#FF5E57 0%,#FFC947 100%)",
        "soft-radial":
          "radial-gradient(1200px 800px at 20% 0%, #EEF2FF 0%, transparent 60%), radial-gradient(900px 700px at 90% 30%, #FFF1F0 0%, transparent 55%)",
      },
    },
  },
  plugins: [],
};

export default config;
