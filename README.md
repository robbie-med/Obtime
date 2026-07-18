# 마중 · Machung

A bilingual (English / Korean) prenatal care guide for **Korean-American mothers** — comparing
the US and Korean systems side by side, for families who may deliver in the US **or** fly back to
Korea. Usable by both first-time moms and clinicians.

**Live:** https://obtime.robbiemed.org

## Features

- **Side-by-side US ⇄ Korea comparison** — visit cadence, labs, screening, ultrasound, vaccines,
  and benefits (NHIS 국민행복카드 voucher, 산모수첩). Comparison tables are always bilingual.
- **Due-date personalization** — enter an LMP or due date; the whole guide centers on your current
  gestational age (a "This Week" card, development, and a checklist of what's due now).
- **Crossover planner** — a step-by-step plan for continuing care across two countries
  (before you fly / carry with you / after you arrive in Korea).
- **Clinic card** — a printable point-to-translate glossary + per-visit questions in both languages.
- **Trackers** — weight-vs-target, kick counter, appointment notes, due-date countdown.
- **Mom / Clinician mode** — the same content at plain-language or clinical depth.
- **Offline PWA** — installable, works without a connection. Your data stays on your device
  (localStorage) with JSON export/import for backup.

Educational only — not medical advice. Every Korean data point is cited; confirm with your clinic.

## Tech

React 19 · Vite 6 · TypeScript · Tailwind CSS v4 · vite-plugin-pwa. No backend; content ships as
typed bilingual data modules in `src/data/`.

## Develop

This project targets Node ≥ 20 (Vite 6 / Tailwind 4).

```bash
npm install
npm run dev      # http://127.0.0.1:3101   (bash run.sh dev pins Node 24 via nvm on this host)
npm test         # data-integrity + dating tests
npm run build    # type-check + production build to dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to
GitHub Pages. The custom domain is set via `public/CNAME` (`obtime.robbiemed.org`).
