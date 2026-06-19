# Soham Dandapath — Portfolio

A multi-page Next.js (App Router) personal site: a dark, quiet, editorial
portfolio with project case studies, a writing section, a ⌘K command palette,
a light/dark toggle, cross-page transitions, and a generative hero backdrop.
Built to deploy on Vercel.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Framer Motion** — reveals, hero, page transitions
- **react-markdown** + **remark-gfm** — case-study / post prose
- **@vercel/analytics** — privacy-friendly page analytics
- **Tailwind CSS** (configured) alongside a bespoke CSS design system
- Fonts: Newsreader (serif), Hanken Grotesk (sans), JetBrains Mono

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (statically prerenders every page)
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. Deploy. (If it lives in a subfolder, set **Root Directory** accordingly.)

> Update `site.url` in `src/lib/data.ts` to your real domain so canonical/OG
> links resolve correctly.

## Routes

```
/                      Home — hero, about, work, projects, writing, stack, contact
/projects              All projects (index)
/projects/[slug]       Project case study (statically generated per project)
/writing               All posts (index)
/writing/[slug]        A post (statically generated per post)
```

## Editing — everything is data

| What | Where |
| --- | --- |
| Name, role, bio, stats, jobs, skills, education | `src/lib/data.ts` |
| Projects + case studies | `src/content/projects.ts` |
| Writing / notes | `src/content/writing.ts` |
| Colours, type, layout | `src/app/globals.css` |
| SEO, fonts, theme bootstrap | `src/app/layout.tsx` |

### Add a project case study

Append an object to `projects` in `src/content/projects.ts`. Each `sections[].body`
is Markdown. Set `featured: true` to surface it on the home page. The route
`/projects/<slug>` is generated automatically.

### Add a writing post

Append an object to `posts` in `src/content/writing.ts`. `body` is Markdown.
Set `draft: true` to keep it unpublished.

## Features

- **⌘K command palette** (`Cmd/Ctrl+K`) — jump to any page, project, or post; toggle theme.
- **Light / dark theme** — persisted, no flash on load, system-independent (defaults dark).
- **Page transitions** — quiet cross-page fade via `app/template.tsx`.
- **Generative hero** — a theme-aware "attention graph" canvas that reacts to the cursor.
- **Animated impact counters**, scroll reveals, scroll-progress bar, spotlight cards.
- **SEO** — per-page metadata, Open Graph, Twitter cards, JSON-LD Person schema.
- Every animation respects `prefers-reduced-motion`.

## Components

```
src/components/
  Sidebar.tsx        sticky sidebar + scroll-spy (home)
  Hero.tsx           word-by-word intro
  HeroCanvas.tsx     generative backdrop (theme-aware)
  CommandPalette.tsx ⌘K palette
  Controls.tsx       floating top-right controls
  ThemeToggle.tsx    light/dark switch
  Markdown.tsx       react-markdown wrapper (internal links via next/link)
  Counter.tsx        animated count-up
  Reveal.tsx         scroll-into-view wrapper
  Spotlight.tsx      cursor-follow card glow
  ScrollProgress.tsx top progress bar
  FooterYear.tsx     current year
```
