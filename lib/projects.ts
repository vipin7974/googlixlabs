export type ProjectCategory = "All" | "Web" | "Pharma" | "Sustainability" | "Inventory" | "RealEstate" | "AI";

export interface Project {
  slug: string;
  title: string;
  client: string;
  description: string;
  url: string;
  emoji: string;
  category: Exclude<ProjectCategory, "All">[];
  tags: string[];
  accent: string; // tailwind gradient classes for the card thumb
  ring: string;
  textColor: string;
  bgTint: string;
  live: boolean;
}

export const projects: Project[] = [
  {
    slug: "hexalinpharmaceuticals",
    title: "Hexalinharmaceuticals",
    client: "HexalinPharmaceuticals Pvt. Ltd.",
    description:
      "Corporate website and product catalogue for a fast-growing pharmaceutical brand — modern design, mobile-first, optimized for trust and lead capture.",
    url: "https://hexalinpharmaceuticals.in",
    emoji: "💊",
    category: ["Web", "Pharma"],
    tags: ["Next.js", "Tailwind", "SEO", "Pharma"],
    accent: "from-brand-blue/15 via-brand-purple/15 to-brand-cyan/15",
    ring: "ring-brand-blue/20",
    textColor: "text-brand-blue",
    bgTint: "bg-brand-blue-lt",
    live: true,
  },
  {
    slug: "wewake-indigreen",
    title: "WeWake IndiGreen",
    client: "WeWake IndiGreen",
    description:
      "A digital platform for a sustainability-focused initiative — content management, awareness campaigns, and a community-driven design system in eco-friendly colors.",
    url: "https://wewakeindigreen.com/",
    emoji: "🌿",
    category: ["Web", "Sustainability"],
    tags: ["React", "CMS", "UI/UX", "Sustainability"],
    accent: "from-emerald-200/60 via-brand-green/20 to-brand-cyan/20",
    ring: "ring-emerald-300/40",
    textColor: "text-emerald-700",
    bgTint: "bg-brand-grn-lt",
    live: true,
  },
  {
    slug: "stockwise-inventory",
    title: "StockWise Inventory OS",
    client: "Multi-brand Retail Client",
    description:
      "Inventory management software with real-time stock tracking, barcode scanning, vendor management, purchase orders and automated low-stock alerts for distributors.",
    url: "#contact",
    emoji: "📦",
    category: ["Inventory", "Web"],
    tags: ["Inventory", "Dashboard", "Reports", "Multi-tenant"],
    accent: "from-amber-200/60 via-brand-yellow/20 to-brand-red/15",
    ring: "ring-amber-300/40",
    textColor: "text-amber-700",
    bgTint: "bg-brand-yel-lt",
    live: false,
  },
  {
    slug: "warehousepro",
    title: "WarehousePro Suite",
    client: "Logistics & Wholesale",
    description:
      "End-to-end warehouse management — SKU-level tracking, batch & expiry control, GRN, dispatch dockets and integrated billing for B2B distributors.",
    url: "#contact",
    emoji: "🏷️",
    category: ["Inventory"],
    tags: ["WMS", "Barcode", "Billing", "Reports"],
    accent: "from-brand-red/15 via-rose-100 to-brand-yellow/15",
    ring: "ring-rose-300/30",
    textColor: "text-rose-700",
    bgTint: "bg-brand-red-lt",
    live: false,
  },
  {
    slug: "buildplan-developer-apps",
    title: "BuildPlan for Developers",
    client: "Building Developers & Architects",
    description:
      "Suite of applications for real-estate developers — project portfolios, unit availability, EMI calculators, brochure generation and lead pipelines.",
    url: "#contact",
    emoji: "🏗️",
    category: ["RealEstate", "Web"],
    tags: ["Real Estate", "CRM", "Brochure", "Lead Capture"],
    accent: "from-brand-blue/15 via-slate-100 to-brand-purple/20",
    ring: "ring-brand-purple/30",
    textColor: "text-brand-purple",
    bgTint: "bg-violet-50",
    live: false,
  },
  {
    slug: "siteflow-construction",
    title: "SiteFlow Construction",
    client: "Property Builders & Developers",
    description:
      "Project tracker for builders — drawings library, site progress photos, daily reports, contractor billing and buyer-facing progress portal.",
    url: "#contact",
    emoji: "🏢",
    category: ["RealEstate"],
    tags: ["Project Tracker", "Mobile", "Reports", "Portal"],
    accent: "from-brand-cyan/15 via-sky-100 to-brand-blue/15",
    ring: "ring-brand-cyan/30",
    textColor: "text-cyan-700",
    bgTint: "bg-cyan-50",
    live: false,
  },
  {
    slug: "neural-ai-assistant",
    title: "Neural AI Assistant",
    client: "Internal Product",
    description:
      "AI-powered internal assistant for document Q&A, smart search and automated workflow triggers — built on top of LLMs and a vector knowledge base.",
    url: "#contact",
    emoji: "🤖",
    category: ["AI", "Web"],
    tags: ["OpenAI", "RAG", "LangChain", "Automation"],
    accent: "from-brand-purple/15 via-violet-100 to-brand-blue/20",
    ring: "ring-brand-purple/30",
    textColor: "text-brand-purple",
    bgTint: "bg-violet-50",
    live: false,
  },
];

export const projectCategories: ProjectCategory[] = [
  "All",
  "Web",
  "Pharma",
  "Sustainability",
  "Inventory",
  "RealEstate",
  "AI",
];
