```js
/* =========================================================
   HADI — PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   DOM READY
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
     LOADER
  ======================================================= */

  function hideLoader() {

    if (!loader) {
      body.classList.remove("loading");
      return;
    }

    loader.classList.add("hidden");
    body.classList.remove("loading");

    /* Completely remove it after the transition */
    setTimeout(() => {
      loader.style.display = "none";
    }, 900);
  }


  /*
    Do NOT wait only for window.load.

    The loader will disappear after 1.8 seconds even if
    another resource is slow or fails to load.
  */

  setTimeout(hideLoader, 1800);


  /*
    Extra fallback in case the page loads normally.
  */

  window.addEventListener("load", () => {
    setTimeout(hideLoader, 500);
  });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("active");

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


    /*
      Close menu after clicking a navigation link.
    */

    navItems.forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("active");

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


    /*
      Close menu when clicking outside.
    */

    document.addEventListener("click", (event) => {

      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {

        navLinks.classList.remove("active");

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
     SMOOTH SCROLL
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     REVEAL ANIMATIONS
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

    /*
      Fallback for browsers without IntersectionObserver.
    */

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
    "IntersectionObserver" in window &&
    sections.length > 0
  ) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          const currentId = entry.target.getAttribute("id");

          navItems.forEach((link) => {

            const linkTarget =
              link.getAttribute("href");

            link.classList.toggle(
              "active",
              linkTarget === `#${currentId}`
            );

          });

        });

      },
      {
        threshold: 0.35,
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

  const projectCards =
    document.querySelectorAll(".project-card");


  projectCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
      card.classList.add("project-hover");
    });


    card.addEventListener("mouseleave", () => {
      card.classList.remove("project-hover");
    });

  });


  /* =======================================================
     BUTTON RIPPLE EFFECT
  ======================================================= */

  const buttons = document.querySelectorAll(
    ".btn, .project-btn"
  );


  buttons.forEach((button) => {

    button.addEventListener("click", function (event) {

      const ripple =
        document.createElement("span");

      ripple.className = "button-ripple";

      const rect =
        this.getBoundingClientRect();

      const size =
        Math.max(rect.width, rect.height);

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      ripple.style.left =
        `${event.clientX - rect.left - size / 2}px`;

      ripple.style.top =
        `${event.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

    });

  });


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElements =
    document.querySelectorAll("[data-year]");

  yearElements.forEach((element) => {
    element.textContent =
      new Date().getFullYear();
  });


  /* =======================================================
     KEYBOARD ACCESSIBILITY
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    /*
      Escape closes mobile navigation.
    */

    if (
      event.key === "Escape" &&
      navLinks &&
      navLinks.classList.contains("active")
    ) {

      navLinks.classList.remove("active");

      if (menuBtn) {

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

  });


  /* =======================================================
     REDUCED MOTION SUPPORT
  ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (prefersReducedMotion.matches) {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     BACKGROUND POINTER EFFECT
  ======================================================= */

  const backgroundGlow =
    document.querySelector(".background-glow");


  if (
    backgroundGlow &&
    !prefersReducedMotion.matches
  ) {

    let mouseX = 50;
    let mouseY = 50;

    let currentX = 50;
    let currentY = 50;


    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          (event.clientX / window.innerWidth) * 100;

        mouseY =
          (event.clientY / window.innerHeight) * 100;

      },
      { passive: true }
    );


    function animateGlow() {

      currentX +=
        (mouseX - currentX) * 0.05;

      currentY +=
        (mouseY - currentY) * 0.05;

      backgroundGlow.style.setProperty(
        "--mouse-x",
        `${currentX}%`
      );

      backgroundGlow.style.setProperty(
        "--mouse-y",
        `${currentY}%`
      );

      requestAnimationFrame(animateGlow);

    }


    animateGlow();

  }


  /* =======================================================
     PAGE INITIALIZATION
  ======================================================= */

  body.classList.add("js-ready");

  console.log(
    "HADI Portfolio initialized successfully."
  );

});
```
