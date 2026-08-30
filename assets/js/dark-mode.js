(function () {
  function updateButtonSymbol(button) {
    const isDark = document.documentElement.classList.contains("dark-mode");
    button.textContent = isDark ? "☀" : "☾";
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  function createDarkModeButton() {
    const container =
      document.querySelector(".site-hero") ||
      document.querySelector(".greedy-nav") ||
      document.body;

    if (!container || document.querySelector("#dark-mode-toggle")) {
      return;
    }

    const button = document.createElement("button");
    button.id = "dark-mode-toggle";
    button.type = "button";

    updateButtonSymbol(button);

    button.addEventListener("click", function () {
      const isDark = document.documentElement.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateButtonSymbol(button);
    });

    container.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createDarkModeButton);
  } else {
    createDarkModeButton();
  }
})();
