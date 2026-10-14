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

## Booking calendar

The Book a call page (`/contact#book`) shows a branded calendar of free times. It reads your Google Calendar's busy times, books the slot as an event with a Google Meet link, and emails both of you from your Gmail.

- Hours, call length, buffer, notice and timezone: `src/content/booking.ts`. Anything on your Google Calendar blocks that time automatically.
- Server code: `src/lib/booking/` and `src/app/api/booking/`.

One-time setup (about 10 minutes):

1. Go to https://console.cloud.google.com, create a project, and enable the **Google Calendar API** and **Gmail API** (APIs & Services → Library).
2. **OAuth consent screen**: External, add your app name and email, then click **Publish app** so it is *In production*. In *Testing* mode Google expires the token every 7 days and booking stops working. Google shows an "unverified app" warning when you sign in; that is fine for your own account (click Advanced → Continue).
3. **Credentials → Create credentials → OAuth client ID → Desktop app**. Copy the client ID and secret.
4. Run `node scripts/google-auth.mjs <client id> <client secret>`, open the link, sign in with the calendar's Google account and allow access. It prints the refresh token.
5. In Vercel → Settings → Environment Variables add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` and `BOOKING_OWNER_EMAIL` (that Google account's address), then redeploy.

## Environment variables (Vercel → Settings → Environment Variables)

See `.env.example`. All are optional; the site works without them.

- `NEXT_PUBLIC_SITE_URL`: the live domain, used for SEO tags and the sitemap.
- `WEB3FORMS_ACCESS_KEY`: free key from https://web3forms.com so the contact form emails you. Without it, the form falls back to opening the visitor's email app.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `BOOKING_OWNER_EMAIL`: power the Book a call calendar (below). Without them the calendar shows an "offline" note and points people to the contact form.

## Deploying on Vercel

Import this repo at https://vercel.com/new. Framework preset: Next.js. No other settings are needed.

## Fonts and licences

- Brand typeface is Helvetica. Windows visitors get **TeX Gyre Heros**, a free Helvetica clone (GUST Font License), self-hosted in `src/app/fonts/`.
- Tool logos come from Simple Icons (CC0) and are trademarks of their owners.
- GSAP and all its plugins are free for commercial use.
