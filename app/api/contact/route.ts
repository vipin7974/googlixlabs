import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/**
 * Submits the form data to a Google Form, which in turn auto-populates the
 * linked Google Sheet (downloadable as Excel). Returns true if the network
 * call succeeded. Returns false silently if the env vars aren't set yet —
 * so the site keeps working even before the owner has wired up their form.
 */
async function submitToGoogleForm(data: ContactPayload): Promise<boolean> {
  const id = process.env.GOOGLE_FORM_ID;
  if (!id || id.includes("REPLACE_WITH_YOUR_FORM_ID")) return false;

  const map: Record<string, string | undefined> = {
    [process.env.GOOGLE_FORM_ENTRY_NAME || ""]: data.name,
    [process.env.GOOGLE_FORM_ENTRY_EMAIL || ""]: data.email,
    [process.env.GOOGLE_FORM_ENTRY_PHONE || ""]: data.phone,
    [process.env.GOOGLE_FORM_ENTRY_COMPANY || ""]: data.company,
    [process.env.GOOGLE_FORM_ENTRY_SERVICE || ""]: data.service,
    [process.env.GOOGLE_FORM_ENTRY_BUDGET || ""]: data.budget,
    [process.env.GOOGLE_FORM_ENTRY_MESSAGE || ""]: data.message,
  };

  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(map)) {
    if (k && v) body.append(k, v);
  }

  try {
    await fetch(
      `https://docs.google.com/forms/d/e/${id}/formResponse`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        // Google responds with a redirect we don't need to follow
        redirect: "manual",
      }
    );
    return true;
  } catch (err) {
    console.error("Google Form submit failed:", err);
    return false;
  }
}

/**
 * Optional: also send a notification email via SMTP (Gmail App Password).
 * Skipped silently if SMTP env vars aren't configured.
 */
async function sendNotificationEmail(data: ContactPayload): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return false;

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: Number(SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "googlixlabs@gmail.com";
    const html = `
      <div style="font-family:Inter,sans-serif;line-height:1.6;color:#0A0F1E">
        <h2 style="margin:0 0 12px;color:#4B7CFF">New Project Inquiry — GooglixLabs</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
          <tr><td><b>Name</b></td><td>${data.name || "-"}</td></tr>
          <tr><td><b>Email</b></td><td>${data.email || "-"}</td></tr>
          <tr><td><b>Phone</b></td><td>${data.phone || "-"}</td></tr>
          <tr><td><b>Company</b></td><td>${data.company || "-"}</td></tr>
          <tr><td><b>Service</b></td><td>${data.service || "-"}</td></tr>
          <tr><td><b>Budget</b></td><td>${data.budget || "-"}</td></tr>
        </table>
        <h3 style="margin:18px 0 6px">Message</h3>
        <p style="white-space:pre-wrap;background:#F7F9FC;padding:14px;border-radius:10px">${
          data.message || "-"
        }</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"GooglixLabs Website" <${SMTP_USER}>`,
      to,
      replyTo: data.email,
      subject: `New inquiry from ${data.name || "Website"} — ${data.service || "General"}`,
      html,
    });

    return true;
  } catch (err) {
    console.error("Email send failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let data: ContactPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Validation
  if (!data.name || !data.email || !data.message || !data.service) {
    return NextResponse.json(
      { ok: false, error: "Name, email, service and message are required." },
      { status: 400 }
    );
  }
  if (!isEmail(data.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Trim everything
  for (const k of Object.keys(data) as (keyof ContactPayload)[]) {
    if (typeof data[k] === "string") data[k] = (data[k] as string).trim();
  }

  const [gform, email] = await Promise.all([
    submitToGoogleForm(data),
    sendNotificationEmail(data),
  ]);

  return NextResponse.json({
    ok: true,
    forwarded: { googleForm: gform, email },
  });
}
