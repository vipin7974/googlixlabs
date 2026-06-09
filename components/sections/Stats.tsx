"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket, Users, Star, Clock } from "lucide-react";
import Reveal from "../Reveal";

interface Stat {
  Icon: typeof Rocket;
  end: number;
  suffix: string;
  label: string;
  color: string;
  bg: string;
}

const STATS: Stat[] = [
  { Icon: Rocket, end: 50, suffix: "+", label: "Projects Delivered", color: "text-brand-blue", bg: "bg-brand-blue-lt" },
  { Icon: Users, end: 15, suffix: "+", label: "Happy Clients", color: "text-brand-red", bg: "bg-brand-red-lt" },
  { Icon: Star, end: 99, suffix: "%", label: "Satisfaction Rate", color: "text-amber-600", bg: "bg-brand-yel-lt" },
  { Icon: Clock, end: 24, suffix: "/7", label: "Dedicated Support", color: "text-emerald-600", bg: "bg-brand-grn-lt" },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * end));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="section-pad relative bg-surface-alt dark:bg-[#0F1226]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">By The Numbers</span>
          <h2 className="section-title mt-4 sm:mt-5">
            Results That Speak <span className="gradient-text">For Themselves</span>
          </h2>
          <p className="section-sub mx-auto">
            Every number represents a client&apos;s dream turned into reality — on
            time, within budget, beyond expectations.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="card-soft group p-5 text-center sm:p-7 md:p-8">
                <div className={`mx-auto grid h-11 w-11 place-items-center rounded-xl ${s.bg} transition group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl`}>
                  <s.Icon className={s.color} size={22} />
                </div>
                <div className="mt-3 font-display text-3xl font-extrabold text-ink dark:text-white sm:mt-5 sm:text-4xl md:text-5xl">
                  <Counter end={s.end} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs font-medium text-ink-sec dark:text-slate-300 sm:mt-2 sm:text-sm">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
