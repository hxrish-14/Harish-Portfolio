# Harish's Portfolio

A single-page portfolio in plain HTML, CSS and JavaScript. Exactly three files,
no frameworks, no build step, and one place to edit the resume data that
drives the whole site (sections, on-page resume, print view and PDF).

## File structure

```
portfolio-site/
├── index.html   → markup, SEO/meta tags, section banners (content is rendered by script.js)
├── styles.css   → all styling: design tokens, components, responsive rules, print rules
└── script.js    → data (RESUME + SITE at the top) and all behaviour
```

Note: the stylesheet is now `styles.css` (it was `style.css` before).

The `assets/` folder, `package.json`, `vite.config.js`, `.nojekyll` and
`google-apps-script/Code.gs` from the previous version are no longer needed to
run this site. Keep Code.gs somewhere safe if you want to review or redeploy
the contact-form backend (see below).

**For day-to-day updates you should only need the two objects at the very top
of `script.js`:**

```js
/* ===================== 1. CONFIG & DATA ===================== */
var SITE   = { ... };   // PDF file name, PDF library, contact-form endpoint, timeouts
var RESUME = { ... };   // everything shown on the site AND in the PDF
```

## Where to change things (all inside `script.js`)

| Want to change...                                   | Where                                   |
|-----------------------------------------------------|------------------------------------------|
| Name, location, email, phone                         | `RESUME.name / location / email / phone / phoneHref` |
| LinkedIn / GitHub (or add more profiles)              | `RESUME.links` (label, url, display)     |
| Professional summary                                  | `RESUME.summary` (use **double asterisks** for bold) |
| Jobs                                                  | `RESUME.experience` (newest first)       |
| Degrees / schools                                     | `RESUME.education` (add `minor: true` for a muted entry like HSC) |
| Skills, tools, technologies                           | `RESUME.skills` (`section`: `'skills'`, `'technologies'` or `'tools'` decides where it appears) |
| Projects                                              | `RESUME.projects` (id, kind, category, title, description, photo) |
| Soft skills                                           | `RESUME.softSkills`                      |
| Downloaded PDF file name                              | `SITE.pdfFileName`                       |
| Contact-form backend URL                              | `SITE.contactEndpoint`                   |
| Form timeout / number of retries                      | `SITE.requestTimeoutMs`, `SITE.maxRetries` |
| PDF library URL, integrity hash, timeout              | `SITE.jsPdf`                             |
| Valid in-page routes (anything else shows the 404 view) | `ROUTES` array                         |

Adding a new job, degree, skill group or project means adding one more object
to the relevant array. The sections, the on-page resume, the print view and the
PDF all update together because they render from the same data.

### Things that are NOT in the data object (edit in `index.html`)
- Page title, meta description, Open Graph tags
- The hero headline and introduction text
- Section headings and the project-section note
- The JSON-LD structured data block (name, location, schools, profile links)
- The `<noscript>` message (it contains the email address)
- Favicon (an inline SVG "H")
- Theme colours: the CSS variables at the top of `styles.css`
  (`:root` for light, `:root[data-theme="dark"]` for dark). The two
  `#071226` / `#f5f8fc` values inside `applyTheme()` in `script.js` and the
  `theme-color` meta tags should match your background colours.

To add a brand-new section: add the `<section id="...">` in `index.html`, add a
nav link with `data-nav="..."`, and add the id to the `ROUTES` array.
Otherwise `#your-id` will show the 404 view.

### Project previews
The preview graphics are original illustrations drawn in code (dashboard,
workforce, IoT). They are labelled "Illustrative concept" because they are NOT
screenshots of the real projects. To use a photo or a real screenshot, set the
project's `photo` field to a direct https image URL. It is lazy-loaded, and if
it fails to load the built-in graphic stays in place (no broken image icon).
Only use images you have the right to use; do not present stock photos as
screenshots of your work.

## Resume and PDF behaviour

1. The full resume is displayed in the Resume section, rendered from `RESUME`.
2. "Download Resume" loads the jsPDF library on demand (it is not loaded on
   page open), builds a text-based A4 PDF (selectable text, clickable links,
   multi-page capable) and saves it as `Harish_R_Resume.pdf`.
3. If the library cannot load (offline, blocked, timeout, integrity mismatch)
   the page says so honestly and opens the browser's print dialog using a
   print-ready layout. Choose "Save as PDF" there.
4. "Print / Save as PDF" opens that same print view directly.
5. The status messages never claim a file was downloaded; they say the PDF was
   created and the browser should be saving it.

There is no separate resume file to upload and no resume image fallback or zoom
viewer in this version (those belonged to the previous design).

### Updating the PDF library version
`SITE.jsPdf.integrity` is a Subresource Integrity hash. If you change the
version in the URL, regenerate the hash from the exact file:

```
openssl dgst -sha384 -binary jspdf.umd.min.js | openssl base64 -A
```

and paste it as `sha384-<result>`. A wrong hash makes the browser refuse the
script, and the site then falls back to the print dialog.

## Keyboard shortcuts

The custom shortcuts from the previous version (Ctrl+Shift+R, Ctrl+Shift+D,
Ctrl+Alt+S, etc.) are not part of this version. Standard keyboard use works:
Tab / Shift+Tab to move, Enter / Space to activate, Esc to close the mobile
menu or the project dialog, and a "Skip to content" link appears on first Tab.

## Google Sheets contact form backend

The form posts JSON (name, email, message) to the Google Apps Script web app set
in `SITE.contactEndpoint`. It validates input, prevents double submission,
uses a 10-second timeout, retries at most 2 times (network errors and 5xx only),
and shows a friendly message with your email address if sending fails. It only
reports "sent" when the backend answers `{"status":"success"}`.

