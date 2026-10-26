# On-page SEO checklist

Read this before generating or editing any page (service page, industry page, blog post, story). Every item applies unless marked.
Source: Jono Catliff's 15-category checklist, adapted to this Next.js site. See `SEO-PLAN.md` for the overall plan.

## 1. Head and metadata
- Title 50–60 characters including " | SalnetHub", primary keyword near the start (`metadata.title`; the layout adds the suffix).
- Meta description 140–160 characters: keyword + benefit + soft call to action.
- Canonical URL set (`alternates.canonical`).
- Open Graph title, description, image (1200×630), url, type; Twitter `summary_large_image`.
- `lang="en"`, viewport, favicon, charset are set globally in `app/layout.tsx`.

## 2. URL
- Short slug under 60 characters, lowercase, hyphens only, primary keyword included, no stop words unless needed.
- Logical hierarchy: `/services/[slug]`, `/blog/[slug]`, `/customer-stories/[slug]`.

## 3. Headings
- Exactly one H1, containing the primary keyword.
- H2 → H3 in order, never skipping levels. H2s use cluster keywords and real questions.
- No keyword stuffing; write naturally.

## 4. Copy and body
- Primary keyword in the first 100 words; the direct answer in the first paragraph.
- Length within 20% of the top-3 ranking pages' average.
- Short paragraphs (1–4 sentences), 8th–10th grade reading level, active voice.
- Bold key phrases sparingly; bullets and numbered lists where they help.
- Voice: plain, specific, confident (see `references/` voice files once created). Real numbers and client stories beat adjectives.

## 5. FAQ (blog posts and service pages)
- 4–8 real questions (People Also Ask, AlsoAsked, Search Console queries), answers 2–4 sentences.
- FAQPage JSON-LD for the section.

## 6. Images
- Descriptive alt text (keyword where natural); `alt=""` only for decoration.
- Descriptive hyphenated filenames, e.g. `crm-automation-hubspot-dashboard.webp`.
- WebP/AVIF under 200 KB, width/height set (no layout shift), lazy-loaded below the fold, a featured image for sharing.
- Prefer real screenshots of our work over stock photos.

## 7. Internal links
- 3–5 internal links per page with descriptive anchor text; every blog post links to at least one service page.
- No orphan pages: every page is linked from somewhere and listed in the sitemap.

## 8. External links
- 2–3 links to authoritative, relevant sources (official docs, .gov/.edu, major industry sites). `rel="noopener"` for new tabs; `rel="sponsored"` for anything paid.

## 9. Structured data (JSON-LD via `src/lib/schema.tsx`)
- Sitewide: Organization/ProfessionalService + WebSite (in `app/(site)/layout.tsx`).
- BreadcrumbList on every inner page.
- Service + Offer on service pages; FAQPage wherever an FAQ exists.
- Article + Person (author) on blog posts.

## 10. Trust (E-E-A-T)
- Author byline and bio on blog posts, linking to the author/about page.
- Published and "last updated" dates.
- Real stories, numbers and opinions; cite sources. About and contact pages kept complete.

## 11. Accessibility
- Semantic HTML (header, nav, main, article, footer), labelled controls, AA contrast (4.5:1 body text), visible focus, descriptive link text, skip link.

## 12. Mobile
- Responsive, touch targets ≥ 48px, body text ≥ 16px, no horizontal scroll, no intrusive pop-ups.

## 13. Social preview
- OG image 1200×630 under 1 MB; compelling `og:description`.

## 14. Conversion (service pages)
- Primary call to action above the fold, repeated through the page; trust signals (results, testimonials, prices, guarantees); what happens next.

## 15. Long-form (1,500+ words)
- Table of contents with jump links to each H2; back-to-top link.

## Technical (sitewide, already in place)
- Static generation (SSG) for every marketing page.
- `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`).
- Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO for every page type.
