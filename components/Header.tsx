"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { useSite } from "./SiteContext";
import { Button } from "@/components/ui/button";
import type { Locale, Theme } from "@/lib/types";

const LOCALE_SHORT: Record<Locale, string> = { fa: "فا", en: "EN" };
const LOCALES: Locale[] = ["fa", "en"];

const THEMES: { code: Theme; icon: typeof Sun; label: string }[] = [
  { code: "light", icon: Sun, label: "light theme" },
  { code: "dark", icon: Moon, label: "dark theme" },
  { code: "retro", icon: Sparkles, label: "retro theme" },
];

// Language and theme now share the exact same visual treatment: a row of
// always-visible small buttons in one bordered pill, so every option is
// visible at a glance for both.
function PreferencesSwitcher() {
  const { locale, setLocale, theme, setTheme } = useSite();

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
        {LOCALES.map((code) => (
          <Button
            key={code}
            size="sm"
            variant={locale === code ? "default" : "ghost"}
            className="h-6 px-2.5 rounded-full text-[11px] font-semibold"
            onClick={() => setLocale(code)}
          >
            {LOCALE_SHORT[code]}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
        {THEMES.map(({ code, icon: Icon, label }) => (
          <Button
            key={code}
            size="icon"
            variant={theme === code ? "default" : "ghost"}
            className="h-6 w-6 rounded-full transition-transform hover:scale-110 active:scale-90"
            aria-label={label}
            onClick={() => setTheme(code)}
          >
            <Icon size={12} />
          </Button>
        ))}
      </div>
    </div>
  );
}

// Two-letter monogram (F + G) — one circle, both letters slightly offset so
// they read as a single designed mark rather than two stacked badges.
function Logo() {
  return (
    <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary shrink-0 shadow-sm transition-transform group-hover:-translate-y-0.5">
      <span className="relative text-primary-foreground font-extrabold text-[13px] tracking-tighter">
        <span className="relative">F</span>
        <span className="relative -ml-[3px]">G</span>
      </span>
    </span>
  );
}

export default function Header() {
  const { t } = useSite();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/works", label: t.nav.work },
    { href: "/services", label: t.nav.services },
    { href: "/resume", label: t.nav.resume },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-all"
      style={{
        background: scrolled ? "var(--card)" : "transparent",
        boxShadow: scrolled ? "0 1px 0 var(--border)" : "none",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-6 py-4">
        {/* Logo: two-letter monogram + name — no boxed background, kept light */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <Logo />
          <span className="hidden sm:block text-sm font-extrabold">{t.name}</span>
        </Link>

        {/* Nav: plain text links, active one underlined — no filled pill container */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href === "/" && pathname === "/");
            return (
              <Link key={item.href} href={item.href} className="relative py-1 text-xs font-semibold transition-colors" style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}>
                {item.label}
                <span
                  className="absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-primary transition-all duration-300"
                  style={{ width: active ? "100%" : "0%" }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <PreferencesSwitcher />
          <Button
            size="icon"
            variant="outline"
            className="rounded-full md:hidden"
            aria-label="menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={16} className="text-primary" /> : <Menu size={16} className="text-primary" />}
          </Button>
        </div>
      </div>

      <div
        className="md:hidden grid transition-all duration-300 ease-in-out border-t border-border bg-background"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-2 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium pt-3 text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
