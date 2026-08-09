"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastState {
  type: "ok" | "err";
  message: string;
}

export default function Toast({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onClose, 4500);
    return () => clearTimeout(id);
  }, [toast, onClose]);

  if (!toast || !mounted) return null;
  const ok = toast.type === "ok";

  // Portal to document.body: a `transform` on any ancestor (e.g. Reveal's fade-in
  // wrapper) would otherwise turn this fixed-position toast into something
  // positioned relative to that ancestor instead of the real viewport.
  return createPortal(
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl max-w-[92vw] bg-card border",
        ok ? "border-emerald-500" : "border-destructive"
      )}
      style={{ animation: "toast-in .35s ease-out" }}
      role="status"
    >
      {ok ? <CheckCircle2 size={18} className="text-emerald-500" /> : <XCircle size={18} className="text-destructive" />}
      <span className="text-sm font-medium text-foreground">{toast.message}</span>
    </div>,
    document.body
  );
}
