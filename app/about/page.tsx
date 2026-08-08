import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "About Fateme Ghafari — UI/UX Designer.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Fateme Ghafari",
    description: "About Fateme Ghafari — UI/UX Designer.",
    url: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
