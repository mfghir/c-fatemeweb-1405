import { useEffect, useState } from "react";
import { PROJECTS_API, PROJECTS_ENDPOINTS, normalizeProject } from "./copy";
import type { Project } from "@/lib/types";

export function useProjects(): Project[] | null {
  const [projects, setProjects] = useState<Project[] | null>(null); // null = loading, [] = none found

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const path of PROJECTS_ENDPOINTS) {
        try {
          const res = await fetch(`${PROJECTS_API}/${path}`);
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data) && data.length) {
            if (!cancelled) setProjects(data.map(normalizeProject));
            return;
          }
        } catch {
          /* try next endpoint */
        }
      }
      if (!cancelled) setProjects([]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return projects;
}
