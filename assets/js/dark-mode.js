(function () {
  function createDarkModeButton() {
    const nav = document.querySelector(".greedy-nav");

    if (!nav) {
      return;
    }

    const button = document.createElement("button");
    button.id = "dark-mode-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Toggle dark mode");
    button.setAttribute("title", "Toggle dark mode");

    const currentTheme = localStorage.getItem("theme");
    const isDark = currentTheme === "dark";

    button.textContent = isDark ? "☀" : "☾";

    button.addEventListener("click", function () {
      const darkModeIsActive = document.documentElement.classList.toggle("dark-mode");

      if (darkModeIsActive) {
        localStorage.setItem("theme", "dark");
        button.textContent = "☀";
      } else {
        localStorage.setItem("theme", "light");
        button.textContent = "☾";
      }
    });

    nav.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createDarkModeButton);
  } else {
    createDarkModeButton();
  }
})();
