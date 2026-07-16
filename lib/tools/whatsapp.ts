export interface WhatsAppLinkResult {
  ok: true;
  url: string;
  displayPhone: string;
}

export interface WhatsAppLinkError {
  ok: false;
  error: string;
}

const DEFAULT_COUNTRY_CODE = "91";

/**
 * Accepts Indian 10-digit numbers (assumes +91) or any number already
 * prefixed with a country code. Returns a validation error rather than
 * silently producing a broken wa.me link.
 */
export function buildWhatsAppLink(rawPhone: string, message: string): WhatsAppLinkResult | WhatsAppLinkError {
  const digits = rawPhone.replace(/\D/g, "");

  if (digits.length === 0) {
    return { ok: false, error: "Enter a phone number." };
  }

  let normalized = digits;
  if (digits.length === 10) {
    normalized = `${DEFAULT_COUNTRY_CODE}${digits}`;
  } else if (digits.length < 10 || digits.length > 15) {
    return { ok: false, error: "Enter a valid phone number with country code." };
  }

  const url = new URL(`https://wa.me/${normalized}`);
  if (message.trim().length > 0) {
    url.searchParams.set("text", message.trim());
  }

  return {
    ok: true,
    url: url.toString(),
    displayPhone: `+${normalized}`,
  };
}
