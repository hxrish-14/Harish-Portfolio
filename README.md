# Harish's Portfolio

A single-page, motion-rich portfolio in plain HTML/CSS/JS. Minimal file
structure, one central configuration block, and every frequently-changed
value editable from a single spot.

## File structure

```
portfolio/
├── index.html              → markup only, organized with section banner comments
├── style.css                → all styling, organized with section banner comments
├── script.js                 → all behaviour + the EASY EDIT CONFIGURATION block
├── assets/                   → optional local images/logos/resume
├── google-apps-script/Code.gs → backend that saves contact-form submissions to a Google Sheet
├── package.json / vite.config.js → optional dev-server tooling (not required to run the site)
└── README.md
```

**You should almost never need to touch the HTML/CSS structure or the
render/interaction logic in `script.js` for day-to-day updates.** Everything
that changes often lives in the `PORTFOLIO_CONFIG` object at the very top of
`script.js`, under the banner:

```js
/* =====================================================
   EASY EDIT CONFIGURATION
   Change values here first.
   Do not edit the feature logic unless necessary.
===================================================== */
```

## Where to change things (all inside `PORTFOLIO_CONFIG` in `script.js`)

| Want to change...                              | Config key                        |
|--------------------------------------------------|-------------------------------------|
| Name, email                                       | `identity`                          |
| Profile photo, tab icon, education/experience logos, project images | `assets`             |
| LinkedIn, GitHub, Instagram, Naukri, HRS Server, quick-open URL, Spotify | `links`         |
| Resume PDF, fallback preview image, load timeout, zoom limits | `resume`                |
| Contact form backend URL                          | `backend.scriptUrl`                 |
| Lazy-loading behaviour                            | `loading`                            |
| Every keyboard shortcut (add/remove/rebind)        | `keyboardShortcuts` (array)          |
| Deep Focus tiles (Excel / Power BI / Power Automate) | `deepFocus` (array)               |
| Toolkit loop items                                | `skills`                              |
| Education entries                                 | `education` (array, newest first)     |
| Experience entries                                | `experience` (array, newest first)    |
| Projects                                          | `projects` (array)                    |

To add a new education or job entry, add one more object to the `education`
or `experience` array — the racetrack, logo, and green progress-line
animation all render automatically from however many entries are in the
array. Same for `projects` and `deepFocus`.

### Logos / images that couldn't be used directly
A couple of the sources provided were page links (e.g. an Instagram profile),
not direct image files — those stay `null` in `assets.logos` with a comment
pointing back to the original link, and the site shows a clean two-letter
fallback until a real `https://...` image URL is added.

### Resume preview image (fallback)
`resume.previewImage` is `null` by default. If the PDF hasn't finished
loading within `resume.pdfLoadTimeout` (3 seconds), the modal automatically
swaps to this image instead. Drop an exported image of your resume into
`assets/resume/` and point `previewImage` at it (e.g.
`"assets/resume/preview.jpg"`) to enable this fallback.

## Keyboard shortcuts

Defined entirely in the `keyboardShortcuts` array — enable/disable, rebind,
or change the target URL of any of them without touching any other logic.

| Shortcut                     | Action                                  |
|--------------------------------|--------------------------------------------|
| `Ctrl + Shift + R`            | Open the resume preview modal               |
| `Ctrl + Shift + D`            | Download the resume directly                |
| `Ctrl + Alt + Shift + S`      | Open `links.quickOpen` in a new tab         |
| `Ctrl + Alt + S`               | Open `links.spotifyPlaylist` (empty until you add one) |
| `Win + Ctrl + Shift + S`      | Open `links.server` (HRS Server) in a new tab |

All shortcuts are skipped automatically while typing in any input, textarea,
or editable field. Each uses 3–4 modifiers together, so none collide with
normal browser navigation; `Ctrl+Shift+R`/`Ctrl+Shift+D` do intentionally
override the browser's own bindings for those exact combos, only while this
page has focus.

## Resume preview behaviour

1. Modal opens → tries to load the PDF (`resume.pdf`) in an iframe.
2. If it loads within `resume.pdfLoadTimeout` (default 3s) → shown as-is.
3. If not (slow network, blocked embed, etc.) → automatically swaps to
   `resume.previewImage`, if one is configured.
4. Zoom in/out/reset buttons and mouse-wheel zoom (while hovering the
   preview) both work on whichever is currently shown — PDF or image —
   constrained between `resume.zoomMin` and `resume.zoomMax`.
5. Download always fetches the real PDF directly, independent of whichever
   preview mode is currently active.

## Google Sheets contact form backend

