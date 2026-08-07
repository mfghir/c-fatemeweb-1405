"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Github, Linkedin, Instagram, Send, Dribbble,
  ArrowUpRight, MousePointer2, Loader2, Figma, Search, PenTool, Layers, GitBranch,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useSite } from "./SiteContext";
import { useProjects } from "./useProjects";
import WorkCard from "./WorkCard";
import Reveal from "./Reveal";
import Toast, { type ToastState } from "./Toast";
import { DRIBBBLE_URL } from "./copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// EmailJS — same env var names the user already uses in her project.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_APP_SERV;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_APP_TEMP;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_APP_KEY;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mfghir", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fateme-ghafari", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/fatemeweb", Icon: Instagram },
  { label: "Telegram", href: "https://t.me/fatemeweb", Icon: Send },
  { label: "Dribbble", href: DRIBBBLE_URL, Icon: Dribbble },
];

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

// Bracket-numbered editorial section tag — replaces the generic uppercase "eyebrow" pattern.
function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs font-bold shrink-0 text-primary">／{index}</span>
      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
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

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "ok" | "err";

export default function Home() {
  const { t, isDark } = useSite();
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<ToastState | null>(null);
  const projects = useProjects();
  const preview = Array.isArray(projects) ? projects.slice(0, 3) : null;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = t.formErrRequired;
    if (!values.email.trim()) next.email = t.formErrRequired;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = t.formErrEmail;
    if (!values.message.trim()) next.message = t.formErrRequired;
    return next;
  }

  function updateField(field: keyof FormState, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (errors[field]) setErrors(validate(next));
  }

  const emailjsConfigured = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    console.log("[contact form] submit clicked"); // if this never logs, the click handler itself isn't firing — a build/deploy issue, not EmailJS
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      console.log("[contact form] blocked by validation:", fieldErrors);
      return;
    }

    if (!emailjsConfigured) {
      console.error(
        "[contact form] EmailJS is not configured: NEXT_PUBLIC_APP_SERV / NEXT_PUBLIC_APP_TEMP / NEXT_PUBLIC_APP_KEY " +
          "are missing at runtime. Next.js only reads these at build time — restart `npm run dev` after adding/editing " +
          ".env.local, and if this is deployed, add the same three variables in your host's Environment Variables settings " +
          "and redeploy (a zip you already had before those variables existed will not have them)."
      );
      setStatus("err");
      setToast({ type: "err", message: t.formErr });
      return;
    }

    setStatus("sending");
    try {
      const res = await emailjs.send(
        EMAILJS_SERVICE_ID as string,
        EMAILJS_TEMPLATE_ID as string,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY as string }
      );
      console.log("[contact form] EmailJS success:", res?.status, res?.text);
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setToast({ type: "ok", message: t.formOk });
    } catch (err: any) {
      // EmailJS throws with { status, text } — text usually explains exactly why
      // (bad service/template id, or the page's origin not on the account's
      // allowed-origins list in the EmailJS dashboard). Check the console.
      console.error("[contact form] EmailJS send failed:", err?.status, err?.text || err);
      setStatus("err");
      setToast({ type: "err", message: t.formErr });
    } finally {
      setStatus((s) => (s === "sending" ? "idle" : s));
    }
  }

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

        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary">{t.eyebrow}</span>
          </div>
          <h1
            style={{
              fontWeight: 800,
              lineHeight: 1.05,
              backgroundImage: "linear-gradient(90deg, var(--foreground) 55%, #007BFF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            className="text-5xl md:text-6xl mb-5 tracking-tight"
          >
            {t.name}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-3">{t.tagline}</p>
          <p className="text-sm md:text-base mb-8 max-w-md text-muted-foreground">{t.sub}</p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <MagneticButton
              href="#contact"
              style={{ background: "#007BFF" }}
              className="glow text-white px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
            >
              {t.ctaContact} <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="#work" className="chip px-5 py-3 rounded-xl text-sm font-semibold inline-flex text-foreground">
              {t.ctaWork}
            </MagneticButton>
          </div>

          <div className="flex gap-8">
            <div>
              <div className="text-2xl font-extrabold text-primary">{t.stat1n}</div>
              <div className="text-xs max-w-[140px] text-muted-foreground">{t.stat1l}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-primary">{t.stat2n}</div>
              <div className="text-xs max-w-[140px] text-muted-foreground">{t.stat2l}</div>
            </div>
          </div>
        </div>

        <div className="relative">
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

          {/* floating bento badges */}
          <div
            style={{ animation: "float 5s ease-in-out infinite" }}
            className="hidden md:flex absolute -bottom-6 -left-8 items-center gap-2 rounded-xl px-3 py-2 shadow-xl bg-card border border-border"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#28C840" }} />
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

      {/* ABOUT */}
      <Reveal>
        <section id="about" className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <SectionLabel index="01">{t.aboutEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 max-w-2xl">{t.aboutTitle}</h2>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">{t.aboutBody}</p>
        </section>
      </Reveal>

      {/* EXPERTISE — concrete answer to "what does she actually do" */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <SectionLabel index="02">{t.expertiseEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 max-w-2xl">{t.expertiseTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.expertise.map((x, i) => {
              const Icon = EXPERTISE_ICONS[x.icon] || Search;
              return (
                <div key={i} className="rounded-xl p-5 bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-muted">
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

      {/* PROCESS */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <SectionLabel index="03">{t.processEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 max-w-2xl">{t.processTitle}</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {t.process.map((p, i) => (
              <div key={i} className="rounded-xl p-4 bg-card border border-border">
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

      {/* CONTACT */}
      <Reveal>
        <section id="contact" className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <SectionLabel index="05">{t.linksEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 max-w-2xl">{t.linksTitle}</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <form onSubmit={submitForm} noValidate className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder={t.formName}
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="text-xs mt-1 text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={t.formEmail}
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="text-xs mt-1 text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Textarea
                  placeholder={t.formMsg}
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <p className="text-xs mt-1 text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" disabled={status === "sending"} className="glow">
                {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {status === "sending" ? t.formSending : t.formSend}
              </Button>

              {!emailjsConfigured && (
                <p className="text-xs text-destructive">
                  ⚠ EmailJS env vars aren&apos;t loaded (NEXT_PUBLIC_APP_SERV/_TEMP/_KEY are empty at runtime) —
                  restart <code>npm run dev</code> after editing <code>.env.local</code>, or add them in your host&apos;s
                  Environment Variables and redeploy.
                </p>
              )}
            </form>

            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="glow flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all bg-card border border-border"
                >
                  <Icon size={16} className="text-primary" /> {label}
                </a>
              ))}
              <div className="flex gap-3 mt-2">
                <Button asChild size="sm" className="glow">
                  <a href="https://drive.google.com/file/d/1ugC7JBKZOI9KCcHXvi2Af3Z9sLGNnN99/view" target="_blank" rel="noreferrer">
                    {t.portfolio}
                  </a>
                </Button>
                <Button asChild size="sm" variant="chip">
                  <a href="https://drive.google.com/file/d/1Y-IDqm0XzE8ZHQ5RYenzURBhgYBcxd4e/view" target="_blank" rel="noreferrer">
                    {t.resume}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
