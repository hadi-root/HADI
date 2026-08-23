/* =========================================================
   HADI — PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const body = document.body;
  const loader = document.getElementById("loader");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const header = document.getElementById("header");
  const navItems = document.querySelectorAll(".nav-links a");
  const revealElements = document.querySelectorAll(".reveal");


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  const finishLoading = () => {
    setTimeout(() => {

      if (loader) {
        loader.classList.add("hidden");
      }

      body.classList.remove("loading");
      body.classList.add("loaded");

    }, 900);
  };

  if (document.readyState === "complete") {
    finishLoading();
  } else {
    window.addEventListener("load", finishLoading, { once: true });
  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("active");

      menuBtn.classList.toggle("active", isOpen);

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuBtn.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });


    /* Close menu after clicking a navigation link */

    navItems.forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {

        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      }

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length <= 1
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if (
    sections.length &&
    navItems.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navItems.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
              "active",
              href === `#${currentId}`
            );

          });

        });

      },
      {
        threshold: 0.25,
        rootMargin: "-20% 0px -55% 0px"
      }
    );


    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* =======================================================
     PROJECT CARD INTERACTION
     ======================================================= */

  const projectCards = document.querySelectorAll(
    ".project-card"
  );

  projectCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });

  });


  /* =======================================================
     BUTTON PRESS FEEDBACK
     ======================================================= */

  const buttons = document.querySelectorAll(
    ".btn, .project-btn"
  );

  buttons.forEach((button) => {

    button.addEventListener("mousedown", () => {
      button.classList.add("pressed");
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove("pressed");
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("pressed");
    });

  });


  /* =======================================================
     KEYBOARD ACCESSIBILITY
     ======================================================= */

  document.addEventListener("keydown", (event) => {

    /* Escape closes mobile menu */

    if (event.key === "Escape") {

      if (
        navLinks &&
        navLinks.classList.contains("active")
      ) {

        navLinks.classList.remove("active");

        if (menuBtn) {
          menuBtn.classList.remove("active");

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

          menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
          );

          menuBtn.focus();
        }

      }

    }

  });


  /* =======================================================
     EXTERNAL LINK SECURITY
     ======================================================= */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {

      const rel = link.getAttribute("rel") || "";

      if (!rel.includes("noopener")) {
        link.setAttribute(
          "rel",
          `${rel} noopener`.trim()
        );
      }

      if (!rel.includes("noreferrer")) {
        link.setAttribute(
          "rel",
          `${link.getAttribute("rel")} noreferrer`.trim()
        );
      }

    });


  /* =======================================================
     REDUCED MOTION SUPPORT
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  const handleReducedMotion = () => {

    if (prefersReducedMotion.matches) {

      document.documentElement.classList.add(
        "reduce-motion"
      );

      revealElements.forEach((element) => {
        element.classList.add("visible");
      });

    } else {

      document.documentElement.classList.remove(
        "reduce-motion"
      );

    }

  };

  handleReducedMotion();

  if (prefersReducedMotion.addEventListener) {
    prefersReducedMotion.addEventListener(
      "change",
      handleReducedMotion
    );
  }


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const progressBar =
    document.querySelector(".scroll-progress");

  const updateScrollProgress = () => {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress =
      (scrollTop / documentHeight) * 100;

    progressBar.style.width =
      `${Math.min(100, Math.max(0, progress))}%`;

  };

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* =======================================================
     BACKGROUND PARALLAX
     ======================================================= */

  const backgroundGlow =
    document.querySelector(".background-glow");

  if (backgroundGlow && !prefersReducedMotion.matches) {

    let ticking = false;

    const updateGlow = () => {

      const scrollY = window.scrollY;

      backgroundGlow.style.transform =
        `translate3d(0, ${scrollY * 0.04}px, 0)`;

      ticking = false;

    };

    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateGlow
          );

          ticking = true;

        }

      },
      { passive: true }
    );

  }


  /* =======================================================
     CONSOLE MESSAGE
     ======================================================= */

  console.log(
    "%cHADI — Developer • Creator • Builder",
    "font-size:16px;font-weight:bold;"
  );

  console.log(
    "Portfolio loaded successfully."
  );

});
