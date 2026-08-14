"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MousePointer2, Figma, Search, PenTool, Layers, GitBranch, Dribbble } from "lucide-react";
import { useSite } from "./SiteContext";
import { useProjects } from "./useProjects";
import WorkCard from "./WorkCard";
import Reveal from "./Reveal";
import { DRIBBBLE_URL } from "./copy";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "./Decor";
import HeroShowcase from "./HeroShowcase";
import ContactForm from "./ContactForm";
import { Faq } from "./Faq";

const EXPERTISE_ICONS = { research: Search, design: PenTool, system: Layers, handoff: GitBranch } as const;

function MagneticButton({
  children,
  style,
  className,
  href,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ ...style, transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform .15s ease-out" }}
      className={className}
    >
      {children}
    </a>
  );
}

// 3D tilt card that follows the pointer — replaces the plain float animation on the hero mockup.
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setRot({ x: py * -10, y: px * 12 });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 1000 }}
    >
      <div style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform .25s ease-out", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const { t, isDark } = useSite();
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const projects = useProjects();
  const preview = Array.isArray(projects) ? projects.slice(0, 3) : null;
  const uiUxPicks = Array.isArray(projects)
    ? projects.filter((p) => (p.tags || []).some((tg) => ["ui", "ux"].includes(tg.toLowerCase())))
    : [];
  // Falls back to all projects if too few are tagged "ui"/"ux" — a slider needs enough cards to be worth having.
  const heroPicks = (uiUxPicks.length >= 3 ? uiUxPicks : Array.isArray(projects) ? projects : []).slice(0, 8);

  return (
    <div onMouseMove={(e) => setSpot({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })}>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(0,123,255,${isDark ? 0.1 : 0.07}), transparent 40%)` }}
      />
      <div
        className="pointer-events-none fixed inset-0 -z-20 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(${isDark ? "#1c2431" : "#dbe6f5"} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* HERO — bento layout */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-14 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
        <div
          style={{ background: "#007BFF", opacity: isDark ? 0.18 : 0.12, animation: "blob 9s ease-in-out infinite" }}
          className="absolute w-72 h-72 rounded-full blur-3xl -top-10 -z-10"
        />
        {/* Oversized faint wordmark behind the heading — the hero's signature touch */}
        <span
          aria-hidden
          className="absolute select-none pointer-events-none font-extrabold whitespace-nowrap -z-10"
          style={{ fontSize: "11rem", lineHeight: 1, top: "-1.5rem", insetInlineStart: "-0.5rem", color: "#007BFF", opacity: 0.06 }}
        >
          {t.name.split(" ")[0]}
        </span>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary">{t.eyebrow}</span>
          </div>

          <p className="text-lg md:text-xl font-semibold text-muted-foreground mb-1">{t.hiPrefix}</p>
          <h1
            style={{
              fontWeight: 800,
              lineHeight: 1.02,
              backgroundImage: "linear-gradient(90deg, var(--foreground) 55%, #007BFF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            className="text-5xl md:text-6xl mb-5 tracking-tight"
          >
            {t.name}
          </h1>

          <p className="text-lg md:text-xl font-medium mb-8 max-w-md text-muted-foreground">{t.tagline}</p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <MagneticButton
              href="/contact"
              style={{ background: "#007BFF" }}
              className="glow text-white px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
            >
              {t.ctaContact} <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="#work" className="chip px-5 py-3 rounded-xl text-sm font-semibold inline-flex text-foreground">
              {t.ctaWork}
            </MagneticButton>
          </div>
        </div>

        <div className="relative">
          {heroPicks.length > 0 ? (
            <HeroShowcase projects={heroPicks} />
          ) : (
            <TiltCard>
              <div className="rounded-2xl shadow-2xl overflow-hidden bg-card border border-border">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                  <span className="text-xs ml-2 text-muted-foreground">{t.canvasTitle}</span>
                </div>
                <div className="flex">
                  <div className="w-1/3 p-3 space-y-2" style={{ borderInlineEnd: "1px solid var(--border)" }}>
                    {t.layers.map((l, i) => (
                      <div key={i} className="rounded-md px-2 py-1.5 text-[10px] bg-muted">
                        {l}
                      </div>
                    ))}
                  </div>
                  <div className="w-2/3 p-4 space-y-3 relative">
                    <div className="h-10 rounded-lg opacity-90 bg-primary" />
                    <div className="h-16 rounded-lg bg-muted" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-14 rounded-lg bg-muted" />
                      <div className="h-14 rounded-lg bg-muted" />
                    </div>
                    <MousePointer2
                      size={18}
                      color="#007BFF"
                      fill="#007BFF"
                      style={{ position: "absolute", bottom: 10, right: 10, animation: "pulse-cursor 2.2s ease-in-out infinite" }}
                    />
                  </div>
                </div>
              </div>
            </TiltCard>
          )}

          {/* floating bento badges */}
          <div
            style={{ animation: "float 5s ease-in-out infinite" }}
            className="hidden md:flex absolute -bottom-6 -left-8 items-center gap-2 rounded-xl px-3 py-2 shadow-xl bg-card border border-border"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#28C840", animation: "pulse-ring 2s ease-out infinite" }} />
            <span className="text-xs font-semibold">{t.badgeAvailable}</span>
          </div>
          <div
            style={{ animation: "float 7s ease-in-out infinite" }}
            className="hidden md:flex absolute -top-5 -right-6 items-center gap-2 rounded-xl px-3 py-2 shadow-xl bg-card border border-border"
          >
            <Figma size={14} className="text-primary" />
            <span className="text-xs font-semibold">{t.badgeTool}</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-4 border-y border-border">
        <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
          {[...t.marquee, ...t.marquee].map((s, i) => (
            <span key={i} className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* EXPERTISE — concrete answer to "what does she actually do" */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <SectionLabel index="01">{t.expertiseEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 max-w-2xl">{t.expertiseTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.expertise.map((x, i) => {
              const Icon = EXPERTISE_ICONS[x.icon] || Search;
              return (
                <div key={i} className="group rounded-xl p-5 bg-card border border-border transition-transform hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-muted transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="text-base font-bold mb-1.5">{x.t}</div>
                  <div className="text-sm leading-relaxed text-muted-foreground">{x.d}</div>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* SERVICES teaser — links to the full pricing/services page */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <SectionLabel index="02">{t.servicesEyebrow}</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold max-w-2xl mb-2">{t.servicesTitle}</h2>
              <p className="text-sm text-muted-foreground max-w-md">{t.servicesTeaser}</p>
            </div>
            <Link href="/services" className="text-sm font-semibold inline-flex items-center gap-1 shrink-0 text-primary">
              {t.seeServices} <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {t.services.map((service, i) => (
              <Link
                key={i}
                href="/services"
                className="group rounded-xl p-5 bg-card border border-border transition-all hover:-translate-y-1"
              >
                <h3 className="text-sm font-bold mb-2">{service.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground mb-3">{service.desc}</p>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                  {t.seeServices} <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* PROCESS */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border relative overflow-hidden">
          <SectionLabel index="03">{t.processEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 max-w-2xl">{t.processTitle}</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {t.process.map((p, i) => (
              <div
                key={i}
                className="rounded-xl p-4 bg-card border border-border transition-transform hover:-translate-y-1"
              >
                <div className="text-xs font-bold mb-2 text-primary">0{i + 1}</div>
                <div className="text-sm font-bold mb-1">{p.t}</div>
                <div className="text-xs leading-relaxed text-muted-foreground">{p.d}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* WORK PREVIEW — links to the dedicated /works page */}
      <Reveal>
        <section id="work" className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <SectionLabel index="04">{t.workEyebrow}</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold max-w-2xl">{t.workTitle}</h2>
            </div>
            <Link href="/works" className="text-sm font-semibold inline-flex items-center gap-1 shrink-0 text-primary">
              {t.seeAll} <ArrowUpRight size={14} />
            </Link>
          </div>

          {preview === null && (
            <div className="grid md:grid-cols-3 gap-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-border">
                  <div className="skeleton h-32" />
                  <div className="p-5 space-y-2">
                    <div className="skeleton h-3 w-20 rounded" />
                    <div className="skeleton h-4 w-32 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {preview && preview.length > 0 && (
            <div className="grid md:grid-cols-3 gap-5">
              {preview.map((w, i) => (
                <WorkCard key={w.id} project={w} index={i} />
              ))}
            </div>
          )}

          {preview && preview.length === 0 && (
            <div className="rounded-2xl p-8 text-center bg-card border border-border">
              <p className="text-sm mb-4 text-muted-foreground">{t.workFallback}</p>
              <Button asChild>
                <a href={DRIBBBLE_URL} target="_blank" rel="noreferrer" className="glow inline-flex items-center gap-2">
                  <Dribbble size={16} /> {t.viewDribbble}
                </a>
              </Button>
            </div>
          )}
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="max-w-3xl mx-auto px-6 py-16 border-t border-border">
          <SectionLabel index="05">{t.faqEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 max-w-2xl">{t.faqTitle}</h2>
          <Faq items={t.faq} />
        </section>
      </Reveal>

      {/* CONTACT — the full page lives at /contact; this is a lighter version so home doesn't dead-end at FAQ */}
      <Reveal>
        <section id="contact" className="max-w-3xl mx-auto px-6 py-16 border-t border-border">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <SectionLabel index="06">{t.linksEyebrow}</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold max-w-2xl">{t.linksTitle}</h2>
            </div>
            <Link href="/contact" className="text-sm font-semibold inline-flex items-center gap-1 shrink-0 text-primary">
              {t.nav.contact} <ArrowUpRight size={14} />
            </Link>
          </div>
          <ContactForm />
        </section>
      </Reveal>
    </div>
  );
}
