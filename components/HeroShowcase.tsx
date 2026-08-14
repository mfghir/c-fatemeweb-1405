"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { useSite } from "./SiteContext";
import { projectDesc } from "./copy";

// Movie/series-site style: one larger featured poster, plus a row of smaller
// cards below it — arrows on desktop, native touch-swipe on mobile, and mouse
// drag on desktop. The active card is highlighted and scrolls into view.
export default function HeroShowcase({ projects }: { projects: Project[] }) {
  const { locale } = useSite();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const drag = useRef<{ startX: number; startScroll: number; dragging: boolean; moved: boolean }>({
    startX: 0,
    startScroll: 0,
    dragging: false,
    moved: false,
  });

  useEffect(() => {
    if (paused || projects.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % projects.length), 4500);
    return () => clearInterval(id);
  }, [paused, projects.length]);

  // Keep the highlighted thumbnail in view, whether it changed from autoplay,
  // an arrow click, or a manual card click.
  useEffect(() => {
    cardRefs.current[active]?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [active]);

  const current = projects[active];

  function scrollByCard(dir: 1 | -1) {
    setActive((i) => (i + dir + projects.length) % projects.length);
  }

  // Only hijack dragging for a real mouse — touch already gets free native
  // swipe-scrolling from `overflow-x-auto`, and capturing pointer events for
  // touch too was fighting the browser's own scroll gesture.
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !railRef.current) return;
    drag.current = { startX: e.clientX, startScroll: railRef.current.scrollLeft, dragging: true, moved: false };
    setPaused(true);
    railRef.current.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.dragging || !railRef.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    railRef.current.scrollLeft = drag.current.startScroll - dx;
  }
  function onPointerUp() {
    drag.current.dragging = false;
    setPaused(false);
  }

  if (!current) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* featured poster */}
      <Link
        href={`/works/${current.id}`}
        className="group block rounded-2xl overflow-hidden border border-border shadow-xl bg-card relative aspect-[16/10] transition-transform hover:-translate-y-0.5"
      >
        <img
          key={current.id}
          src={current.image ?? undefined}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ animation: "fade-in .4s ease-out" }}
        />
        <div className="absolute inset-x-0 bottom-0 p-3 pt-8" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}>
          {current.category && (
            <span className="text-[9px] font-bold uppercase tracking-wide text-white/70">{current.category}</span>
          )}
          <h3 className="text-white font-bold text-sm leading-snug">{current.title}</h3>
          {projectDesc(current, locale) && (
            <p className="text-white/70 text-[11px] mt-0.5 line-clamp-1">{projectDesc(current, locale)}</p>
          )}
        </div>
      </Link>

      {/* thumbnail rail: arrows on desktop, drag/swipe everywhere, active card highlighted + labeled */}
      {projects.length > 1 && (
        <div className="relative mt-3 flex items-center gap-1.5">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="previous"
            className="hidden sm:flex shrink-0 w-6 h-6 rounded-full items-center justify-center border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={13} />
          </button>

          <div
            ref={railRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="flex-1 flex items-end gap-2 overflow-x-auto cursor-grab active:cursor-grabbing select-none no-scrollbar py-1"
            style={{ scrollSnapType: "x proximity" }}
          >
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => {
                    if (drag.current.moved) return; // was a drag, not a tap
                    setActive(i);
                  }}
                  className="shrink-0 flex flex-col gap-1 transition-all"
                  style={{ scrollSnapAlign: "start" }}
                  aria-label={p.title}
                >
                  <span
                    className="block rounded-lg overflow-hidden border-2 transition-all"
                    style={{
                      width: isActive ? 56 : 44,
                      height: isActive ? 56 : 44,
                      borderColor: isActive ? "var(--primary)" : "transparent",
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    <img src={p.image ?? undefined} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" draggable={false} />
                  </span>
                  <span
                    className="text-[9px] font-medium max-w-[56px] truncate"
                    style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollByCard(1)}
            aria-label="next"
            className="hidden sm:flex shrink-0 w-6 h-6 rounded-full items-center justify-center border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
