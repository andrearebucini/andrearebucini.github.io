(function () {
  function getSectionNavLinks() {
    return Array.from(document.querySelectorAll(".section-nav a[href^='#'], .section-nav a[href^='/#']"));
  }

  function getTargetFromLink(link) {
    const url = new URL(link.href, window.location.origin);
    if (!url.hash) {
      return null;
    }

    return document.querySelector(url.hash);
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
      return getTargetFromLink(link);
    });

    if (links.length === 0) {
      return;
    }

    const scrollPosition = window.scrollY + getOffset() + 10;
    let activeHash = links[0].hash;

    links.forEach(function (link) {
      const target = getTargetFromLink(link);

      if (target && target.offsetTop <= scrollPosition) {
        activeHash = link.hash;
      }
    });

    clearActiveLinks();

    links.forEach(function (link) {
      if (link.hash === activeHash) {
        link.classList.add("active-nav-link");
      }
    });
  }

  function handleSectionClicks() {
    getSectionNavLinks().forEach(function (link) {
      const target = getTargetFromLink(link);

      if (!target) {
        return;
      }

      link.addEventListener("click", function (event) {
        const url = new URL(link.href, window.location.origin);

        if (url.pathname !== window.location.pathname && url.pathname !== "/") {
          return;
        }

        event.preventDefault();

        const top = target.offsetTop - getOffset();

        window.scrollTo({
          top: top,
          behavior: "smooth"
        });

        history.pushState(null, "", url.hash);

        setTimeout(markActiveSection, 250);
      });
    });
  }

  function initialise() {
    handleSectionClicks();
    markActiveSection();

    window.addEventListener("scroll", markActiveSection, { passive: true });
    window.addEventListener("resize", markActiveSection);
    window.addEventListener("hashchange", markActiveSection);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise);
  } else {
    initialise();
  }
})();
