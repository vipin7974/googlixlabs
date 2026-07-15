// Content ported 1:1 from GooglixLabs Studio.dc.html

export const ACCENTS = {
  Signal: "#2B5CFF",
  Molten: "#FF5B2E",
  Botanic: "#1F9B57",
} as const;

export type AccentName = keyof typeof ACCENTS;

export const navLinks = [
  { label: "Studio", href: "/#studio" },
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Play", href: "/play" },
  { label: "Contact", href: "/#contact" },
];

export const heroStats = [
  { target: 50, suffix: "+", label: "products shipped" },
  { target: 15, suffix: "+", label: "clients worldwide" },
  { target: 99, suffix: "%", label: "client satisfaction" },
];

export const marquee = [
  "WeWake IndiGreen",
  "Hexalin Pharmaceuticals",
  "StockWise",
  "BuildPlan",
  "Neural AI",
  "EcoTrack",
  "Luminary",
  "Orion",
];

export const manifestoLines = [
  "A studio built on",
  "craft, clarity and",
  "a little bit of",
  "obsession.",
];

export const studioPoints = [
  {
    k: "01 / AI-native",
    v: "Intelligent automation woven into every layer — from smart interfaces to backend AI pipelines.",
  },
  {
    k: "02 / Built to scale",
    v: "Architecture designed for growth. From your first user to your ten-millionth, no rebuilds.",
  },
  {
    k: "03 / Outcome-driven",
    v: "We measure success in conversions, retention and revenue — not lines of code.",
  },
];

export interface RawProject {
  title: string;
  tagline: string;
  status: "Live" | "NDA" | "Internal";
  live: boolean;
  href: string;
  slotId: string;
  slotHint: string;
}

export const rawProjects: RawProject[] = [
  {
    title: "WeWake IndiGreen",
    tagline: "Sustainability platform & design system",
    status: "Live",
    live: true,
    href: "https://wewakeindigreen.com/",
    slotId: "sp-wewake",
    slotHint: "WeWake IndiGreen screenshot",
  },
  {
    title: "Hexalin Pharmaceuticals",
    tagline: "Corporate site & product catalogue",
    status: "Live",
    live: true,
    href: "https://hexalinpharmaceuticals.in",
    slotId: "sp-hexalin",
    slotHint: "Hexalin screenshot",
  },
  {
    title: "StockWise Inventory OS",
    tagline: "Real-time stock & barcode platform",
    status: "NDA",
    live: false,
    href: "#contact",
    slotId: "sp-stockwise",
    slotHint: "Dashboard mockup",
  },
  {
    title: "BuildPlan",
    tagline: "Real-estate developer suite",
    status: "NDA",
    live: false,
    href: "#contact",
    slotId: "sp-buildplan",
    slotHint: "Real-estate app mockup",
  },
  {
    title: "Neural AI Assistant",
    tagline: "LLM knowledge base & workflows",
    status: "Internal",
    live: false,
    href: "#contact",
    slotId: "sp-neural",
    slotHint: "AI assistant mockup",
  },
];

export function getProjects(accent: string) {
  return rawProjects.map((p, i) => ({
    ...p,
    idx: String(i),
    no: "0" + (i + 1),
    tagBorder: p.live ? accent : "rgba(23,24,27,.3)",
    tagColor: p.live ? accent : "rgba(23,24,27,.65)",
  }));
}

export const capabilities = [
  {
    no: "A",
    title: "Web & App Engineering",
    desc: "End-to-end products on a modern stack — performance-obsessed, accessible and built to last.",
    tags: ["React", "Next.js", "Node", "React Native"],
  },
  {
    no: "B",
    title: "Product & UX Design",
    desc: "Research-driven interfaces and design systems, executed pixel-perfect from concept to ship.",
    tags: ["Figma", "Design systems", "Prototyping"],
  },
  {
    no: "C",
    title: "Applied AI",
    desc: "LLMs, RAG and predictive models wired directly into real workflows — automation at production scale.",
    tags: ["OpenAI", "LangChain", "RAG"],
  },
  {
    no: "D",
    title: "SaaS Platforms",
    desc: "Multi-tenant subscription software with billing, analytics and security from day one.",
    tags: ["Stripe", "Auth", "AWS"],
  },
  {
    no: "E",
    title: "Brand & Identity",
    desc: "Logos, identity systems and guidelines that make you impossible to ignore.",
    tags: ["Logo", "Systems", "Strategy"],
  },
];

export const approach = [
  { n: "01", title: "Discover", desc: "We map your goals, users and market into a sharp product strategy." },
  { n: "02", title: "Design", desc: "Wireframes to high-fidelity prototypes, validated with real users." },
  { n: "03", title: "Develop", desc: "Agile sprints, weekly demos, clean and scalable code." },
  { n: "04", title: "Launch", desc: "Performance-tuned deployment with monitoring and ongoing care." },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/googlixlabs" },
  { label: "Twitter / X", href: "https://x.com/googlixlabs" },
  { label: "GitHub", href: "https://github.com/googlixlabs" },
  { label: "Dribbble", href: "https://dribbble.com/googlixlabs" },
];
