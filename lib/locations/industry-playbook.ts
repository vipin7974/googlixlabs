/**
 * The knowledge base behind every location page's "Digital Growth
 * Report" — one entry per canonical industry slug from
 * lib/industries/registry.ts (keyed by slug, not duplicated by name, so
 * the two can never drift apart). A city's report is just the union of
 * its own `industries` list run through this table — see
 * lib/locations/digital-report.ts. Add a new city and its report is
 * generated automatically from whichever industries it already lists.
 */
export interface IndustryPlaybookEntry {
  challenges: string[];
  recommendedToolSlugs: string[];
  nextSteps: string[];
}

export const industryPlaybook: Record<string, IndustryPlaybookEntry> = {
  "retail-ecommerce": {
    challenges: [
      "Customers compare prices and stock online before ever visiting the store",
      "No easy way for nearby shoppers to browse or check availability remotely",
      "Reviews and reputation scattered across platforms instead of one trusted place",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "digital-score", "whatsapp-generator"],
    nextSteps: [
      "Get a clear, mobile-friendly catalogue or storefront online",
      "Set up a WhatsApp ordering link for quick, no-app-download enquiries",
      "Claim and complete a Google Business Profile with real photos and hours",
    ],
  },
  "hospitality-restaurants": {
    challenges: [
      "Most booking decisions happen on a phone, before a call is ever made",
      "Heavy reliance on third-party platforms and their commissions",
      "Menus, photos and reviews scattered across multiple listings",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "whatsapp-generator", "qr-generator"],
    nextSteps: [
      "Add a simple, direct booking or enquiry option to reduce platform commissions",
      "Put a QR code on tables or receipts linking straight to your menu or reviews",
      "Keep your Google Business Profile hours, menu and photos up to date",
    ],
  },
  "healthcare-clinics": {
    challenges: [
      "Patients want to research a doctor or clinic before booking, not after",
      "No easy online way to book or enquire outside clinic hours",
      "Trust and credentials aren't easy to verify from a listing alone",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "digital-score", "whatsapp-generator"],
    nextSteps: [
      "Build a clear website with credentials, services and an easy way to enquire",
      "Add a WhatsApp link for quick appointment questions",
      "Check your current online presence with a free Digital Presence Score",
    ],
  },
  "education-coaching": {
    challenges: [
      "Parents compare results, faculty and facilities online before enquiring",
      "Enrolment enquiries are lost without a fast, simple way to ask questions",
      "Limited visibility next to larger, better-marketed institutes",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "whatsapp-generator", "digital-score"],
    nextSteps: [
      "Present results, faculty and facilities clearly on a dedicated website",
      "Add a WhatsApp enquiry link for parents to reach you instantly",
      "Improve your Google Business Profile so you show up in local searches",
    ],
  },
  "real-estate-construction": {
    challenges: [
      "Buyers research a developer's track record online before making contact",
      "Listings and past projects aren't presented credibly in one place",
      "High-value enquiries are lost to faster, easier-to-find competitors",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "roi-calculator", "whatsapp-generator"],
    nextSteps: [
      "Build a website that presents projects and past work credibly",
      "Add a WhatsApp link for fast enquiry response on high-value leads",
      "Use the ROI Calculator to make the business case for a stronger website",
    ],
  },
  "manufacturing-industrial": {
    challenges: [
      "New B2B buyers and partners look a business up online before the first meeting",
      "No simple, credible website to confirm the business is established and serious",
      "Word-of-mouth relationships don't reach buyers outside the existing network",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "roi-calculator", "invoice-generator"],
    nextSteps: [
      "Build a straightforward website that confirms credibility to new buyers",
      "Use professional, GST-ready invoices for a more established impression",
      "Use the ROI Calculator to see the value of reaching buyers beyond your network",
    ],
  },
  "professional-legal-services": {
    challenges: [
      "A website often has to substitute for a personal referral",
      "Credibility is hard to establish with someone who's never met the team",
      "Enquiries are lost without a clear, professional first impression online",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "digital-score", "business-card-generator"],
    nextSteps: [
      "Build a professional, information-clear website",
      "Check how your current online presence compares with a free Digital Presence Score",
      "Create a shareable digital business card for networking and referrals",
    ],
  },
  "transport-logistics": {
    challenges: [
      "New routes and customers increasingly start with an online search",
      "Long-standing contracts don't reach new buyers outside existing relationships",
      "No clear, credible website to confirm scale and reliability",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "roi-calculator", "whatsapp-generator"],
    nextSteps: [
      "Build a clear, credible website aimed at new B2B customers",
      "Add a WhatsApp link for fast quote and booking enquiries",
      "Use the ROI Calculator to size the opportunity from better visibility",
    ],
  },
  "agriculture-agri-trade": {
    challenges: [
      "Sales often rely on established local relationships alone",
      "Buyers further afield have no way to discover the business online",
      "No simple way to present what's grown, produced or traded",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "whatsapp-generator", "gst-calculator"],
    nextSteps: [
      "Build a simple website presenting what you grow, produce or trade",
      "Add a WhatsApp link for buyers to enquire directly",
      "Use the GST Calculator to quote and invoice trade buyers accurately",
    ],
  },
  "it-technology-services": {
    challenges: [
      "A dated or generic-looking website undercuts the credibility of the work being sold",
      "Potential clients judge technical ability partly by the business's own site",
      "No clear way to demonstrate past work or capability online",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "roi-calculator", "digital-score"],
    nextSteps: [
      "Rebuild a website that actually reflects the quality of your work",
      "Check your current digital presence with a free Digital Presence Score",
      "Use the ROI Calculator to justify the investment internally",
    ],
  },
  "salons-gyms-wellness": {
    challenges: [
      "Most new customers come from a single local search",
      "Customers are lost just as easily to a competitor who's easier to find and book",
      "No simple way to show services, pricing and availability",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "whatsapp-generator", "qr-generator"],
    nextSteps: [
      "Build a website with clear services, pricing and an easy way to book",
      "Add a WhatsApp link for fast booking enquiries",
      "Put a QR code in-store linking to bookings or reviews",
    ],
  },
  "government-institutional": {
    challenges: [
      "Information needs to reach a wide public audience with varying technical familiarity",
      "Important updates or notices aren't easy to find in one place",
      "No simple, accessible way for the public to get in touch",
    ],
    recommendedToolSlugs: ["website-cost-calculator", "digital-score"],
    nextSteps: [
      "Build a clear, accessible website focused on information, not just publishing",
      "Check accessibility and clarity with a free Digital Presence Score",
    ],
  },
};
