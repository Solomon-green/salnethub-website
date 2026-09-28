# SalnetHub

Marketing website for SalnetHub — a business process automation agency (sales process automation, marketing automation, CRM integrations, data reporting & analytics, Google Workspace automation).

## Structure

Single static page: `index.html` (no build step, no dependencies).

## Deploying on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository.
2. Framework preset: **Other** (static site) — Vercel will serve `index.html` at the root automatically. No build command or output directory needed.
3. Click **Deploy**.
4. Once deployed, go to the project's **Settings → Domains** and add the custom domain (e.g. `salnethub.xyz`), then update the domain's DNS records as Vercel instructs.

## Still to do

- Swap in real brand colors/fonts once the logo is provided (currently navy `#0B1F3A` + emerald `#0E8F65`).
- Replace the portfolio placeholders with real case studies.
- Add testimonials.
- Connect a Google Calendar appointment schedule in the Contact section (see the HTML comment above the booking box in `index.html` for the exact steps).
- Confirm the domain spelling (`salnethub.xyz`) and whether the contact email should move to a `@salnethub.xyz` address.
