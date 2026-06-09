import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08091A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://googlixlabs.com"),
  title: {
    default: "GooglixLabs — Intelligent Digital Experiences",
    template: "%s · GooglixLabs",
  },
  description:
    "GooglixLabs builds intelligent, scalable, and visually stunning digital products. Full Stack Development, UI/UX Design, AI Solutions, SaaS & Mobile Apps — from Raipur, India for the world.",
  keywords: [
    "GooglixLabs",
    "Web Development",
    "Next.js Agency",
    "AI Solutions",
    "SaaS Development",
    "UI/UX Design",
    "Mobile App Development",
    "Pharma software",
    "Inventory management software",
    "Hexalin Pharmaceuticals",
    "WeWakeIndiGreen",
  ],
  authors: [{ name: "GooglixLabs" }],
  creator: "GooglixLabs",
  publisher: "GooglixLabs",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "GooglixLabs — Intelligent Digital Experiences",
    description:
      "We design and engineer intelligent digital products — full stack web, AI tools, SaaS, mobile apps and pixel-perfect UI/UX.",
    siteName: "GooglixLabs",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GooglixLabs — Intelligent Digital Experiences",
    description:
      "Full Stack · AI · UI/UX · SaaS · Mobile. We turn complex ideas into products people love.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable}`}
      style={{ colorScheme: "light dark" }}
    >
      <body className="font-sans antialiased no-tap-highlight bg-white text-ink dark:bg-[#08091A] dark:text-white">
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          theme="system"
          toastOptions={{
            classNames: {
              toast: "font-sans",
            },
          }}
        />
      </body>
    </html>
  );
}