Already deployed and wired in via `backend.scriptUrl` in `script.js`. Custom
per-field validation messages ("Please enter your name", "Enter a valid mail
address", "Leave me a message here.") are also defined in `script.js`, right
above the form logic. `google-apps-script/Code.gs` is the source of that
deployment if you ever need to review or redeploy it — if you do, update
`backend.scriptUrl` with the new Web App URL afterward.

## Run locally

Just open `index.html` directly in a browser — no build step required.

Optionally, with Vite installed:
```bash
npm install
npm run dev
```

## Host on GitHub Pages

1. Push this folder's contents to a GitHub repo (root, or `/docs`).
2. Repo → Settings → Pages → Source → Deploy from branch → `main` / `(root)`.
3. Live at `https://<username>.github.io/<repo>/`. `.nojekyll` is included.

---

## What changed in this update (fix/refactor pass)

This pass preserved all existing content, sections, colors, fonts, and
functionality, and made only the fixes requested:

- **Architecture:** consolidated `config/config.js` + `data/data.js` +
  `js/main.js` back into a single `script.js` with a `PORTFOLIO_CONFIG`
  object at the top and clear section banners throughout (HTML, CSS, and JS
  all now use matching `HOME` / `ABOUT` / `EDUCATION` / etc. banners), per
  the minimal-file-structure requirement.
- **Nav hover-underline bug:** the shared sliding indicator was accidentally
  bound to `.nav-link, .nav-cta`, giving the Resume button the underline too.
  Scoped it to `.nav-link` only — Resume keeps its own separate pill hover.
- **Racetrack progress line:** was double-inset (the line's own `left`/`right`
  padding stacked on top of the container's identical padding), so it didn't
  terminate exactly at the outer logos. Now measured directly from the real
  `.track-logo` positions via `getBoundingClientRect()`, so it's pixel-exact
  regardless of screen size or node count — and it now animates in as a
  scroll-triggered "draw" rather than sitting there as a static bar, on both
  Education (BCA → MCA) and Experience (Kaashiv → Brakes India).
- **Home loop jump/seam:** the marquee animation now starts paused and is
  only released once `document.fonts.ready` resolves (with a safety timeout),
  so a late web-font swap can never shift the track width mid-animation and
  cause a visible jump. It still never pauses on hover.
- **Resume preview:** rebuilt with a real 3-second PDF-load timeout, automatic
  fallback to a configurable preview image, zoom in/out/reset, mouse-wheel
  zoom, and a responsive `min()`-based container so it never overflows any
  viewport.
- **About section:** fixed the grid's `align-items: stretch` default (which
  was creating an empty-looking stretched gap in the right column) to
  `align-items: start`; heading updated to the exact wording requested.
- **Theme / forced-dark mode:** added `<meta name="color-scheme" content="light dark">`
  so Chromium/Android "forced dark" heuristics recognize the page already
  supports both themes and back off instead of auto-inverting colors. Audited
  every color declaration — the "Friction!" marker and all other text/icons
  were already using theme-aware variables with correctly fixed contrast
  pairings; no actual invisible-text bugs were found in the existing code.
- **Mouse glow removed:** the custom trailing cursor-shadow element, its CSS,
  and its mousemove listener are gone. The system cursor is untouched.
- **Keyboard shortcuts:** rebuilt as a fully data-driven array
  (`PORTFOLIO_CONFIG.keyboardShortcuts`) instead of hardcoded if-chains, all
  shortcuts now skip typing targets automatically, and added
  `Win+Ctrl+Shift+S` → `links.server` (HRS Server).
- **Contact form:** added the three exact custom validation messages
  requested, replacing the generic ones.
- **Footer:** removed the trailing period after the year, reduced vertical
  padding for a more compact footer, and added `title` attributes (alongside
  the existing `aria-label`s) to every icon so hover tooltips show the
  correct name for each link.
- **Section titles / logo circles:** both sized up slightly per request,
  still fully fluid via `clamp()`.
- **Images:** `draggable="false"` added to the profile photo and all
  logo/project images, plus a global `dragstart` listener as a safety net for
  anything added later; lazy-loading (`loading="lazy" decoding="async"`)
  added to all non-critical images while the hero photo stays eager.
- **Refresh behavior:** `history.scrollRestoration = "manual"` plus an
  explicit scroll-to-top and hash-clear on load, so every normal refresh
  starts at Home.
- **Error handling:** added silent `window.onerror` /
  `unhandledrejection` listeners (console-only, nothing shown to visitors),
  on top of the existing per-feature `try/catch` wrapping.
- **Responsiveness:** capped the hero's height on very large/projector
  displays (`clamp(520px, 86svh, 820px)` instead of an uncapped `86svh`), and
  added a small proportional bump to `--container` above 1920px/2400px so
  very large screens don't feel like a tiny centered island — the underlying
  `clamp()` + fixed-max-width-container approach was already sound.

### Note on browser "forced dark mode"
The `color-scheme` meta tag is the standards-based mitigation for this and
should resolve it in current Chrome/Edge/Android WebView. A small number of
older or third-party browsers apply their own dark-mode heuristics that
aren't fully governed by this signal — if you spot a specific element that
still looks wrong on a particular browser/device after this update, let me
know which one and I'll target it directly rather than guessing further.
