# SalnetHub website

Marketing site for SalnetHub: business automation, AI chatbots, AI agents, RAG systems and web solutions for small-to-medium teams and businesses.

Built with Next.js 16 (App Router, static generation), Tailwind CSS 4, GSAP + ScrollTrigger, Lenis and Keystatic. Everything used is free.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Where things live

| What | File |
|---|---|
| Service pages (all 9, full copy) | `src/content/services.ts` |
| Prices (every page reads from here) | `src/content/engagements.ts` |
| Integrations / tool logos | `src/content/integrations.ts` |
| Process steps and principles | `src/content/process.ts` |
| Site name, email, booking link | `src/content/site.ts` |
| Brand tokens (colours, type scale, buttons) | `src/app/globals.css` |
| Case studies (managed in Keystatic) | `content/case-studies/` + images in `public/case-studies/` |

## Adding case studies

1. Run `npm run dev` and open http://localhost:3000/keystatic.
2. Click **Case studies → Create**, fill in the form, upload a cover image, untick **Draft**, and save.
3. Commit and push. Vercel redeploys and the case study appears on `/work` (and on the home page if **Feature on the home page** is ticked).

To edit from the live site instead of your computer, connect Keystatic's GitHub mode: set `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` in Vercel and follow https://keystatic.com/docs/github-mode to create the GitHub App (it adds the `KEYSTATIC_*` env vars).

## Environment variables (Vercel → Settings → Environment Variables)

See `.env.example`. All are optional; the site works without them.

- `NEXT_PUBLIC_SITE_URL`: the live domain, used for SEO tags and the sitemap.
- `WEB3FORMS_ACCESS_KEY`: free key from https://web3forms.com so the contact form emails you. Without it, the form falls back to opening the visitor's email app.
- `NEXT_PUBLIC_BOOKING_URL`: a Google Calendar appointment schedule link, shown on the Book a call page.

## Deploying on Vercel

Import this repo at https://vercel.com/new. Framework preset: Next.js. No other settings are needed.

## Fonts and licences

- Brand typeface is Helvetica. Windows visitors get **TeX Gyre Heros**, a free Helvetica clone (GUST Font License), self-hosted in `src/app/fonts/`.
- Tool logos come from Simple Icons (CC0) and are trademarks of their owners.
- GSAP and all its plugins are free for commercial use.
