"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { useSite } from "./SiteContext";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { Locale, Theme } from "@/lib/types";

const LOCALE_LABEL: Record<Locale, string> = { fa: "فارسی", en: "English", ko: "한국어" };
const LOCALE_SHORT: Record<Locale, string> = { fa: "فا", en: "EN", ko: "한" };
const LOCALES: Locale[] = ["fa", "en", "ko"];

const THEMES: Theme[] = ["light", "dark", "retro"];
const THEME_ICON: Record<Theme, typeof Sun> = { light: Sun, dark: Moon, retro: Sparkles };

// Language as a proper dropdown (one compact control, opens on demand) + a single
// borderless icon button that cycles the theme — no walls of always-visible buttons.
function PreferencesSwitcher() {
  const { locale, setLocale, theme, setTheme } = useSite();
  const ThemeIcon = THEME_ICON[theme];

  return (
    <div className="flex items-center gap-1.5">
      <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
        <SelectTrigger className="h-8 w-auto gap-1.5 rounded-full border-border bg-card px-3 py-0 text-xs font-semibold">
          <SelectValue>{LOCALE_SHORT[locale]}</SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          {LOCALES.map((code) => (
            <SelectItem key={code} value={code}>
              {LOCALE_LABEL[code]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full transition-transform hover:scale-110 active:scale-90"
        onClick={() => setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length])}
        aria-label="change theme"
      >
        <ThemeIcon size={15} className="text-primary" />
      </Button>
    </div>
  );
}

// Three-letter monogram (F · G · H) as a small cluster of overlapping circles —
// a playful mark instead of a single flat badge.
function Logo() {
  const hoverMotion = ["group-hover:-translate-x-0.5 group-hover:-rotate-6", "group-hover:-translate-y-0.5", "group-hover:translate-x-0.5 group-hover:rotate-6"];
  return (
    <span className="relative flex items-center w-[52px] h-8 shrink-0">
      {["F", "G", "H"].map((letter, i) => (
        <span
          key={letter}
          className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-primary-foreground bg-primary shadow-sm transition-transform duration-300 ${hoverMotion[i]}`}
          style={{ left: i * 11, opacity: 1 - i * 0.22, zIndex: 30 - i * 10 }}
        >
          {letter}
        </span>
      ))}
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
        {/* Logo: three-letter monogram + name — no boxed background, kept light */}
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

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <PreferencesSwitcher />
          </div>
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

      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4 border-t border-border bg-background">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium pt-3 text-foreground">
              {item.label}
            </Link>
          ))}
          <div className="pt-2 sm:hidden">
            <PreferencesSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
