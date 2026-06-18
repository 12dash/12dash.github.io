# Soham Dandapath — Portfolio

A Next.js (App Router) personal site: a dark, quiet, editorial portfolio with
scroll-driven reveals, a generative hero backdrop, animated impact counters, and
cursor-follow spotlights. Built to deploy on Vercel.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** (configured, used alongside a bespoke CSS design system in `globals.css`)
- **Framer Motion** for animation
- Google Fonts: Newsreader (serif), Hanken Grotesk (sans), JetBrains Mono

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel (about 2 minutes)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.
4. (Optional) Add a custom domain in the project's **Settings → Domains**.

If this project lives in a subfolder of your repo, set **Root Directory** to
that subfolder in Vercel's project settings.

> After deploying, update `site.url` in `src/lib/data.ts` to your real domain so
> the canonical URL, Open Graph, and Twitter link previews point to the right
> place.

## Editing

Almost all content lives in **`src/lib/data.ts`** — name, role, the "Now" note,
stats, jobs, projects, skills, and education. Edit that file and the site
updates everywhere.

```
src/
  app/
    layout.tsx     # <head>, fonts, SEO metadata, JSON-LD structured data
    page.tsx       # section layout / composition
    globals.css    # design system (colors, type, components, responsive)
  components/
    Sidebar.tsx       # sticky sidebar + scroll-spy nav
    Hero.tsx          # word-by-word intro reveal
    HeroCanvas.tsx    # generative "attention graph" backdrop (canvas)
    Counter.tsx       # animated count-up for impact stats
    Reveal.tsx        # scroll-into-view fade/slide wrapper
    Spotlight.tsx     # cursor-follow glow on cards
    ScrollProgress.tsx# top scroll-progress bar
    FooterYear.tsx    # current year
  lib/
    data.ts        # ← all editable content
public/
  og.png           # social share image
```

To add a project, add an entry to the `projects` array in `src/lib/data.ts`.
To add a skill group, edit `skills`. Same pattern for `jobs` and `education`.

## Notes

- Every animation respects `prefers-reduced-motion` (reduced motion → static).
- Dark theme, fully responsive, WCAG-AA contrast.
- The hero canvas caps node count and devicePixelRatio for performance.
