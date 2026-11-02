import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand, PageHero } from "@/components/ui";
import { categoryLabels, formatDate, getPosts } from "@/lib/blog";
import { JsonLd, breadcrumbLd } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPosts();
  return {
    title: "Business Automation Blog: Guides for Small Teams",
    description:
      "Practical guides on business automation, CRM workflows, AI agents and reporting for small businesses, from the team that builds them every week.",
    alternates: { canonical: "/blog" },
    // An empty index has nothing worth indexing yet.
    robots: posts.length ? undefined : { index: false },
  };
}

export default async function BlogIndex() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Blog", path: "/blog" }])} />
      <PageHero
        title="Automation, explained by the people who build it"
        sub="Practical guides on automating sales, admin and reporting for small teams. Real numbers from real client projects, no fluff."
      />

      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-x">
          {!lead ? (
            <p className="max-w-xl text-[17px] text-slate">The first guides are on their way. In the meantime, book a call and ask us anything.</p>
          ) : (
            <>
              <PostCard post={lead} featured />
              {rest.length > 0 && (
                <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBand title="Rather have it built" accent="for you?" />
    </>
  );
}

type Post = Awaited<ReturnType<typeof getPosts>>[number];

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`bento group flex h-full flex-col ${featured ? "lg:grid lg:grid-cols-[1.15fr_1fr]" : ""}`}
    >
      <div className={`relative overflow-hidden bg-raised ${featured ? "aspect-[16/9] lg:aspect-auto lg:min-h-[340px]" : "aspect-[16/9]"}`}>
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt || post.title}
            fill
            sizes={featured ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="screen absolute inset-0 !rounded-none" />
        )}
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "p-8 lg:p-10" : "p-6"}`}>
        <p className="t-label text-accent">{categoryLabels[post.category]}</p>
        <h2 className={`mt-3 font-[family-name:var(--font-display)] font-semibold leading-tight tracking-tight ${featured ? "text-[clamp(1.6rem,2.6vw,2.2rem)]" : "text-[20px]"}`}>
          {post.title}
        </h2>
        <p className={`mt-3 leading-relaxed text-slate ${featured ? "text-[16px]" : "line-clamp-3 text-[15px]"}`}>{post.description}</p>
        <p className="mt-auto flex items-center justify-between gap-4 pt-6 text-[13px] text-stone-deep">
          <span>
            {formatDate(post.publishedAt)} · {post.readingMinutes} min read
          </span>
          <ArrowUpRight size={18} className="text-slate transition-[translate,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </p>
      </div>
    </Link>
  );
}
