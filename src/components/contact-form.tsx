"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CircleCheck } from "lucide-react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ services, email }: { services: string[]; email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "Please enter a valid work email.";
    if ((data.message ?? "").trim().length < 10) next.message = "A sentence or two about the work helps us prepare.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        toast.success("Thanks. We will reply within 1 business day.");
        return;
      }
      throw new Error(String(res.status));
    } catch {
      setStatus("idle");
      const body = encodeURIComponent(`${data.message}\n\n${data.name}${data.company ? `, ${data.company}` : ""}`);
      toast.error("The form could not be sent. Opening your email app instead.");
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Enquiry from the website")}&body=${body}`;
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-sage bg-mist p-8 md:p-10" role="status">
        <CircleCheck size={28} strokeWidth={1.5} className="text-mint-ink" />
        <p className="t-h2 mt-5">Message received</p>
        <p className="mt-3 text-[16px] leading-relaxed text-slate">
          Thank you. We read every enquiry and reply within 1 business day, usually with two or three questions and a time for a call.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[14px] font-bold text-mint-ink">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" error={errors.name} required />
        <Field label="Work email" name="email" type="email" autoComplete="email" error={errors.email} required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" autoComplete="organization" />
        <div className="grid gap-2">
          <label htmlFor="teamSize" className="text-[14px] font-bold">
            Team size
          </label>
          <select id="teamSize" name="teamSize" className="field-input" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {["1 to 10", "11 to 50", "51 to 200", "200+"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="interest" className="text-[14px] font-bold">
          What would you like help with?
        </label>
        <select id="interest" name="interest" className="field-input" defaultValue="">
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-[14px] font-bold">
          What takes up your team&apos;s time today?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="field-input resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
        />
        {errors.message ? (
          <p id="message-error" className="text-[13px] text-deep-copper">
            {errors.message}
          </p>
        ) : (
          <p id="message-help" className="text-[13px] text-slate">
            For example: &ldquo;We copy web leads into HubSpot by hand and reply the next day.&rdquo;
          </p>
        )}
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending" : "Send message"}
          <ArrowRight size={18} className="btn-arrow" />
        </button>
        <p className="text-[13px] text-slate">We reply within 1 business day.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-[14px] font-bold">
        {label}
        {required && <span className="text-deep-copper"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="field-input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-[13px] text-deep-copper">
          {error}
        </p>
      )}
    </div>
  );
}
