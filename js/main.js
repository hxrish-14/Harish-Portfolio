(() => {
  "use strict";

  const CONFIG = window.PORTFOLIO_CONFIG || {};
  const DATA = window.PORTFOLIO_DATA || {};

  /* ==========================================================================
     SMALL UTILITIES
     ========================================================================== */
  function isHttpsUrl(url) {
    return typeof url === "string" && /^https:\/\//i.test(url);
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

  /* ==========================================================================
     APPLY CONFIG — favicon, links that come straight from config values
     ========================================================================== */
  function applyConfig() {
    const favicon = document.getElementById("favicon");
    if (favicon && isHttpsUrl(CONFIG.TAB_ICON_URL)) favicon.setAttribute("href", CONFIG.TAB_ICON_URL);

    const heroPhoto = document.getElementById("heroPhoto");
    if (heroPhoto && isHttpsUrl(CONFIG.PROFILE_IMAGE_URL)) {
      heroPhoto.src = CONFIG.PROFILE_IMAGE_URL;
      heroPhoto.onerror = () => {
        heroPhoto.closest(".hero-photo").innerHTML =
          '<span class="hero-photo-fallback">HR</span>';
      };
    }

    const hireMe = document.getElementById("hireMeBtn");
    if (hireMe && isHttpsUrl(CONFIG.LINKEDIN_URL)) hireMe.href = CONFIG.LINKEDIN_URL;

    const linkedinPill = document.getElementById("linkedinPill");
    if (linkedinPill && isHttpsUrl(CONFIG.LINKEDIN_URL)) linkedinPill.href = CONFIG.LINKEDIN_URL;

    const dropMail = document.getElementById("dropMailBtn");
    if (dropMail && CONFIG.EMAIL) dropMail.href = mailtoUrl(CONFIG.EMAIL);

    const footerEmail = document.getElementById("footerEmail");
    if (footerEmail && CONFIG.EMAIL) footerEmail.href = mailtoUrl(CONFIG.EMAIL);

    const footerLinkedin = document.getElementById("footerLinkedin");
    if (footerLinkedin && isHttpsUrl(CONFIG.LINKEDIN_URL)) footerLinkedin.href = CONFIG.LINKEDIN_URL;

    const footerNaukri = document.getElementById("footerNaukri");
    if (footerNaukri && isHttpsUrl(CONFIG.NAUKRI_URL)) footerNaukri.href = CONFIG.NAUKRI_URL;

    const footerGithub = document.getElementById("footerGithub");
    if (footerGithub && isHttpsUrl(CONFIG.GITHUB_URL)) footerGithub.href = CONFIG.GITHUB_URL;

    const footerInstagram = document.getElementById("footerInstagram");
    if (footerInstagram && isHttpsUrl(CONFIG.INSTAGRAM_URL)) footerInstagram.href = CONFIG.INSTAGRAM_URL;

    const footerCopyright = document.getElementById("footerCopyright");
    if (footerCopyright) footerCopyright.textContent = `© ${new Date().getFullYear()} .`;
  }

  /* ==========================================================================
     RENDER: SKILLS LOOP + DEEP FOCUS
     ========================================================================== */
  function renderSkills() {
    const track = document.getElementById("skillsTrack");
    if (!track || !DATA.skills) return;
    const flat = [];
    Object.entries(DATA.skills).forEach(([category, items]) => {
      items.forEach((item) => flat.push({ ...item, category }));
    });
    const chipHTML = (item) => `
      <div class="skill-chip">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[item.icon] || ICONS.code}</svg>
        <span>${item.name}</span>
        <span class="cat">${item.category}</span>
      </div>`;
    track.innerHTML = flat.map(chipHTML).join("") + flat.map(chipHTML).join("");
  }

  function renderDeepFocus() {
    const el = document.getElementById("skillsHighlightRow");
    if (!el || !DATA.deepFocus) return;
    el.innerHTML = DATA.deepFocus
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

  /* ==========================================================================
     RENDER: RACETRACK (education + experience) with green progress line
     ========================================================================== */
  function logoMarkup(entry, fallbackText) {
    const initials = fallbackText.slice(0, 2).toUpperCase();
    const url = entry.logoKey ? CONFIG.LOGOS && CONFIG.LOGOS[entry.logoKey] : null;
    if (url && isHttpsUrl(url)) {
      return `<div class="track-logo"><img src="${url}" alt="${fallbackText} logo" loading="lazy" onerror="this.parentElement.innerHTML='${initials}'" /></div>`;
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
  }

  /* ==========================================================================
     RENDER: PROJECTS
     ========================================================================== */
  function renderProjects() {
    const el = document.getElementById("projectGrid");
    if (!el || !DATA.projects) return;

    el.innerHTML = DATA.projects
      .map((project, i) => {
        const imageUrl = project.imageKey && CONFIG.PROJECT_IMAGES ? CONFIG.PROJECT_IMAGES[project.imageKey] : null;
        const placeholderClass = i % 2 === 0 ? "project-image--placeholder-1" : "project-image--placeholder-2";
        const imageHTML =
          imageUrl && isHttpsUrl(imageUrl)
            ? `<img src="${imageUrl}" alt="${project.name}" loading="lazy" onerror="this.parentElement.className='project-image ${placeholderClass}';this.remove();" />`
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

  /* ==========================================================================
     RIGHT-CLICK DISABLED (UX deterrent only, not real protection)
     ========================================================================== */
  function initContextMenuBlock() {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  /* ==========================================================================
     MINIMAL CURSOR-SHADOW GLOW (system cursor stays completely normal)
     ========================================================================== */
  function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow) return;
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reduced) return;

    let ticking = false;
    let lastX = 0, lastY = 0;

    window.addEventListener(
      "mousemove",
      (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        document.body.classList.add("cursor-glow-active");
        if (!ticking) {
          requestAnimationFrame(() => {
            glow.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%)`;
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
    document.addEventListener("mouseleave", () => document.body.classList.remove("cursor-glow-active"));
  }

  /* ==========================================================================
     PRELOADER — ~5s total, cycling messages, swipe-up reveal
     ========================================================================== */
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

  function playEntryAnimation() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const targets = hero.querySelectorAll(".reveal-up, .reveal-mask");
    targets.forEach((el, i) => {
      el.style.transitionDelay = `${i * 90}ms`;
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-visible")));
    });
  }

  /* ==========================================================================
     THEME TOGGLE
     ========================================================================== */
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

  /* ==========================================================================
     HEADER SCROLL STATE + SIGNAL RAIL + ACTIVE NAV + NAV INDICATOR + MOTION BLUR
     ========================================================================== */
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

      // Motion blur kept intentionally subtle — a barely-there settle, not a smear
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

  /* ---------- Direction-aware sliding nav indicator ---------- */
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

    nav.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
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

  /* ==========================================================================
     MORPH-STYLE SECTION NAVIGATION — clean scroll positioning via scroll-margin-top
     ========================================================================== */
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

  /* ==========================================================================
     MOBILE MENU
     ========================================================================== */
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

  /* ==========================================================================
     SCROLL REVEAL (handles both static + dynamically-rendered content)
     ========================================================================== */
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

  /* ==========================================================================
     CONTACT FORM — submits to Google Sheets via Apps Script Web App
     ========================================================================== */
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
    let isSubmitting = false;

    function validateField(key) {
      const input = fields[key];
      const wrap = input.closest(".field");
      let valid = true, message = "";
      if (!input.value.trim()) {
        valid = false; message = "This field is required.";
      } else if (key === "email") {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(input.value.trim())) { valid = false; message = "Enter a valid email address."; }
      }
      wrap.classList.toggle("is-valid", valid);
      msgs[key].textContent = valid ? "" : message;
      return valid;
    }
    Object.keys(fields).forEach((key) => fields[key].addEventListener("blur", () => validateField(key)));

    async function submitToGoogleSheets(payload) {
      const endpoint = CONFIG.BACKEND_SCRIPT_URL;
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
            CONFIG.EMAIL,
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

  /* ==========================================================================
     RESUME — modal preview + real download (shared by clicks AND shortcuts)
     ========================================================================== */
  let resumeFrameRequested = false;

  function openResumeModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById("resumeModal");
    const frame = document.getElementById("resumeModalFrame");
    const statusEl = document.getElementById("resumeModalStatus");
    if (!modal || !frame || !statusEl) return;

    if (!resumeFrameRequested) {
      resumeFrameRequested = true;
      statusEl.textContent = "Loading resume…";
      statusEl.classList.remove("is-error");
      statusEl.hidden = false;
      frame.hidden = true;

      const timeout = setTimeout(() => {
        statusEl.textContent = "The preview is taking a while — you can still download it directly.";
        statusEl.classList.add("is-error");
      }, 6000);

      frame.onload = () => { clearTimeout(timeout); statusEl.hidden = true; frame.hidden = false; };
      frame.onerror = () => {
        clearTimeout(timeout);
        statusEl.textContent = "Couldn't load the preview. Use Download instead.";
        statusEl.classList.add("is-error");
      };
      if (isHttpsUrl(CONFIG.RESUME_URL)) frame.setAttribute("src", CONFIG.RESUME_URL);
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
    if (!isHttpsUrl(CONFIG.RESUME_URL)) return false;
    try {
      const res = await fetch(CONFIG.RESUME_URL);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = CONFIG.RESUME_FILE_NAME || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      return true;
    } catch (err) {
      // Cross-origin fetch blocked or offline — open the file directly instead
      window.open(CONFIG.RESUME_URL, "_blank", "noopener,noreferrer");
      return true;
    }
  }

  function initResumeModal() {
    const modal = document.getElementById("resumeModal");
    const backdrop = document.getElementById("resumeModalBackdrop");
    const closeBtn = document.getElementById("resumeModalClose");
    const downloadBtn = document.getElementById("resumeModalDownload");
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

    if (downloadBtn) {
      downloadBtn.addEventListener("click", async () => {
        downloadBtn.setAttribute("disabled", "true");
        await downloadResume();
        downloadBtn.removeAttribute("disabled");
      });
    }
  }

  /* ==========================================================================
     KEYBOARD SHORTCUTS
     Ctrl+Shift+R  → open resume preview
     Ctrl+Shift+D  → download resume directly
     Ctrl+Alt+Shift+S → open configurable QUICK_OPEN_URL in a new tab
     Ctrl+Alt+S    → open Spotify playlist (no-op until configured)
     All four intentionally override default browser behaviour for those
     combinations on this page only; none of them are single-key shortcuts,
     so normal typing and browser navigation elsewhere are unaffected.
     ========================================================================== */
  function initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      const key = (e.key || "").toLowerCase();

      // Ctrl+Shift+D — download resume (checked before Ctrl+Shift+R; distinct key)
      if (e.ctrlKey && e.shiftKey && !e.altKey && key === "d") {
        e.preventDefault();
        downloadResume();
        return;
      }

      // Ctrl+Shift+R — open resume preview modal
      if (e.ctrlKey && e.shiftKey && !e.altKey && key === "r") {
        e.preventDefault();
        openResumeModal();
        return;
      }

      // Ctrl+Alt+Shift+S — open configurable URL in a new tab (checked before Ctrl+Alt+S)
      if (e.ctrlKey && e.altKey && e.shiftKey && key === "s") {
        e.preventDefault();
        if (isHttpsUrl(CONFIG.QUICK_OPEN_URL)) {
          window.open(CONFIG.QUICK_OPEN_URL, "_blank", "noopener,noreferrer");
        }
        return;
      }

      // Ctrl+Alt+S — open Spotify playlist (does nothing until configured)
      if (e.ctrlKey && e.altKey && !e.shiftKey && key === "s") {
        e.preventDefault();
        if (isHttpsUrl(CONFIG.SPOTIFY_PLAYLIST_URL)) {
          window.open(CONFIG.SPOTIFY_PLAYLIST_URL, "_blank", "noopener,noreferrer");
        }
        return;
      }
    });
  }

  /* ==========================================================================
     OFFLINE STATE
     ========================================================================== */
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

  /* ==========================================================================
     404 STATE
     ========================================================================== */
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

  /* ==========================================================================
     INIT — every system fails gracefully and independently
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    safe(applyConfig);
    safe(initContextMenuBlock);
    //safe(initCursorGlow);
    safe(renderSkills);
    safe(renderDeepFocus);
    safe(() => renderRacetrack("educationTrack", DATA.education));
    safe(() => renderRacetrack("experienceTrack", DATA.experience));
    safe(renderProjects);
    safe(initPreloader);
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
  });
})();
