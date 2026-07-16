export type QrType = "website" | "whatsapp" | "googleReview";

export const QR_TYPES: { key: QrType; label: string }[] = [
  { key: "website", label: "Website" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "googleReview", label: "Google Review" },
];

export function normalizeUrl(value: string): string {
  return value.includes("://") ? value : `https://${value}`;
}

export function isLikelyUrl(value: string): boolean {
  if (!value.trim()) return false;
  try {
    const url = new URL(normalizeUrl(value));
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}
