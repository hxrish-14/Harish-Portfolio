/* =====================================================================
   Harish R — Portfolio · script.js
   1 Config & data (edit here)  2 Utilities  3 Visuals  4 Rendering
   5 Theme  6 Navigation  7 Routing/404  8 Network state  9 PDF export
   10 Contact form  11 Project dialog  12 Reveal  13 Init
   No eval(), no innerHTML: all dynamic text is inserted with textContent.
   ===================================================================== */
(function () {
  'use strict';

  /* ===================== 1. CONFIG & DATA ===================== */

  /** Site-wide settings. Safe to edit. Nothing secret belongs here. */
  var SITE = {
    pdfFileName: 'Harish_R_Resume.pdf',
    // jsPDF is loaded only when "Download Resume" is clicked. SRI hash was computed from the
    // npm package jspdf@2.5.2 (dist/jspdf.umd.min.js), which jsDelivr serves unmodified.
    jsPdf: {
      url: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js',
      integrity: 'sha384-en/ztfPSRkGfME4KIm05joYXynqzUgbsG5nMrj/xEFAHXkeZfO3yMK8QQ+mP7p1/',
      timeoutMs: 12000
    },
    // Public Google Apps Script web-app URL that appends submissions to a Google Sheet.
    // Leave '' to disable the form backend (the form then offers an email fallback).
    contactEndpoint: 'https://script.google.com/macros/s/AKfycbwbi3x0HYjWl5PsVe8M68O8--fVv64WMg9TqqGR_NXgz2uYxxqDeE4E4-OGN7uxw08C/exec',
    requestTimeoutMs: 10000,
    maxRetries: 2
  };

  /**
   * SINGLE SOURCE OF TRUTH for the resume. The website sections, the on-page resume, the
   * print view and the generated PDF are all rendered from this object.
   * Use **double asterisks** to mark bold text inside summary strings.
   */
  var RESUME = {
    name: 'Harish R',
    location: 'Ranipet, Tamil Nadu, India',
    email: 'harishramesh004@gmail.com',
    phone: '+91 96550 96127',
    phoneHref: '+919655096127',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/harishr14/', display: 'linkedin.com/in/harishr14' },
      { label: 'GitHub', url: 'https://github.com/hxrish-14', display: 'github.com/hxrish-14' }
    ],
    summary: [
      'MCA graduate skilled in **Power BI, SQL, Data Visualization, and Power Automate**, with experience in manufacturing operations.',
      'Experienced in **operational data analysis, dashboard development, workflow automation, and structured data management** across manufacturing and internship environments.'
    ],
    experience: [
      {
        title: 'Executive Assistant Trainee to the Head Operations',
        org: 'Brakes India', place: 'Sholinghur', period: 'Present',
        bullets: ['Analysed site-level operational data and developed interactive dashboards and structured data management solutions to support data-driven decision-making.']
      },
      {
        title: 'Full Stack Python Intern',
        org: 'Kaashiv Infotech', place: 'Chennai', period: '2025',
        bullets: ['Developed responsive, user-friendly web pages using frontend technologies, applying programming fundamentals and UI design principles to deliver clean and functional interfaces.']
      }
    ],
    education: [
      { degree: 'Master of Computer Applications', short: 'MCA', school: 'Dr. M.G.R. Educational and Research Institute', place: 'Chennai', period: '2024–2026', grade: 'CGPA: 8.9/10' },
      { degree: 'Bachelor of Computer Applications', short: 'BCA', school: 'Adhiparasakthi College of Arts and Science', place: 'Kalavai', period: '2021–2024', grade: 'CGPA: 7.0/10' },
      { degree: 'Higher Secondary Certificate', short: 'HSC', school: 'Sri Divya Chaitanya Matric Higher Secondary School', place: 'Sholinghur', period: '2021', grade: 'Percentage: 82%', minor: true }
    ],
    // section: where the group appears on the website ('skills' | 'technologies' | 'tools')
    skills: [
      { group: 'Data Analytics', section: 'skills', items: ['Power BI', 'SQL', 'Data Visualization', 'Structured Data Management'] },
      { group: 'Automation', section: 'skills', items: ['Microsoft Power Automate (Web and Cloud)', 'Macros & Office Scripts'] },
      { group: 'Programming and Web', section: 'technologies', items: ['HTML', 'CSS', 'JavaScript', 'Python'] },
      { group: 'Tools', section: 'tools', items: ['Microsoft Office', 'GitHub', 'VS Code', 'Canva'] }
    ],
    projects: [
      {
        id: 'powerbi', kind: 'dashboard', category: 'Business intelligence',
        title: 'Power BI Dashboard for Production & Rejection Monitoring',
        description: 'Designed an interactive dashboard to analyse production output, losses, rejection trends, and root causes for clear operational reporting.',
        photo: null // optional: a direct https image URL (e.g. from Unsplash/Pexels). Falls back to the built-in illustration.
      },
      {
        id: 'manpower', kind: 'workforce', category: 'Workforce analytics',
        title: 'Manpower Report',
        description: 'Developed a workforce dashboard to analyse manpower data, track key workforce categories, and support HR reporting and data-driven decisions.',
        photo: null
      },
      {
        id: 'babyshield', kind: 'iot', category: 'IoT & mobile',
        title: 'Baby Shield IoT – Infant Monitoring and Notification System',
        description: 'Developed an IoT-based monitoring system integrating real-time device data, a mobile application, and automated notifications for timely status updates.',
        photo: null
      }
    ],
    softSkills: ['Communication', 'Teamwork', 'Problem-Solving', 'Adaptability']
  };

  var ROUTES = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'tools', 'resume', 'contact', 'main'];
  var THEME_KEY = 'hr-theme';

  /* ===================== 2. UTILITIES ===================== */

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /** Create an element. props.text uses textContent; never HTML. */
  function h(tag, props) {
    var el = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v === true ? '' : String(v));
      });
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, kid) {
    if (kid === null || kid === undefined || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach(function (k) { append(el, k); }); return; }
    el.appendChild(typeof kid === 'object' && kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  var SVG_NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

  /** Only https:, mailto: and tel: URLs are ever used for configurable links. */
  function safeUrl(url) {
    try {
      var u = new URL(url, location.href);
      return (u.protocol === 'https:' || u.protocol === 'mailto:' || u.protocol === 'tel:') ? u.href : null;
    } catch (e) { return null; }
  }
  function extLink(label, url, cls) {
    var href = safeUrl(url);
    if (!href) return h('span', { text: label, class: cls });
    return h('a', { href: href, target: '_blank', rel: 'noopener noreferrer', class: cls, text: label });
  }
  /** Splits **bold** markers into text/strong nodes (no HTML parsing). */
  function richText(str) {
    var frag = document.createDocumentFragment();
    str.split('**').forEach(function (part, i) {
      if (!part) return;
      frag.appendChild(i % 2 ? h('strong', { text: part }) : document.createTextNode(part));
    });
    return frag;
  }
  function plain(str) { return str.replace(/\*\*/g, ''); }
  function initials(name) {
    var w = name.replace(/[()]/g, '').split(/\s+/);
    return (w.length > 1 ? w[0][0] + w[1][0] : w[0][0]).toUpperCase();
  }

  /** localStorage with an in-memory fallback if storage is unavailable or throws. */
  var store = (function () {
    var mem = {}, ok = true;
    try { localStorage.setItem('__probe', '1'); localStorage.removeItem('__probe'); } catch (e) { ok = false; }
    return {
      get: function (k) {
        if (ok) { try { var v = localStorage.getItem(k); if (v !== null) return v; } catch (e) { ok = false; } }
        return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null;
      },
      set: function (k, v) {
        mem[k] = v;
        if (ok) { try { localStorage.setItem(k, v); } catch (e) { ok = false; } }
      }
    };
  })();

  /** Reusable loading / empty state components. */
  function loadingState(msg) {
    return h('div', { class: 'state-block', role: 'status' }, h('div', { class: 'spinner', 'aria-hidden': 'true' }), h('p', { text: msg || 'Loading…' }));
  }
  function emptyState(msg, actionLabel, onAction) {
    return h('div', { class: 'state-block' },
      h('p', { text: msg }),
      actionLabel ? h('button', { type: 'button', class: 'btn btn-secondary btn-small', text: actionLabel, onclick: onAction }) : null);
  }

  /* ===================== 3. VISUALS (original illustrative concepts) ===================== */

  var VIZ = {
    dashboard: { label: 'Illustrative concept of a production and rejection monitoring dashboard with KPI tiles, bar chart and trend line' },
    workforce: { label: 'Illustrative concept of a workforce analytics dashboard with a category donut chart and headcount bars' },
    iot: { label: 'Illustrative concept of an infant monitoring device sending alerts to a mobile phone' }
  };

  function vizSvg(kind) {
    var svg = s('svg', { viewBox: '0 0 320 200', role: 'img', 'aria-label': VIZ[kind].label, preserveAspectRatio: 'xMidYMid slice', focusable: 'false' });
    svg.appendChild(s('rect', { width: 320, height: 200, class: 'viz-bg' }));
    var i;
    if (kind === 'dashboard') {
      [0, 1, 2].forEach(function (n) {
        svg.appendChild(s('rect', { x: 14 + n * 102, y: 14, width: 94, height: 38, rx: 7, class: 'viz-card' }));
        svg.appendChild(s('rect', { x: 22 + n * 102, y: 24, width: 34 + n * 8, height: 7, rx: 3, class: n === 1 ? 'viz-c3' : 'viz-c1' }));
        svg.appendChild(s('rect', { x: 22 + n * 102, y: 37, width: 52, height: 5, rx: 2.5, class: 'viz-c2' }));
      });
      svg.appendChild(s('rect', { x: 14, y: 64, width: 292, height: 122, rx: 9, class: 'viz-card' }));
      var hts = [44, 64, 50, 82, 60, 94, 72], pts = [];
      for (i = 0; i < hts.length; i++) {
        var x = 30 + i * 38;
        svg.appendChild(s('rect', { x: x, y: 174 - hts[i], width: 24, height: hts[i], rx: 4, class: i === 5 ? 'viz-c3' : 'viz-c2' }));
        pts.push((x + 12) + ',' + (168 - hts[i] - 8 - (i % 2) * 4));
      }
      svg.appendChild(s('polyline', { points: pts.join(' '), class: 'viz-line' }));
    } else if (kind === 'workforce') {
      svg.appendChild(s('rect', { x: 14, y: 14, width: 140, height: 172, rx: 9, class: 'viz-card' }));
      var C = 2 * Math.PI * 38, segs = [[0.42, 'viz-stroke1'], [0.33, 'viz-stroke2'], [0.25, 'viz-stroke3']], off = 0;
      segs.forEach(function (sg) {
        svg.appendChild(s('circle', { cx: 84, cy: 100, r: 38, 'stroke-width': 18, class: sg[1], 'stroke-dasharray': (sg[0] * C - 2) + ' ' + C, 'stroke-dashoffset': -off, transform: 'rotate(-90 84 100)' }));
        off += sg[0] * C;
      });
      svg.appendChild(s('rect', { x: 166, y: 14, width: 140, height: 172, rx: 9, class: 'viz-card' }));
      [88, 66, 104, 52, 76].forEach(function (w, n) {
        svg.appendChild(s('rect', { x: 180, y: 32 + n * 29, width: 40, height: 6, rx: 3, class: 'viz-c2' }));
        svg.appendChild(s('rect', { x: 180, y: 43 + n * 29, width: w, height: 10, rx: 5, class: n === 2 ? 'viz-c3' : 'viz-c1' }));
      });
    } else {
      svg.appendChild(s('rect', { x: 28, y: 62, width: 86, height: 92, rx: 16, class: 'viz-card' }));
      svg.appendChild(s('circle', { cx: 71, cy: 96, r: 17, class: 'viz-c2' }));
      svg.appendChild(s('circle', { cx: 71, cy: 96, r: 7, class: 'viz-c1' }));
      svg.appendChild(s('rect', { x: 49, y: 128, width: 44, height: 8, rx: 4, class: 'viz-c3' }));
      svg.appendChild(s('path', { d: 'M126 96 q14 -14 28 0 M120 88 q20 -22 40 0', class: 'viz-line', 'stroke-width': 2.5 }));
      svg.appendChild(s('path', { d: 'M156 118 H206', class: 'viz-dash', 'stroke-width': 2 }));
      svg.appendChild(s('rect', { x: 210, y: 28, width: 82, height: 144, rx: 14, class: 'viz-card' }));
      svg.appendChild(s('rect', { x: 220, y: 44, width: 62, height: 28, rx: 7, class: 'viz-c3' }));
      svg.appendChild(s('rect', { x: 220, y: 80, width: 62, height: 14, rx: 6, class: 'viz-c2' }));
      svg.appendChild(s('rect', { x: 220, y: 102, width: 44, height: 14, rx: 6, class: 'viz-c2' }));
      svg.appendChild(s('circle', { cx: 251, cy: 148, r: 8, class: 'viz-c1' }));
    }
    return svg;
  }

  var photoRetry = [];
  /** Visual block: always shows the built-in SVG; overlays an optional photo only if it loads. */
  function visual(project, showTag) {
    var wrap = h('div', { class: 'viz-wrap' }, vizSvg(project.kind));
    if (showTag) wrap.appendChild(h('span', { class: 'viz-tag', text: 'Illustrative concept' }));
    var url = project.photo ? safeUrl(project.photo) : null;
    if (url && /^https:/.test(url)) {
      var load = function () {
        var img = h('img', { alt: '', width: 1600, height: 1000, loading: 'lazy', decoding: 'async', referrerpolicy: 'no-referrer' });
        img.onload = function () { img.alt = 'Stock photo representing ' + project.category.toLowerCase() + ' (illustrative, not a screenshot)'; wrap.insertBefore(img, wrap.firstChild.nextSibling); wrap.firstChild.setAttribute('aria-hidden', 'true'); };
        img.onerror = function () { img.remove(); };
        img.src = url;
      };
      load();
      photoRetry.push(load);
    }
    return wrap;
  }

  /* ===================== 4. RENDERING ===================== */

  function renderHero() {
    var social = $('#heroSocial');
    RESUME.links.forEach(function (l) { social.appendChild(h('li', null, extLink(l.label, l.url))); });
    var prev = $('#heroPreview');
    var chips = [];
    RESUME.skills.forEach(function (g) { if (g.section === 'skills') g.items.slice(0, 2).forEach(function (i) { chips.push(i.replace(/ \(.*\)/, '')); }); });
    prev.appendChild(visual(RESUME.projects[0], true));
    prev.appendChild(h('p', { class: 'preview-caption', text: 'Concept preview — the kind of operational dashboard I build.' }));
    prev.appendChild(h('div', { class: 'preview-chips' }, chips.map(function (c) { return h('span', { class: 'chip', text: c }); })));
  }

  function renderAbout() {
    var body = $('#aboutBody');
    var cur = RESUME.experience[0], edu = RESUME.education[0];
    body.appendChild(h('div', { class: 'about-summary' }, RESUME.summary.map(function (t) { return h('p', null, richText(t)); }),
      h('div', { class: 'chip-list', 'aria-label': 'Soft skills' }, RESUME.softSkills.map(function (t) { return h('span', { class: 'chip', text: t }); }))));
    body.appendChild(h('div', { class: 'fact-card' }, h('dl', { class: 'fact-list' },
      fact('Based in', RESUME.location),
      fact('Currently', cur.title + ', ' + cur.org + ', ' + cur.place),
      fact('Education', edu.short + ' (' + edu.period + '), ' + edu.grade.replace('CGPA: ', 'CGPA ')),
      fact('Focus', 'Operational data analysis, dashboards, workflow automation, web pages'))));
  }
  function fact(k, v) { return h('div', null, h('dt', { text: k }), h('dd', { text: v })); }

  function chipList(items) { return h('div', { class: 'chip-list' }, items.map(function (i) { return h('span', { class: 'chip', text: i }); })); }

  function renderSkills() {
    var body = $('#skillsBody');
    RESUME.skills.filter(function (g) { return g.section === 'skills'; }).forEach(function (g) {
      body.appendChild(h('div', { class: 'card' }, h('h3', { text: g.group }), chipList(g.items)));
    });
    body.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Soft skills' }), chipList(RESUME.softSkills)));
  }

  function renderExperience() {
    var body = $('#experienceBody');
    RESUME.experience.forEach(function (e) {
      body.appendChild(h('li', { class: 'timeline-item' },
        h('div', { class: 'item-head' }, h('h3', { text: e.title }), h('span', { class: 'period', text: e.period })),
        h('p', { class: 'org', text: e.org + ', ' + e.place }),
        h('ul', { class: 'bullets' }, e.bullets.map(function (b) { return h('li', { text: b }); }))));
    });
  }

  function renderEducation() {
    var body = $('#educationBody');
    RESUME.education.forEach(function (e) {
      body.appendChild(h('li', { class: 'edu-card' + (e.minor ? ' is-minor' : '') },
        h('span', { class: 'badge', text: e.short }),
        h('h3', { text: e.degree }),
        h('p', { class: 'org', text: e.school + ', ' + e.place }),
        h('span', { class: 'period', text: e.period }),
        h('p', { class: 'grade', text: e.grade })));
    });
  }

  function renderProjects() {
    var body = clear($('#projectsBody'));
    if (!RESUME.projects.length) { body.appendChild(emptyState('No projects to show yet.')); return; }
    RESUME.projects.forEach(function (p) {
      var btn = h('button', { type: 'button', class: 'btn btn-secondary btn-small', 'aria-haspopup': 'dialog', text: 'View details' });
      btn.addEventListener('click', function () { openProject(p, btn); });
      body.appendChild(h('article', { class: 'project-card', 'aria-label': p.title },
        visual(p, true),
        h('div', { class: 'project-body' },
          h('div', { class: 'project-badges' }, h('span', { class: 'badge badge-real', text: 'Real project' }), h('span', { class: 'badge', text: p.category })),
          h('h3', { text: p.title }), h('p', { text: p.description }), btn)));
    });
  }

  function renderTools() {
    var body = $('#toolsBody');
    RESUME.skills.filter(function (g) { return g.section !== 'skills'; }).forEach(function (g) {
      body.appendChild(h('div', { class: 'tool-group' }, h('h3', { text: g.group === 'Tools' ? 'Tools' : 'Technologies · ' + g.group }),
        h('div', { class: 'tool-grid' }, g.items.map(function (i) { return h('div', { class: 'tool' }, h('span', { class: 'tool-mark', 'aria-hidden': 'true', text: initials(i) }), h('span', { text: i })); }))));
    });
  }

  /** Renders the full resume into any container (on-page view and print view share this). */
  function renderResumeDoc(root) {
    clear(root);
    var contact = h('p', { class: 'r-contact' }, RESUME.phone + '  |  ',
      h('a', { href: 'mailto:' + RESUME.email, text: RESUME.email }), '  |  ' + RESUME.location);
    var links = h('p', { class: 'r-contact' });
    RESUME.links.forEach(function (l, i) { if (i) links.appendChild(document.createTextNode('  |  ')); links.appendChild(document.createTextNode(l.label + ': ')); links.appendChild(extLink(l.display, l.url)); });
    root.appendChild(h('h3', { class: 'r-name', text: RESUME.name }));
    root.appendChild(contact); root.appendChild(links);

    root.appendChild(h('h4', { text: 'Professional Summary' }));
    root.appendChild(h('ul', { class: 'r-list' }, RESUME.summary.map(function (t) { return h('li', null, richText(t)); })));

    root.appendChild(h('h4', { text: 'Experience' }));
    RESUME.experience.forEach(function (e) {
      root.appendChild(h('div', { class: 'r-item' },
        h('div', { class: 'r-row' }, h('span', { text: e.title }), h('span', { text: e.period })),
        h('p', { class: 'r-sub', text: e.org + ', ' + e.place }),
        h('ul', { class: 'r-list' }, e.bullets.map(function (b) { return h('li', { text: b }); }))));
    });

    root.appendChild(h('h4', { text: 'Education' }));
    RESUME.education.forEach(function (e) {
      root.appendChild(h('div', { class: 'r-item' + (e.minor ? ' r-minor' : '') },
        h('div', { class: 'r-row' }, h('span', { text: e.degree + ' - ' + e.short }), h('span', { text: e.period })),
        h('p', { text: e.school + ', ' + e.place }), h('p', { text: e.grade })));
    });

    root.appendChild(h('h4', { text: 'Technical Skills' }));
    RESUME.skills.forEach(function (g) { root.appendChild(h('p', { class: 'r-skill' }, h('strong', { text: g.group + ': ' }), g.items.join(' • '))); });

    root.appendChild(h('h4', { text: 'Projects' }));
    RESUME.projects.forEach(function (p) {
      root.appendChild(h('div', { class: 'r-item' }, h('p', { class: 'r-sub', text: p.title }), h('ul', { class: 'r-list' }, h('li', { text: p.description }))));
    });

    root.appendChild(h('h4', { text: 'Soft Skills' }));
    root.appendChild(h('ul', { class: 'r-list r-cols' }, RESUME.softSkills.map(function (t) { return h('li', { text: t }); })));
  }

  function renderContact() {
    var info = $('#contactInfo');
    info.appendChild(h('div', { class: 'contact-item' }, h('span', { text: 'Email' }), h('a', { href: 'mailto:' + RESUME.email, text: RESUME.email })));
    info.appendChild(h('div', { class: 'contact-item' }, h('span', { text: 'Phone' }), h('a', { href: 'tel:' + RESUME.phoneHref, text: RESUME.phone })));
    info.appendChild(h('div', { class: 'contact-item' }, h('span', { text: 'Location' }), h('strong', { text: RESUME.location })));
    RESUME.links.forEach(function (l) { info.appendChild(h('div', { class: 'contact-item' }, h('span', { text: l.label }), extLink(l.display, l.url))); });
  }

  function renderFooter() {
    $('#footerYear').textContent = String(new Date().getFullYear());
    var ul = $('#footerLinks');
    ul.appendChild(h('li', null, h('a', { href: 'mailto:' + RESUME.email, text: 'Email' })));
    RESUME.links.forEach(function (l) { ul.appendChild(h('li', null, extLink(l.label, l.url))); });
  }

  /* ===================== 5. THEME ===================== */

  function currentTheme() { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var btn = $('#themeToggle');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    var color = t === 'dark' ? '#071226' : '#f5f8fc';
    $$('meta[name="theme-color"]').forEach(function (m) { m.setAttribute('content', color); m.removeAttribute('media'); });
  }
  function initTheme() {
    applyTheme(currentTheme());
    var btn = $('#themeToggle');
    btn.addEventListener('click', function () {
      var root = document.documentElement, next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.classList.add('theme-transition');
      applyTheme(next);
      store.set(THEME_KEY, next);
      setTimeout(function () { root.classList.remove('theme-transition'); }, 400);
    });
    if (window.matchMedia) {
      var mq = matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) { var saved = store.get(THEME_KEY); if (saved !== 'light' && saved !== 'dark') applyTheme(e.matches ? 'dark' : 'light'); };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ===================== 6. NAVIGATION ===================== */

  function initNav() {
    var nav = $('#primaryNav'), toggle = $('#menuToggle');
    function setOpen(open, returnFocus) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (!open && returnFocus) toggle.focus();
    }
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false, true); });
    document.addEventListener('click', function (e) { if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) setOpen(false); });

    // Active link state
    var links = {}; $$('a[data-nav]', nav).forEach(function (a) { links[a.getAttribute('data-nav')] = a; });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
        var a = links[en.target.id]; if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(links).forEach(function (id) { var sec = document.getElementById(id); if (sec) io.observe(sec); });
  }

  /* ===================== 7. ROUTING / CUSTOM 404 ===================== */

  var baseTitle = document.title;
  function isUnknownRoute() {
    var hash = location.hash.replace(/^#/, '');
    if (hash) { try { hash = decodeURIComponent(hash); } catch (e) { return true; } }
    if (hash && ROUTES.indexOf(hash) === -1) return true;
    if (location.protocol !== 'file:') {
      // If a host rewrites unknown paths to index.html, show the 404 view for them.
      var last = location.pathname.split('/').pop();
      if (last && !/\.html?$/i.test(last)) return true;
    }
    return false;
  }
  function applyRoute() {
    var bad = isUnknownRoute();
    $('#notFound').hidden = !bad;
    $$('main > section:not(#notFound)').forEach(function (sec) { sec.hidden = bad; });
    document.title = bad ? '404 — Page not found | Harish R' : baseTitle;
    if (bad) { var t = $('#nfTitle'); t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); window.scrollTo(0, 0); }
    else {
      var id = location.hash.replace(/^#/, '');
      if (id && document.getElementById(id)) requestAnimationFrame(function () { document.getElementById(id).scrollIntoView(); });
    }
  }
  function initRouting() {
    window.addEventListener('hashchange', applyRoute);
    $('#nfBack').addEventListener('click', function () {
      if (history.length > 1) history.back(); else { location.hash = '#home'; }
    });
    applyRoute();
  }

  /* ===================== 8. NETWORK STATE ===================== */

  function initNetwork() {
    var banner = $('#netBanner'), text = $('#netBannerText'), retry = $('#netRetry'), timer = null;
    function show(msg, withRetry) {
      clearTimeout(timer); banner.hidden = false; text.textContent = msg; retry.hidden = !withRetry;
    }
    function offline() { show('You appear to be offline. This page still works, but the contact form, PDF library and optional images need a connection.', true); }
    window.addEventListener('offline', offline);
    window.addEventListener('online', function () {
      show('You’re back online.', false);
      photoRetry.forEach(function (fn) { fn(); });
      timer = setTimeout(function () { banner.hidden = true; }, 3500);
    });
    retry.addEventListener('click', function () {
      if (navigator.onLine) { banner.hidden = true; photoRetry.forEach(function (fn) { fn(); }); }
      else show('Still offline. Check your connection and try again.', true);
    });
    if (!navigator.onLine) offline();
  }

  /* ===================== 9. PDF EXPORT ===================== */

  var jsPdfPromise = null;
  function loadJsPdf() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
    if (jsPdfPromise) return jsPdfPromise;
    jsPdfPromise = new Promise(function (resolve, reject) {
      var sc = document.createElement('script'), done = false;
      var fail = function (why) { if (done) return; done = true; clearTimeout(t); sc.remove(); reject(new Error(why)); };
      var t = setTimeout(function () { fail('timeout'); }, SITE.jsPdf.timeoutMs);
      sc.src = SITE.jsPdf.url; sc.integrity = SITE.jsPdf.integrity; sc.crossOrigin = 'anonymous'; sc.referrerPolicy = 'no-referrer'; sc.async = true;
      sc.onload = function () {
        if (done) return;
        if (window.jspdf && window.jspdf.jsPDF) { done = true; clearTimeout(t); resolve(window.jspdf.jsPDF); } else fail('missing-global');
      };
      sc.onerror = function () { fail('load-error'); };
      document.head.appendChild(sc);
    }).catch(function (e) { jsPdfPromise = null; throw e; });
    return jsPdfPromise;
  }

  /** Builds a real, text-based (selectable) multi-page A4 PDF from RESUME. */
  function buildResumePdf(JsPDF) {
    var doc = new JsPDF({ unit: 'pt', format: 'a4', compress: true });
    var PW = 595.28, PH = 841.89, M = 40, CW = PW - M * 2, BOTTOM = PH - 34;
    var INK = [17, 24, 39], BLUE = [19, 56, 110], MUTED = [75, 85, 99], LINK = [11, 79, 179];
    var y = M;

    function font(style, size, color) { doc.setFont('times', style); doc.setFontSize(size); doc.setTextColor.apply(doc, color || INK); }
    function lh(size) { return size * 1.3; }
    function ensure(hgt) { if (y + hgt > BOTTOM) { doc.addPage(); y = M; } }
    function heading(t) {
      ensure(70); y += 5; font('bold', 13, BLUE);
      doc.text(t, M, y + 11); y += 17;
      doc.setDrawColor.apply(doc, BLUE); doc.setLineWidth(0.8); doc.line(M, y, PW - M, y); y += 6;
    }
    function row(left, right, size) {
      font('bold', size, INK);
      var rw = right ? doc.getTextWidth(right) + 14 : 0;
      var lines = doc.splitTextToSize(left, CW - rw);
      ensure(lines.length * lh(size) + 20);
      lines.forEach(function (ln, i) {
        doc.text(ln, M, y + size * 0.85);
        if (i === 0 && right) doc.text(right, PW - M, y + size * 0.85, { align: 'right' });
        y += lh(size);
      });
    }
    function para(text, style, size, color, indent) {
      font(style, size, color);
      var lines = doc.splitTextToSize(text, CW - (indent || 0));
      ensure(lines.length * lh(size));
      lines.forEach(function (ln) { doc.text(ln, M + (indent || 0), y + size * 0.85); y += lh(size); });
    }
    function bullet(text, size) {
      font('normal', size, INK);
      var lines = doc.splitTextToSize(text, CW - 14);
      ensure(lines.length * lh(size) + 2);
      doc.text('\u2022', M + 3, y + size * 0.85);
      lines.forEach(function (ln) { doc.text(ln, M + 14, y + size * 0.85); y += lh(size); });
      y += 2;
    }
    function labelled(label, body, size) {
      font('bold', size, INK);
      var lw = doc.getTextWidth(label + ' ');
      font('normal', size, INK);
      var lines = doc.splitTextToSize(body, CW - lw);
      ensure(lines.length * lh(size) + 2);
      font('bold', size, INK); doc.text(label, M, y + size * 0.85);
      font('normal', size, INK);
      lines.forEach(function (ln) { doc.text(ln, M + lw, y + size * 0.85); y += lh(size); });
      y += 1;
    }

    // Header
    font('bold', 24, BLUE); doc.text(RESUME.name.toUpperCase(), M, y + 20); y += 28;
    para(RESUME.phone + '   |   ' + RESUME.email + '   |   ' + RESUME.location, 'normal', 10, MUTED);
    // Contact links (clickable, visible URLs)
    font('normal', 10, LINK);
    var x = M;
    RESUME.links.forEach(function (l, i) {
      var label = l.label + ': ' + l.display;
      if (i) { font('normal', 10, MUTED); doc.text('   |   ', x, y + 9); x += doc.getTextWidth('   |   '); }
      font('normal', 10, LINK);
      doc.textWithLink(label, x, y + 9, { url: l.url });
      x += doc.getTextWidth(label);
    });
    y += lh(10);

    heading('Professional Summary');
    RESUME.summary.forEach(function (t) { bullet(plain(t), 10); });

    heading('Experience');
    RESUME.experience.forEach(function (e) {
      row(e.title, e.period, 11);
      para(e.org + ', ' + e.place, 'bold', 10, INK);
      e.bullets.forEach(function (b) { bullet(b, 10); });
      y += 3;
    });

    heading('Education');
    RESUME.education.forEach(function (e) {
      row(e.degree + ' - ' + e.short, e.period, 11);
      para(e.school + ', ' + e.place, 'normal', 10, e.minor ? MUTED : INK);
      para(e.grade, 'normal', 10, e.minor ? MUTED : INK);
      y += 4;
    });

    heading('Technical Skills');
    RESUME.skills.forEach(function (g) { labelled(g.group + ':', g.items.join('  \u2022  '), 10); });

    heading('Projects');
    RESUME.projects.forEach(function (p) {
      row(p.title, '', 10);
      bullet(p.description, 10);
      y += 2;
    });

    heading('Soft Skills');
    var colW = CW / 2;
    for (var i = 0; i < RESUME.softSkills.length; i += 2) {
      ensure(lh(10) + 2);
      font('normal', 10, INK);
      doc.text('\u2022 ' + RESUME.softSkills[i], M + 3, y + 10 * 0.85);
      if (RESUME.softSkills[i + 1]) doc.text('\u2022 ' + RESUME.softSkills[i + 1], M + colW, y + 10 * 0.85);
      y += lh(10) + 2;
    }

    var pages = doc.getNumberOfPages();
    if (pages > 1) {
      for (var p = 1; p <= pages; p++) {
        doc.setPage(p); font('normal', 9, MUTED);
        doc.text('Page ' + p + ' of ' + pages, PW / 2, PH - 22, { align: 'center' });
      }
    }
    doc.setProperties({ title: RESUME.name + ' — Resume', author: RESUME.name, subject: 'Resume' });
    return doc;
  }

  var printReady = false, printing = false;
  function printResume() {
    if (!printReady) { renderResumeDoc($('#printRoot').appendChild(h('article', { class: 'resume-doc' }))); printReady = true; }
    if (printing) return;
    printing = true;
    var done = function () { printing = false; };
    window.addEventListener('afterprint', done, { once: true });
    setTimeout(function () { window.print(); setTimeout(done, 2000); }, 60);
  }

  function statusFor(btn) {
    var sec = btn.closest('section');
    return (sec && $('.status-line', sec)) || $('#resumeStatus');
  }
  function setStatus(el, msg, kind) { el.textContent = msg; el.classList.toggle('is-error', kind === 'error'); el.classList.toggle('is-ok', kind === 'ok'); }

  var pdfBusy = false;
  function downloadResume(btn) {
    if (pdfBusy) return;
    pdfBusy = true;
    var status = statusFor(btn), original = btn.textContent;
    btn.setAttribute('aria-busy', 'true');
    var spin = h('span', { class: 'spinner', 'aria-hidden': 'true' });
    btn.insertBefore(spin, btn.firstChild);
    setStatus(status, 'Preparing your PDF…');
    loadJsPdf().then(function (JsPDF) {
      var doc = buildResumePdf(JsPDF);
      doc.save(SITE.pdfFileName);
      setStatus(status, 'PDF created — your browser should now be saving ' + SITE.pdfFileName + '.', 'ok');
    }).catch(function (err) {
      var offline = !navigator.onLine;
      setStatus(status, (offline ? 'You’re offline, so the PDF library couldn’t load. ' : 'The PDF couldn’t be generated automatically. ') +
        'Opening the print view instead — choose “Save as PDF” in the print dialog.', 'error');
      if (window.console) console.warn('[resume] PDF generation failed:', err && err.message);
      printResume();
    }).then(function () {
      pdfBusy = false; btn.removeAttribute('aria-busy'); spin.remove();
    });
  }

  function initResumeActions() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-action]');
      if (!btn) return;
      var a = btn.getAttribute('data-action');
      if (a === 'download-resume') downloadResume(btn);
      else if (a === 'print-resume') { setStatus(statusFor(btn), 'Opening the print view — choose “Save as PDF” in the print dialog.'); printResume(); }
    });
    // Warm the library cache when the user shows intent (not at page load).
    $$('[data-action="download-resume"]').forEach(function (b) {
      var warm = function () { loadJsPdf().catch(function () {}); };
      b.addEventListener('pointerenter', warm, { once: true }); b.addEventListener('focus', warm, { once: true });
    });
  }

  /* ===================== 10. CONTACT FORM ===================== */

  function initContactForm() {
    var form = $('#contactForm'), status = $('#contactStatus'), submit = $('#contactSubmit');
    var fields = {
      name: { el: $('#cName'), err: $('#cNameErr'), check: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'; } },
      email: { el: $('#cEmail'), err: $('#cEmailErr'), check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; } },
      message: { el: $('#cMessage'), err: $('#cMessageErr'), check: function (v) { return v.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.'; } }
    };
    var sending = false, lastSent = { key: '', at: 0 };

    function validate(key) {
      var f = fields[key], msg = f.check(f.el.value);
      f.err.hidden = !msg; f.err.textContent = msg;
      if (msg) f.el.setAttribute('aria-invalid', 'true'); else f.el.removeAttribute('aria-invalid');
      return !msg;
    }
    Object.keys(fields).forEach(function (k) {
      fields[k].el.addEventListener('blur', function () { if (fields[k].el.value) validate(k); });
      fields[k].el.addEventListener('input', function () { if (fields[k].el.getAttribute('aria-invalid')) validate(k); });
    });

    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    /** POST with a timeout and a bounded number of retries (network errors / 5xx only). */
    function postWithRetry(payload) {
      var attempt = 0;
      function once() {
        var ctrl = 'AbortController' in window ? new AbortController() : null;
        var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, SITE.requestTimeoutMs);
        return fetch(SITE.contactEndpoint, {
          method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload),
          signal: ctrl ? ctrl.signal : undefined, credentials: 'omit', referrerPolicy: 'no-referrer'
        }).then(function (res) {
          clearTimeout(timer);
          if (res.status >= 500 && attempt < SITE.maxRetries) { attempt++; return wait(700 * attempt).then(once); }
          if (!res.ok) throw new Error('http-' + res.status);
          return res.json();
        }, function (err) {
          clearTimeout(timer);
          if (attempt < SITE.maxRetries) { attempt++; return wait(700 * attempt).then(once); }
          throw err;
        });
      }
      return once();
    }

    function failMessage(offline) {
      status.classList.remove('is-ok'); status.classList.add('is-error');
      clear(status);
      status.appendChild(document.createTextNode((offline ? 'You’re offline. ' : 'Sorry, your message couldn’t be sent right now. ') + 'Please try again, or email me directly at '));
      status.appendChild(h('a', { href: 'mailto:' + RESUME.email, text: RESUME.email }));
      status.appendChild(document.createTextNode('.'));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      var ok = Object.keys(fields).map(validate).every(Boolean);
      if (!ok) {
        setStatus(status, 'Please fix the highlighted fields.', 'error');
        var first = Object.keys(fields).map(function (k) { return fields[k].el; }).filter(function (el) { return el.getAttribute('aria-invalid'); })[0];
        if (first) first.focus();
        return;
      }
      if (form.elements.website && form.elements.website.value) { setStatus(status, 'Thanks!', 'ok'); form.reset(); return; } // honeypot tripped
      var payload = { name: fields.name.el.value.trim(), email: fields.email.el.value.trim(), message: fields.message.el.value.trim() };
      var key = JSON.stringify(payload);
      if (key === lastSent.key && Date.now() - lastSent.at < 60000) { setStatus(status, 'That exact message was just sent. Thank you!', 'ok'); return; }
      if (!SITE.contactEndpoint) { failMessage(false); return; }
      if (!navigator.onLine) { failMessage(true); return; }

      sending = true; submit.setAttribute('aria-busy', 'true'); submit.disabled = true;
      var spin = h('span', { class: 'spinner', 'aria-hidden': 'true' }); submit.insertBefore(spin, submit.firstChild);
      setStatus(status, 'Sending…');
      postWithRetry(payload).then(function (data) {
        if (!data || data.status !== 'success') throw new Error('rejected');
        lastSent = { key: key, at: Date.now() };
        setStatus(status, 'Thanks, ' + payload.name + '! Your message was sent.', 'ok');
        form.reset();
      }).catch(function () { failMessage(!navigator.onLine); })
        .then(function () { sending = false; submit.removeAttribute('aria-busy'); submit.disabled = false; spin.remove(); });
    });
  }

  /* ===================== 11. PROJECT DIALOG ===================== */

  var dlgOpener = null;
  function openProject(p, opener) {
    var dlg = $('#projectDialog');
    dlgOpener = opener;
    clear($('#pdVisual')).appendChild(visual(p, true));
    clear($('#pdBadges')).appendChild(h('span', { class: 'badge badge-real', text: 'Real project' }));
    $('#pdBadges').appendChild(h('span', { class: 'badge', text: p.category }));
    $('#pdTitle').textContent = p.title;
    $('#pdDesc').textContent = p.description;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    $('#pdClose').focus();
  }
  function initDialog() {
    var dlg = $('#projectDialog');
    function close() { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); if (dlgOpener) dlgOpener.focus(); }
    $('#pdClose').addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener('close', function () { if (dlgOpener) dlgOpener.focus(); });
  }

  /* ===================== 12. REVEAL-ON-SCROLL ===================== */

  function initReveal() {
    var targets = $$('.section-head, .card, .timeline-item, .edu-card, .project-card, .tool-group, .fact-card, .about-summary, .contact-item, .contact-form, .resume-doc');
    if (!('IntersectionObserver' in window)) return;
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ===================== 13. INIT ===================== */

  function safe(fn, name) { try { fn(); } catch (e) { if (window.console) console.warn('[init] ' + name + ' failed:', e); } }

  function init() {
    safe(renderHero, 'hero'); safe(renderAbout, 'about'); safe(renderSkills, 'skills');
    safe(renderExperience, 'experience'); safe(renderEducation, 'education'); safe(renderProjects, 'projects');
    safe(renderTools, 'tools'); safe(function () { renderResumeDoc($('#resumeDoc')); }, 'resume');
    safe(renderContact, 'contact'); safe(renderFooter, 'footer');
    safe(initTheme, 'theme'); safe(initNav, 'nav'); safe(initRouting, 'routing'); safe(initNetwork, 'network');
    safe(initResumeActions, 'resume actions'); safe(initContactForm, 'form'); safe(initDialog, 'dialog'); safe(initReveal, 'reveal');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
