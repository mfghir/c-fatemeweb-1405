"use client";

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useSite } from "./SiteContext";
import Toast, { type ToastState } from "./Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// EmailJS — same env var names the user already uses in her project.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_APP_SERV;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_APP_TEMP;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_APP_KEY;

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "ok" | "err";

// Self-contained contact form: state, validation, EmailJS submission, and its
// own toast notification. Reused as-is on both the home page and /contact.
export default function ContactForm() {
  const { t } = useSite();
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<ToastState | null>(null);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = t.formErrRequired;
    if (!values.email.trim()) next.email = t.formErrRequired;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = t.formErrEmail;
    if (!values.message.trim()) next.message = t.formErrRequired;
    return next;
  }

  function updateField(field: keyof FormState, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (errors[field]) setErrors(validate(next));
  }

  const emailjsConfigured = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    console.log("[contact form] submit clicked"); // if this never logs, the click handler itself isn't firing — a build/deploy issue, not EmailJS
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      console.log("[contact form] blocked by validation:", fieldErrors);
      return;
    }

    if (!emailjsConfigured) {
      console.error(
        "[contact form] EmailJS is not configured: NEXT_PUBLIC_APP_SERV / NEXT_PUBLIC_APP_TEMP / NEXT_PUBLIC_APP_KEY " +
          "are missing at runtime. Next.js only reads these at build time — restart `npm run dev` after adding/editing " +
          ".env.local, and if this is deployed, add the same three variables in your host's Environment Variables settings " +
          "and redeploy (a zip you already had before those variables existed will not have them)."
      );
      setStatus("err");
      setToast({ type: "err", message: t.formErr });
      return;
    }

    setStatus("sending");
    try {
      // Sent under several common key names AND folded into the message body itself —
      // if your EmailJS template only has {{message}} wired up (not {{from_name}} /
      // {{from_email}}), the sender's name/email will still show up because they're
      // part of the message text. For the name/email to appear in their own template
      // fields, add {{from_name}} and {{from_email}} placeholders in your EmailJS
      // template's content (see README).
      const res = await emailjs.send(
        EMAILJS_SERVICE_ID as string,
        EMAILJS_TEMPLATE_ID as string,
        {
          from_name: form.name,
          from_email: form.email,
          name: form.name,
          email: form.email,
          user_name: form.name,
          user_email: form.email,
          reply_to: form.email,
          message: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY as string }
      );
      console.log("[contact form] EmailJS success:", res?.status, res?.text);
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setToast({ type: "ok", message: t.formOk });
    } catch (err: any) {
      // EmailJS throws with { status, text } — text usually explains exactly why
      // (bad service/template id, or the page's origin not on the account's
      // allowed-origins list in the EmailJS dashboard). Check the console.
      console.error("[contact form] EmailJS send failed:", err?.status, err?.text || err);
      setStatus("err");
      setToast({ type: "err", message: t.formErr });
    } finally {
      setStatus((s) => (s === "sending" ? "idle" : s));
    }
  }

  return (
    <>
      <form onSubmit={submitForm} noValidate className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder={t.formName}
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="text-xs mt-1 text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Input
            type="email"
            placeholder={t.formEmail}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="text-xs mt-1 text-destructive">{errors.email}</p>}
        </div>
        <div>
          <Textarea
            placeholder={t.formMsg}
            rows={4}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <p className="text-xs mt-1 text-destructive">{errors.message}</p>}
        </div>

        <Button type="submit" disabled={status === "sending"} className="glow">
          {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === "sending" ? t.formSending : t.formSend}
        </Button>

        {!emailjsConfigured && (
          <p className="text-xs text-destructive">
            ⚠ EmailJS env vars aren&apos;t loaded (NEXT_PUBLIC_APP_SERV/_TEMP/_KEY are empty at runtime) —
            restart <code>npm run dev</code> after editing <code>.env.local</code>, or add them in your host&apos;s
            Environment Variables and redeploy.
          </p>
        )}
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
