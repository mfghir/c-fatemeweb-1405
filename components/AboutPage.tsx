"use client";

import { useSite } from "./SiteContext";
import Reveal from "./Reveal";
import { SectionLabel, Starburst } from "./Decor";

export default function AboutPage() {
  const { t, isRetro } = useSite();

  return (
    <Reveal>
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-24 relative overflow-hidden">
        {isRetro && (
          <>
            <Starburst color="var(--retro-mint)" size={60} style={{ top: 0, right: "4%", opacity: 0.85, animation: "spin-slow 20s linear infinite" }} />
            <Starburst color="var(--retro-coral)" size={40} style={{ bottom: 10, left: "2%", opacity: 0.8, animation: "spin-slow 16s linear infinite reverse" }} />
          </>
        )}
        <SectionLabel index="01">{t.aboutEyebrow}</SectionLabel>
        <h1 style={{ fontWeight: 800 }} className="text-3xl md:text-4xl mb-6 max-w-2xl">
          {t.aboutTitle}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">{t.aboutBody}</p>
      </section>
    </Reveal>
  );
}
