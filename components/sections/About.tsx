import { Brain, Building2, Target, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Reveal from "../Reveal";

const points = [
  {
    Icon: Brain,
    color: "text-brand-blue",
    bg: "bg-brand-blue-lt",
    title: "AI-First Thinking",
    body: "We integrate intelligent automation into every product layer, from smart UX recommendations to backend AI pipelines.",
  },
  {
    Icon: Building2,
    color: "text-brand-red",
    bg: "bg-brand-red-lt",
    title: "Built to Scale",
    body: "Architecture decisions designed for growth — from 10 users to 10 million without rebuilding from scratch.",
  },
  {
    Icon: Target,
    color: "text-emerald-600",
    bg: "bg-brand-grn-lt",
    title: "Outcome Obsessed",
    body: "We measure success in business impact — conversions, retention, and revenue — not just lines of code.",
  },
];

const stack = [
  "Next.js", "React", "TypeScript", "Node.js", "OpenAI",
  "Figma", "AWS", "Vercel", "PostgreSQL",
];

// Mobile-friendly "code snippet" rendered as a clean list instead of a horizontally-
// scrolling code block. Each line fits within the viewport with no overflow.
const buildLines = [
  { label: "vision",   value: "extraordinary", color: "text-emerald-300" },
  { label: "quality",  value: "premium",       color: "text-emerald-300" },
  { label: "delivery", value: "on-time",       color: "text-emerald-300" },
  { label: "stack",    value: "Next.js · AI · Cloud", color: "text-sky-300" },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-surface-alt dark:bg-[#0F1226]">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Right content (shown first on mobile for hierarchy) */}
        <Reveal className="order-1 lg:order-2" delay={120}>
          <span className="eyebrow">Our Story</span>
          <h2 className="mt-4 font-display text-[26px] font-bold leading-[1.15] tracking-tight text-ink dark:text-white [text-wrap:balance] sm:mt-5 sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.1]">
            Engineering Tomorrow&apos;s{" "}
            <span className="gradient-text">Digital Products</span>{" "}
            Today
          </h2>
          <p className="section-sub">
            GooglixLabs creates intelligent, scalable, and visually stunning
            digital products — combining modern engineering with next-generation
            AI to build experiences that set new industry standards.
          </p>

          <ul className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
            {points.map((p) => (
              <li key={p.title} className="flex gap-3 sm:gap-4">
                <span className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl ${p.bg}`}>
                  <p.Icon size={18} className={p.color} />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-display text-[15px] font-bold text-ink dark:text-white sm:text-base">{p.title}</h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-sec dark:text-slate-300 sm:text-sm">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2">
            {stack.map((s) => (
              <span key={s} className="rounded-full border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-ink-sec dark:text-slate-300 shadow-soft sm:px-3.5 sm:py-1.5 sm:text-xs">
                {s}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            className="btn-primary group mt-7 flex w-full justify-center sm:mt-9 sm:inline-flex sm:w-auto"
          >
            Work With Us
            <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        {/* Left visual: code window + floating stats */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative w-full max-w-full">
            {/* code window (desktop: full code; mobile/tablet: line-list, no horizontal scroll) */}
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-[#0B1020] shadow-lift dark:border-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] sm:h-3 sm:w-3" />
                <span className="ml-2 truncate text-[10px] font-medium text-white/60 sm:ml-3 sm:text-xs">
                  GooglixLabs — app/page.tsx
                </span>
              </div>

              {/* MOBILE / TABLET — clean, no overflow, line numbers */}
              <div className="block px-4 py-5 font-mono text-[11.5px] leading-[1.7] text-slate-200 sm:text-[12.5px] lg:hidden">
                {[
                  { ln: 1, jsx: <><span className="text-pink-400">import</span> {"{ "}<span className="text-sky-300">AI</span>{" } "}<span className="text-pink-400">from</span> <span className="text-emerald-300">{`"@googlix/core"`}</span>;</> },
                  { ln: 2, jsx: <><span className="text-pink-400">export default</span> <span className="text-pink-400">async</span> <span className="text-yellow-300">build</span>() {"{"}</> },
                  { ln: 3, jsx: <>{"  "}<span className="text-pink-400">return await</span> <span className="text-sky-300">AI</span>.<span className="text-yellow-300">build</span>({"{"}</> },
                  ...buildLines.map((b, i) => ({
                    ln: 4 + i,
                    jsx: <>{"    "}<span className="text-slate-400">{b.label}:</span> <span className={b.color}>{`"${b.value}"`}</span>,</>,
                  })),
                  { ln: 8, jsx: <>{"  "}{"}"});</> },
                  { ln: 9, jsx: <>{"}"}</> },
                ].map((line) => (
                  <div key={line.ln} className="flex gap-3">
                    <span className="w-4 flex-shrink-0 select-none text-right text-slate-600">{line.ln}</span>
                    <span className="min-w-0 flex-1 whitespace-pre-wrap break-all">{line.jsx}</span>
                  </div>
                ))}
              </div>

              {/* DESKTOP — keep the classic code window */}
              <pre className="hidden p-6 text-[13px] leading-relaxed lg:block">
                <code className="block font-mono text-slate-200">
<span className="text-pink-400">import</span> {"{ "}<span className="text-sky-300">AI</span>{" }"} <span className="text-pink-400">from</span> <span className="text-emerald-300">{`'@googlix/core'`}</span>;{"\n"}
<span className="text-pink-400">import</span> {"{ "}<span className="text-sky-300">Vision</span>, <span className="text-sky-300">Speed</span>{" }"} <span className="text-pink-400">from</span> <span className="text-emerald-300">{`'@googlix/design'`}</span>;{"\n\n"}
<span className="text-pink-400">export default async function</span> <span className="text-yellow-300">build</span>() {"{"}{"\n"}
{"  "}<span className="text-pink-400">return await</span> AI.<span className="text-yellow-300">build</span>({"{"}{"\n"}
{"    "}vision:    <span className="text-emerald-300">{`"extraordinary"`}</span>,{"\n"}
{"    "}quality:   <span className="text-emerald-300">{`"premium"`}</span>,{"\n"}
{"    "}delivery:  <span className="text-emerald-300">{`"on-time"`}</span>,{"\n"}
{"    "}stack:     [<span className="text-emerald-300">{`"Next.js"`}</span>, <span className="text-emerald-300">{`"AI"`}</span>, <span className="text-emerald-300">{`"Cloud"`}</span>],{"\n"}
{"  "}{"}"});{"\n"}
{"}"}
                </code>
              </pre>
            </div>

            {/* Mobile/tablet stat cards — full-width row, no cramped 3-col grid on tiny screens */}
            <div className="mt-4 grid gap-2.5 sm:grid-cols-3 lg:hidden">
              <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-3 shadow-soft sm:flex-col sm:items-start sm:gap-1 sm:p-4 sm:text-left">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600 sm:h-8 sm:w-8">
                  <CheckCircle2 size={16} />
                </span>
                <div className="min-w-0 flex-1 sm:flex-none">
                  <div className="font-display text-xl font-extrabold leading-tight text-emerald-600 sm:text-2xl">99%</div>
                  <div className="text-[11px] font-medium text-ink-sec dark:text-slate-300 sm:text-[10px]">Project Success</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-3 shadow-soft sm:flex-col sm:items-start sm:gap-1 sm:p-4 sm:text-left">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand-blue-lt text-brand-blue sm:h-8 sm:w-8">
                  <Target size={16} />
                </span>
                <div className="min-w-0 flex-1 sm:flex-none">
                  <div className="font-display text-xl font-extrabold leading-tight text-brand-blue sm:text-2xl">4 wks</div>
                  <div className="text-[11px] font-medium text-ink-sec dark:text-slate-300 sm:text-[10px]">Avg Delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-3 shadow-soft sm:flex-col sm:items-start sm:gap-1 sm:p-4 sm:text-left">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-violet-50 text-brand-purple sm:h-8 sm:w-8">
                  <Brain size={16} />
                </span>
                <div className="min-w-0 flex-1 sm:flex-none">
                  <div className="font-display text-xl font-extrabold leading-tight text-brand-purple sm:text-2xl">92%</div>
                  <div className="text-[11px] font-medium text-ink-sec dark:text-slate-300 sm:text-[10px]">Client Retention</div>
                </div>
              </div>
            </div>

            {/* Desktop floating stat cards */}
            <div className="absolute -left-4 -top-6 hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-4 shadow-card lg:block">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500">
                Project Success Rate
              </div>
              <div className="mt-1 flex items-baseline gap-1 font-display text-3xl font-extrabold text-emerald-600">
                99<span className="text-base text-emerald-600/80">%</span>
              </div>
            </div>
            <div className="absolute -right-4 top-1/3 hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-4 shadow-card lg:block">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500">
                Avg Delivery
              </div>
              <div className="mt-1 flex items-baseline gap-1 font-display text-3xl font-extrabold text-brand-blue">
                4 <span className="text-base font-bold">wks</span>
              </div>
              <div className="mt-1 text-[10px] text-ink-sec dark:text-slate-300">Faster than industry avg</div>
            </div>
            <div className="absolute -bottom-6 right-12 hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-4 shadow-card lg:block">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500">
                Client Retention
              </div>
              <div className="mt-1 flex items-baseline gap-1 font-display text-3xl font-extrabold text-brand-purple">
                92<span className="text-base text-brand-purple/80">%</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
