import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteProvider } from "@/components/SiteContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Fateme Ghafari — UI/UX Designer",
  description: "UI/UX Designer portfolio — فارسی / English / 한국어",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" suppressHydrationWarning>
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
