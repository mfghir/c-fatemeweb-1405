import type { CSSProperties, ReactNode } from "react";

// Editorial bracket-numbered section tag — e.g. "／01 — About"
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs font-bold shrink-0 text-primary">／{index}</span>
      <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

// Decorative ten-point star, shown only in the retro theme.
export function Starburst({
  color,
  size = 72,
  className = "",
  style = {},
}: {
  color: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none -z-10 ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        ...style,
      }}
    />
  );
}
