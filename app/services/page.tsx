import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Pricing & Services",
  description: "Design services offered by Fateme Ghafari — UX consultation, UI/UX design, and design systems.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Pricing & Services — Fateme Ghafari",
    description: "Design services offered by Fateme Ghafari — UX consultation, UI/UX design, and design systems.",
    url: "/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
