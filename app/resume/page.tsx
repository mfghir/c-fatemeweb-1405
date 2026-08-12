import type { Metadata } from "next";
import ResumePage from "@/components/ResumePage";

export const metadata: Metadata = {
  title: "Resume & Portfolio",
  description: "Download or view Fateme Ghafari's resume and portfolio.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume & Portfolio — Fateme Ghafari",
    description: "Download or view Fateme Ghafari's resume and portfolio.",
    url: "/resume",
  },
};

export default function Page() {
  return <ResumePage />;
}
