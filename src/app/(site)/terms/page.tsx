import { site } from "@/content/site";

export const metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <section className="pt-28 lg:pt-36">
      <div className="container-x pb-24">
        <h1 className="t-h1">Terms of use</h1>
        <p className="mt-4 text-[14px] text-slate">Last updated: 12 October 2026</p>
        <div className="prose-sh mt-10">
          <p>These terms cover your use of the SalnetHub website. Client projects are governed by a separate written agreement.</p>
          <h2>Website content</h2>
          <p>
            The content on this site is for general information. Prices shown are starting prices for a typical scope. Every project receives a written quote, and that quote is what applies.
          </p>
          <h2>Examples and demos</h2>
          <p>
            Examples, sample dashboards and the chatbot demo on this site illustrate typical projects. They are not guarantees of specific results for your business.
          </p>
          <h2>Intellectual property</h2>
          <p>
            The SalnetHub name, logo and site content belong to SalnetHub. Third-party logos are trademarks of their owners and are shown only to indicate which tools we work with.
          </p>
          <h2>Links to other sites</h2>
          <p>We are not responsible for the content of external websites linked from this site.</p>
          <h2>Liability</h2>
          <p>
            We take care to keep this site accurate and available, but we cannot guarantee it will always be error-free. To the extent the law allows, we are not liable for losses arising from use of this website.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
