(() => {
  "use strict";

  /* ==========================================================================
     CONTENT DATA ARCHITECTURE — single source of truth
     ========================================================================== */
  const portfolioData = {
    profile: {
      name: "Harish R",
      role: "MCA Student · Full-Stack Developer · Automation & Data Enthusiast",
    },
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
    education: [
      {
        period: "Completed",
        degree: "Master of Computer Applications (MCA)",
        institution: "Dr. M.G.R. Educational and Research Institute",
        note: "Postgraduate study in computer applications, deepening software development fundamentals.",
        logo: null,
      },
      {
        period: "Completed",
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Adhiparasakthi College of Arts and Science",
        note: "Undergraduate foundation across programming, systems and applications.",
        logo: null,
      },
    ],
    experience: [
      {
        period: "Current",
        role: "Secretary to VP",
        org: "Brakes India, TSF",
        note: "Supporting executive operations while building software skills alongside the role.",
        logo: null,
      },
      {
        period: "Apr – Jun 2025",
        role: "Full-Stack Python Developer Intern",
        org: "Kaashiv Infotech",
        note: "Hands-on internship working across the full stack with Python.",
        logo: null,
      },
    ],
    contact: {
      personalEmail: "harishramesh004@gmail.com",
      officialEmail: "623879@brakesindia.co.in",
    },
    social: {
      linkedin: "https://www.linkedin.com/in/harishr14/",
      github: "https://github.com/hxrish-14",
      instagram: "https://instagram.com/hxrish_14",
    },
    resume: {
      localPath: "assets/resume/Harish-R-Resume.pdf",
      driveUrl:
        "https://drive.google.com/file/d/145sxb6LXpRpaJuLGRbcVWzcke-rHk2r9/view?usp=sharing",
    },
  };

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
  };

  /* ==========================================================================
     RENDER: SKILLS LOOP
     ========================================================================== */
  function renderSkills() {
    const track = document.getElementById("skillsTrack");
    if (!track) return;

    const flat = [];
    Object.entries(portfolioData.skills).forEach(([category, items]) => {
      items.forEach((item) => flat.push({ ...item, category }));
    });

    const chipHTML = (item) => `
      <div class="skill-chip">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${
          ICONS[item.icon] || ICONS.code
        }</svg>
        <span>${item.name}</span>
        <span class="cat">${item.category}</span>
      </div>`;

    // duplicate track for seamless CSS-driven loop
    track.innerHTML = flat.map(chipHTML).join("") + flat.map(chipHTML).join("");
  }

  /* ==========================================================================
     RENDER: TIMELINES
     ========================================================================== */
  function logoMarkup(entry, fallbackText) {
    if (entry.logo) {
      return `<div class="tl-logo"><img src="${entry.logo}" alt="${fallbackText} logo" loading="lazy" onerror="this.closest('.tl-logo').innerHTML='${fallbackText
        .slice(0, 2)
        .toUpperCase()}'" /></div>`;
    }
    return `<div class="tl-logo">${fallbackText.slice(0, 2).toUpperCase()}</div>`;
  }

  function renderEducation() {
    const el = document.getElementById("educationTimeline");
    if (!el) return;
    el.innerHTML = portfolioData.education
      .map(
        (item) => `
      <li class="timeline-item reveal-up">
        <div class="tl-marker">
          <span class="tl-dot"></span>
          <span class="tl-period">${item.period}</span>
        </div>
        <div class="tl-content">
          <div class="tl-main">
            <h3>${item.degree}</h3>
            <p>${item.institution} — ${item.note}</p>
          </div>
          ${logoMarkup(item, item.institution)}
        </div>
      </li>`
      )
      .join("");
  }

  function renderExperience() {
    const el = document.getElementById("experienceTimeline");
    if (!el) return;
    el.innerHTML = portfolioData.experience
      .map(
        (item) => `
      <li class="timeline-item reveal-up">
        <div class="tl-marker">
          <span class="tl-dot"></span>
          <span class="tl-period">${item.period}</span>
        </div>
        <div class="tl-content">
          <div class="tl-main">
            <h3>${item.role}</h3>
            <p>${item.org} — ${item.note}</p>
          </div>
          ${logoMarkup(item, item.org)}
        </div>
      </li>`
      )
      .join("");
  }

  /* ==========================================================================
     PRELOADER
     ========================================================================== */
  function initPreloader() {
    const pre = document.getElementById("preloader");
    const bar = document.getElementById("preloaderBar");
    if (!pre || !bar) return;

    let progress = 0;
    const tick = setInterval(() => {
      progress += Math.random() * 22;
      if (progress >= 100) progress = 100;
      bar.style.width = progress + "%";
      if (progress >= 100) clearInterval(tick);
    }, 120);

    const hide = () => {
      bar.style.width = "100%";
      pre.classList.add("is-hidden");
    };

    window.addEventListener("load", () => setTimeout(hide, 260));
    // hard timeout fallback — never trap the user
    setTimeout(hide, 2200);
  }

  /* ==========================================================================
     THEME TOGGLE
     ========================================================================== */
  function initTheme() {
    const toggle = document.getElementById("themeToggle");
    const root = document.body;
    let stored = null;
    try {
      stored = localStorage.getItem("hr-theme");
    } catch (e) {
      /* localStorage unavailable — fall back silently */
    }

    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    root.setAttribute("data-theme", initial);
    if (toggle) toggle.setAttribute("aria-pressed", initial === "dark" ? "true" : "false");

    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      toggle.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        next === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      try {
        localStorage.setItem("hr-theme", next);
      } catch (e) {
        /* ignore persistence failure */
      }
    });
  }

  /* ==========================================================================
     HEADER SCROLL STATE + SIGNAL RAIL + ACTIVE NAV
     ========================================================================== */
  function initScrollChrome() {
    const header = document.getElementById("siteHeader");
    const signal = document.getElementById("signalFill");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-menu a");
    const sections = document.querySelectorAll("[data-section]");

    let ticking = false;

    function update() {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 40);

      if (signal) {
        const doc = document.documentElement;
        const total = doc.scrollHeight - doc.clientHeight;
        const pct = total > 0 ? Math.min(100, (y / total) * 100) : 0;
        signal.style.height = pct + "%";
      }

      let activeId = null;
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) activeId = sec.dataset.section;
      });
      if (activeId) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.nav === activeId);
        });
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
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

    btn.addEventListener("click", () => {
      menu.classList.contains("is-open") ? close() : open();
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ==========================================================================
     SCROLL REVEAL
     ========================================================================== */
  function initReveal() {
    const targets = document.querySelectorAll(".reveal-up, .reveal-mask");
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
    targets.forEach((t) => io.observe(t));
  }

  /* ==========================================================================
     CONTACT FORM (frontend-only, mailto fallback — never fakes success)
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

    function validateField(key) {
      const input = fields[key];
      const wrap = input.closest(".field");
      let valid = true;
      let message = "";

      if (!input.value.trim()) {
        valid = false;
        message = "This field is required.";
      } else if (key === "email") {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(input.value.trim())) {
          valid = false;
          message = "Enter a valid email address.";
        }
      }

      wrap.classList.toggle("is-valid", valid);
      msgs[key].textContent = valid ? "" : message;
      return valid;
    }

    Object.keys(fields).forEach((key) => {
      fields[key].addEventListener("blur", () => validateField(key));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = Object.keys(fields).map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status is-error";
        return;
      }

      submitBtn.classList.add("is-loading");
      status.textContent = "Preparing your message…";
      status.className = "form-status";

      const subject = encodeURIComponent(`Portfolio message from ${fields.name.value.trim()}`);
      const body = encodeURIComponent(
        `${fields.message.value.trim()}\n\n— ${fields.name.value.trim()} (${fields.email.value.trim()})`
      );
      const mailtoUrl = `mailto:${portfolioData.contact.personalEmail}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        submitBtn.classList.remove("is-loading");
        try {
          window.location.href = mailtoUrl;
          status.textContent = "Opening your email app to send this message.";
          status.className = "form-status is-success";
          form.reset();
          Object.values(fields).forEach((f) => f.closest(".field").classList.remove("is-valid"));
        } catch (err) {
          status.textContent = "Couldn't open your email app — please email directly.";
          status.className = "form-status is-error";
        }
      }, 500);
    });
  }

  /* ==========================================================================
     RESUME FALLBACK — if local file 404s, keep the Drive link primary
     ========================================================================== */
  function initResumeFallback() {
    const link = document.getElementById("resumeDownload");
    if (!link) return;
    fetch(link.getAttribute("href"), { method: "HEAD" })
      .then((res) => {
        if (!res.ok) throw new Error("missing");
      })
      .catch(() => {
        link.setAttribute("href", portfolioData.resume.driveUrl);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        link.removeAttribute("download");
      });
  }

  /* ==========================================================================
     OFFLINE STATE
     ========================================================================== */
  function initOfflineState() {
    const overlay = document.getElementById("offlineState");
    const retry = document.getElementById("retryConnection");
    if (!overlay) return;

    function show() {
      overlay.hidden = false;
      overlay.classList.add("is-visible");
    }
    function hide() {
      overlay.hidden = true;
      overlay.classList.remove("is-visible");
    }

    window.addEventListener("offline", show);
    window.addEventListener("online", hide);
    if (!navigator.onLine) show();

    if (retry) {
      retry.addEventListener("click", () => {
        if (navigator.onLine) hide();
        else {
          retry.textContent = "Still offline…";
          setTimeout(() => (retry.textContent = "Retry"), 1200);
        }
      });
    }
  }

  /* ==========================================================================
     404 STATE — triggers on an unrecognized hash
     ========================================================================== */
  function initNotFoundState() {
    const overlay = document.getElementById("notFoundState");
    if (!overlay) return;
    const validHashes = ["", "#home", "#about", "#education", "#experience", "#contact", "#resume", "#skills"];

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
     BACK TO TOP + FOOTER YEAR
     ========================================================================== */
  function initFooter() {
    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const toTop = document.getElementById("toTop");
    if (toTop) {
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ==========================================================================
     CUSTOM CURSOR (desktop, subtle, reduced-motion & touch safe)
     ========================================================================== */
  function initCursor() {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reduced) return;

    const cursor = document.createElement("div");
    cursor.id = "customCursor";
    document.body.appendChild(cursor);
    document.body.classList.add("has-cursor");

    let x = 0,
      y = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        x = e.clientX;
        y = e.clientY;
        cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      },
      { passive: true }
    );

    document.querySelectorAll("a, button, .skill-chip").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
    });
  }

  /* ==========================================================================
     INIT — every system fails gracefully and independently
     ========================================================================== */
  function safe(fn) {
    try {
      fn();
    } catch (err) {
      console.warn("[portfolio] non-fatal init error:", err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    safe(renderSkills);
    safe(renderEducation);
    safe(renderExperience);
    safe(initPreloader);
    safe(initTheme);
    safe(initScrollChrome);
    safe(initMobileMenu);
    safe(initReveal);
    safe(initContactForm);
    safe(initResumeFallback);
    safe(initOfflineState);
    safe(initNotFoundState);
    safe(initFooter);
    safe(initCursor);
  });
})();
