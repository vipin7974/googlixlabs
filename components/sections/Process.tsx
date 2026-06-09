import { Compass, PencilRuler, Code, Rocket } from "lucide-react";
import Reveal from "../Reveal";

const STEPS = [
  {
    n: "01",
    Icon: Compass,
    title: "Discover",
    body:
      "Deep dive into your goals, users, and competitive landscape. We map opportunities and build a precise product strategy.",
    color: "text-brand-blue",
    bg: "bg-brand-blue-lt",
    ring: "ring-brand-blue/20",
  },
  {
    n: "02",
    Icon: PencilRuler,
    title: "Design",
    body:
      "UX research, wireframes, and high-fidelity prototypes. Every interaction crafted with purpose and validated with real users.",
    color: "text-brand-red",
    bg: "bg-brand-red-lt",
    ring: "ring-brand-red/20",
  },
  {
    n: "03",
    Icon: Code,
    title: "Develop",
    body:
      "Agile sprints with weekly demos. Clean, scalable code with CI/CD pipelines and 95%+ test coverage guaranteed.",
    color: "text-emerald-600",
    bg: "bg-brand-grn-lt",
    ring: "ring-brand-green/20",
  },
  {
    n: "04",
    Icon: Rocket,
    title: "Launch",
    body:
      "Performance-optimized deployment with monitoring, post-launch support, and iterative improvements to ensure lasting success.",
    color: "text-amber-600",
    bg: "bg-brand-yel-lt",
    ring: "ring-brand-yellow/30",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-pad relative overflow-hidden bg-surface-alt dark:bg-[#0F1226]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How We Work</span>
          <h2 className="section-title mt-4 sm:mt-5">
            A Process Built for <span className="gradient-text">Results</span>
          </h2>
          <p className="section-sub mx-auto">
            Predictable. Transparent. Exceptional. Our four-phase methodology
            ensures every project ships on time with zero surprises.
          </p>
        </Reveal>

        <div className="relative mt-10 sm:mt-14">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-[58px] hidden h-px bg-gradient-to-r from-transparent via-black/10 to-transparent lg:block" />

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="relative h-full rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7">
                  <div className="mb-3 flex items-center gap-3 sm:mb-4">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl ${s.bg} ring-1 ${s.ring} sm:h-12 sm:w-12`}>
                      <s.Icon className={s.color} size={20} />
                    </div>
                    <span className="font-display text-2xl font-extrabold text-ink-muted dark:text-slate-500/40 sm:text-3xl">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-ink dark:text-white sm:text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-sec dark:text-slate-300 sm:mt-2 sm:text-sm">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
