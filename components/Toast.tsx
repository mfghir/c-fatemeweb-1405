"use client";

import { useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastState {
  type: "ok" | "err";
  message: string;
}

export default function Toast({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onClose, 4500);
    return () => clearTimeout(id);
  }, [toast, onClose]);

  if (!toast) return null;
  const ok = toast.type === "ok";

  return (
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
    </div>
  );
}
