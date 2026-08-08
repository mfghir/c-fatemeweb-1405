import type { Metadata } from "next";
import WorkDetail from "@/components/WorkDetail";

const PROJECTS_API = "https://new-personal-api.vercel.app";
const PROJECTS_ENDPOINTS = ["PortfoliosData", "portfoliosdata", "projects", "works", "portfolio"];

async function fetchProject(id: string): Promise<{ title?: string; category?: string; description?: string } | null> {
  for (const path of PROJECTS_ENDPOINTS) {
    try {
      const res = await fetch(`${PROJECTS_API}/${path}`, { next: { revalidate: 3600 } });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        const found = data.find((item: any, i: number) => String(item.id ?? i) === id);
        if (found) return found;
      }
    } catch {
      /* try next endpoint */
    }
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchProject(id);
  const title = project?.title || "Project";
  const description =
    project?.description ||
    (project?.category ? `A ${project.category} project by Fateme Ghafari.` : "A UI/UX design project by Fateme Ghafari.");

  return {
    title,
    description,
    alternates: { canonical: `/works/${id}` },
    openGraph: { title: `${title} — Fateme Ghafari`, description, url: `/works/${id}` },
  };
}

export default function Page() {
  return <WorkDetail />;
}
