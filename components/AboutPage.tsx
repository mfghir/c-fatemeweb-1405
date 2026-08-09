"use client";

import { useSite } from "./SiteContext";
import Reveal from "./Reveal";
import { SectionLabel, Starburst } from "./Decor";
import { IllustrationSlot } from "./IllustrationSlot";

export default function AboutPage() {
  const { t, isRetro } = useSite();

  return (
    <Reveal>
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 relative overflow-hidden">
        {isRetro && (
          <>
            <Starburst color="var(--retro-mint)" size={60} style={{ top: 0, right: "4%", opacity: 0.85, animation: "spin-slow 20s linear infinite" }} />
            <Starburst color="var(--retro-coral)" size={40} style={{ bottom: 10, left: "2%", opacity: 0.8, animation: "spin-slow 16s linear infinite reverse" }} />
          </>
        )}

        <SectionLabel index="01">{t.aboutEyebrow}</SectionLabel>

        <div className="grid md:grid-cols-[1fr_260px] gap-10 items-start">
          <div>
            <h1 style={{ fontWeight: 800 }} className="text-3xl md:text-4xl mb-6 max-w-xl leading-tight">
              {t.aboutTitle}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground max-w-xl mb-8">{t.aboutBody}</p>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{t.eyebrow}</span>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xl">
              {t.marquee.map((skill) => (
                <span key={skill} className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <IllustrationSlot label="About illustration" className="w-full aspect-[4/5] p-8" />
        </div>
      </section>
    </Reveal>
  );
}
