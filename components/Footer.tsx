"use client";

import { useSite } from "./SiteContext";

export default function Footer() {
  const { t } = useSite();
  return (
    <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-border text-muted-foreground flex flex-wrap justify-between text-xs gap-2">
      <span>© {new Date().getFullYear()} Fateme Ghafari — {t.footer}</span>
      <span>{t.made}</span>
    </footer>
  );
}
