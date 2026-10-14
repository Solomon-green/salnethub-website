import { Mail } from "lucide-react";
import { BookingWidget } from "@/components/booking/booking-widget";
import { ContactForm } from "@/components/contact-form";
import { booking } from "@/content/booking";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata = {
  title: "Book a Free Automation Call",
  description: "Book a free 20-minute call with SalnetHub. We look at how the work happens today and tell you plainly what we would automate first.",
  alternates: { canonical: "/contact" },
};

const next = [
  { title: "Pick a time that suits you", body: `A free ${booking.durationMinutes}-minute video call. Times show in your own timezone.` },
  { title: "We look at your workflow", body: "Your tools and process, and the first workflow worth automating." },
  { title: "A written scope", body: "If it is a fit, you get a fixed price and timeline in writing. No obligation." },
];

export default function ContactPage() {
  return (
    <>
      <section className="hero-dark on-dark relative overflow-hidden pt-28 lg:pt-36">
        <div aria-hidden className="iso-grid-dark iso-fade pointer-events-none absolute inset-0" />
        <div className="container-x relative grid gap-16 pb-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:pb-32">
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

            <a href={`mailto:${site.email}`} className="mt-10 inline-flex items-center gap-3 text-[16px] font-bold">
              <Mail size={18} strokeWidth={1.5} /> {site.email}
            </a>
          </div>

          <div id="book" className="scroll-mt-28 border border-white/10 bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-10">
            <h2 className="t-h2">Choose a time</h2>
            <p className="mt-2 text-[15px] text-slate">Free {booking.durationMinutes}-minute call on Google Meet.</p>
            <div className="mt-8">
              <BookingWidget email={site.email} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <h2 className="t-h1">Prefer to write first?</h2>
            <p className="t-lead mt-5 max-w-md">Send a few lines about the work. We reply within 1 business day.</p>
          </div>
          <div className="border border-line bg-paper p-6 md:p-10">
            <ContactForm services={services.map((s) => s.name)} email={site.email} />
          </div>
        </div>
      </section>
    </>
  );
}
