import { ImageIcon } from "lucide-react";

/**
 * Reserved space for a hand-picked illustration (e.g. from unDraw, Storyset, or
 * Open Doodles). Drop your SVG/PNG into /public/illustrations/ and replace this
 * component's contents with an <img src="/illustrations/your-file.svg" ... />
 * — see the README for exact steps.
 */
export function IllustrationSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-muted-foreground/70 ${className}`}
      aria-hidden
    >
      <ImageIcon size={28} strokeWidth={1.5} />
      <span className="text-[11px] font-medium tracking-wide">{label}</span>
    </div>
  );
}
