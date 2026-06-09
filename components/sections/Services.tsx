import {
  Code2,
  Palette,
  Bot,
  Cloud,
  Smartphone,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Reveal from "../Reveal";

const SERVICES = [
  {
    Icon: Code2,
    color: "text-brand-blue",
    bg: "bg-brand-blue-lt",
    ring: "ring-brand-blue/10",
    title: "Full Stack Development",
    body: "End-to-end web applications built with modern frameworks. Performance-optimized, scalable architecture from frontend to cloud infrastructure.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    Icon: Palette,
    color: "text-brand-red",
    bg: "bg-brand-red-lt",
    ring: "ring-brand-red/10",
    title: "UI/UX Design",
    body: "Research-driven design with pixel-perfect execution. We create intuitive interfaces and design systems users love and businesses trust.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    Icon: Bot,
    color: "text-emerald-600",
    bg: "bg-brand-grn-lt",
    ring: "ring-brand-green/10",
    title: "AI Tools & Automation",
    body: "Integrate cutting-edge AI — LLMs, computer vision, and predictive analytics — directly into your workflows for intelligent automation at scale.",
    tags: ["OpenAI", "LangChain", "ML Models"],
  },
  {
    Icon: Cloud,
    color: "text-amber-600",
    bg: "bg-brand-yel-lt",
    ring: "ring-brand-yellow/20",
    title: "SaaS Platforms",
    body: "Scalable subscription software with multi-tenancy, billing integration, analytics dashboards and enterprise-grade security from day one.",
    tags: ["Stripe", "Auth", "Analytics", "AWS"],
  },
  {
    Icon: Smartphone,
    color: "text-brand-purple",
    bg: "bg-violet-50",
    ring: "ring-brand-purple/10",
    title: "Mobile App Development",
    body: "Native and cross-platform mobile apps with smooth animations, offline-first architecture and seamless API integration for iOS and Android.",
    tags: ["React Native", "Flutter", "Expo"],
  },
  {
    Icon: Sparkles,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    ring: "ring-brand-cyan/10",
    title: "Branding & Identity",
    body: "Strategic brand design including logos, visual identities, design systems and brand guidelines that establish authority in any market.",
    tags: ["Logo Design", "Style Guide", "Brand Strategy"],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad relative overflow-hidden bg-white dark:bg-[#08091A]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What We Build</span>
          <h2 className="section-title mt-4 sm:mt-5">
            Services That <span className="gradient-text">Scale With You</span>
          </h2>
          <p className="section-sub mx-auto">
            From zero to launch — we engineer, design, and deploy digital
            products that drive real business outcomes.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7">
                {/* subtle gradient on hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl ${s.bg} ring-1 ${s.ring} sm:mb-5 sm:h-12 sm:w-12`}>
                  <s.Icon className={s.color} size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-ink dark:text-white sm:text-xl">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-sec dark:text-slate-300 sm:mt-3 sm:text-sm">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue uline sm:mt-6">
                  Learn more
                  <ArrowRight size={14} />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
