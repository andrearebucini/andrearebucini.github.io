(function () {
  function normalisePath(path) {
    if (!path) {
      return "/";
    }

    path = path.replace(/\/index\.html$/, "/");

    if (!path.endsWith("/")) {
      path += "/";
    }

    return path;
  }

  function markActiveNavLink() {
    const currentPath = normalisePath(window.location.pathname);
    const navLinks = document.querySelectorAll(".greedy-nav .visible-links a");

    navLinks.forEach(function (link) {
      const linkPath = normalisePath(new URL(link.href).pathname);

      const isHome = linkPath === "/" && currentPath === "/";
      const isSection = linkPath !== "/" && currentPath.startsWith(linkPath);

      if (isHome || isSection) {
        link.classList.add("active-nav-link");
      } else {
        link.classList.remove("active-nav-link");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markActiveNavLink);
  } else {
    markActiveNavLink();
  }
})();
