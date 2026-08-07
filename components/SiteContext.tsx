"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { COPY, FONT_STACK } from "./copy";
import type { Locale, Theme, Copy } from "@/lib/types";

interface SiteContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: Copy;
  isDark: boolean;
  isRetro: boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fa");
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const l = window.localStorage.getItem("fg-locale") as Locale | null;
      const th = window.localStorage.getItem("fg-theme") as Theme | null;
      if (l) setLocale(l);
      if (th) setTheme(th);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem("fg-locale", locale);
      window.localStorage.setItem("fg-theme", theme);
    } catch {
      /* ignore */
    }
  }, [locale, theme, ready]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700;900&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const t = COPY[locale];
  const isDark = theme === "dark";
  const isRetro = theme === "retro";
  const themeClass = theme === "dark" ? "dark" : theme === "retro" ? "retro" : "";

  return (
    <SiteContext.Provider value={{ locale, setLocale, theme, setTheme, t, isDark, isRetro }}>
      <div
        dir={t.dir}
        style={{ fontFamily: FONT_STACK[locale], minHeight: "100vh" }}
        className={`w-full relative bg-background text-foreground transition-colors duration-300 ${themeClass}`}
      >
        <div
          className="pointer-events-none fixed inset-0 -z-30"
          style={{
            opacity: isDark ? 0.05 : isRetro ? 0.09 : 0.025,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {isRetro && (
          <div
            className="pointer-events-none fixed inset-0 -z-30 opacity-[0.06]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)" }}
          />
        )}
        {children}
      </div>
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
