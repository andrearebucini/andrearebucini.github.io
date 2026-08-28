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

  function getNavLinks() {
    return Array.from(
      document.querySelectorAll(".greedy-nav .visible-links a, .greedy-nav .hidden-links a")
    );
  }

  function getSectionLinks() {
    const currentPath = normalisePath(window.location.pathname);

    return getNavLinks().filter(function (link) {
      const url = new URL(link.href);
      const linkPath = normalisePath(url.pathname);

      return linkPath === currentPath && url.hash && document.querySelector(url.hash);
    });
  }

  function clearActiveNavLinks() {
    getNavLinks().forEach(function (link) {
      link.classList.remove("active-nav-link");
    });
  }

  function getStickyOffset() {
    const masthead = document.querySelector(".masthead");
    const sectionNav = document.querySelector(".section-nav");

    const mastheadHeight = masthead ? masthead.offsetHeight : 0;
    const sectionNavHeight = sectionNav ? sectionNav.offsetHeight : 0;

    return mastheadHeight + sectionNavHeight + 20;
  }

  function markActiveSectionLink() {
    const sectionLinks = getSectionLinks();

    if (sectionLinks.length === 0) {
      clearActiveNavLinks();
      return;
    }

    const offset = getStickyOffset();
    const scrollPosition = window.scrollY + offset;

    let activeHash = sectionLinks[0].hash;

    sectionLinks.forEach(function (link) {
      const section = document.querySelector(link.hash);

      if (!section) {
        return;
      }

      if (section.offsetTop <= scrollPosition) {
        activeHash = link.hash;
      }
    });

    clearActiveNavLinks();

    sectionLinks.forEach(function (link) {
      if (link.hash === activeHash) {
        link.classList.add("active-nav-link");
      }
    });
  }

  function initialiseActiveNav() {
    markActiveSectionLink();

    window.addEventListener("scroll", markActiveSectionLink, { passive: true });
    window.addEventListener("resize", markActiveSectionLink);
    window.addEventListener("hashchange", markActiveSectionLink);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseActiveNav);
  } else {
    initialiseActiveNav();
  }
})();
