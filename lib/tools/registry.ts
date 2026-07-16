import { ACCENTS } from "@/lib/content";
import type { ToolMeta } from "./types";

// Single source of truth for every Business Growth Tool. The homepage
// section, the /tools index, the sitemap, and each tool's own metadata
// all read from this list instead of repeating tool copy in four places.
export const toolsRegistry: ToolMeta[] = [
  {
    slug: "website-cost-calculator",
    title: "Website Cost Calculator",
    shortTitle: "Cost Calculator",
    description: "Pick the features you need and get an instant estimate of cost, timeline and complexity.",
    icon: "calculator",
    accent: ACCENTS.Signal,
    status: "available",
    keywords: ["website cost calculator", "web development cost estimate india", "app development pricing"],
  },
  {
    slug: "whatsapp-generator",
    title: "WhatsApp Link Generator",
    shortTitle: "WhatsApp Link",
    description: "Turn a phone number and message into a one-tap WhatsApp chat link for your bio, ads or invoices.",
    icon: "whatsapp",
    accent: ACCENTS.Botanic,
    status: "available",
    keywords: ["whatsapp link generator", "wa.me link generator", "click to chat"],
  },
  {
    slug: "roi-calculator",
    title: "Website ROI Calculator",
    shortTitle: "ROI Calculator",
    description: "See how much extra revenue a better website could bring in, month by month.",
    icon: "chart",
    accent: ACCENTS.Molten,
    status: "available",
    keywords: ["website roi calculator", "digital marketing roi"],
  },
  {
    slug: "digital-score",
    title: "Digital Presence Score",
    shortTitle: "Digital Score",
    description: "A 10-question checkup on your website, socials and reviews, scored out of 100.",
    icon: "gauge",
    accent: ACCENTS.Signal,
    status: "available",
    keywords: ["digital presence score", "online presence checker"],
  },
  {
    slug: "business-readiness",
    title: "Business Readiness Score",
    shortTitle: "Readiness Score",
    description: "Find out how ready your business is to invest in growth, based on where you are today.",
    icon: "target",
    accent: ACCENTS.Botanic,
    status: "available",
    keywords: ["business growth readiness"],
  },
  {
    slug: "qr-generator",
    title: "QR Code Generator",
    shortTitle: "QR Generator",
    description: "Generate a QR code for your website, WhatsApp or Google review link and download it as a PNG.",
    icon: "qrcode",
    accent: ACCENTS.Molten,
    status: "available",
    keywords: ["qr code generator", "google review qr code"],
  },
  {
    slug: "gst-calculator",
    title: "GST Calculator",
    shortTitle: "GST Calculator",
    description: "Add or remove GST from any amount in one step — simple, fast and accurate.",
    icon: "percent",
    accent: ACCENTS.Signal,
    status: "available",
    keywords: ["gst calculator india"],
  },
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    shortTitle: "EMI Calculator",
    description: "Work out your monthly loan instalment and total interest before you borrow.",
    icon: "coins",
    accent: ACCENTS.Botanic,
    status: "available",
    keywords: ["emi calculator"],
  },
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    shortTitle: "Invoice Generator",
    description: "Create a professional, GST-ready invoice and download it as a PDF in minutes.",
    icon: "document",
    accent: ACCENTS.Molten,
    status: "available",
    keywords: ["free invoice generator india", "gst invoice generator"],
  },
  {
    slug: "business-card-generator",
    title: "Business Card Generator",
    shortTitle: "Business Card",
    description: "Turn your name, number and website into a clean, shareable digital business card.",
    icon: "idcard",
    accent: ACCENTS.Signal,
    status: "available",
    keywords: ["digital business card generator"],
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return toolsRegistry.find((tool) => tool.slug === slug);
}

/** Same lookup, but throws instead of returning undefined — for tool page
 * modules where the slug is a compile-time-known literal and a miss means
 * a typo, not a real "not found" case to branch on. */
export function getToolOrThrow(slug: string): ToolMeta {
  const tool = getToolBySlug(slug);
  if (!tool) throw new Error(`Unknown tool slug: "${slug}"`);
  return tool;
}

export const availableTools = toolsRegistry.filter((tool) => tool.status === "available");
