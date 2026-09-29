# 마중 · Machung

A bilingual (English / Korean) prenatal care guide for **Korean-American mothers** — comparing
the US and Korean systems side by side, for families who may deliver in the US **or** fly back to
Korea. Usable by both first-time moms and clinicians.

**Live:** https://obtime.robbiemed.org

## Features

- **Week-by-week timeline** — every visit, test, vaccine, medicine and to-do in the row of the
  week it happens, with its full window (day-precise in clinician view), the ideal week, who it is
  for (everyone / your choice / only if…), status, and real calendar dates once a due date is set.
  Views: US, Korea, both side by side, or a **US → Korea path** that switches at your flight date.
- **Side-by-side US ⇄ Korea comparison** — visit cadence, labs, screening, ultrasound, vaccines,
  and benefits (NHIS 국민행복카드 voucher, 산모수첩). Comparison tables are always bilingual.
- **Due-date personalization** — enter an LMP or due date; the whole guide centers on your current
  gestational age (a "This Week" card, development, and a checklist of what's due now).
- **Nutrition guide** — fats & oils (DHA, 들기름 vs 참기름), fish & mercury, vitamin D (and the
  2025 preterm-birth research), magnesium, key nutrients US vs Korea (2025 KDRI), food safety.
- **Exercise guide** — 150 min/week, safe strength training with an example session, what to
  avoid, warning signs.
- **Index** — A–Z (and ㄱ–ㅎ) definitions, plain-language explanations, links back to the timeline
  and to sources; searchable in English or Korean.
- **Crossover planner** — a step-by-step plan for continuing care across two countries
  (before you fly / carry with you / after you arrive in Korea).
- **Clinic card** — a printable point-to-translate glossary + per-visit questions in both languages.
- **Trackers** — weight-vs-target, kick counter, appointment notes, due-date countdown.
- **Mom / Clinician mode** — the same content at plain-language or clinical depth.
- **Offline PWA** — installable, works without a connection. Your data stays on your device
  (localStorage) with JSON export/import for backup.

Educational only — not medical advice. Every timeline item and guide section is cited (sources
verified September 2026); confirm with your clinic. Parked work lives in `FUTURE_IDEAS.md`.

## Tech

React 19 · Vite 6 · TypeScript · Tailwind CSS v4 · vite-plugin-pwa. No backend; content ships as
typed bilingual data modules in `src/data/`.

## Develop

This project targets Node ≥ 20 (Vite 6 / Tailwind 4).

```bash
npm install
npm run dev      # http://127.0.0.1:3101   (bash run.sh dev pins Node 24 via nvm on this host)
npm test         # data-integrity, dating (multi-timezone) and schedule/layout tests
npm run build    # type-check + production build to dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to
GitHub Pages. The custom domain is set via `public/CNAME` (`obtime.robbiemed.org`).
