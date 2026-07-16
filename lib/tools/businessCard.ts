export interface BusinessCardData {
  name: string;
  title: string;
  phone: string;
  website: string;
  email: string;
}

export const CARD_WIDTH = 1000;
export const CARD_HEIGHT = 560;

export interface BusinessCardFonts {
  heading: string;
  italic: string;
  mono: string;
}

/**
 * Pure canvas drawing routine — takes already-resolved font-family strings
 * rather than hardcoding names, because next/font generates scoped,
 * hashed family names; the caller resolves the real ones via
 * getComputedStyle(...).getPropertyValue("--font-bricolage") etc. (the
 * same technique FlowCanvas.tsx already uses for reading CSS variables at
 * runtime) before calling this.
 */
export function drawBusinessCard(
  ctx: CanvasRenderingContext2D,
  data: BusinessCardData,
  accent: string,
  fonts: BusinessCardFonts
): void {
  ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = "#17181B";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 12, CARD_HEIGHT);

  ctx.fillStyle = "#F4F3EE";
  ctx.font = `600 56px ${fonts.heading}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(data.name || "Your Name", 64, 150);

  if (data.title) {
    ctx.fillStyle = accent;
    ctx.font = `italic 30px ${fonts.italic}`;
    ctx.fillText(data.title, 64, 196);
  }

  ctx.strokeStyle = "rgba(244,243,238,.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(64, 380);
  ctx.lineTo(CARD_WIDTH - 64, 380);
  ctx.stroke();

  ctx.font = `20px ${fonts.mono}`;
  ctx.fillStyle = "rgba(244,243,238,.85)";
  let y = 432;
  const lines = [data.phone, data.website, data.email].filter((line) => line.trim().length > 0);
  for (const line of lines) {
    ctx.fillText(line, 64, y);
    y += 42;
  }

  ctx.font = `14px ${fonts.mono}`;
  ctx.fillStyle = "rgba(244,243,238,.4)";
  ctx.fillText("DIGITAL BUSINESS CARD", 64, CARD_HEIGHT - 40);
}
