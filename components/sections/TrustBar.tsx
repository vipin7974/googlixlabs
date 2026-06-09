const partners = [
  "Hexalin Pharmaceuticals",
  "WeWake IndiGreen",
  "NeuralFlow",
  "EcoTrack",
  "Luminary Finance",
  "Orion Technologies",
  "Pulse Health Co.",
  "BuildStack",
  "Ideaflow",
];

export default function TrustBar() {
  return (
    <section className="border-y border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] dark:bg-[#08091A] py-7 sm:py-10">
      <div className="container-x">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted dark:text-slate-500 sm:mb-6 sm:text-xs sm:tracking-[0.22em]">
          Trusted by founders, startups &amp; growing brands
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24 dark:from-[#08091A]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24 dark:from-[#08091A]" />
          <div className="marquee-track">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink-sec dark:text-slate-300/80 sm:text-base"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-blue/15 via-brand-purple/10 to-brand-red/15 text-[10px] font-extrabold text-ink dark:text-white sm:h-7 sm:w-7 sm:text-xs">
                  {p[0]}
                </span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
