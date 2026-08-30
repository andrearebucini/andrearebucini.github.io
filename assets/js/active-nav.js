(function () {
  function getSectionNavLinks() {
    return Array.from(document.querySelectorAll(".section-nav a[href^='#'], .section-nav a[href^='/#']"));
  }

  function getHash(link) {
    const url = new URL(link.href, window.location.origin);
    return url.hash;
  }

  function getTarget(link) {
    const hash = getHash(link);

    if (!hash) {
      return null;
    }

    return document.querySelector(hash);
  }

  function getOffset() {
    const nav = document.querySelector(".section-nav");
    return nav ? nav.offsetHeight + 18 : 18;
  }

  function clearActiveLinks() {
    getSectionNavLinks().forEach(function (link) {
      link.classList.remove("active-nav-link");
    });
  }

  function markActiveSection() {
    const links = getSectionNavLinks().filter(function (link) {
      return getTarget(link);
    });

    if (links.length === 0) {
      return;
    }

    const scrollPosition = window.scrollY + getOffset() + 10;
    let activeHash = getHash(links[0]);

    links.forEach(function (link) {
      const target = getTarget(link);

      if (target && target.offsetTop <= scrollPosition) {
        activeHash = getHash(link);
      }
    });

    clearActiveLinks();

    links.forEach(function (link) {
      if (getHash(link) === activeHash) {
        link.classList.add("active-nav-link");
      }
    });
  }

  function initialise() {
    markActiveSection();

    window.addEventListener("scroll", markActiveSection, { passive: true });
    window.addEventListener("resize", markActiveSection);
    window.addEventListener("hashchange", function () {
      window.setTimeout(markActiveSection, 120);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise);
  } else {
    initialise();
  }
})();
