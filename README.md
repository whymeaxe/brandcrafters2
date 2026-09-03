# Embassy of Education — Website

A premium, motion-driven, multi-page website for a visa strategy & case-preparation
consultancy, built with React, Vite, Tailwind CSS, Framer Motion and GSAP
ScrollTrigger.

## Stack

- **React 19 + Vite** — app shell and routing (`react-router-dom`)
- **Tailwind CSS v4** — design tokens live in `src/index.css` under `@theme`
- **Framer Motion** — entrance animations, crossfades, mobile menu
- **GSAP + ScrollTrigger** — the pinned, scroll-scrubbed document section on the homepage

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  components/   Reusable sections (Nav, Footer, PassportHero, DocumentReel, ...)
  pages/        One file per route (Home, About, Services, Destinations, ...)
  lib/data.js   All editorial copy: documents, destinations, categories, services
  index.css     Design tokens (color/type) + global styles
public/
  videos/       The two source animations (see "Video assets" below)
```

## Video assets — read this first

You supplied two Gemini-generated clips. Their actual content didn't quite match
the brief's description, so here's how they were mapped and why:

- **`public/videos/passport-hero.mp4`** (source: `gemini_generated_video_48ab25fb.mp4`)
  — a multi-document orbit that resolves into a purple passport book at the very
  end. Used in the **hero** and as a faint callback in the **final CTA**.
- **`public/videos/documents-scroll.mp4`** (source: `gemini_generated_video_e8c4e255.mp4`)
  — individual documents (DS-160, Admission Letter, etc.) appearing one at a time.
  Used in the **scroll-scrubbed document section** — this is the one that's
  actually driven frame-by-frame by scroll position.

Neither clip has a genuinely transparent or pure-white background — both sit on a
light studio-gray gradient. Rather than a hard video box, `VideoPlate.jsx` applies:

1. A `brightness/contrast` filter to lift the gray floor toward white.
2. A radial "feather" gradient overlay so the rectangular frame dissolves into
   the page instead of showing a visible edge.

This gets close to "embedded in the page," but it's a CSS approximation, not true
alpha transparency. If you want a cleaner result, the most reliable fix is
regenerating (or rotoscoping) the source videos with a real alpha channel /
chroma-key background, or pre-processing them (e.g. `ffmpeg` + a rembg-style
matting pass) into WebM with alpha.

## The signature interaction

`src/components/DocumentReel.jsx` pins the section (`ScrollTrigger` with
`pin: true, scrub: true`) and maps scroll progress directly to
`video.currentTime`, while the left-side copy panel crossfades between the 8
documents defined in `src/lib/data.js`. Respects `prefers-reduced-motion` with a
static grid fallback (no pin, no scrub).

## Content still marked as placeholder

Search the codebase for "Placeholder" to find every spot using stand-in content:
team bios, office address/phone, case studies, and the contact form's submit
handler (currently just flips local state — wire it to your CRM/email service
before launch).

## Deployment

SPA fallback config is included for both:

- **Netlify** — `public/_redirects`
- **Vercel** — `vercel.json`

Any static host works as long as unknown routes fall back to `index.html`
(client-side routing via `react-router-dom`).
