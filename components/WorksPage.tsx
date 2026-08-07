"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Dribbble, Search, X } from "lucide-react";
import { useSite } from "./SiteContext";
import { useProjects } from "./useProjects";
import WorkCard from "./WorkCard";
import Reveal from "./Reveal";
import { DRIBBBLE_URL } from "./copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE = 6;
const ALL_VALUE = "__all__";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs font-bold shrink-0 text-primary">／00</span>
      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function WorksPage() {
  const { t } = useSite();
  const projects = useProjects();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const tags = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    return [...new Set(projects.map((p) => p.category).filter(Boolean))];
  }, [projects]);

  const filtered = useMemo(() => {
    if (!Array.isArray(projects)) return projects;
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesTag = !activeTag || p.category === activeTag;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.desc || "").toLowerCase().includes(q) ||
        (p.tags || []).some((tg) => tg.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [projects, activeTag, query]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTag, query]);

  const hasAnyProjects = Array.isArray(projects) && projects.length > 0;
  const visible = Array.isArray(filtered) ? filtered.slice(0, visibleCount) : filtered;
  const canLoadMore = Array.isArray(filtered) && visibleCount < filtered.length;

  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <Link href="/" className="text-xs font-semibold inline-flex items-center gap-1 mb-6 text-muted-foreground">
          <ArrowRight size={13} className="rotate-180" /> {t.back}
        </Link>
        <SectionLabel>{t.workEyebrow}</SectionLabel>
        <h1 className="text-3xl md:text-4xl mb-3 font-extrabold">{t.workPageTitle}</h1>
        <p className="max-w-xl text-sm text-muted-foreground">{t.workPageSub}</p>

        {hasAnyProjects && (
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative w-full md:max-w-sm">
              <Search size={15} className="absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="ps-9 pe-9"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-muted-foreground"
                  aria-label="clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {tags.length > 0 && (
              <Select
                value={activeTag ?? ALL_VALUE}
                onValueChange={(v) => setActiveTag(v === ALL_VALUE ? null : v)}
              >
                <SelectTrigger className="w-full md:w-48 shrink-0">
                  <SelectValue placeholder={t.filterAll} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_VALUE}>{t.filterAll}</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        {projects === null && (
          <div className="grid md:grid-cols-3 gap-5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border">
                <div className="skeleton h-36" />
                <div className="p-5 space-y-2">
                  <div className="skeleton h-3 w-20 rounded" />
                  <div className="skeleton h-4 w-32 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {Array.isArray(projects) && projects.length === 0 && (
          <div className="rounded-2xl p-8 text-center bg-card border border-border">
            <p className="text-sm mb-4 text-muted-foreground">{t.workFallback}</p>
            <Button asChild>
              <a href={DRIBBBLE_URL} target="_blank" rel="noreferrer" className="glow inline-flex items-center gap-2">
                <Dribbble size={16} /> {t.viewDribbble}
              </a>
            </Button>
          </div>
        )}

        {hasAnyProjects && filtered && filtered.length > 0 && (
          <Reveal>
            <div className="grid md:grid-cols-3 gap-5">
              {visible!.map((w, i) => (
                <WorkCard key={w.id} project={w} index={i} />
              ))}
            </div>
          </Reveal>
        )}

        {canLoadMore && (
          <div className="flex justify-center mt-8">
            <Button variant="chip" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
              {t.loadMore}
            </Button>
          </div>
        )}

        {hasAnyProjects && filtered && filtered.length === 0 && (
          <div className="rounded-2xl p-8 text-center bg-card border border-border">
            <p className="text-sm text-muted-foreground">{t.noResults}</p>
          </div>
        )}
      </section>
    </div>
  );
}
