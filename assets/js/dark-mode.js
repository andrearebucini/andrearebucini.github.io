(function () {
  function createDarkModeButton() {
    const masthead = document.querySelector(".masthead__menu");

    if (!masthead) {
      return;
    }

    const button = document.createElement("button");
    button.id = "dark-mode-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Toggle dark mode");

    const currentTheme = localStorage.getItem("theme");
    const isDark = currentTheme === "dark";

    button.textContent = isDark ? "Light mode" : "Dark mode";

    button.addEventListener("click", function () {
      const darkModeIsActive = document.documentElement.classList.toggle("dark-mode");

      if (darkModeIsActive) {
        localStorage.setItem("theme", "dark");
        button.textContent = "Light mode";
      } else {
        localStorage.setItem("theme", "light");
        button.textContent = "Dark mode";
      }
    });

    masthead.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createDarkModeButton);
  } else {
    createDarkModeButton();
  }
})();
