# SalnetHub SEO plan

Source: Jono Catliff, "Claude Code SEO: How I Got 50,000 Clicks Per Month" (Apr 2026), filtered for a remote, global B2B automation agency.
Decisions (2026-10-26): buy a .com first · global/remote market · free keyword tools only · voice from site copy + Upwork contracts.

## Principles
- Two tactics: **service pages** for buying ("money") keywords + **blog posts** for informational keywords. Blogs build topical authority that lifts the service pages.
- Win the right keywords: low difficulty, real volume, matching intent. Never guess keywords with AI alone.
- Every page answers the query better than the current top 3, in our own voice with real numbers and stories.
- Quality over volume: every post is reviewed by Solomon before publishing; publish at a steady, gradual pace.
- Only clean links. No PBNs, link farms or unlabelled paid links.

## Phase 0: Foundations (Solomon) ✅ done 2026-11-01
Result: www.salnethub.com live (apex 308 → www); Search Console Domain property verified, sitemap Success (18 URLs); GA4 G-NPEM0EF4ZV on production with `generate_lead` events (contact form, booked call).

1. Buy the .com (e.g. salnethub.com) and connect it in Vercel → Settings → Domains. Set `NEXT_PUBLIC_SITE_URL` to the new URL. Consider moving the email to the .com too.
2. Google Search Console: add a **Domain property** and verify through DNS. Submit `/sitemap.xml`.
3. Google Analytics 4: create a property and give Claude the Measurement ID to install.
4. Google Business Profile: skipped for now (remote/global market). Revisit if there is a public business address.

## Phase 1: Technical pass (Claude) ✅ done 2026-10-26
Result: titles 50–60 / descriptions 140–160 on all indexable pages; BreadcrumbList + WebSite JSON-LD added (`src/lib/schema.tsx`); `on-page-seo.md` saved. Lighthouse (local, mobile): Accessibility 100, SEO 100, Best Practices 96–100, Performance ~89–95 home, 90–93 inner pages. Unused GSAP plugins removed from the shared bundle, chat widget loads when idle, unused italic font dropped. Remaining for the blog phase: Article + Person schema, author bio, dates.

- Save the 15-category on-page checklist as `on-page-seo.md`; every page-generation step reads it first.
- Add JSON-LD the site lacks: BreadcrumbList (all pages), Article + Person (blog), keep Organization/ProfessionalService, Service, FAQPage.
- Author byline + bio page, published / last-updated dates.
- Audit every page's title (50–60 chars), description (150–160), single H1 with the keyword, slugs, alt text, internal links.
- Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO for every template (home, service, blog post, stories). Real-user Core Web Vitals in Search Console are the true target.

## Phase 2: Keyword research (free tools)
Tools: Google Keyword Planner (volumes), Ahrefs free keyword generator / Ubersuggest free searches (difficulty), Google autocomplete + People Also Ask + AlsoAsked (questions), Google Trends, competitor sites' service pages, and Search Console queries once data arrives.
Filters: difficulty ≤ 30 · volume ≥ 30/month (B2B niche) · correct intent · not another company's brand.
Output: `keywords.csv` (informational → blog) and `service-keywords.csv` (commercial → service/industry pages), each row with keyword, volume, difficulty, intent, target page, status (unused/used).

## Phase 3: Service pages
- Re-target the 9 existing service pages at real money keywords (title, H1, first 100 words, FAQ from People Also Ask).
- Build **service × industry** pages (not cities): e.g. "CRM automation for dental clinics", "AI chatbot for real estate agencies". Only where real search demand exists and each page has genuinely distinct content. Tens of pages, not hundreds.
- One proven conversion layout reused across service pages; test variations once traffic arrives.

## Phase 4: Blog (infrastructure ✅ 2026-11-01, d4c6a9b)
Done: Keystatic "Blog posts" collection, `/blog` index (noindex while empty), `/blog/[slug]` template with BlogPosting+Person, FAQPage, BreadcrumbList JSON-LD, author box (`src/content/authors.ts`), dates, reading time, TOC from ##/###, related services. Blog appears in nav/footer/sitemap only once a real post is published. Remaining: voice files, `/blog` Claude skill, first posts.

- Build `/blog` index + post template (Article schema, author, dates, table of contents, FAQ, related services).
- Voice files in `references/`: voice, opinions, stats (from the 53 Upwork contracts), stories, humour (light, professional).
- Per post: one primary keyword + 4–5 cluster keywords; study the top 3 results (format, length within 20%, headings, topics); direct answer first; 3–5 internal links (incl. a service page) and 2–3 authoritative external links; images (real screenshots preferred, Pexels otherwise).
- Package as a `/blog` Claude skill that picks an unused keyword, writes a draft for review, and marks the keyword used.
- Cadence: start 1 post/week, grow to 2–3/week. Request indexing in Search Console for each new post.

## Phase 5: Off-page (slow, clean)
- Broken-link replacement, guest posts ("automation" + "write for us"), answering journalist requests (HARO-style platforms such as Qwoted / Featured), real directories and partner pages.
- Upwork/LinkedIn/YouTube profiles linking to the site.
- Never: PBNs, link farms, bulk cheap backlinks, unlabelled paid links.

## Phase 6: Measure and iterate (monthly)
- Search Console: queries in positions 5–20 → improve those pages first; pages with impressions but low CTR → rewrite title/description.
- GA4: which pages turn visitors into booked calls.
