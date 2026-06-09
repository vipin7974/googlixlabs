"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

type Position = "top" | "middle" | "bottom";

export default function ScrollControls() {
  const [pos, setPos] = useState<Position>("top");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // edge cases first
      if (max <= 0) {
        setPos("top");
        return;
      }
      if (y < 80) setPos("top");
      else if (y >= max - 80) setPos("bottom");
      else setPos("middle");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const toBottom = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* Scroll to top — hidden when already at top */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-brand-blue transition-all duration-300 hover:-translate-y-0.5 sm:h-12 sm:w-12 ${
          pos === "top"
            ? "pointer-events-none translate-y-3 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <ArrowUp size={18} />
      </button>

      {/* Scroll to bottom — hidden when already at bottom */}
      <button
        type="button"
        onClick={toBottom}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        className={`grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue sm:h-12 sm:w-12 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:text-blue-300 ${
          pos === "bottom"
            ? "pointer-events-none translate-y-3 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <ArrowDown size={18} />
      </button>
    </div>
  );
}
