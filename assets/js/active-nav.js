(function () {
  function getSectionNavLinks() {
    return Array.from(
      document.querySelectorAll(".section-nav a[href^='#'], .section-nav a[href^='/#']")
    );
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

    if (!nav) {
      return 20;
    }

    return nav.offsetHeight + 20;
  }

  function cleanUrl() {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
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

    const scrollPosition = window.scrollY + getOffset() + 12;
    let activeHash = getHash(links[0]);

    links.forEach(function (link) {
      const target = getTarget(link);

      if (target && target.offsetTop <= scrollPosition) {
        activeHash = getHash(link);
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
      activeHash = getHash(links[links.length - 1]);
    }

    clearActiveLinks();

    links.forEach(function (link) {
      if (getHash(link) === activeHash) {
        link.classList.add("active-nav-link");
      }
    });
  }

  function scrollToSection(link) {
    const target = getTarget(link);

    if (!target) {
      return;
    }

    const targetTop =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      getOffset();

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });

    cleanUrl();

    window.setTimeout(markActiveSection, 150);
    window.setTimeout(markActiveSection, 400);
  }

  function initialiseSectionClicks() {
    getSectionNavLinks().forEach(function (link) {
      const target = getTarget(link);

      if (!target) {
        return;
      }

      link.addEventListener("click", function (event) {
        event.preventDefault();
        link.blur();
        scrollToSection(link);
      });
    });
  }

  function initialise() {
    cleanUrl();
    initialiseSectionClicks();
    markActiveSection();

    window.addEventListener("scroll", markActiveSection, { passive: true });
    window.addEventListener("resize", markActiveSection);
    window.addEventListener("popstate", function () {
      cleanUrl();
      markActiveSection();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise);
  } else {
    initialise();
  }
})();
