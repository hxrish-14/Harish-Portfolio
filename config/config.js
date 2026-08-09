/**
 * ============================================================================
 * SITE CONFIGURATION — edit this file to change any link, image, or contact
 * detail across the whole site. Nothing below this file should ever need a
 * hardcoded URL again — everything else reads from window.PORTFOLIO_CONFIG.
 * ============================================================================
 */
window.PORTFOLIO_CONFIG = {

  // ---- Identity ----
  NAME: "Harish R",
  EMAIL: "harishramesh004@gmail.com", // used for EVERY mailto: link on the site

  // ---- Social / external profiles ----
  LINKEDIN_URL: "https://www.linkedin.com/in/harishr14/",
  GITHUB_URL: "https://github.com/hxrish-14",
  INSTAGRAM_URL: "https://instagram.com/hxrish_14",
  NAUKRI_URL: "https://www.naukri.com/mnjuser/profile?id=&altresid",

  // ---- Keyboard-shortcut links ----
  // Ctrl+Alt+Shift+S opens this in a new tab. Point it at whatever you like.
  QUICK_OPEN_URL: "https://github.com/hxrish-14",
  // Ctrl+Alt+S opens your Spotify playlist. Left empty on purpose — add your
  // playlist URL here (e.g. "https://open.spotify.com/playlist/xxxxxxxx")
  // and the shortcut will start working automatically.
  SPOTIFY_PLAYLIST_URL: "https://open.spotify.com/playlist/4UBKA7MiDsw9rePWl5dFSH?si=0us_jNs-QamQS3il1TdTughttps%3A%2F%2Fopen.spotify.com%2Fplaylist%2F5URdtVRhAN12Qs63drvIUh%3Fsi%3DUhIsfO99QDKd46yucD3zvg&pi=a-gR4LM2ZfTzOu&nd=1&utm_medium=organic&product=open&%24full_url=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F4UBKA7MiDsw9rePWl5dFSH%3Fsi%3D0us_jNs-QamQS3il1TdTughttps%3A%2F%2Fopen.spotify.com%2Fplaylist%2F5URdtVRhAN12Qs63drvIUh%3Fsi%3DUhIsfO99QDKd46yucD3zvg%26pi%3Da-gR4LM2ZfTzOu&feature=organic",

  // ---- Profile photo (hero) ----
  PROFILE_IMAGE_URL:
    "https://avatars.githubusercontent.com/u/141498620?s=400&u=a16fb899a144f90803bb071829715a427edfa6b8&v=4",

  // ---- Resume ----
  RESUME_URL:
    "https://raw.githubusercontent.com/hxrish-14/Harish-Portfolio/main/HARISH%20R%20-%20RESUME.pdf",
  RESUME_URL_VERSIONED:
    "https://raw.githubusercontent.com/hxrish-14/Harish-Portfolio/216739781e8ab30521b020daa98d6448ecb3c7ed/HARISH%20R%20-%20RESUME.pdf",
  RESUME_FILE_NAME: "HARISH R - RESUME.pdf",

  // ---- Browser tab icon ----
  TAB_ICON_URL: "https://cdn-icons-png.flaticon.com/128/17974/17974378.png",

  // ---- Contact form backend (Google Apps Script Web App) ----
  // Already deployed and live — the contact form posts here directly.
  BACKEND_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbwbi3x0HYjWl5PsVe8M68O8--fVv64WMg9TqqGR_NXgz2uYxxqDeE4E4-OGN7uxw08C/exec",

  // ---- Education / Experience logos ----
  // Direct https image URLs only — a page link (like an Instagram profile)
  // can't be used as an <img> source, so that entry is left null with a
  // comment pointing back to the source you gave, and the site shows a
  // clean text-mark fallback until you swap in a real image URL.
  LOGOS: {
    adhiparasakthi:
      "https://assets.allegiance-educare.com/colleges/thumb/250_250_1392964652adhaiprasakthi%20college%20art%20and%20science.png",
    mgr:"assets/images/MGR LOGO.png"// source given was an Instagram profile page, not a direct image: https://www.instagram.com/mgreri/?hl=en
    kaashiv:
      "assets/images/KAASHIV LOGO.jpeg"
},

  // ---- Project screenshots ----
  // Add a direct https image URL for each project once you have one — until
  // then the cards show a clean gradient placeholder instead of a broken image.
  PROJECT_IMAGES: {
    privateServer: "assets/images/SERVER LOGO.jpeg", // e.g. "assets/images/private-server.jpg"
    babyshieldIot: "assets/images/IOT LOGO.jpeg", // e.g. "assets/images/babyshield-iot.jpg"
  },
};
