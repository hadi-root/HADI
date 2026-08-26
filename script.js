/* =========================================================
   HADI PORTFOLIO — SCRIPT.JS
   Stable loader + navigation + animations + accessibility
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LOADER
  ======================================================= */

  const loader = document.getElementById("loader");

  const finishLoading = () => {
    document.body.classList.remove("loading");

    if (loader) {
      // Matches the CSS '#loader.hidden' rule
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.style.display = "none";
      }, 700);
    }
  };

  // Small intro animation delay with stuck-loader fallback
  setTimeout(finishLoading, 1200);


  /* =======================================================
     MOBILE MENU & NAVIGATION
  ======================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {

    const closeMenu = () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = ""; // Restores background scrolling
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation menu");
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      // Locks scrolling on the main page while mobile menu is open
      document.body.style.overflow = isOpen ? "hidden" : "";

      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close menu when tapping any navigation link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when pressing the Escape key
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });

  }


  /* =======================================================
     SCROLL REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
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

    // Fallback for older web browsers
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

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

  }


  /* =======================================================
     SMOOTH SCROLLING
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

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
     DYNAMIC CURRENT YEAR
  ======================================================= */

  const yearElements = document.querySelectorAll("[data-year]");

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* =======================================================
     CARD INTERACTION HOVERS
  ======================================================= */

  const interactiveCards = document.querySelectorAll(".project-card, .contact-card");

  interactiveCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });

  });


  /* =======================================================
     PAGE READY STATE
  ======================================================= */

  document.documentElement.classList.add("js-ready");

});
