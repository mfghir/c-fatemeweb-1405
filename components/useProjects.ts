import { useEffect, useState } from "react";
import { PROJECTS_API, PROJECTS_ENDPOINTS, normalizeProject } from "./copy";
import type { Project } from "@/lib/types";

// Shared across every component that calls useProjects() — Header, Home, the
// works list, and each work-detail page all used to trigger their own fetch
// to the same endpoint. Now the first caller fetches once; everyone else
// (mounted at the same time or later) reuses that result or in-flight request.
let cachedProjects: Project[] | null = null;
let inflight: Promise<Project[]> | null = null;

function fetchProjects(): Promise<Project[]> {
  if (cachedProjects) return Promise.resolve(cachedProjects);
  if (inflight) return inflight;

  inflight = (async () => {
    for (const path of PROJECTS_ENDPOINTS) {
      try {
        const res = await fetch(`${PROJECTS_API}/${path}`);
        if (!res.ok) continue;
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          const normalized = data.map(normalizeProject);
          cachedProjects = normalized;
          return normalized;
        }
      } catch {
        /* try next endpoint */
      }
    }
    cachedProjects = [];
    return [];
  })();

  return inflight;
}

export function useProjects(): Project[] | null {
  const [projects, setProjects] = useState<Project[] | null>(cachedProjects);

  useEffect(() => {
    if (cachedProjects) {
      setProjects(cachedProjects);
      return;
    }
    let cancelled = false;
    fetchProjects().then((data) => {
      if (!cancelled) setProjects(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return projects;
}
