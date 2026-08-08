import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteProvider } from "@/components/SiteContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

// Update this if the site's real domain changes — it feeds canonical URLs,
// Open Graph/Twitter image URLs, and sitemap.ts / robots.ts.
export const SITE_URL = "https://fatemeweb.netlify.app";
const SITE_NAME = "Fateme Ghafari — UI/UX Designer";
const SITE_DESCRIPTION =
  "UI/UX Designer portfolio. Research, UI design, design systems, and dev handoff — case studies, process, and contact. فارسی / English / 한국어.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s — Fateme Ghafari",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "UI/UX Designer",
    "UI Designer",
    "UX Designer",
    "Product Designer",
    "Figma",
    "Design Systems",
    "طراح UI/UX",
    "UI/UX 디자이너",
  ],
  authors: [{ name: "Fateme Ghafari" }],
  creator: "Fateme Ghafari",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fateme Ghafari",
  jobTitle: "UI/UX Designer",
  url: SITE_URL,
  sameAs: [
    "https://github.com/mfghir",
    "https://www.linkedin.com/in/fateme-ghafari",
    "https://www.instagram.com/fatemeweb",
    "https://dribbble.com/fatemeweb",
  ],
  knowsAbout: ["UI Design", "UX Research", "Design Systems", "Prototyping", "Figma"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <SiteProvider>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
