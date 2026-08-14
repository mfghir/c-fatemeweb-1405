"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WORK_TINTS, projectDesc } from "./copy";
import { Badge } from "@/components/ui/badge";
import { useSite } from "./SiteContext";
import { isDriveLink } from "@/lib/drive";
import type { Project } from "@/lib/types";

export default function WorkCard({ project, index }: { project: Project; index: number }) {
  const { t, locale } = useSite();
  const tint = WORK_TINTS[index % WORK_TINTS.length];
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(project.image) && !imgFailed;
  const desc = projectDesc(project, locale);
  const bucketLabel = isDriveLink(project.onlineLink) ? t.filterCaseStudy : t.filterUiUx;

  return (
    <Link
      href={`/works/${project.id}`}
      className="work-card glow rounded-2xl overflow-hidden group transition-all block bg-card border border-border"
    >
      <div
        className="h-40 relative flex items-center justify-center overflow-hidden"
        style={{ background: !showImage ? `linear-gradient(135deg, ${tint}22, ${tint}05)` : "var(--muted)" }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image as string}
            alt={project.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div style={{ borderColor: `${tint}55` }} className="w-16 h-16 rounded-2xl flex items-center justify-center bg-card border">
            <div style={{ background: tint }} className="w-6 h-6 rounded-md"></div>
          </div>
        )}
      </div>
      <div className="p-5">
        <div style={{ color: tint }} className="text-[11px] font-bold uppercase tracking-wide mb-2">
          {bucketLabel}
        </div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-base">{project.title}</h3>
          <ArrowRight size={16} className="work-arrow opacity-0 transition-all" style={{ color: tint }} />
        </div>
        {desc && (
          <p className="text-xs mt-2 leading-relaxed text-muted-foreground">{desc}</p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tg) => (
              <Badge key={tg} variant="secondary">
                {tg}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
