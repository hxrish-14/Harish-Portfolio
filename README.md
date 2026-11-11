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
| Profile photo, tab icon, education/experience logos (repo `Assets/` folder), project images | `assets` |
| LinkedIn, GitHub, Naukri, HRS Server, quick-open URL, Spotify | `links`         |
| Instagram username (URL, tooltip and menu link all derive from it) | `INSTAGRAM_HANDLE` constant just above `PORTFOLIO_CONFIG` |
| Resume PDF URL, resume JPG (preview fallback), PDF load timeout, zoom limits | `resume` |
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

### Logos and repository assets
All local assets live in the GitHub repo's `Assets/` folder (capital A; GitHub Pages is
case-sensitive). Paths with spaces are written URL-encoded.

| Item                         | Where                          | Value                          |
|-------------------------------|---------------------------------|----------------------------------|
| Kaashiv Infotech logo          | `assets.logos.kaashiv`           | `Assets/KAASHIV%20LOGO.jpg`      |
| Dr. M.G.R. logo                | `assets.logos.mgr`               | `Assets/MGR%20LOGO%202.jpg`      |
| Adhiparasakthi, Brakes India   | `assets.logos.*`                 | remote image URLs                |
| Project images (optional)      | `assets.projectImages.*`         | `null` = gradient placeholder    |

Logos fill the circle without stretching (`object-fit: cover`). If an image fails to
load, the circle falls back to two-letter initials. Changing an image never changes layout.

### Instagram
Change `INSTAGRAM_HANDLE` (currently `hxrish._,14`) in one place. NOTE: Instagram
usernames only allow letters, numbers, periods and underscores, so a comma will not
resolve to a real profile. Double-check the handle.

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

Source files (repo `Assets/` folder, pinned to a commit in `resume.pdf` / `resume.previewImage`):
- `Assets/HARISH R - RESUME.pdf`  (preview + download)
- `Assets/HARISH R - RESUME.jpg`  (preview fallback only)

**Opening it**
- Desktop mouse: hover the Resume button (nav or hero) to get a floating preview card placed
  beside the button (never covering it, never leaving the viewport). Move the pointer into the
  card to keep it open; leaving closes it. Press Esc or the close button to dismiss it.
- Click / tap / keyboard (and every phone or tablet): opens the same preview as a centered
  modal with a blurred backdrop.

**Fallback chain (priority order)**
1. Real PDF. The file is fetched from GitHub (raw files are CORS-open) and re-typed as
   `application/pdf` before being shown, because GitHub serves it as `octet-stream` with a
   sandbox policy that blocks a direct `<iframe src>`. The same fetched copy is reused for download.
2. Resume JPG, if the PDF fails, is blocked, takes longer than `resume.pdfLoadTimeout` (3 s),
   or the device cannot show PDFs inline (Android, iPhone, iPad, browsers with the PDF viewer off).
3. A short message with a link to open the PDF, if both fail.

**Download** always saves the real PDF (never the JPG). If the fetch is blocked it opens the PDF
URL directly in a new tab.

Zoom in/out/reset and mouse-wheel zoom work on whichever of PDF or image is showing, limited by
`resume.zoomMin` / `resume.zoomMax`.

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

## Code protection (deterrents only)
Right-click is disabled (except inside form fields), F12 / Ctrl+Shift+I/J/C / Ctrl+U (Cmd+Option
equivalents on Mac) are blocked, and text selection is off outside form fields. Anything sent to a
browser can still be inspected or downloaded, so this only discourages casual copying. Do not put
secrets in these files. The right-click block and shortcut blocking are in `initContextMenuBlock()`.

## Forced dark mode
The page declares `color-scheme` and has real light and dark themes. A browser's own "force dark
mode" setting (for example Brave or Chrome flags) is applied by the browser and cannot be switched
off from CSS. In testing with Chromium's force-dark flag both themes stayed readable, and
"Friction!" stays light on dark backgrounds.

---

## What changed in this update

Applied on top of the previous working files; only the items below were touched.

- **Resume preview:** rebuilt (see above). Root causes fixed: GitHub serves the PDF as
  `octet-stream`, and the loading overlay ignored the `hidden` attribute so it covered the preview.
  Added a hover preview, PDF -> JPG -> message chain, PDF-only download.
- **Text:** "Executive Assistant Trainee to the Head of Operations" (also in the About text),
  "Full Stack Python Intern", projects are now "Production Monitoring Dashboard" and
  "Manpower Dashboard" (Power BI, short descriptions).
- **Instagram:** now driven by one `INSTAGRAM_HANDLE` constant, set to `hxrish._,14`.
- **Theme:** "Friction!" text follows the theme (light in dark mode); light theme declares
  `color-scheme: only light`.
- **Loops:** the home and toolkit loops are rebuilt so one set is cloned to always overfill the
  screen and shifts by exactly one set. Old versions lost half a gap per cycle (a visible jump) and
  could show blank space on wide screens or when zoomed out.
- **Green line:** animates right to left on desktop and bottom to top on mobile; both lines are
  measured from the real circle centers, so on mobile the line starts and ends inside the circles.
  Re-aligned automatically on resize, zoom and font load.
- **Scrolling:** removed the whole-page blur filter and the view-transition wrapper that caused
  lag; native smooth scrolling is kept.
- **Logos:** Kaashiv and MGR from `Assets/`, shown without stretching.
- **Toolkit chips:** hover shadow added (no longer clipped).
- **Code protection:** see above. Console messages are silenced for visitors.
- **Small fixes:** closed mobile menu is no longer keyboard-focusable; favicon link has a safe
  default `href`.

Not changed: `Code.gs`, `vite.config.js` (unchanged from your upload).
