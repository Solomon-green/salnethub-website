import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SalnetHub collects, uses and protects personal information, the cookies we use, and the rights you have wherever you are.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "3 November 2026";
const Mail = () => <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          SalnetHub (&ldquo;<strong>SalnetHub</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;) is a business automation and AI agency based in Kampala, Uganda. We design and build automations, CRM workflows, AI agents and reporting systems for small businesses around the world.
        </p>
        <p>
          This Privacy Policy explains how we handle personal information collected through <Link href="/">www.salnethub.com</Link> (the &ldquo;<strong>Site</strong>&rdquo;), the calls you book with us, the emails you exchange with us and our marketing (together, the &ldquo;<strong>Service</strong>&rdquo;). For this information we are the <strong>data controller</strong>: we decide why and how it is used.
        </p>
        <p>
          <strong>Client project data is different.</strong> When we build or run a system inside a client&apos;s tools, we handle that data on the client&apos;s instructions as a <strong>processor</strong>, under our written agreement with that client. If your information reaches us that way, the client&apos;s own privacy policy applies and they are your first point of contact.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect only what we need to answer you, run calls and deliver work. Most of it comes straight from you.</p>
        <table>
          <thead>
            <tr>
              <th>Where it comes from</th>
              <th>What we collect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Contact form</td>
              <td>Name, work email, company, team size, the service you&apos;re interested in and your message.</td>
            </tr>
            <tr>
              <td>Booking a call</td>
              <td>Name, email, company, any notes you add, the time you pick and your time zone.</td>
            </tr>
            <tr>
              <td>Emails, calls and meetings</td>
              <td>Your contact details and anything you choose to share with us, including details about your business, tools and workflows.</td>
            </tr>
            <tr>
              <td>Marketplaces and social platforms</td>
              <td>If you contact or hire us through Upwork, LinkedIn or a similar platform, the profile and message details that platform shares with us.</td>
            </tr>
            <tr>
              <td>Analytics (only if you accept)</td>
              <td>Pages viewed, how you arrived, approximate location (city or country, from your IP address), device and browser type, and whether you sent an enquiry or booked a call.</td>
            </tr>
            <tr>
              <td>Your visit history (only if you accept)</td>
              <td>
                The pages you viewed on the Site, the page you arrived on, the site or campaign that sent you, how many visits you made and roughly how long you spent. This stays in your own browser and reaches us only if you send the contact form or book a call. It is then attached to your enquiry so we can prepare for the conversation.
              </td>
            </tr>
            <tr>
              <td>Hosting and security logs</td>
              <td>IP address, browser, the page requested and the time, recorded automatically by our hosting provider to keep the Site running and secure.</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>The chat on this Site is a demo.</strong> It answers with pre-written replies inside your browser. Nothing you type into it is sent to us or to an AI provider.
        </p>
        <p>
          <strong>Please don&apos;t send sensitive information</strong> (for example health, financial account, government ID, religious or biometric data) through the Site. We don&apos;t need it to scope or quote a project.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <>
        <ul>
          <li>
            <strong>To respond and to run calls:</strong> replying to enquiries, scheduling calls, sending calendar invites, confirmations and video-call links.
          </li>
          <li>
            <strong>To deliver work:</strong> preparing proposals and quotes, carrying out projects, invoicing and support if you become a client.
          </li>
          <li>
            <strong>To improve the Site:</strong> understanding which pages and guides are useful, if you accept analytics cookies.
          </li>
          <li>
            <strong>To prepare for your enquiry:</strong> if you accepted cookies and then contact us or book a call, we see which pages you read and how you found us, so the conversation can start from what matters to you. We keep these details with your enquiry in our lead records.
          </li>
          <li>
            <strong>To stay in touch:</strong> occasional relevant updates to people we have worked or spoken with. Every message has an easy opt-out, and we never buy email lists.
          </li>
          <li>
            <strong>To stay safe and lawful:</strong> preventing spam and abuse, securing our systems, keeping business records and meeting legal obligations.
          </li>
          <li>
            <strong>To create anonymous statistics:</strong> for example, how many enquiries we receive each month. We don&apos;t try to re-identify anonymous data.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> sell personal information, use it for targeted advertising, or use it to make automated decisions that have legal or similarly significant effects on you.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <>
        <p>
          We keep this short list on purpose. Optional cookies stay off until you choose &ldquo;Accept&rdquo; in our cookie banner, and you can change your mind at any time.
        </p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Type and duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>sh-cookie-consent</code>
              </td>
              <td>SalnetHub</td>
              <td>Remembers your cookie choice so we don&apos;t ask on every page.</td>
              <td>Strictly necessary. Browser storage, kept until you clear it.</td>
            </tr>
            <tr>
              <td>Chat teaser flag</td>
              <td>SalnetHub</td>
              <td>Stops the chat greeting from reappearing during your visit.</td>
              <td>Strictly necessary. Session storage, ends when you close the tab.</td>
            </tr>
            <tr>
              <td>
                <code>_ga</code>, <code>_ga_*</code>
              </td>
              <td>Google Analytics</td>
              <td>Counts visits and shows us how the Site is used.</td>
              <td>Analytics, only with your consent. Up to 2 years.</td>
            </tr>
            <tr>
              <td>
                <code>sh-journey</code>
              </td>
              <td>SalnetHub</td>
              <td>Remembers the pages you visit and how you found us, sent to us only with an enquiry or booking.</td>
              <td>Analytics, only with your consent. Browser storage, deleted after 30 days or when you decline cookies.</td>
            </tr>
          </tbody>
        </table>
        <p>
          We honour the <strong>Global Privacy Control</strong> signal. If your browser sends it, analytics cookies stay off and we don&apos;t show the banner. You can learn how Google uses data at{" "}
          <a href="https://policies.google.com/technologies/partner-sites">policies.google.com/technologies/partner-sites</a> and install Google&apos;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">opt-out browser add-on</a>.
        </p>
        <p>
          <CookieSettingsButton className="btn btn-secondary !min-h-[44px] !text-[14px] !font-bold !text-fg !no-underline">Change cookie settings</CookieSettingsButton>
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We share personal information only with the providers that run our business, and only as much as each one needs:</p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>What they do for us</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vercel</td>
              <td>Hosts the Site and keeps its server logs.</td>
            </tr>
            <tr>
              <td>Google (Workspace and Analytics)</td>
              <td>Calendar invites, Google Meet links and booking emails. Our lead records in Google Sheets and the email alerts we receive for new enquiries. Site analytics if you accept cookies.</td>
            </tr>
            <tr>
              <td>Spaceship (Spacemail)</td>
              <td>Hosts our business email, including {site.email}.</td>
            </tr>
          </tbody>
        </table>
        <p>We may also share information:</p>
        <ul>
          <li>with professional advisers such as accountants, lawyers and insurers, under a duty of confidentiality;</li>
          <li>with authorities, when the law requires it or to protect our rights, our clients or the public;</li>
          <li>with a buyer, investor or successor if SalnetHub is ever involved in a merger, financing or sale, under the same protections described here;</li>
          <li>with anyone else when you ask us to, for example a colleague you copy into a project.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ai-and-client-data",
    title: "AI and client data",
    body: (
      <>
        <p>Because we build AI and automation systems, here is how we treat the data in them:</p>
        <ul>
          <li>We never use your enquiry, call notes or project data to train AI models.</li>
          <li>Where a client project uses an AI provider such as OpenAI or Anthropic, we use business or API terms under which customer data is not used to train their models.</li>
          <li>Client data stays in the client&apos;s own accounts wherever possible. We get only the access a project needs and remove it when the work ends or when asked.</li>
          <li>Any test data we create is deleted or handed back at the end of a project.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        <table>
          <thead>
            <tr>
              <th>Information</th>
              <th>How long</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enquiries and booked calls that don&apos;t lead to work</td>
              <td>Up to 24 months after our last contact.</td>
            </tr>
            <tr>
              <td>Client records, contracts and invoices</td>
              <td>For the relationship, then as long as tax and accounting laws require.</td>
            </tr>
            <tr>
              <td>Analytics data</td>
              <td>Up to 14 months, then deleted automatically by Google.</td>
            </tr>
            <tr>
              <td>Hosting and security logs</td>
              <td>A short period set by our hosting provider, typically days to weeks.</td>
            </tr>
          </tbody>
        </table>
        <p>When we no longer need information, we delete it or make it anonymous. Copies in backups are isolated until they are overwritten.</p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <>
        <p>
          We are based in Uganda and work with clients worldwide. Our service providers store data in the United States, Europe and other countries, so your information may be processed outside the country where you live, including in places whose laws may protect it less.
        </p>
        <p>
          Where we transfer information out of Uganda, the European Economic Area or the United Kingdom, we rely on appropriate safeguards. These include our providers&apos; Standard Contractual Clauses or equivalent commitments, and transfers necessary to answer you or carry out a contract you have asked for. You can ask us for details of the safeguard that applies.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <>
        <p>
          We use encrypted connections (HTTPS) across the Site, two-factor authentication on our business accounts, least-privilege access to client systems and reputable providers with strong security programs. No system is perfectly secure, so we can&apos;t guarantee absolute security.
        </p>
        <p>If a breach affects your personal information, we will notify you and the relevant regulator where the law requires us to.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Wherever you live, you can ask us to:</p>
        <ul>
          <li>
            <strong>Access</strong> the personal information we hold about you and get a copy;
          </li>
          <li>
            <strong>Correct</strong> anything inaccurate or incomplete;
          </li>
          <li>
            <strong>Delete</strong> your information when we no longer need it;
          </li>
          <li>
            <strong>Object to</strong> or <strong>restrict</strong> how we use it;
          </li>
          <li>
            <strong>Move</strong> it to you or another provider in a machine-readable format;
          </li>
          <li>
            <strong>Withdraw consent</strong>, for example to analytics cookies, at any time;
          </li>
          <li>
            <strong>Stop marketing</strong> emails, with the unsubscribe link or by replying &ldquo;stop&rdquo;.
          </li>
        </ul>
        <p>
          To make a request, email <Mail /> with the subject &ldquo;Privacy request&rdquo;. We may ask for information to confirm your identity. We reply within 30 days, or within the shorter period your local law sets. Exercising your rights is free and will never affect how we treat you.
        </p>
        <p>
          <strong>Complaints.</strong> If you&apos;re unhappy with our answer, you can complain to a data protection regulator. In Uganda this is the{" "}
          <a href="https://pdpo.go.ug">Personal Data Protection Office</a>, which enforces the Data Protection and Privacy Act, 2019. In the UK it is the{" "}
          <a href="https://ico.org.uk">Information Commissioner&apos;s Office</a>. In the EU and EEA, see the{" "}
          <a href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_en">list of national authorities</a>. We&apos;d appreciate the chance to fix things first.
        </p>
      </>
    ),
  },
  {
    id: "european-users",
    title: "Notice to European users",
    body: (
      <>
        <p>
          This section applies to people in the European Economic Area and the United Kingdom (&ldquo;Europe&rdquo;) under the GDPR and UK GDPR. SalnetHub is the controller of the personal information described in this policy. Our contact details are in the{" "}
          <a href="#contact">Contact us</a> section.
        </p>
        <p>
          <strong>Our legal bases for processing</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Legal basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Answering enquiries, booking calls, proposals and client work</td>
              <td>Contractual necessity (steps you ask for before a contract, and performing it). Legitimate interests where you contact us for an employer.</td>
            </tr>
            <tr>
              <td>Site analytics and visit history</td>
              <td>Consent, which you can withdraw at any time in cookie settings.</td>
            </tr>
            <tr>
              <td>Occasional updates to contacts and clients</td>
              <td>Legitimate interests in promoting our services, or consent where the law requires it.</td>
            </tr>
            <tr>
              <td>Security, spam prevention and logs</td>
              <td>Legitimate interests in keeping the Site and our systems secure.</td>
            </tr>
            <tr>
              <td>Business records, tax and legal claims</td>
              <td>Compliance with law, and legitimate interests in protecting our rights.</td>
            </tr>
          </tbody>
        </table>
        <p>
          Where we rely on legitimate interests, you can object at any time, and we will stop unless we have compelling grounds that the law recognises. You also have the rights listed in <a href="#your-rights">Your rights</a>, including the right to complain to your local supervisory authority.
        </p>
      </>
    ),
  },
  {
    id: "us-residents",
    title: "Notice to U.S. residents",
    body: (
      <>
        <p>
          Residents of California and other U.S. states with privacy laws (including Colorado, Connecticut, Virginia, Texas and Oregon) may have the rights to know, access, correct and delete personal information, and to appeal a decision we make on a request. You can use the request process in <a href="#your-rights">Your rights</a>, or have an authorized agent act for you with your written permission.
        </p>
        <ul>
          <li>We do not sell personal information or share it for cross-context behavioral (targeted) advertising, and have not done so in the past 12 months.</li>
          <li>We do not knowingly collect personal information from anyone under 16.</li>
          <li>We do not intentionally collect or use sensitive personal information.</li>
          <li>We do not use personal information for profiling that has legal or similarly significant effects.</li>
          <li>We honour Global Privacy Control signals.</li>
          <li>We will not discriminate against you for exercising your rights.</li>
        </ul>
        <p>
          In the past 12 months we have collected these categories, from the sources and for the purposes above: <strong>identifiers</strong> (name, email, IP address); <strong>commercial and professional information</strong> (company, team size, project needs); and <strong>internet activity</strong> (pages viewed, visit history and device information, with consent). We disclose them only to the service providers listed in <a href="#sharing">Who we share it with</a>.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>The Site and our services are for businesses and are not intended for anyone under 18. We don&apos;t knowingly collect information from children. If you believe a child has sent us personal information, contact us and we will delete it.</p>,
  },
  {
    id: "other-sites",
    title: "Other websites",
    body: <p>The Site links to other websites and tools, such as the software we integrate with. We don&apos;t control them and aren&apos;t responsible for their privacy practices, so please read their policies.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We will update this policy when our practices change and change the date at the top of the page. If a change is significant, we will make it clear on the Site or tell clients and contacts directly before it takes effect.</p>,
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>For any privacy question or request:</p>
        <p>
          <strong>SalnetHub</strong>
          <br />
          Kampala, Uganda
          <br />
          Email: <Mail />
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy Policy"
      title="Privacy Policy"
      sub="How we collect, use and protect personal information when you visit our site, book a call or work with us. Written to be read, not skimmed past."
      updated={UPDATED}
      glance={[
        { title: "We never sell your data", text: "No data sales, no ad networks and no bought email lists." },
        { title: "Analytics only with consent", text: "Google Analytics stays off until you click Accept, and you can change your mind anytime." },
        { title: "Your data is never AI training data", text: "Enquiries and client project data are never used to train AI models." },
        { title: "Your rights, everywhere", text: "Access, correct or delete your data with one email, wherever you live." },
      ]}
      sections={sections}
    />
  );
}
