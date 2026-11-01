import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, Faq, ServiceCard } from "@/components/ui";
import { getAuthor } from "@/content/authors";
import { services } from "@/content/services";
import { categoryLabels, formatDate, getPost, getPosts, renderPost } from "@/lib/blog";
import { JsonLd, blogPostingLd, breadcrumbLd, faqLd } from "@/lib/schema";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // A placeholder keeps the route valid for static export when no posts exist yet.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return { robots: { index: false } };
  const author = getAuthor(p.author);
  return {
    title: p.seoTitle || p.title,
    description: p.description,
    alternates: { canonical: `/blog/${slug}` },
    authors: [{ name: author.name, url: "/about" }],
    openGraph: {
      type: "article",
      title: p.seoTitle || p.title,
      description: p.description,
      url: `/blog/${slug}`,
      publishedTime: p.publishedAt ?? undefined,
      modifiedTime: p.updatedAt ?? p.publishedAt ?? undefined,
      authors: [author.name],
      ...(p.cover ? { images: [{ url: p.cover, alt: p.coverAlt || p.title }] } : {}),
    },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  const author = getAuthor(p.author);
  const { content, toc, readingMinutes } = renderPost(p.body);
  const related = p.relatedServices.map((s) => services.find((x) => x.slug === s)).filter((s) => s !== undefined);
  const faqs = p.faq.filter((f) => f.q && f.a);
  const updated = p.updatedAt && p.updatedAt !== p.publishedAt ? p.updatedAt : null;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${slug}` }]),
          blogPostingLd({ slug, title: p.title, description: p.description, image: p.cover, publishedAt: p.publishedAt, updatedAt: p.updatedAt, author, keywords: p.primaryKeyword }),
          ...(faqs.length ? [faqLd(faqs)] : []),
        ]}
      />

      <section className="hero-light relative overflow-hidden pt-28 lg:pt-36">
        <div className="container-x relative pb-14 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-[14px]">
            <ol className="flex flex-wrap items-center gap-2 text-slate">
              <li>
                <Link href="/blog" className="font-medium text-sky hover:underline">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>{categoryLabels[p.category]}</li>
            </ol>
          </nav>
          <h1 className="t-page mt-7 max-w-4xl">{p.title}</h1>
          <p className="mt-6 max-w-3xl text-[clamp(1.075rem,1.4vw,1.25rem)] leading-relaxed text-slate">{p.description}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-slate">
            <span className="flex items-center gap-3">
              <AuthorAvatar name={author.name} image={author.image} size={36} />
              <span>
                <span className="block font-bold text-fg">{author.name}</span>
                <span className="block text-[13px]">{author.role}</span>
              </span>
            </span>
            <span aria-hidden className="hidden h-8 w-px bg-line sm:block" />
            <span>
              <time dateTime={p.publishedAt ?? undefined}>{formatDate(p.publishedAt)}</time>
              {updated && (
                <>
                  {" · Updated "}
                  <time dateTime={updated}>{formatDate(updated)}</time>
                </>
              )}
              {` · ${readingMinutes} min read`}
            </span>
          </div>
        </div>
      </section>

      {p.cover && (
        <div className="container-x pt-12">
          <div className="rounded-card relative aspect-[16/9] overflow-hidden border border-line">
            <Image src={p.cover} alt={p.coverAlt || p.title} fill priority sizes="(min-width: 1320px) 1240px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {toc.length > 1 && (
              <nav aria-label="On this page" className="rounded-card border border-line bg-surface p-6">
                <p className="t-label text-slate">On this page</p>
                <ol className="mt-4 grid gap-2.5 text-[14px] leading-snug">
                  {toc.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                      <a href={`#${h.id}`} className="text-slate transition-colors hover:text-sky">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>

          <article className="min-w-0">
            <div className="prose-sh prose-post">{content}</div>

            <div className="mt-16 flex max-w-[68ch] gap-5 rounded-card border border-line bg-surface p-6 sm:p-8">
              <AuthorAvatar name={author.name} image={author.image} size={56} />
              <div>
                <p className="t-label text-slate">Written by</p>
                <p className="mt-1 text-[17px] font-bold">{author.name}</p>
                <p className="text-[14px] text-slate">{author.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{author.bio}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="border-t border-line py-20 lg:py-24">
          <div className="container-x">
            <Faq items={faqs} title="Frequently asked questions" />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line py-20 lg:py-24">
          <div className="container-x">
            <h2 className="t-h2">Want this done for you?</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <ServiceCard s={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand title="Find the first workflow" accent="worth automating" />
    </>
  );
}

function AuthorAvatar({ name, image, size }: { name: string; image?: string; size: number }) {
  if (image) {
    return <Image src={image} alt={name} width={size} height={size} className="shrink-0 rounded-full object-cover" />;
  }
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}
