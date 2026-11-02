import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the SalnetHub website, book a call or read our guides. Client projects are covered by a separate written agreement.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "2 November 2026";
const Mail = () => <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    body: (
      <>
        <p>
          The website at <Link href="/">www.salnethub.com</Link> (the &ldquo;<strong>Site</strong>&rdquo;) is owned and operated by SalnetHub of Kampala, Uganda (&ldquo;<strong>SalnetHub</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;). These Terms of Use (&ldquo;<strong>Terms</strong>&rdquo;) apply when you browse the Site, read our guides, use the contact form or book a call.
        </p>
        <p>
          By using the Site you agree to these Terms. If you use it for a business, you agree for that business and confirm you are authorised to do so. You must be at least 18. If you don&apos;t agree, please don&apos;t use the Site.
        </p>
      </>
    ),
  },
  {
    id: "our-services",
    title: "Our services and quotes",
    body: (
      <>
        <p>The Site describes the automation, AI and web services we offer. Using the Site does not make you a client and does not oblige either of us to work together.</p>
        <ul>
          <li>
            <strong>Client work has its own agreement.</strong> Every project is governed by a written proposal, statement of work or services agreement, or by the contract terms of the marketplace where you hired us (such as Upwork). If those terms conflict with these Terms, the project agreement wins.
          </li>
          <li>
            <strong>Prices are starting points.</strong> Prices on the <Link href="/engagements">Pricing</Link> page reflect a typical scope. Your written quote is the price that applies.
          </li>
          <li>
            <strong>We may decline work.</strong> We may decline a project we don&apos;t think we can deliver well, or that would break the law or a platform&apos;s rules.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "booking-calls",
    title: "Booking a call",
    body: (
      <>
        <p>
          Calls are free and come with no obligation. When you book, we create a Google Calendar invitation with a video-call link and send confirmations to the email you give us. Please give accurate details and use the invitation to reschedule or cancel. We may occasionally need to move a call and will tell you as early as we can.
        </p>
        <p>We use what you tell us on a call only to understand your needs and prepare a proposal. If you need a non-disclosure agreement before sharing details, ask and we&apos;ll sign one.</p>
      </>
    ),
  },
  {
    id: "using-the-site",
    title: "Using the Site",
    body: (
      <>
        <p>We give you a limited, non-exclusive, revocable permission to use the Site to learn about us and our services. You agree not to:</p>
        <ul>
          <li>send spam, automated or false submissions through our forms or booking calendar;</li>
          <li>scrape, copy or republish the Site&apos;s content in bulk, or use it to train AI models, without our written permission;</li>
          <li>probe, scan or test the Site&apos;s security, or interfere with how it works;</li>
          <li>upload or send malicious code;</li>
          <li>impersonate anyone, or use the Site for anything unlawful.</li>
        </ul>
        <p>We may change, suspend or remove any part of the Site at any time, and may block access for anyone who breaks these Terms.</p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The SalnetHub name, logo, design, text, guides, graphics and code on the Site belong to SalnetHub or its licensors. You may share links and quote short extracts with credit and a link back to the source page. Any other use needs our written permission.
        </p>
        <p>
          <strong>Third-party trademarks.</strong> Tool names and logos, such as those on our <Link href="/integrations">Integrations</Link> page, belong to their owners. We show them only to identify the software we work with. Showing them doesn&apos;t mean the owners endorse us or are partners of ours, unless we say so.
        </p>
        <p>
          <strong>Feedback.</strong> If you send us ideas or suggestions about the Site, we may use them freely and without owing you anything. Ownership of anything we build for clients is set by the project agreement, not by these Terms.
        </p>
      </>
    ),
  },
  {
    id: "information-on-the-site",
    title: "Guides, demos and examples",
    body: (
      <>
        <p>
          Our blog posts, guides, sample dashboards, customer stories and the chat demo are general information to help you understand automation. They are not legal, tax, financial or other professional advice, and they are not a promise of a particular result. Time savings and outcomes vary from business to business.
        </p>
        <p>
          The chat assistant on the Site is a demonstration with pre-written replies. Treat what it says as an illustration, not as a quote or commitment.
        </p>
      </>
    ),
  },
  {
    id: "privacy-and-cookies",
    title: "Privacy and cookies",
    body: (
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we handle personal information and the cookies we use, and forms part of these Terms. Optional analytics cookies only run with your consent, which you can change at any time through the &ldquo;Cookie settings&rdquo; link in the footer.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services and links",
    body: (
      <p>
        The Site links to and works with services run by others, including Google Calendar, Google Meet and the software we write about. We don&apos;t control them and aren&apos;t responsible for their content, availability or practices. Their own terms and privacy policies apply when you use them.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p>
        We work hard to keep the Site accurate, secure and available, but it is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent the law allows, we make no warranties of any kind, express or implied, including that the Site will be uninterrupted, error-free or free of harmful code, or that its content is complete or current.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>To the extent the law allows:</p>
        <ul>
          <li>we are not liable for indirect or consequential losses, lost profits, lost revenue or lost data arising from your use of, or inability to use, the Site;</li>
          <li>our total liability for any claim arising from the Site or these Terms is limited to USD 100.</li>
        </ul>
        <p>
          Nothing in these Terms limits liability that cannot be limited by law, such as for fraud, or for death or personal injury caused by negligence. It also doesn&apos;t affect any rights you have as a consumer that the law says cannot be waived. Liability for client work is set by the project agreement.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Your responsibility",
    body: <p>If you misuse the Site or break these Terms and a claim is brought against us as a result, you agree to cover the reasonable losses and costs (including legal fees) we incur because of it.</p>,
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    body: (
      <>
        <p>
          These Terms are governed by the laws of the Republic of Uganda. If a dispute arises, please email <Mail /> first. We&apos;ll try in good faith to resolve it with you within 30 days. If we can&apos;t, the courts of Uganda will have jurisdiction, unless we both agree in writing to mediation or to arbitration under Uganda&apos;s Arbitration and Conciliation Act.
        </p>
        <p>If you are a consumer living in another country, you keep the protection of the mandatory laws of that country and may bring a claim in your local courts where that law allows.</p>
      </>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <ul>
        <li>
          <strong>Changes.</strong> We may update these Terms and will change the date at the top. Using the Site after an update means you accept the new Terms.
        </li>
        <li>
          <strong>Electronic communications.</strong> You agree that emails and notices on the Site satisfy any requirement for written notice.
        </li>
        <li>
          <strong>Accessibility.</strong> We aim to meet WCAG 2.1 level AA. If anything on the Site is hard to use, email <Mail /> and we&apos;ll fix it or give you the information another way.
        </li>
        <li>
          <strong>Entire agreement.</strong> These Terms and the Privacy Policy are the whole agreement about your use of the Site. If a provision can&apos;t be enforced, the rest still applies. If we don&apos;t enforce a right straight away, we haven&apos;t waived it.
        </li>
        <li>
          <strong>Transfer.</strong> You may not transfer your rights under these Terms. We may transfer ours as part of a reorganisation or sale of our business.
        </li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        <strong>SalnetHub</strong>
        <br />
        Kampala, Uganda
        <br />
        Email: <Mail />
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      label="Terms of Use"
      title="Terms of Use"
      sub="The ground rules for using our website, reading our guides and booking a call. Client projects are covered by their own written agreement."
      updated={UPDATED}
      glance={[
        { title: "Calls are free", text: "Booking a call doesn't commit you to anything." },
        { title: "Every project is in writing", text: "Client work runs on its own proposal or agreement, which takes priority over these terms." },
        { title: "Guides aren't advice", text: "Our articles and demos explain automation. Your results depend on your business." },
        { title: "Uganda law, fair terms", text: "Talk to us first. Consumers keep the protections of their home country's law." },
      ]}
      sections={sections}
    />
  );
}
