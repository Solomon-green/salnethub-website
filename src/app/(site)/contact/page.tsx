import { CalendarDays, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata = {
  title: "Book a Free Automation Call",
  description: "Book a free 20-minute call with SalnetHub. We look at how the work happens today and tell you plainly what we would automate first.",
  alternates: { canonical: "/contact" },
};

const next = [
  { title: "We reply within 1 business day", body: "Usually with two or three questions and a few times for a call." },
  { title: "A 20-minute call", body: "We look at your tools and process and find the first workflow worth automating." },
  { title: "A written scope", body: "If it is a fit, you get a fixed price and timeline in writing. No obligation." },
];

export default function ContactPage() {
  return (
    <section className="hero-dark on-dark relative overflow-hidden pt-28 lg:pt-36">
      <div aria-hidden className="iso-grid-dark iso-fade pointer-events-none absolute inset-0" />
      <div className="container-x relative grid gap-16 pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pb-32">
        <div>
          <h1 className="t-hero">Book a call</h1>
          <p className="mt-6 max-w-lg text-[clamp(1.075rem,1.4vw,1.25rem)] leading-relaxed text-on-ink-muted">
            Tell us what takes up your team&apos;s time. We will tell you plainly what we would automate first, and what it would cost.
          </p>

          <ol className="mt-12 border-t border-white/20">
            {next.map((n, i) => (
              <li key={n.title} className="flex gap-5 border-b border-white/12 py-6">
                <span className="text-[14px] font-bold text-mint">{i + 1}</span>
                <span>
                  <span className="block text-[17px] font-bold">{n.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-on-ink-muted">{n.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-4">
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light w-fit">
                <CalendarDays size={18} /> Pick a time in the calendar
              </a>
            )}
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-[16px] font-bold">
              <Mail size={18} strokeWidth={1.5} /> {site.email}
            </a>
          </div>
        </div>

        <div className="border border-white/10 bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-10">
          <h2 className="t-h2">Tell us about your workflow</h2>
          <p className="mt-2 text-[15px] text-slate">Fields marked * are required.</p>
          <div className="mt-8">
            <ContactForm services={services.map((s) => s.name)} email={site.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
