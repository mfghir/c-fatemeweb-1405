"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Dribbble } from "lucide-react";
import { useSite } from "./SiteContext";
import { useProjects } from "./useProjects";
import { WORK_TINTS, DRIBBBLE_URL } from "./copy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WorkDetail() {
  const { t } = useSite();
  const params = useParams<{ id: string }>();
  const projects = useProjects();
  const [imgFailed, setImgFailed] = useState(false);

  if (projects === null) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="skeleton h-64 rounded-2xl mb-8" />
        <div className="skeleton h-4 w-24 rounded mb-4" />
        <div className="skeleton h-8 w-2/3 rounded mb-4" />
        <div className="skeleton h-4 w-full rounded mb-2" />
        <div className="skeleton h-4 w-5/6 rounded" />
      </section>
    );
  }

  const index = projects.findIndex((p) => String(p.id) === String(params.id));
  const project = index >= 0 ? projects[index] : null;
  const tint = index >= 0 ? WORK_TINTS[index % WORK_TINTS.length] : "#007BFF";

  if (!project) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-sm mb-6 text-muted-foreground">{t.detailNotFound}</p>
        <Button asChild>
          <Link href="/works" className="inline-flex items-center gap-2">
            <ArrowRight size={15} className="rotate-180" /> {t.detailBack}
          </Link>
        </Button>
      </section>
    );
  }

  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article className="max-w-3xl mx-auto px-6 pt-12 pb-24">
      <Link href="/works" className="text-xs font-semibold inline-flex items-center gap-1 mb-8 text-muted-foreground">
        <ArrowRight size={13} className="rotate-180" /> {t.detailBack}
      </Link>

      <div
        className="h-64 md:h-80 rounded-2xl mb-8 flex items-center justify-center overflow-hidden border border-border"
        style={{ background: !project.image || imgFailed ? `linear-gradient(135deg, ${tint}22, ${tint}05)` : "var(--muted)" }}
      >
        {project.image && !imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div style={{ borderColor: `${tint}55` }} className="w-24 h-24 rounded-2xl flex items-center justify-center bg-card border">
            <div style={{ background: tint }} className="w-9 h-9 rounded-lg" />
          </div>
        )}
      </div>

      {project.category && (
        <div style={{ color: tint }} className="text-xs font-bold uppercase tracking-wide mb-3">
          {project.category}
        </div>
      )}
      <h1 style={{ fontWeight: 800 }} className="text-3xl md:text-4xl mb-4">
        {project.title}
      </h1>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tg) => (
            <Badge key={tg} variant="secondary" className="rounded-full px-3 py-1">
              {tg}
            </Badge>
          ))}
        </div>
      )}

      {/* Reserved space for the case-study write-up — shows a placeholder until the API has real text. */}
      <p className="text-base leading-relaxed mb-8 max-w-2xl text-muted-foreground" style={{ opacity: project.desc ? 1 : 0.6 }}>
        {project.desc || t.detailDescPlaceholder}
      </p>

      <div className="flex flex-wrap gap-3 mb-16">
        {project.onlineLink && (
          <Button asChild className="glow">
            <a href={project.onlineLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              {t.detailViewLive} <ExternalLink size={15} />
            </a>
          </Button>
        )}
        {project.gitLink && (
          <Button asChild variant="chip">
            <a href={project.gitLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              <Github size={15} className="text-primary" /> {t.detailViewCode}
            </a>
          </Button>
        )}
        <Button asChild variant="chip">
          <a href={DRIBBBLE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
            <Dribbble size={15} className="text-primary" /> Dribbble
          </a>
        </Button>
      </div>

      {(prev || next) && (
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border">
          {prev ? (
            <Link href={`/works/${prev.id}`} className="glow rounded-xl p-4 transition-all bg-card border border-border">
              <div className="text-xs mb-1 text-muted-foreground">←</div>
              <div className="text-sm font-semibold truncate">{prev.title}</div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/works/${next.id}`} className="glow rounded-xl p-4 text-end transition-all bg-card border border-border">
              <div className="text-xs mb-1 text-muted-foreground">→</div>
              <div className="text-sm font-semibold truncate">{next.title}</div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </article>
  );
}
