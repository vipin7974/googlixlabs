import { Star, Quote } from "lucide-react";
import Reveal from "../Reveal";

const REVIEWS = [
  {
    initials: "AR",
    color: "bg-brand-blue",
    quote:
      "GooglixLabs transformed our vision into a world-class product. The attention to detail in both design and engineering surpassed every expectation. Our users absolutely love the new experience.",
    name: "Arjun Rao",
    role: "CEO, NeuralFlow Technologies",
  },
  {
    initials: "SM",
    color: "bg-brand-green",
    quote:
      "Incredible team. They built our platform in record time without compromising on quality. The AI integrations they shipped are genuinely cutting-edge and our clients are completely obsessed.",
    name: "Sofia Martinez",
    role: "Founder, EcoTrack Inc.",
  },
  {
    initials: "KW",
    color: "bg-amber-500",
    quote:
      "The rebrand and product overhaul they delivered gave us an identity that stands out. Every touchpoint from logo to design system communicates exactly who we are. A total game-changer.",
    name: "Kevin Wu",
    role: "CMO, Luminary Finance",
  },
];

const BARS = [
  { stars: 5, pct: 92, n: 43 },
  { stars: 4, pct: 6, n: 3 },
  { stars: 3, pct: 2, n: 1 },
  { stars: 2, pct: 0, n: 0 },
  { stars: 1, pct: 0, n: 0 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad relative bg-white dark:bg-[#08091A]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Client Stories</span>
          <h2 className="section-title mt-4 sm:mt-5">
            Trusted by <span className="gradient-text">Innovators</span>
          </h2>
          <p className="section-sub mx-auto">
            Don&apos;t take our word for it — here&apos;s what the businesses
            we&apos;ve helped have to say about working with GooglixLabs.
          </p>
        </Reveal>

        {/* Rating summary */}
        <Reveal className="mt-8 sm:mt-12">
          <div className="mx-auto max-w-4xl rounded-2xl border border-black/5 bg-gradient-to-br from-brand-blue-lt via-white to-brand-red-lt dark:border-white/10 dark:from-brand-blue/10 dark:via-white/[0.04] dark:to-brand-red/10 p-5 shadow-soft sm:p-8">
            <div className="grid items-center gap-5 sm:grid-cols-3 sm:gap-8">
              <div className="flex items-center justify-center gap-4 border-b border-black/10 pb-4 sm:flex-col sm:gap-2 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
                <div className="font-display text-5xl font-extrabold text-ink dark:text-white sm:text-6xl">4.9</div>
                <div className="flex flex-col items-start gap-1 sm:items-center">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500 sm:text-xs">
                    Based on 47 reviews
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                {BARS.map((b) => (
                  <div key={b.stars} className="flex items-center gap-3 py-0.5 sm:py-1">
                    <span className="w-6 text-[11px] font-semibold text-ink-sec dark:text-slate-300 sm:w-8 sm:text-xs">{b.stars}★</span>
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-black/5 sm:h-2 dark:bg-white/10">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-[10px] text-ink-muted dark:text-slate-500 sm:w-12 sm:text-xs">{b.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reviews */}
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <article className="relative h-full rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card sm:p-7">
                <Quote className="text-brand-blue/15" size={36} />
                <div className="-mt-2 flex items-center gap-0.5 text-amber-500 sm:-mt-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-sec dark:text-slate-300 sm:mt-4 sm:text-sm">&ldquo;{r.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4 sm:mt-6 sm:pt-5 dark:border-white/10">
                  <div className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full ${r.color} text-sm font-bold text-white`}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-ink dark:text-white sm:text-sm">{r.name}</div>
                    <div className="text-[11px] text-ink-sec dark:text-slate-300 sm:text-xs">{r.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
