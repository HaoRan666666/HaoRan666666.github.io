const THEME_KEY = "theme";
const LANG_KEY = "lang";

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return saved === "light" || saved === "dark" ? saved : "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function getInitialLang() {
  const saved = localStorage.getItem(LANG_KEY);
  return saved === "zh" || saved === "en" ? saved : "en";
}

function currentLang() {
  return document.documentElement.lang === "zh-CN" ? "zh" : "en";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyLanguage(lang);
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(next);
  sendGiscusConfig();
});

document.getElementById("lang-toggle").addEventListener("click", () => {
  setLang(currentLang() === "zh" ? "en" : "zh");
  startTypewriter();
  sendGiscusConfig();
});

const menuToggle = document.getElementById("menu-toggle");
const siteHeader = document.querySelector(".site-header");
menuToggle.addEventListener("click", () => {
  const open = siteHeader.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Hero 角色打字机轮换
const roleTextEl = document.getElementById("role-text");
let roleIdx = 0;
let roleCharIdx = 0;
let roleDeleting = false;
let roleTimer = null;

function typeRole() {
  const roles = translations[currentLang()].hero.roles;
  const word = roles[roleIdx % roles.length];

  if (!roleDeleting) {
    roleCharIdx++;
    roleTextEl.textContent = word.slice(0, roleCharIdx);
    if (roleCharIdx === word.length) {
      roleDeleting = true;
      roleTimer = setTimeout(typeRole, 2000);
      return;
    }
    roleTimer = setTimeout(typeRole, 75);
  } else {
    roleCharIdx--;
    roleTextEl.textContent = word.slice(0, roleCharIdx);
    if (roleCharIdx === 0) {
      roleDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      roleTimer = setTimeout(typeRole, 300);
      return;
    }
    roleTimer = setTimeout(typeRole, 40);
  }
}

function startTypewriter() {
  clearTimeout(roleTimer);
  roleIdx = 0;
  roleCharIdx = 0;
  roleDeleting = false;
  roleTextEl.textContent = "";
  roleTimer = setTimeout(typeRole, 300);
}

// giscus 评论：让语言/主题跟随网站
function giscusTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
function giscusLang() {
  return currentLang() === "zh" ? "zh-CN" : "en";
}
function sendGiscusConfig() {
  const frame = document.querySelector("iframe.giscus-frame");
  if (!frame || !frame.contentWindow) return;
  frame.contentWindow.postMessage(
    { giscus: { setConfig: { theme: giscusTheme(), lang: giscusLang() } } },
    "https://giscus.app"
  );
}
let giscusReady = false;
window.addEventListener("message", (event) => {
  if (!giscusReady && event.origin === "https://giscus.app" && event.data && event.data.giscus) {
    giscusReady = true;
    sendGiscusConfig();
  }
});

setTheme(getInitialTheme());
setLang(getInitialLang());
startTypewriter();
