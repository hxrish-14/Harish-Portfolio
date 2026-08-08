# Harish R — Portfolio

A single-page, cinematic-editorial portfolio built with plain HTML, CSS and JavaScript (optionally served through Vite).

## Run locally

```bash
npm install
npm run dev
```

Or just open `index.html` directly in a browser — no build step is required for the site to work.

## Build for deployment (e.g. GitHub Pages)

```bash
npm run build
npm run preview   # optional local check of the production build
```

The production files land in `dist/`.

## Editing content

Everything personal — skills, education, experience, contact details, social links,
resume paths — lives in **one place**: the `portfolioData` object at the top of
`script.js`. Change it there and the page updates everywhere it's used.

## Adding real assets

```
assets/
  images/    → any photography / illustration
  logos/     → institution & company logos (transparent PNG/SVG recommended)
  icons/     → any custom icons
  resume/    → put Harish-R-Resume.pdf here (referenced in portfolioData.resume.localPath)
  profile/   → profile photo, if used
```

If a logo path isn't set, the timeline falls back to a clean two-letter text mark
instead of a broken image — never edit that behavior out.

## Host on GitHub Pages

**Option A — no build, plain static site (simplest):**
1. Push this folder's contents to a GitHub repo (root, or a `/docs` folder).
2. Repo → Settings → Pages → Source → Deploy from branch → pick `main` and `/ (root)` (or `/docs`).
3. Your site goes live at `https://<username>.github.io/<repo>/`.
4. `.nojekyll` is already included so GitHub doesn't try to run Jekyll on it.

**Option B — build with Vite first:**
```bash
npm install
npm run build
```
Then push the contents of the generated `dist/` folder the same way as Option A
(root or `/docs`). `vite.config.js` already sets `base: "./"` so asset paths
work correctly under a `username.github.io/repo-name/` subpath.

## Notes

- Theme preference is stored in `localStorage` under `hr-theme` and respects
  `prefers-color-scheme` on first visit.
- The contact form is frontend-only: on submit it opens the visitor's email
  client via a `mailto:` link. No message is silently "sent" without one.
- Reduced-motion users get all content with decorative motion removed.
