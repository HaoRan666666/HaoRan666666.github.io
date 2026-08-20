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
  return saved === "zh" || saved === "en" ? saved : "zh";
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
});

document.getElementById("lang-toggle").addEventListener("click", () => {
  setLang(currentLang() === "zh" ? "en" : "zh");
});

setTheme(getInitialTheme());
setLang(getInitialLang());
