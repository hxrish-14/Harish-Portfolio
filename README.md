# Harish's Portfolio

A single-page, motion-rich portfolio in plain HTML/CSS/JS (optionally served
through Vite). Bricolage Grotesque throughout, PPT-morph-style scroll
transitions, a direction-aware nav underline, a Google-Sheets-backed contact
form, and a set of keyboard shortcuts.

## Project structure

```
index.html              → markup only, no hardcoded content
config/config.js         → every link, image URL, and contact detail — EDIT HERE
data/data.js              → skills, education, experience, projects — EDIT HERE
js/main.js                → all behaviour (rendering, nav, form, shortcuts, theme)
styles/style.css          → all styling
assets/                   → local images/logos/resume if you'd rather host them yourself
google-apps-script/Code.gs → backend that saves contact-form submissions to a Google Sheet
```

**You should essentially never need to touch `index.html`, `js/main.js`, or
`styles/style.css` for day-to-day updates.** Everything that changes often —
links, images, resume, education, experience, projects, social handles — is
either in `config/config.js` or `data/data.js`, both plain, heavily commented
objects.

## Where to change things

| Want to change...                          | Edit this file        |
|---------------------------------------------|------------------------|
| Email, LinkedIn, GitHub, Instagram, Naukri   | `config/config.js`     |
| Resume URL / filename                        | `config/config.js`     |
| Profile photo                                 | `config/config.js`     |
| Tab icon (favicon)                            | `config/config.js`     |
| Contact form backend URL                      | `config/config.js`     |
| Keyboard-shortcut URLs (quick-open, Spotify)  | `config/config.js`     |
| Education / experience logos                  | `config/config.js` (`LOGOS`) |
| Project screenshots                           | `config/config.js` (`PROJECT_IMAGES`) |
| Toolkit / Deep Focus items                     | `data/data.js`         |
| Education entries (add/remove/reorder)         | `data/data.js`         |
| Experience entries                             | `data/data.js`         |
| Projects (add/remove)                          | `data/data.js`         |

To add a new education or job entry, just add another object to the
`education` / `experience` array in `data/data.js` — the racetrack timeline
and its green progress line render automatically for however many entries
are in the array.

### Logos that couldn't be used directly
Two of the provided sources weren't direct image files (an Instagram profile
page isn't an `<img>`-loadable URL), so those are left as `null` in
`config/config.js` with a comment pointing back to the original link. Until
you have a direct `https://...` image URL, the timeline shows a clean
two-letter fallback instead of a broken image.

### Project images
Both project cards use a soft gradient placeholder until you add a real
screenshot URL to `PROJECT_IMAGES` in `config/config.js`.

## Keyboard shortcuts

| Shortcut                | Action                                   |
|--------------------------|-------------------------------------------|
| `Ctrl + Shift + R`       | Open the resume preview modal             |
| `Ctrl + Shift + D`       | Download the resume directly              |
| `Ctrl + Alt + Shift + S` | Open `QUICK_OPEN_URL` in a new tab        |
| `Ctrl + Alt + S`         | Open your Spotify playlist (once you add the URL) |

All four combinations require 2–3 modifier keys together, so they don't
collide with normal typing or common single-modifier browser shortcuts.
`Ctrl+Shift+R` and `Ctrl+Shift+D` do override the browser's own shortcuts for
those combinations (hard-reload and bookmark-all-tabs, respectively) — only
while focus is on this page.

The Spotify shortcut does nothing until you paste a playlist URL into
`SPOTIFY_PLAYLIST_URL` in `config/config.js` — it was deliberately left empty
rather than guessed.

## Google Sheets contact form backend

Already deployed and wired in — `config/config.js` → `BACKEND_SCRIPT_URL`
points at a live Apps Script Web App that appends each submission
(`timestamp, name, email, message`) to a Google Sheet. `google-apps-script/Code.gs`
is the source of that deployment, included here so you can review it or
redeploy it yourself later (Extensions → Apps Script in a Google Sheet →
paste this file → Deploy → Web app → Execute as **Me** → Who has access
**Anyone**). If you ever redeploy, update `BACKEND_SCRIPT_URL` with the new
Web app URL.

## Run locally

```bash
npm install
npm run dev
```

Or just open `index.html` directly in a browser — no build step required.
`config.js` and `data.js` are loaded as plain (non-module) scripts, so this
works both from a local double-click and from any static host.

## Build for deployment

```bash
npm run build
npm run preview
```

## Host on GitHub Pages

1. Push this folder's contents to a GitHub repo (root, or `/docs`).
2. Repo → Settings → Pages → Source → Deploy from branch → `main` / `(root)`.
3. Live at `https://<username>.github.io/<repo>/`. `.nojekyll` is included.

## What changed in this update

- Extracted **every** link/image/URL into `config/config.js`, and all content
  arrays into `data/data.js` — nothing content-related is hardcoded in
  `index.html` or `js/main.js` anymore.
- Wired in the real, already-deployed Google Sheets backend URL.
- Header: bigger/bolder name, bigger nav text, a shared sliding underline
  that follows the mouse in either direction, clean scroll-to-section via
  `scroll-margin-top`, mobile menu numbering removed and centered.
- Hero: new headline copy with "Friction!" highlighted, larger profile
  photo, hover feedback that hugs the circular photo exactly, "Hire Me" now
  links to LinkedIn, normal system cursor restored plus a minimal trailing
  glow (no more custom cursor icon).
- Cut the scroll motion-blur down drastically and removed the blur-on-reveal
  effect that was making transitions feel heavy.
- Preloader now runs ~5 seconds with larger text/bar and cycles your three
  messages before swiping up.
- About section gains a right-side pull-quote/tag card so the space isn't empty.
- Education/Experience: reordered newest → oldest, each entry now has a short
  description, and both timelines got a **solid green progress/completion
  line** connecting the nodes (desktop: horizontal; mobile: vertical) —
  same treatment on both Education and Experience.
- Projects renamed to **Private Custom Server** and **Babyshield IOT**, each
  with a description that fades in on hover.
- Deep Focus tiles are now color-coded to match each tool (Excel green,
  Power BI yellow, Power Automate blue) with a small tone-matched icon badge,
  legible in both themes.
- Resume modal heading is now exactly "Harish R - Resume"; loading/error
  states verified; download and preview both pull from `RESUME_URL`.
- Every `mailto:` on the site now resolves to `harishramesh004@gmail.com`
  only — the official Brakes India address is not used anywhere.
- Full light/dark contrast pass — "Friction!" keeps fixed dark-on-yellow text
  in both themes, Deep Focus tiles have dark-mode-safe tinted backgrounds.
- Footer: subtle shadow, larger icons/name, true grid-centered "Harish ♡",
  copyright text is now plain (no link), "Social Handles" label added above
  the icon row, and a **Naukri icon/link** added immediately after LinkedIn.
- Four new keyboard shortcuts (see table above).
