(() => {
  const key = "aviceo-theme";
  const options = ["light", "dark", "system"];
  let preference = "system";
  try {
    const stored = localStorage.getItem(key);
    if (options.includes(stored)) preference = stored;
  } catch {}
  document.documentElement.dataset.theme = preference;
  document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("[data-theme-select]");
    if (select) {
      select.value = preference;
      select.addEventListener("change", () => {
        document.documentElement.dataset.theme = select.value;
        try {
          localStorage.setItem(key, select.value);
        } catch {}
      });
    }
    document.querySelectorAll("[data-locale]").forEach((link) => {
      link.addEventListener("click", () => {
        try {
          localStorage.setItem("aviceo-language", link.dataset.locale);
        } catch {}
      });
    });
    const home = document.querySelector("[data-preferred-home]");
    if (home) {
      try {
        if (localStorage.getItem("aviceo-language") === "ar") home.href = "/Aviceo-website-preview/ar/";
      } catch {}
    }
    const menu = document.querySelector(".mobile-nav");
    if (menu) {
      menu.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.open) {
          menu.open = false;
          menu.querySelector("summary").focus();
        }
      });
      document.addEventListener("pointerdown", (event) => {
        if (!menu.contains(event.target)) menu.open = false;
      });
    }
  });
})();
