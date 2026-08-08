import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Fateme Ghafari — UI/UX Designer.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Fateme Ghafari",
    description: "Get in touch with Fateme Ghafari — UI/UX Designer.",
    url: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
