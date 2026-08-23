/* =========================================================
   HADI PORTFOLIO — SCRIPT.JS
   Stable loader + navigation + animations
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LOADER
  ======================================================= */

  const loader = document.getElementById("loader");

  // Always release the page from loading state
  const finishLoading = () => {
    document.body.classList.remove("loading");

    if (loader) {
      loader.classList.add("loaded");

      setTimeout(() => {
        loader.style.display = "none";
      }, 700);
    }
  };

  // Small intro animation, but never allow it to get stuck
  setTimeout(finishLoading, 1200);


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("active");

      menuBtn.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuBtn.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });


    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(link => {

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

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    // Fallback for older browsers
    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const header = document.getElementById("header");

  if (header) {

    const updateHeader = () => {

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

  }


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

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
     CURRENT YEAR
  ======================================================= */

  const yearElements =
    document.querySelectorAll("[data-year]");

  yearElements.forEach(element => {
    element.textContent =
      new Date().getFullYear();
  });


  /* =======================================================
     PROJECT CARD INTERACTION
  ======================================================= */

  const projectCards =
    document.querySelectorAll(".project-card");

  projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });

  });


  /* =======================================================
     CONTACT CARD INTERACTION
  ======================================================= */

  const contactCards =
    document.querySelectorAll(".contact-card");

  contactCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });

  });


  /* =======================================================
     KEYBOARD ACCESSIBILITY
  ======================================================= */

  document.addEventListener("keydown", event => {

    // Escape closes mobile navigation
    if (
      event.key === "Escape" &&
      navLinks &&
      menuBtn
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


  /* =======================================================
     PAGE READY
  ======================================================= */

  document.documentElement.classList.add("js-ready");

});
