(function () {
  function isDarkMode() {
    return document.documentElement.classList.contains("dark-mode");
  }

  function updateButtonSymbol(button) {
    const isDark = isDarkMode();

    button.textContent = isDark ? "☀" : "☾";
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    button.setAttribute(
      "title",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
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
      const currentlyDark = isDarkMode();

      document.documentElement.classList.remove("dark-mode", "light-mode");

      if (currentlyDark) {
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      }

      updateButtonSymbol(button);
      button.blur();
    });

    container.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createDarkModeButton);
  } else {
    createDarkModeButton();
  }
})();
