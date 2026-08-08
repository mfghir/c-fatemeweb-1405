import type { Metadata } from "next";
import WorksPage from "@/components/WorksPage";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected UI/UX design projects by Fateme Ghafari — case studies from research through final design.",
  alternates: { canonical: "/works" },
  openGraph: {
    title: "Work — Fateme Ghafari",
    description: "Selected UI/UX design projects by Fateme Ghafari — case studies from research through final design.",
    url: "/works",
  },
};

export default function Page() {
  return <WorksPage />;
}