- Set `SITE.contactEndpoint` to `''` to disable the backend; the form then
  shows the email fallback instead of pretending to send.
- If you redeploy your Apps Script, paste the new web-app URL here.
- The URL is public by nature. Validation, spam protection and rate limiting
  must be enforced in the Apps Script itself; the hidden honeypot field is only
  a basic bot filter. No cookies or credentials are sent.

## Run locally

Open `index.html` directly in a browser. No install or build step.
Needs internet only for: PDF generation (jsPDF from jsDelivr), the contact form,
and any optional `photo` URLs. Service workers do not run from a file opened
directly.

## Host on GitHub Pages

1. Put the three files in the root of a GitHub repo (or in a `/docs` folder).
2. Repo > Settings > Pages > Source > Deploy from branch > `main` / `(root)`.
3. Live at `https://<username>.github.io/<repo>/`.
4. Netlify, Cloudflare Pages and Vercel also work by uploading the three files.

## Hosting requirements (things JavaScript alone cannot do)

### 404 pages
- Handled in JavaScript: unknown in-page routes such as `#/anything` show the
  custom 404 view (home link and back button). If a host rewrites unknown paths
  to `index.html`, paths that do not end in `.html` also show the 404 view.
- Needs host configuration: a real HTTP 404 for unknown URLs.
  - Netlify: add a `_redirects` line `/*  /index.html  200` (single-page
    fallback) so the 404 view is reached.
  - Cloudflare Pages: enable single-page-app mode, or add a `_redirects` file.
  - GitHub Pages: save a copy of `index.html` as `404.html` (a fourth file).
    Unknown paths then load the site and the custom 404 view appears.

### Offline support
The three-file version shows an offline banner with a Retry button and handles
failed requests gracefully, but it does NOT cache the site for offline use.
Full offline support needs one extra file (`sw.js`, a service worker) plus
HTTPS (or localhost). It was not built here. A banner is not a guarantee that
the site works offline.

### Security headers
These must be set at the host (HTML/JS cannot enforce them). GitHub Pages does
not allow custom headers; Netlify (`_headers`), Cloudflare and Vercel do.

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'sha256-<hash of inline theme script>' 'sha256-<hash of JSON-LD block>'; style-src 'self'; img-src 'self' data: https:; connect-src 'self' https://script.google.com https://script.googleusercontent.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

The CSP above is a starting point and has not been enforced against this site.
Test it in report-only mode first. The inline theme script (prevents a flash of
the wrong theme) and the JSON-LD block need their hashes listed; your browser's
console shows the exact hash when it blocks them.

## Notes

- Theme: follows the system theme on first visit, then remembers your choice.
  If localStorage is unavailable it keeps the choice in memory for the session.
- Motion: animations are subtle and switch off with the "reduce motion" setting.
- Accessibility: semantic landmarks, visible focus, labelled form fields,
  screen-reader status messages, 44px touch targets, error text that does not
  rely on colour alone.
- Security: no eval(), no innerHTML (dynamic text uses textContent), external
  links use `rel="noopener noreferrer"`, configurable URLs are limited to
  https, mailto and tel, and no secrets are stored in the code.
- Dependencies: none, except jsPDF loaded on demand for the PDF.

---

## What changed in this update

This README was updated from the previous version to match the new code:

- **Architecture:** three files only. The `PORTFOLIO_CONFIG` block, separate
  `assets/` folder, Vite tooling and Code.gs are no longer part of the bundle.
  Content now lives in `RESUME` and `SITE` at the top of `script.js`.
- **Resume:** now embedded in the code and rendered from one data object. The
  PDF is generated in the browser instead of being fetched from a GitHub raw
  URL, so the preview modal, preview image fallback, zoom controls and
  `RESUME_URL` setting no longer exist.
- **Content:** rebuilt from the supplied resume. The job title uses the resume's
  wording, "Executive Assistant Trainee to the Head Operations". Projects are
  the three listed on the resume. Instagram and Naukri links are not carried
  over because they are not on the resume; add them to `RESUME.links` if you
  want them (note that anything in `RESUME.links` also appears in the resume
  and PDF).
- **Design:** dark-blue / light-blue palette with an amber accent, system
  fonts (no Google Fonts), inline SVG favicon, sections for Skills, Tools and
  Technologies and Projects with illustrative concept previews.
- **Removed from the old version:** racetrack timelines, Deep Focus tiles,
  logo config, marquee, preloader, keyboard shortcuts and the HRS Server link.
- **Added:** custom 404 view, offline/network banner, loading and empty states,
  project details dialog, print-to-PDF fallback, on-demand PDF library with
  integrity check, bounded-retry contact form, and structured data.

## Testing status

Tested in headless Chromium: theme toggle in both directions and persistence,
system theme on first visit, storage-failure fallback, every nav target and
internal link, mobile menu, 404 routing, offline banner and retry, PDF download
(file name, text content, one A4 page), PDF-failure fallback, contact form
validation / success / server-error retries / network failure, project dialog,
no horizontal overflow at 320, 360, 375, 390, 430, 768, 1024 and 1440 px and in
a landscape phone view, WCAG AA contrast for the main colour pairs, and HTML /
CSS validation with no errors.

NOT tested: Firefox, Safari, Brave and Edge; the real jsDelivr download (the
test served the same npm file locally, so the integrity hash is unverified
against the live CDN); the real Google Apps Script endpoint (mocked); the actual
browser print dialog; offline caching and security headers (not implemented);
a real screen reader.
