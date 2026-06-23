(function () {
  function updateButtonSymbol(button) {
    const isDark = document.documentElement.classList.contains("dark-mode");
    button.textContent = isDark ? "☀" : "☾";
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  function createDarkModeButton() {
    const nav = document.querySelector(".greedy-nav");

    if (!nav || document.querySelector("#dark-mode-toggle")) {
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

    nav.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createDarkModeButton);
  } else {
    createDarkModeButton();
  }
})();
