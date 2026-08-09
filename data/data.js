/**
 * ============================================================================
 * SITE CONTENT — add/edit entries here. Each array is rendered automatically
 * by js/main.js, so adding a new education entry, job, or project is just
 * adding one more object to the relevant array below. Depends on
 * window.PORTFOLIO_CONFIG (config/config.js), which must load first.
 * ============================================================================
 */
window.PORTFOLIO_DATA = {

  // ---- Toolkit loop ----
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

  // ---- Deep Focus tiles — tone drives the accent color (green/yellow/blue) ----
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

  // ---- Education — newest first ----
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

  // ---- Experience — newest first ----
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

  // ---- Projects ----
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
