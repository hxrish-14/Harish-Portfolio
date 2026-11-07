(() => {
  "use strict";

  /* =====================================================
     EASY EDIT CONFIGURATION
     Change values here first.
     Do not edit the feature logic unless necessary.
  ===================================================== */
  const PORTFOLIO_CONFIG = {

    identity: {
      name: "Harish R",
      email: "harishramesh004@gmail.com", // used for EVERY mailto: link on the site
    },

    assets: {
      profileImage:
        "https://avatars.githubusercontent.com/u/141498620?s=400&u=a16fb899a144f90803bb071829715a427edfa6b8&v=4",
      tabIcon: "https://cdn-icons-png.flaticon.com/128/17974/17974378.png",
      // Education / experience logos — direct https image URLs only. A page
      // link (like an Instagram profile) can't be used as an <img> source,
      // so that one is left null with a comment; the site shows a clean
      // two-letter fallback until a real image URL is added.
      logos: {
        adhiparasakthi:
          "https://assets.allegiance-educare.com/colleges/thumb/250_250_1392964652adhaiprasakthi%20college%20art%20and%20science.png",
        mgr: null, // source given was an Instagram profile page, not a direct image: https://www.instagram.com/mgreri/?hl=en
        kaashiv:
          "https://media.licdn.com/dms/image/v2/C560BAQFC2jYbP2vMUw/company-logo_200_200/company-logo_200_200/0/1638609434663/kaashiv_infotech_logo",
        brakesIndia:
          "https://yt3.googleusercontent.com/7UhXyVBrm-Q736okMY7xZIAeAdpOP9xRsdojsoV1CaoNt0Ue4PzHa72AYwLgi9pB0HzhPB-d=s900-c-k-c0x00ffffff-no-rj",
      },
      // Project screenshots — add a direct https image URL once you have one;
      // until then the cards show a clean gradient placeholder.
      projectImages: {
        privateServer: null, // e.g. "assets/images/private-server.jpg"
        babyshieldIot: null, // e.g. "assets/images/babyshield-iot.jpg"
      },
    },

    links: {
      github: "https://github.com/hxrish-14",
      linkedin: "https://www.linkedin.com/in/harishr14/",
      instagram: "https://instagram.com/hxrish_14",
      naukri: "https://www.naukri.com/mnjuser/profile?id=&altresid",
      server: "https://hxrish-14.github.io/HRS-Server/",
      quickOpen: "https://github.com/hxrish-14", // Ctrl+Alt+Shift+S
      spotifyPlaylist: "", // Ctrl+Alt+S — left empty on purpose, add your playlist URL
    },

    resume: {
      pdf: "https://raw.githubusercontent.com/hxrish-14/Harish-Portfolio/main/HARISH%20R%20-%20RESUME.pdf",
      pdfVersioned:
        "https://raw.githubusercontent.com/hxrish-14/Harish-Portfolio/216739781e8ab30521b020daa98d6448ecb3c7ed/HARISH%20R%20-%20RESUME.pdf",
      fileName: "HARISH R - RESUME.pdf",
      // Shown automatically if the PDF hasn't loaded within pdfLoadTimeout.
      // Add an image (e.g. a JPG/PNG export of page 1) to assets/resume/ and
      // point this at it — left null until a real image is supplied.
      previewImage: null, // e.g. "assets/resume/preview.jpg"
      pdfLoadTimeout: 3000,
      zoomMin: 0.5,
      zoomMax: 2.5,
      zoomStep: 0.25,
    },

    backend: {
      // Already deployed and live — the contact form posts here directly.
      scriptUrl:
        "https://script.google.com/macros/s/AKfycbwbi3x0HYjWl5PsVe8M68O8--fVv64WMg9TqqGR_NXgz2uYxxqDeE4E4-OGN7uxw08C/exec",
    },

    loading: {
      imageLazyLoading: true,
      resumeTimeout: 3000, // mirrors resume.pdfLoadTimeout, kept for clarity
    },

    // Each shortcut is independent: flip `enabled` off, or change the key
    // combo / action, without touching any other shortcut or any logic below.
    keyboardShortcuts: [
      {
        id: "resumePreview",
        enabled: true,
        combo: { ctrl: true, alt: false, shift: true, meta: false, key: "r" },
        action: "openResumeModal",
      },
      {
        id: "resumeDownload",
        enabled: true,
        combo: { ctrl: true, alt: false, shift: true, meta: false, key: "d" },
        action: "downloadResume",
      },
      {
        id: "quickOpen",
        enabled: true,
        combo: { ctrl: true, alt: true, shift: true, meta: false, key: "s" },
        action: "openUrl",
        url: "links.quickOpen",
      },
      {
        id: "spotify",
        enabled: true,
        combo: { ctrl: true, alt: true, shift: false, meta: false, key: "s" },
        action: "openUrl",
        url: "links.spotifyPlaylist",
      },
      {
        id: "hrsServer",
        enabled: true,
        // Windows key + Ctrl + Shift + S
        combo: { ctrl: true, alt: false, shift: true, meta: true, key: "s" },
        action: "openUrl",
        url: "links.server",
      },
    ],

    deepFocus: [
      {
        name: "Excel",
        tone: "excel",
        icon: "excel",
        blurb: "Modelling, formulas and reporting workflows built for people who live in spreadsheets.",
        url: "https://www.microsoft.com/en/microsoft-365/excel",
      },
      {
        name: "Power BI",
        tone: "powerbi",
        icon: "powerbi",
        blurb: "Turning raw operational data into dashboards that are actually read.",
        url: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
      },
      {
        name: "Power Automate",
        tone: "automate",
        icon: "automate",
        blurb: "Scripting the boring parts away — desktop flows and cloud triggers alike.",
        url: "https://www.microsoft.com/en-us/power-platform/products/power-automate",
      },
    ],

    skills: {
      Frontend: [
        { name: "HTML", icon: "code" },
        { name: "CSS", icon: "layers" },
      ],
      Backend: [
        { name: "JavaScript", icon: "braces" },
        { name: "Python", icon: "terminal" },
      ],
      Database: [
        { name: "SQL", icon: "database" },
        { name: "Supabase", icon: "server" },
      ],
      Hosting: [{ name: "GitHub", icon: "github" }],
      Visualization: [
        { name: "Canva", icon: "palette" },
        { name: "Microsoft Office", icon: "file-text" },
      ],
      Automation: [
        { name: "Power Automate Desktop", icon: "workflow" },
        { name: "Power Automate Cloud", icon: "cloud" },
      ],
    },

    // Newest first. Add another object to extend — the racetrack, logo,
    // and progress-line animation all render from this array automatically.
    education: [
      {
        period: "2024 – 2026",
        name: "MCA",
        institution: "Dr. M.G.R. Educational and Research Institute",
        description: "Postgraduate study deepening software engineering, systems and application-development fundamentals.",
        logoKey: "mgr",
      },
      {
        period: "2021 – 2024",
        name: "BCA",
        institution: "Adhiparasakthi College of Arts and Science",
        description: "Undergraduate foundation across programming, databases and computer applications.",
        logoKey: "adhiparasakthi",
      },
    ],

    // Newest first — same add-one-object-to-extend behavior as education.
    experience: [
      {
        period: "Current",
        name: "Secretary to VP",
        institution: "Brakes India, TSF",
        description: "Supporting executive operations while building software skills alongside the role.",
        logoKey: "brakesIndia",
      },
      {
        period: "Apr – Jun 2025",
        name: "Full-Stack Python Developer Intern",
        institution: "Kaashiv Infotech",
        description: "Hands-on internship building full-stack features end-to-end with Python.",
        logoKey: "kaashiv",
      },
    ],

    projects: [
      {
        name: "Private Custom Server",
        description: "A self-hosted server built and configured from scratch for personal projects and experiments.",
        imageKey: "privateServer",
        url: "#",
      },
      {
        name: "Babyshield IOT",
        description: "An IoT-based safety concept exploring sensor data and automated alerts to protect what matters most.",
        imageKey: "babyshieldIot",
        url: "#",
      },
    ],
  };

  /* =====================================================
     UTILITIES
  ===================================================== */
  function isHttpsUrl(url) {
    return typeof url === "string" && /^https:\/\//i.test(url);
  }
  function isUsableUrl(url) {
    // Local relative paths (assets/...) are fine too, not just https.
    return typeof url === "string" && url.length > 0 && (isHttpsUrl(url) || /^assets\//i.test(url));
  }
  function safe(fn) {
    try {
      fn();
    } catch (err) {
      console.warn("[portfolio] non-fatal init error:", err);
    }
  }
  function mailtoUrl(email, subject, body) {
    const params = [];
    if (subject) params.push("subject=" + encodeURIComponent(subject));
    if (body) params.push("body=" + encodeURIComponent(body));
    return `mailto:${email}${params.length ? "?" + params.join("&") : ""}`;
  }
  // Resolve a dotted path like "links.quickOpen" against PORTFOLIO_CONFIG.
  function resolveConfigPath(path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), PORTFOLIO_CONFIG);
  }
  function isTypingTarget(el) {
    if (!el) return false;
    const tag = (el.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || el.isContentEditable;
  }

  const ICONS = {
    code: '<path d="M9 18l-6-6 6-6"/><path d="M15 6l6 6-6 6"/>',
    layers: '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
    braces: '<path d="M8 3a3 3 0 0 0-3 3v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a3 3 0 0 0 3 3"/><path d="M16 3a3 3 0 0 1 3 3v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a3 3 0 0 1-3 3"/>',
    terminal: '<path d="M4 4h16v16H4z"/><path d="M8 9l3 3-3 3"/><path d="M13 15h4"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><circle cx="7" cy="7.5" r="0.6"/><circle cx="7" cy="16.5" r="0.6"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
    palette: '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10.5" r="1.1"/><circle cx="12" cy="8" r="1.1"/><circle cx="15.5" cy="10.5" r="1.1"/><path d="M12 21a2 2 0 0 1-2-2c0-1 .8-1.5.8-2.5S10 15 12 15h4a3 3 0 0 0 3-3 9 9 0 1 0-7 9z"/>',
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8M8 9h2"/>',
    workflow: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/><path d="M9.5 10v4a2 2 0 0 0 2 2h2.5"/>',
    cloud: '<path d="M7 18a4.5 4.5 0 0 1-.5-9 5.5 5.5 0 0 1 10.6-1.8A4 4 0 0 1 17 18H7z"/>',
    excel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9l8 8M16 9l-8 8"/>',
    powerbi: '<path d="M5 20V10M11 20V4M17 20v-7"/>',
    automate: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  };

  /* =====================================================
     IMAGE LOADING (apply config-driven images + graceful fallbacks)
  ===================================================== */
  function applyConfig() {
    const favicon = document.getElementById("favicon");
    if (favicon && isUsableUrl(PORTFOLIO_CONFIG.assets.tabIcon)) favicon.setAttribute("href", PORTFOLIO_CONFIG.assets.tabIcon);

    const heroPhoto = document.getElementById("heroPhoto");
    if (heroPhoto && isUsableUrl(PORTFOLIO_CONFIG.assets.profileImage)) {
      heroPhoto.src = PORTFOLIO_CONFIG.assets.profileImage;
      heroPhoto.onerror = () => {
        heroPhoto.closest(".hero-photo").innerHTML = '<span class="hero-photo-fallback">HR</span>';
      };
    }

    const hireMe = document.getElementById("hireMeBtn");
    if (hireMe && isUsableUrl(PORTFOLIO_CONFIG.links.linkedin)) hireMe.href = PORTFOLIO_CONFIG.links.linkedin;

    const linkedinPill = document.getElementById("linkedinPill");
    if (linkedinPill && isUsableUrl(PORTFOLIO_CONFIG.links.linkedin)) linkedinPill.href = PORTFOLIO_CONFIG.links.linkedin;

    const dropMail = document.getElementById("dropMailBtn");
    if (dropMail && PORTFOLIO_CONFIG.identity.email) dropMail.href = mailtoUrl(PORTFOLIO_CONFIG.identity.email);

    const footerEmail = document.getElementById("footerEmail");
    if (footerEmail && PORTFOLIO_CONFIG.identity.email) footerEmail.href = mailtoUrl(PORTFOLIO_CONFIG.identity.email);

    const footerLinkedin = document.getElementById("footerLinkedin");
    if (footerLinkedin && isUsableUrl(PORTFOLIO_CONFIG.links.linkedin)) footerLinkedin.href = PORTFOLIO_CONFIG.links.linkedin;

    const footerNaukri = document.getElementById("footerNaukri");
    if (footerNaukri && isUsableUrl(PORTFOLIO_CONFIG.links.naukri)) footerNaukri.href = PORTFOLIO_CONFIG.links.naukri;

    const footerGithub = document.getElementById("footerGithub");
    if (footerGithub && isUsableUrl(PORTFOLIO_CONFIG.links.github)) footerGithub.href = PORTFOLIO_CONFIG.links.github;

    const footerInstagram = document.getElementById("footerInstagram");
    if (footerInstagram && isUsableUrl(PORTFOLIO_CONFIG.links.instagram)) footerInstagram.href = PORTFOLIO_CONFIG.links.instagram;

    // No trailing period after the year, per request.
    const footerCopyright = document.getElementById("footerCopyright");
    if (footerCopyright) footerCopyright.textContent = `© ${new Date().getFullYear()}`;
  }

  /* =====================================================
     DEEPFOCUS (toolkit loop + tone-coded tiles)
  ===================================================== */
  function renderSkills() {
    const track = document.getElementById("skillsTrack");
    if (!track) return;
    const flat = [];
    Object.entries(PORTFOLIO_CONFIG.skills).forEach(([category, items]) => {
      items.forEach((item) => flat.push({ ...item, category }));
    });
    const lazy = PORTFOLIO_CONFIG.loading.imageLazyLoading;
    const chipHTML = (item) => `
      <div class="skill-chip">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[item.icon] || ICONS.code}</svg>
        <span>${item.name}</span>
        <span class="cat">${item.category}</span>
      </div>`;
    track.innerHTML = flat.map(chipHTML).join("") + flat.map(chipHTML).join("");
    void lazy; // chips use inline SVG, not <img>, so lazy-loading doesn't apply here
  }

  function renderDeepFocus() {
    const el = document.getElementById("skillsHighlightRow");
    if (!el) return;
    el.innerHTML = PORTFOLIO_CONFIG.deepFocus
      .map((item) => {
        const tag = item.url ? "a" : "div";
        const attrs = item.url ? `href="${item.url}" target="_blank" rel="noopener noreferrer"` : "";
        return `
        <${tag} class="skill-highlight skill-highlight--${item.tone} reveal-up" ${attrs}>
          <span class="skill-highlight-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[item.icon] || ""}</svg>
          </span>
          <span class="skill-highlight-eyebrow">Deep Focus</span>
          <span class="skill-highlight-name">${item.name}</span>
          <p>${item.blurb}</p>
        </${tag}>`;
      })
      .join("");
  }

  /* =====================================================
     EDUCATION / EXPERIENCE (racetrack render + measured progress line)
  ===================================================== */
  function logoMarkup(entry, fallbackText) {
    const initials = fallbackText.slice(0, 2).toUpperCase();
    const url = entry.logoKey ? PORTFOLIO_CONFIG.assets.logos[entry.logoKey] : null;
    const lazyAttr = PORTFOLIO_CONFIG.loading.imageLazyLoading ? 'loading="lazy" decoding="async"' : "";
    if (url && isUsableUrl(url)) {
      return `<div class="track-logo"><img src="${url}" alt="${fallbackText} logo" ${lazyAttr} draggable="false" onerror="this.parentElement.innerHTML='${initials}'" /></div>`;
    }
    return `<div class="track-logo">${initials}</div>`;
  }

  function renderRacetrack(containerId, entries) {
    const el = document.getElementById(containerId);
    if (!el || !entries) return;

    const nodeHTML = (entry) => `
      <div class="track-node reveal-up">
        ${logoMarkup(entry, entry.institution)}
        <span class="track-period">${entry.period}</span>
        <span class="track-name">${entry.name}</span>
        <span class="track-sub">${entry.institution}</span>
        <span class="track-desc">${entry.description || ""}</span>
      </div>`;

    const listNodeHTML = (entry) => `
      <div class="track-node reveal-up">
        ${logoMarkup(entry, entry.institution)}
        <div class="track-meta">
          <span class="track-period">${entry.period}</span>
          <span class="track-name">${entry.name}</span>
          <span class="track-sub">${entry.institution}</span>
          <span class="track-desc">${entry.description || ""}</span>
        </div>
      </div>`;

    el.innerHTML = `
      <div class="track-line" aria-hidden="true"></div>
      <div class="track-progress" aria-hidden="true"></div>
      <div class="track-row">${entries.map(nodeHTML).join("")}</div>
      <div class="track-list">${entries.map(listNodeHTML).join("")}</div>
    `;

    positionTrackProgress(containerId);
  }

  // Measures the actual first/last .track-logo centers so the connecting
  // line always terminates exactly at the logos — never over/undershoots,
  // regardless of container padding, node count, or screen size.
  const trackObservers = {};
  function positionTrackProgress(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const row = el.querySelector(".track-row");
    const line = el.querySelector(".track-line");
    const progress = el.querySelector(".track-progress");
    if (!row || !line || !progress) return;

    const logos = row.querySelectorAll(".track-logo");
    if (logos.length < 2) return;

    const containerRect = el.getBoundingClientRect();
    const firstRect = logos[0].getBoundingClientRect();
    const lastRect = logos[logos.length - 1].getBoundingClientRect();

    const firstCenter = firstRect.left + firstRect.width / 2 - containerRect.left;
    const lastCenter = lastRect.left + lastRect.width / 2 - containerRect.left;
    const left = Math.min(firstCenter, lastCenter);
    const width = Math.abs(lastCenter - firstCenter);

    line.style.left = left + "px";
    line.style.width = width + "px";
    line.style.opacity = "1";
    progress.style.left = left + "px";
    progress.style.width = width + "px";
    progress.classList.add("is-ready");

    // Animate the fill in like a real progress draw, once scrolled into view.
    if (!trackObservers[containerId] && "IntersectionObserver" in window) {
      trackObservers[containerId] = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              progress.classList.add("is-drawn");
              trackObservers[containerId].disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      trackObservers[containerId].observe(el);
    } else if (!("IntersectionObserver" in window)) {
      progress.classList.add("is-drawn");
    }
  }

  function repositionAllTracks() {
    positionTrackProgress("educationTrack");
    positionTrackProgress("experienceTrack");
  }

  /* =====================================================
     PROJECTS
  ===================================================== */
  function renderProjects() {
    const el = document.getElementById("projectGrid");
    if (!el) return;
    const lazyAttr = PORTFOLIO_CONFIG.loading.imageLazyLoading ? 'loading="lazy" decoding="async"' : "";

    el.innerHTML = PORTFOLIO_CONFIG.projects
      .map((project, i) => {
        const imageUrl = project.imageKey ? PORTFOLIO_CONFIG.assets.projectImages[project.imageKey] : null;
        const placeholderClass = i % 2 === 0 ? "project-image--placeholder-1" : "project-image--placeholder-2";
        const imageHTML =
          imageUrl && isUsableUrl(imageUrl)
            ? `<img src="${imageUrl}" alt="${project.name}" ${lazyAttr} draggable="false" onerror="this.parentElement.className='project-image ${placeholderClass}';this.remove();" />`
            : "";
        const href = project.url && project.url !== "#" ? project.url : "#";
        const linkAttrs = href !== "#" ? `target="_blank" rel="noopener noreferrer"` : "";

        return `
        <a class="project-card reveal-up" href="${href}" ${linkAttrs}>
          <div class="project-image ${imageUrl ? "" : placeholderClass}">${imageHTML}</div>
          <div class="project-overlay">
            <span class="project-name">${project.name}</span>
            <span class="project-desc">${project.description || ""}</span>
          </div>
        </a>`;
      })
      .join("");
  }

  /* =====================================================
     THEME
  ===================================================== */
  function initTheme() {
    const toggle = document.getElementById("themeToggle");
    const root = document.body;
    let stored = null;
    try { stored = localStorage.getItem("hr-theme"); } catch (e) {}

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    root.setAttribute("data-theme", initial);
    if (toggle) toggle.setAttribute("aria-checked", initial === "dark" ? "true" : "false");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      toggle.setAttribute("aria-checked", next === "dark" ? "true" : "false");
      toggle.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
      try { localStorage.setItem("hr-theme", next); } catch (e) {}
    });
  }

  /* =====================================================
     NAVIGATION (header scroll state, active link, sliding underline, smooth scroll)
  ===================================================== */
  function initScrollChrome() {
    const header = document.getElementById("siteHeader");
    const signal = document.getElementById("signalFill");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-menu a");
    const sections = document.querySelectorAll("[data-section]");
    const root = document.documentElement;

    let ticking = false;
    let lastY = window.scrollY;
    let blurTimeout = null;

    function update() {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 40);

      if (signal) {
        const doc = document.documentElement;
        const total = doc.scrollHeight - doc.clientHeight;
        signal.style.height = (total > 0 ? Math.min(100, (y / total) * 100) : 0) + "%";
      }

      const delta = Math.abs(y - lastY);
      lastY = y;
      const blurAmount = Math.min(delta * 0.012, 1.2);
      root.style.setProperty("--scroll-blur", blurAmount + "px");
      clearTimeout(blurTimeout);
      blurTimeout = setTimeout(() => root.style.setProperty("--scroll-blur", "0px"), 100);

      let activeId = null;
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) activeId = sec.dataset.section;
      });
      if (activeId) {
        navLinks.forEach((link) => link.classList.toggle("active", link.dataset.nav === activeId));
        if (!window.__navHovering) positionIndicatorToActive();
      }
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  // Shared sliding hover-underline — deliberately scoped to `.nav-link` ONLY,
  // so the Resume button (`.nav-cta`) never receives it (it keeps its own
  // separate pill hover style defined in CSS).
  function initNavIndicator() {
    const nav = document.getElementById("primaryNav");
    const indicator = document.getElementById("navIndicator");
    if (!nav || !indicator) return;

    function position(el) {
      if (!el) { indicator.style.opacity = "0"; return; }
      indicator.style.left = el.offsetLeft + "px";
      indicator.style.width = el.offsetWidth + "px";
      indicator.style.opacity = "1";
    }

    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        window.__navHovering = true;
        position(link);
      });
    });
    nav.addEventListener("mouseleave", () => {
      window.__navHovering = false;
      positionIndicatorToActive();
    });
    window.addEventListener("resize", () => positionIndicatorToActive());

    window.__positionNavIndicator = position;
    positionIndicatorToActive();
  }
  function positionIndicatorToActive() {
    const nav = document.getElementById("primaryNav");
    if (!nav || !window.__positionNavIndicator) return;
    const active = nav.querySelector(".nav-link.active");
    window.__positionNavIndicator(active);
  }

  function initMorphNav() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();

        const scrollToTarget = () => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, "", id);
        };

        if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          document.startViewTransition(() => scrollToTarget());
        } else {
          scrollToTarget();
        }
      });
    });
  }

  function initMobileMenu() {
    const btn = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    const close = () => {
      btn.classList.remove("is-open");
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    const open = () => {
      btn.classList.add("is-open");
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    btn.addEventListener("click", () => (menu.classList.contains("is-open") ? close() : open()));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* =====================================================
     HOME (marquee font-ready gating + entry animation + scroll reveal)
  ===================================================== */
  function initMarqueeFontGate() {
    const root = document.documentElement;
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      root.classList.add("fonts-ready");
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(settle).catch(settle);
    }
    // Safety net: never let a font-loading edge case block the marquee forever.
    setTimeout(settle, 1200);
  }

  function initReveal() {
    const targets = document.querySelectorAll(".reveal-up:not(.is-visible), .reveal-mask:not(.is-visible)");
    if (!("IntersectionObserver" in window) || targets.length === 0) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((t) => { if (!t.closest(".hero")) io.observe(t); });
  }

  function playEntryAnimation() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const targets = hero.querySelectorAll(".reveal-up, .reveal-mask");
    targets.forEach((el, i) => {
      el.style.transitionDelay = `${i * 90}ms`;
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-visible")));
    });
  }

  function initPreloader() {
    const pre = document.getElementById("preloader");
    const bar = document.getElementById("preloaderBar");
    const msgEl = document.getElementById("preloaderMessage");
    if (!pre || !bar) {
      playEntryAnimation();
      return;
    }

    const messages = [
      "Politely arguing with a PM about spacing…",
      "Blaming the developers for it instead…",
      "Asking NASA for the internet speed...",
    ];
    let msgIndex = 0;
    const TOTAL_MS = 5000;
    const msgTimer = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      if (msgEl) {
        msgEl.style.opacity = "0";
        setTimeout(() => {
          msgEl.textContent = messages[msgIndex];
          msgEl.style.opacity = "1";
        }, 180);
      }
    }, TOTAL_MS / messages.length);

    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(100, (elapsed / (TOTAL_MS - 300)) * 100);
      bar.style.width = progress + "%";
      if (elapsed < TOTAL_MS - 300) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    const hide = () => {
      clearInterval(msgTimer);
      bar.style.width = "100%";
      pre.classList.add("is-hidden");
      playEntryAnimation();
    };

    setTimeout(hide, TOTAL_MS);
  }

  /* =====================================================
     RESUME (PDF-first preview, timed fallback to image, zoom, download, shortcuts)
  ===================================================== */
  let resumeFrameRequested = false;
  let resumeZoom = 1;

  function applyResumeZoom() {
    const layer = document.getElementById("resumeZoomLayer");
    const label = document.getElementById("resumeZoomLevel");
    if (layer) layer.style.transform = `scale(${resumeZoom})`;
    if (label) label.textContent = Math.round(resumeZoom * 100) + "%";
  }
  function setResumeZoom(next) {
    const cfg = PORTFOLIO_CONFIG.resume;
    resumeZoom = Math.min(cfg.zoomMax, Math.max(cfg.zoomMin, next));
    applyResumeZoom();
  }
  function resetResumeZoom() {
    resumeZoom = 1;
    applyResumeZoom();
  }

  function showResumeFallbackImage(statusEl, frame, img) {
    frame.hidden = true;
    const previewImage = PORTFOLIO_CONFIG.resume.previewImage;
    if (isUsableUrl(previewImage)) {
      img.onload = () => { statusEl.hidden = true; img.hidden = false; };
      img.onerror = () => {
        statusEl.textContent = "Couldn't load the resume preview. Use Download instead.";
        statusEl.classList.add("is-error");
      };
      img.src = previewImage;
    } else {
      statusEl.textContent = "Preview unavailable right now — use Download instead.";
      statusEl.classList.add("is-error");
    }
  }

  function openResumeModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById("resumeModal");
    const frame = document.getElementById("resumeModalFrame");
    const img = document.getElementById("resumeModalImage");
    const statusEl = document.getElementById("resumeModalStatus");
    if (!modal || !frame || !statusEl || !img) return;

    resetResumeZoom();

    if (!resumeFrameRequested) {
      resumeFrameRequested = true;
      statusEl.textContent = "Loading resume…";
      statusEl.classList.remove("is-error");
      statusEl.hidden = false;
      frame.hidden = true;
      img.hidden = true;

      let settled = false;
      const timeoutMs = PORTFOLIO_CONFIG.resume.pdfLoadTimeout || 3000;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        showResumeFallbackImage(statusEl, frame, img);
      }, timeoutMs);

      frame.onload = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        statusEl.hidden = true;
        frame.hidden = false;
      };
      frame.onerror = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        showResumeFallbackImage(statusEl, frame, img);
      };

      if (isHttpsUrl(PORTFOLIO_CONFIG.resume.pdf)) {
        frame.setAttribute("src", PORTFOLIO_CONFIG.resume.pdf);
      } else {
        clearTimeout(timer);
        showResumeFallbackImage(statusEl, frame, img);
      }
    }

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }

  function closeResumeModal() {
    const modal = document.getElementById("resumeModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { modal.hidden = true; }, 350);
  }

  async function downloadResume() {
    const pdf = PORTFOLIO_CONFIG.resume.pdf;
    if (!isHttpsUrl(pdf)) return false;
    try {
      const res = await fetch(pdf);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = PORTFOLIO_CONFIG.resume.fileName || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      return true;
    } catch (err) {
      window.open(pdf, "_blank", "noopener,noreferrer");
      return true;
    }
  }

  function initResumeModal() {
    const modal = document.getElementById("resumeModal");
    const backdrop = document.getElementById("resumeModalBackdrop");
    const closeBtn = document.getElementById("resumeModalClose");
    const downloadBtn = document.getElementById("resumeModalDownload");
    const zoomInBtn = document.getElementById("resumeZoomIn");
    const zoomOutBtn = document.getElementById("resumeZoomOut");
    const zoomResetBtn = document.getElementById("resumeZoomReset");
    const viewport = document.getElementById("resumeViewport");
    const triggers = [
      document.getElementById("resumeNavTrigger"),
      document.getElementById("resumeNavTriggerMobile"),
      document.getElementById("resumeHeroTrigger"),
    ].filter(Boolean);
    if (!modal) return;

    triggers.forEach((t) => t.addEventListener("click", openResumeModal));
    if (backdrop) backdrop.addEventListener("click", closeResumeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeResumeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeResumeModal();
    });

    const step = PORTFOLIO_CONFIG.resume.zoomStep;
    if (zoomInBtn) zoomInBtn.addEventListener("click", () => setResumeZoom(resumeZoom + step));
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => setResumeZoom(resumeZoom - step));
    if (zoomResetBtn) zoomResetBtn.addEventListener("click", resetResumeZoom);

    // Mouse-wheel zoom on PC, only while hovering the resume viewport, and
    // only while the modal is open — never hijacks normal page scrolling.
    if (viewport) {
      viewport.addEventListener(
        "wheel",
        (e) => {
          if (!modal.classList.contains("is-open")) return;
          e.preventDefault();
          const direction = e.deltaY < 0 ? 1 : -1;
          setResumeZoom(resumeZoom + direction * step);
        },
        { passive: false }
      );
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", async () => {
        downloadBtn.setAttribute("disabled", "true");
        await downloadResume();
        downloadBtn.removeAttribute("disabled");
      });
    }
  }

  /* =====================================================
     KEYBOARD SHORTCUTS (fully data-driven from PORTFOLIO_CONFIG.keyboardShortcuts)
  ===================================================== */
  function matchesCombo(e, combo) {
    const key = (e.key || "").toLowerCase();
    return (
      !!e.ctrlKey === !!combo.ctrl &&
      !!e.altKey === !!combo.alt &&
      !!e.shiftKey === !!combo.shift &&
      !!e.metaKey === !!combo.meta &&
      key === combo.key.toLowerCase()
    );
  }

  function runShortcutAction(shortcut) {
    switch (shortcut.action) {
      case "openResumeModal":
        openResumeModal();
        break;
      case "downloadResume":
        downloadResume();
        break;
      case "openUrl": {
        const url = resolveConfigPath(shortcut.url);
        if (isUsableUrl(url)) window.open(url, "_blank", "noopener,noreferrer");
        break;
      }
      default:
        break;
    }
  }

  function initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (isTypingTarget(e.target)) return; // never hijack normal typing

      for (const shortcut of PORTFOLIO_CONFIG.keyboardShortcuts) {
        if (!shortcut.enabled) continue;
        if (matchesCombo(e, shortcut.combo)) {
          e.preventDefault();
          runShortcutAction(shortcut);
          return;
        }
      }
    });
  }

  /* =====================================================
     CONTACT FORM (custom validation messages + Google Sheets backend)
  ===================================================== */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const status = document.getElementById("formStatus");
    const submitBtn = document.getElementById("formSubmit");
    const fields = {
      name: document.getElementById("fName"),
      email: document.getElementById("fEmail"),
      message: document.getElementById("fMessage"),
    };
    const msgs = {
      name: document.getElementById("fNameMsg"),
      email: document.getElementById("fEmailMsg"),
      message: document.getElementById("fMessageMsg"),
    };
    // Custom per-field messages, as requested.
    const REQUIRED_MESSAGES = {
      name: "Please enter your name",
      email: "Enter a valid mail address",
      message: "Leave me a message here.",
    };
    let isSubmitting = false;

    function validateField(key) {
      const input = fields[key];
      const wrap = input.closest(".field");
      let valid = true;

      if (!input.value.trim()) {
        valid = false;
      } else if (key === "email") {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(input.value.trim())) valid = false;
      }

      wrap.classList.toggle("is-valid", valid);
      msgs[key].textContent = valid ? "" : REQUIRED_MESSAGES[key];
      return valid;
    }
    Object.keys(fields).forEach((key) => fields[key].addEventListener("blur", () => validateField(key)));

    async function submitToGoogleSheets(payload) {
      const endpoint = PORTFOLIO_CONFIG.backend.scriptUrl;
      if (!endpoint || !isHttpsUrl(endpoint)) throw new Error("endpoint-not-configured");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("network-error");
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message || "server-error");
      return data;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      const allValid = Object.keys(fields).map(validateField).every(Boolean);
      if (!allValid) {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status is-error";
        return;
      }

      isSubmitting = true;
      submitBtn.classList.add("is-loading");
      submitBtn.setAttribute("disabled", "true");
      status.textContent = "Sending…";
      status.className = "form-status";

      const payload = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        message: fields.message.value.trim(),
      };

      try {
        await submitToGoogleSheets(payload);
        status.textContent = "We'll get in touch soon !";
        status.className = "form-status is-success";
        form.reset();
        Object.values(fields).forEach((f) => f.closest(".field").classList.remove("is-valid"));
      } catch (err) {
        if (err && err.message === "endpoint-not-configured") {
          window.location.href = mailtoUrl(
            PORTFOLIO_CONFIG.identity.email,
            `Portfolio message from ${payload.name}`,
            `${payload.message}\n\n— ${payload.name} (${payload.email})`
          );
          status.textContent = "Backend not connected yet — opening your email app instead.";
          status.className = "form-status";
        } else if (!navigator.onLine) {
          status.textContent = "You're offline — please check your connection and try again.";
          status.className = "form-status is-error";
        } else {
          status.textContent = "Something went wrong. Please try again in a moment.";
          status.className = "form-status is-error";
        }
      } finally {
        isSubmitting = false;
        submitBtn.classList.remove("is-loading");
        submitBtn.removeAttribute("disabled");
      }
    });
  }

  /* =====================================================
     IMAGE LOADING (drag-disable, global fallback net)
  ===================================================== */
  function initImageSafety() {
    // Belt-and-suspenders on top of the draggable="false" attributes already
    // in the markup — covers any image added later without one.
    document.addEventListener("dragstart", (e) => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });
  }

  /* =====================================================
     NAVIGATION — always start at Home on a normal refresh
  ===================================================== */
  function initScrollRestoration() {
    if ("scrollRestoration" in history) {
      try { history.scrollRestoration = "manual"; } catch (e) {}
    }
    window.addEventListener("load", () => {
      window.scrollTo(0, 0);
      // Clear any stale hash from the address bar without adding a history entry.
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  }

  /* =====================================================
     ERROR HANDLING (silent, non-blocking, no debug info shown to visitors)
  ===================================================== */
  function initErrorHandling() {
    window.addEventListener("error", (e) => {
      console.warn("[portfolio] runtime error caught:", e.error || e.message);
    });
    window.addEventListener("unhandledrejection", (e) => {
      console.warn("[portfolio] unhandled promise rejection caught:", e.reason);
    });
  }

  function initOfflineState() {
    const overlay = document.getElementById("offlineState");
    const retry = document.getElementById("retryConnection");
    if (!overlay) return;
    function show() { overlay.hidden = false; overlay.classList.add("is-visible"); }
    function hide() { overlay.hidden = true; overlay.classList.remove("is-visible"); }
    window.addEventListener("offline", show);
    window.addEventListener("online", hide);
    if (!navigator.onLine) show();
    if (retry) {
      retry.addEventListener("click", () => {
        if (navigator.onLine) hide();
        else { retry.textContent = "Still offline…"; setTimeout(() => (retry.textContent = "Retry"), 1200); }
      });
    }
  }

  function initNotFoundState() {
    const overlay = document.getElementById("notFoundState");
    if (!overlay) return;
    const validHashes = ["", "#home", "#about", "#education", "#experience", "#projects", "#contact", "#skills"];
    function check() {
      const hash = window.location.hash;
      const isInvalid = !validHashes.includes(hash);
      overlay.hidden = !isInvalid;
      overlay.classList.toggle("is-visible", isInvalid);
    }
    window.addEventListener("hashchange", check);
    check();
  }

  function initContextMenuBlock() {
    // UX deterrent only — this does not and cannot provide real code protection.
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  /* =====================================================
     INIT — every system fails gracefully and independently
  ===================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    safe(initErrorHandling);
    safe(initScrollRestoration);
    safe(applyConfig);
    safe(initContextMenuBlock);
    safe(initImageSafety);
    safe(renderSkills);
    safe(renderDeepFocus);
    safe(() => renderRacetrack("educationTrack", PORTFOLIO_CONFIG.education));
    safe(() => renderRacetrack("experienceTrack", PORTFOLIO_CONFIG.experience));
    safe(renderProjects);
    safe(initPreloader);
    safe(initMarqueeFontGate);
    safe(initTheme);
    safe(initScrollChrome);
    safe(initNavIndicator);
    safe(initMorphNav);
    safe(initMobileMenu);
    safe(initReveal);
    safe(initContactForm);
    safe(initResumeModal);
    safe(initKeyboardShortcuts);
    safe(initOfflineState);
    safe(initNotFoundState);

    window.addEventListener("resize", () => {
      clearTimeout(window.__resizeTimer);
      window.__resizeTimer = setTimeout(repositionAllTracks, 150);
    });
  });
})();
