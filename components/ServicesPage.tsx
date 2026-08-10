"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useSite } from "./SiteContext";
import Reveal from "./Reveal";
import { SectionLabel } from "./Decor";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const { t } = useSite();

  return (
    <Reveal>
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <SectionLabel index="01">{t.servicesEyebrow}</SectionLabel>
        <h1 style={{ fontWeight: 800 }} className="text-3xl md:text-4xl mb-3 max-w-2xl">
          {t.servicesPageTitle}
        </h1>
        <p className="text-sm text-muted-foreground mb-12 max-w-xl">{t.servicesPageSub}</p>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {t.services.map((service, i) => (
            <div key={i} className="rounded-2xl p-6 bg-card border border-border flex flex-col">
              <h2 className="text-lg font-bold mb-2">{service.title}</h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{service.desc}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="glow w-full">
                <Link href="/contact">{t.serviceCta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">{t.servicesNote}</p>
      </section>
    </Reveal>
  );
}
