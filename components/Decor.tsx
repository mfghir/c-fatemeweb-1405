import type { ReactNode } from "react";

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
