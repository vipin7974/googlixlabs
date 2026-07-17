import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import { LiveVisitors } from "@/components/LiveVisitors";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#16171A",
};

const siteUrl = "https://googlixlabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GooglixLabs — Digital Product Studio | Web, Design & AI Development in Raipur",
    template: "%s · GooglixLabs",
  },
  description:
    "GooglixLabs is a digital product studio in Raipur, India, building intelligent web apps, SaaS platforms, AI products and brand identities for clients worldwide — from first sketch to global scale.",
  keywords: [
    "digital product studio",
    "web development company Raipur",
    "web app development India",
    "UI UX design agency",
    "applied AI development",
    "AI product development company",
    "SaaS platform development",
    "custom software development Chhattisgarh",
    "brand identity design",
    "GooglixLabs",
  ],
  authors: [{ name: "GooglixLabs", url: siteUrl }],
  creator: "GooglixLabs",
  publisher: "GooglixLabs",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "GooglixLabs — Digital Product Studio",
    description:
      "We design and engineer intelligent web apps, SaaS platforms and AI products — from first sketch to global scale.",
    url: "/",
    siteName: "GooglixLabs",
  },
  twitter: {
    card: "summary_large_image",
    title: "GooglixLabs — Digital Product Studio",
    description: "Intelligent web, design & AI products. From Raipur, for the world.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "GooglixLabs",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.svg` },
      image: `${siteUrl}/opengraph-image`,
      description:
        "Digital product studio designing and engineering intelligent web apps, SaaS platforms, AI products and brand identities.",
      email: "googlixlabs@gmail.com",
      telephone: "+91-70004-98574",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Raipur",
        addressRegion: "Chhattisgarh",
        addressCountry: "IN",
      },
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "googlixlabs@gmail.com",
        telephone: "+91-70004-98574",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
      },
      knowsAbout: [
        "Web & App Engineering",
        "Product & UX Design",
        "Applied AI",
        "SaaS Platforms",
        "Brand & Identity",
      ],
      sameAs: [
        "https://www.linkedin.com/company/googlixlabs",
        "https://x.com/googlixlabs",
        "https://github.com/googlixlabs",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "GooglixLabs",
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "light" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "var(--font-manrope), sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
        <LiveVisitors />
      </body>
    </html>
  );
}
