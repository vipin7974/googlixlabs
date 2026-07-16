export interface DigitalScoreQuestion {
  key: string;
  label: string;
  recommendation: string;
}

export const DIGITAL_SCORE_QUESTIONS: DigitalScoreQuestion[] = [
  {
    key: "website",
    label: "Do you have a working website?",
    recommendation:
      "A website is your most trusted digital asset — even a simple one-page site builds credibility social profiles alone can't.",
  },
  {
    key: "googleBusiness",
    label: "Do you have a Google Business Profile?",
    recommendation:
      "Claim your free Google Business Profile — it's how most local customers find you on Maps and Search.",
  },
  {
    key: "instagram",
    label: "Are you active on Instagram?",
    recommendation:
      "An active Instagram presence helps you reach customers who discover businesses visually before they ever search.",
  },
  {
    key: "facebook",
    label: "Are you active on Facebook?",
    recommendation: "Facebook still drives strong local reach and reviews — worth keeping a basic presence updated.",
  },
  {
    key: "linkedin",
    label: "Do you have a LinkedIn presence?",
    recommendation: "A LinkedIn presence builds B2B trust and helps with hiring and partnerships.",
  },
  {
    key: "whatsapp",
    label: "Do you use WhatsApp Business for customers?",
    recommendation:
      "WhatsApp Business gives customers the fastest way to reach you — set up a catalog and quick replies.",
  },
  {
    key: "seo",
    label: "Have you done any SEO for your website?",
    recommendation: "Basic SEO (titles, descriptions, a sitemap) is what actually gets you found on Google.",
  },
  {
    key: "reviews",
    label: "Do you actively collect customer reviews?",
    recommendation:
      "Reviews are the single biggest trust signal for new customers — ask happy customers directly, right after service.",
  },
  {
    key: "analytics",
    label: "Do you track website or traffic analytics?",
    recommendation:
      "Without analytics you're flying blind — even a free tool like Google Analytics shows you what's actually working.",
  },
  {
    key: "onlinePayments",
    label: "Can customers pay you online?",
    recommendation: "Online payments remove friction at the exact moment a customer is ready to buy.",
  },
];

export interface DigitalScoreResult {
  score: number;
  band: "Excellent" | "Average" | "Needs Improvement";
  recommendations: string[];
}

export function calculateDigitalScore(answers: Record<string, boolean>): DigitalScoreResult {
  const total = DIGITAL_SCORE_QUESTIONS.length;
  const yesCount = DIGITAL_SCORE_QUESTIONS.filter((q) => answers[q.key]).length;
  const score = Math.round((yesCount / total) * 100);

  let band: DigitalScoreResult["band"] = "Needs Improvement";
  if (score >= 80) band = "Excellent";
  else if (score >= 50) band = "Average";

  const recommendations = DIGITAL_SCORE_QUESTIONS.filter((q) => !answers[q.key]).map((q) => q.recommendation);

  return { score, band, recommendations };
}
