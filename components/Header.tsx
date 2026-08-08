"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { useSite } from "./SiteContext";
import { Button } from "@/components/ui/button";
import type { Locale, Theme } from "@/lib/types";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "fa", label: "فا" },
  { code: "en", label: "EN" },
  { code: "ko", label: "한" },
];

const THEMES: { code: Theme; icon: typeof Sun; label: string }[] = [
  { code: "light", icon: Sun, label: "light theme" },
  { code: "dark", icon: Moon, label: "dark theme" },
  { code: "retro", icon: Sparkles, label: "retro theme" },
];

export default function Header() {
  const { locale, setLocale, theme, setTheme, t } = useSite();
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
    { href: "/#about", label: t.nav.about },
    { href: "/works", label: t.nav.work },
    { href: "/#contact", label: t.nav.contact },
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
        {/* Logo: rounded badge + name, no more of a bare monogram */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-sm transition-transform group-hover:-translate-y-0.5">
            F
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-extrabold">{t.name}</span>
            <span className="text-[10px] font-medium tracking-wide text-muted-foreground">{t.eyebrow}</span>
          </span>
        </Link>

        {/* Nav as a single pill-shaped segmented control, echoing the lang/theme switchers */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card p-1 mx-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href === "/" && pathname === "/");
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className="block px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={active ? { background: "var(--primary)", color: "var(--primary-foreground)" } : { color: "var(--muted-foreground)" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-full hidden sm:flex items-center p-1 gap-1 border border-border bg-card">
            {LOCALES.map(({ code, label }) => (
              <Button
                key={code}
                size="sm"
                variant={locale === code ? "default" : "ghost"}
                className="h-7 px-3 rounded-full text-xs"
                onClick={() => setLocale(code)}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="rounded-full hidden sm:flex items-center p-1 gap-1 border border-border bg-card">
            {THEMES.map(({ code, icon: Icon, label }) => (
              <Button
                key={code}
                size="icon"
                variant={theme === code ? "default" : "ghost"}
                className="h-7 w-7"
                aria-label={label}
                onClick={() => setTheme(code)}
              >
                <Icon size={13} />
              </Button>
            ))}
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
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="rounded-full flex items-center p-1 gap-1 border border-border bg-card">
              {LOCALES.map(({ code, label }) => (
                <Button
                  key={code}
                  size="sm"
                  variant={locale === code ? "default" : "ghost"}
                  className="h-7 px-3 rounded-full text-xs"
                  onClick={() => setLocale(code)}
                >
                  {label}
                </Button>
              ))}
            </div>
            <div className="rounded-full flex items-center p-1 gap-1 border border-border bg-card">
              {THEMES.map(({ code, icon: Icon, label }) => (
                <Button
                  key={code}
                  size="icon"
                  variant={theme === code ? "default" : "ghost"}
                  className="h-7 w-7"
                  aria-label={label}
                  onClick={() => setTheme(code)}
                >
                  <Icon size={13} />
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
