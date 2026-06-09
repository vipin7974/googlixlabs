# GooglixLabs — Next.js Website

A production-ready Next.js 14 (App Router) website for **GooglixLabs**, built with **TypeScript + Tailwind CSS**. Light theme, fully animated, mobile-first responsive, with a working contact form that pipes submissions into a Google Sheet (Excel) and sends notification emails to `googlixlabs@gmail.com`.

---

## ✨ Features

- **Next.js 14 App Router** with TypeScript
- **Tailwind CSS** (custom brand tokens, animations, gradients)
- **Light, aesthetic UI** built to convert — hero, trust bar, stats, services, about, projects, process, testimonials, FAQ, contact, CTA, footer
- **Filterable projects gallery** with real live sites (Hexalin Pharma, WeWake IndiGreen) + Inventory & Real-Estate / Builder apps
- **Working contact form** that:
  - Submits to your **Google Form** (auto-populates the linked Google Sheet → downloadable as Excel)
  - Optionally sends a notification email to `googlixlabs@gmail.com` via SMTP
  - Returns a polished success state with reset
- Smooth-scroll nav, mobile drawer, back-to-top, scroll-reveal animations, animated counters
- SEO defaults: metadata, Open Graph, sitemap.xml, robots.txt, favicon
- Custom 404 page

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file & fill values (see below for Google Form setup)
cp .env.example .env.local

# 3. Run dev server
npm run dev
# → http://localhost:3000

# 4. Production build
npm run build
npm start
```

---

## 📁 Project Structure

```
googlixlabs/
├── app/
│   ├── api/contact/route.ts   # Form submission → Google Form + email
│   ├── globals.css            # Tailwind + custom styles
│   ├── layout.tsx             # Root layout (fonts, metadata, favicon)
│   ├── page.tsx               # Homepage (composes all sections)
│   ├── not-found.tsx          # Custom 404
│   ├── robots.ts              # robots.txt
│   └── sitemap.ts             # sitemap.xml
├── components/
│   ├── Logo.tsx               # Reusable logo (mark / full)
│   ├── Navbar.tsx             # Sticky nav + mobile drawer
│   ├── Footer.tsx             # Footer w/ sitemap + socials
│   ├── BackToTop.tsx          # Floating scroll-to-top button
│   ├── Reveal.tsx             # IntersectionObserver fade-in wrapper
│   └── sections/
│       ├── Hero.tsx
│       ├── TrustBar.tsx       # Marquee of client logos
│       ├── Stats.tsx          # Animated counters
│       ├── Services.tsx       # 6 service cards
│       ├── About.tsx          # About + code-window visual
│       ├── Projects.tsx       # Filterable project gallery
│       ├── Process.tsx        # 4-step process
│       ├── Testimonials.tsx   # Reviews + rating breakdown
│       ├── Faq.tsx            # Accordion FAQ
│       ├── Contact.tsx        # Contact info + form
│       └── Cta.tsx            # Pre-footer CTA
├── lib/
│   └── projects.ts            # Project data (edit to add more clients)
├── public/
│   ├── favicon.svg            # Favicon (molecule mark)
│   ├── logo.svg               # Brand mark
│   ├── logo-wordmark.svg      # Full logo + wordmark
│   └── og-image.svg           # Open Graph preview
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## 📋 Connecting the Contact Form to Google Sheets (Excel)

The contact form is **already wired** to submit to a Google Form. You just need to create the form and paste 7 IDs into `.env.local`.

