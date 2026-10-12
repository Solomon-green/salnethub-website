import { site } from "@/content/site";

export const metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <section className="pt-28 lg:pt-36">
      <div className="container-x pb-24">
        <h1 className="t-h1">Privacy policy</h1>
        <p className="mt-4 text-[14px] text-slate">Last updated: 12 October 2026</p>
        <div className="prose-sh mt-10">
          <p>
            This policy explains what information SalnetHub collects through this website and how we use it. If you have a question, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>Details you send us through the contact form or by email, such as your name, work email, company and message.</li>
            <li>Basic, anonymous usage data, such as pages visited and device type, if analytics are enabled.</li>
          </ul>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and, if you become a client, to deliver our services.</li>
            <li>To improve this website.</li>
          </ul>
          <p>We do not sell your information, and we do not use it for advertising.</p>
          <h2>Client data</h2>
          <p>
            When we build automations or AI systems, client data stays in the client&apos;s own accounts wherever possible. We access only what a project needs, and we remove access when asked. AI providers are used under business terms that exclude your data from model training.
          </p>
          <h2>Service providers</h2>
          <p>
            We use trusted providers to run this website and deliver form submissions, such as our hosting provider and form delivery service. They process data only to provide their service to us.
          </p>
          <h2>How long we keep it</h2>
          <p>We keep enquiry details for up to 24 months, or longer if you become a client and the law requires it.</p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the personal information we hold about you. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days.
          </p>
          <h2>Changes</h2>
          <p>If we change this policy, we will update the date at the top of this page.</p>
        </div>
      </div>
    </section>
  );
}
