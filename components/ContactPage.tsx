"use client";

import { Github, Linkedin, Instagram, Send, Dribbble } from "lucide-react";
import { useSite } from "./SiteContext";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { SectionLabel, Starburst } from "./Decor";
import { IllustrationSlot } from "./IllustrationSlot";
import { DRIBBBLE_URL } from "./copy";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mfghir", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fateme-ghafari", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/fatemeweb", Icon: Instagram },
  { label: "Telegram", href: "https://t.me/fatemeweb", Icon: Send },
  { label: "Dribbble", href: DRIBBBLE_URL, Icon: Dribbble },
];

export default function ContactPage() {
  const { t, isRetro } = useSite();

  return (
    <>
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-16 relative overflow-hidden">
          {isRetro && (
            <Starburst color="var(--retro-coral)" size={50} style={{ top: 0, left: "3%", opacity: 0.8, animation: "spin-slow 16s linear infinite reverse" }} />
          )}
          <SectionLabel index="01">{t.linksEyebrow}</SectionLabel>
          <h1 style={{ fontWeight: 800 }} className="text-3xl md:text-4xl mb-3 max-w-2xl">
            {t.linksTitle}
          </h1>
          <p className="text-sm text-muted-foreground mb-8 max-w-md">{t.linksSub}</p>

          <div className="grid md:grid-cols-[1fr_300px] gap-10">
            <ContactForm />

            <div className="flex flex-col gap-6">
              <IllustrationSlot label="Contact illustration" className="w-full aspect-square p-6" />

              <div className="flex flex-col gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group glow flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 bg-card border border-border"
                  >
                    <Icon size={16} className="text-primary transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" /> {label}
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
          </div>
        </section>
      </Reveal>

      {/* WHAT HAPPENS NEXT — keeps the page from feeling sparse below the form */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <SectionLabel index="02">{t.nextEyebrow}</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 max-w-2xl">{t.nextTitle}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {t.nextSteps.map((step, i) => (
              <div key={i} className="rounded-xl p-5 bg-card border border-border">
                <div className="text-xs font-bold mb-2 text-primary">0{i + 1}</div>
                <div className="text-sm font-bold mb-1">{step.t}</div>
                <div className="text-xs leading-relaxed text-muted-foreground">{step.d}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </>
  );
}
