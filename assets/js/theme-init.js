(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  document.documentElement.classList.remove("dark-mode", "light-mode");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
  } else if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
  } else if (prefersDark) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.add("light-mode");
  }
})();
