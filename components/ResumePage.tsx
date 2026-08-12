"use client";

import { ExternalLink, FileText, Briefcase } from "lucide-react";
import { useSite } from "./SiteContext";
import Reveal from "./Reveal";
import { SectionLabel } from "./Decor";
import { RESUME_URL, PORTFOLIO_URL } from "./copy";
import { toDrivePreview } from "@/lib/drive";

export default function ResumePage() {
  const { t, locale } = useSite();

  const docs = [
    { Icon: FileText, title: t.resumeCardTitle, desc: t.resumeCardDesc, url: RESUME_URL[locale] },
    { Icon: Briefcase, title: t.portfolioCardTitle, desc: t.portfolioCardDesc, url: PORTFOLIO_URL[locale] },
  ];

  return (
    <Reveal>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-24">
        <SectionLabel index="01">{t.resumePageTitle}</SectionLabel>
        <h1 style={{ fontWeight: 800 }} className="text-3xl md:text-4xl mb-3 max-w-2xl">
          {t.resumePageTitle}
        </h1>
        <p className="text-sm text-muted-foreground mb-12 max-w-xl">{t.resumePageSub}</p>

        <div className="space-y-12">
          {docs.map(({ Icon, title, desc, url }) => (
            <div key={title}>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-muted shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">{title}</h2>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold inline-flex items-center gap-1 text-primary shrink-0"
                >
                  {t.viewOpen} <ExternalLink size={13} />
                </a>
              </div>

              {/* Same file, opened right on the page — the src updates automatically
                  if the language (and therefore the file) changes. */}
              <iframe
                key={url}
                src={toDrivePreview(url)}
                className="w-full rounded-2xl border border-border"
                style={{ height: "75vh", minHeight: 420 }}
                allow="autoplay"
                title={title}
              />
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