### 1. Create a Google Form
1. Open [forms.google.com](https://forms.google.com) → blank form.
2. Add these short-answer / paragraph / dropdown questions in this exact order:
   - **Name** (short answer)
   - **Email** (short answer)
   - **Phone** (short answer)
   - **Company** (short answer)
   - **Service** (short answer or dropdown)
   - **Budget** (short answer or dropdown)
   - **Message** (paragraph)
3. Click the **Responses** tab → click the green Sheets icon → **Link to Sheets** → "Create new spreadsheet". This is your **Excel-compatible** sheet — every submission auto-appears here, and you can download it as `.xlsx` any time (File → Download → Microsoft Excel).

### 2. Get the Form ID
1. Click **Send** (top-right) → click the link icon → copy the long URL.
2. The URL looks like: `https://docs.google.com/forms/d/e/1FAIpQLSe.../viewform`
3. Copy the part between `/d/e/` and `/viewform`. That's your `GOOGLE_FORM_ID`.

### 3. Get the Field Entry IDs
1. In the form editor, click the **⋮** (three dots, top-right) → **Get pre-filled link**.
2. Fill any text into every field (e.g. "Name", "Email"…), then click **Get link** → **Copy link**.
3. Paste the link somewhere readable. It contains chunks like `entry.1234567890=Name&entry.9876543210=Email`.
4. Match each `entry.XXXXXXXXXX` to its field and paste into `.env.local`:

```env
GOOGLE_FORM_ID=1FAIpQLSe_xxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_FORM_ENTRY_NAME=entry.1234567890
GOOGLE_FORM_ENTRY_EMAIL=entry.2345678901
GOOGLE_FORM_ENTRY_PHONE=entry.3456789012
GOOGLE_FORM_ENTRY_COMPANY=entry.4567890123
GOOGLE_FORM_ENTRY_SERVICE=entry.5678901234
GOOGLE_FORM_ENTRY_BUDGET=entry.6789012345
GOOGLE_FORM_ENTRY_MESSAGE=entry.7890123456
```

### 4. (Optional) Add Email Notifications
To also receive an email at `googlixlabs@gmail.com` for every submission:

1. Go to your Google Account → **Security** → **App Passwords**.
2. Create a new app password (you need 2FA enabled).
3. Add to `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=googlixlabs@gmail.com
SMTP_PASSWORD=your_16_character_app_password
NEXT_PUBLIC_CONTACT_EMAIL=googlixlabs@gmail.com
```

> The form still works even if the env vars aren't set — it'll just succeed silently with a "thanks" message. Configure them whenever you're ready.

---

## ✏️ Editing Content

| What to edit | File |
|---|---|
| Projects gallery (add/remove clients) | `lib/projects.ts` |
| Services list & icons | `components/sections/Services.tsx` |
| About section copy | `components/sections/About.tsx` |
| Stats numbers | `components/sections/Stats.tsx` |
| Testimonials | `components/sections/Testimonials.tsx` |
| FAQ items | `components/sections/Faq.tsx` |
| Footer links / contact | `components/Footer.tsx` |
| Nav items | `components/Navbar.tsx` |
| Site metadata / SEO | `app/layout.tsx` |
| Brand colors | `tailwind.config.ts` |

---

## 🎨 Brand Tokens (Tailwind)

```ts
brand: {
  blue:   "#4B7CFF",   purple: "#7C6EF5",
  red:    "#FF5E57",   yellow: "#FFC947",
  green:  "#3DDC91",   cyan:   "#22D3EE",
}
```

Plus surface (`surface`, `surface-alt`, `surface-muted`) and ink (`ink`, `ink-sec`, `ink-muted`) text colors. Gradient utility: `gradient-text` (blue → purple → cyan).

---

## 🚢 Deployment

### Vercel (recommended)
1. Push to a GitHub repo.
2. Import on [vercel.com](https://vercel.com/new).
3. Add the env vars from `.env.example` in the Vercel project settings.
4. Deploy — done.

### Other hosts
Any Node.js host (Render, Railway, Fly.io, EC2): run `npm run build` then `npm start`.

---

## 🧰 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Run the built app |
| `npm run lint` | ESLint (Next.js core-web-vitals config) |

---

## ✅ What's Working

- Every nav link smooth-scrolls to its section
- Mobile menu toggles, locks body scroll, and closes on link tap
- Project filter chips actually filter the grid
- Live projects open in a new tab (Hexalin Pharma, WeWake IndiGreen)
- Internal/under-NDA projects route the visitor to `#contact`
- Budget chips toggle selection
- Contact form validates, shows loading + success + error states
- Back-to-top button appears after scroll and animates smoothly
- FAQ accordion opens/closes with keyboard support
- Animated counters trigger when stats scroll into view
- Reveal-on-scroll animations across all sections

---

Built with care. © GooglixLabs.
