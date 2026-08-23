/* =========================================================
   HADI PORTFOLIO
   AI WEB DESIGNER • DEVELOPER • CREATOR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const loader = document.getElementById("loader");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const header = document.getElementById("header");

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const isTouchDevice =
    window.matchMedia(
      "(pointer: coarse)"
    ).matches;


  /* =======================================================
     LOADER
  ======================================================= */

  function hideLoader() {

    if (!loader) return;

    loader.classList.add("hidden");

    document.body.classList.remove("loading");
  }


  if (prefersReducedMotion) {

    hideLoader();

  } else {

    window.addEventListener(
      "load",
      () => {

        setTimeout(
          hideLoader,
          900
        );

      },
      {
        once: true
      }
    );

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function closeMenu() {

    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove("active");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    menuBtn.textContent = "☰";
  }


  function toggleMenu() {

    if (!navLinks || !menuBtn) return;

    const isOpen =
      navLinks.classList.toggle("active");

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

    menuBtn.textContent =
      isOpen
        ? "✕"
        : "☰";
  }


  if (menuBtn) {

    menuBtn.addEventListener(
      "click",
      toggleMenu
    );

  }


  if (navLinks) {

    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          closeMenu
        );

      });

  }


  /* =======================================================
     ESCAPE CLOSE
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );

  updateHeader();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  } else {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: 0.08,
          rootMargin: "0px 0px -30px 0px"
        }

      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navigationLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  if (
    sections.length &&
    navigationLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                navigationLinks.forEach(
                  link => {

                    link.style.color = "#aaa";

                  }
                );


                const activeLink =
                  document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                  );


                if (activeLink) {

                  activeLink.style.color =
                    "white";

                }

              }

            }
          );

        },

        {
          threshold: 0.3
        }

      );


    sections.forEach(
      section => {

        sectionObserver.observe(
          section
        );

      }
    );

  }


  /* =======================================================
     SMOOTH ANCHOR FALLBACK
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(anchor => {

      anchor.addEventListener(
        "click",
        event => {

          const targetId =
            anchor.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            15;


          window.scrollTo({
            top: targetPosition,
            behavior:
              prefersReducedMotion
                ? "auto"
                : "smooth"
          });

        }
      );

    });


  /* =======================================================
     DESKTOP CURSOR GLOW
  ======================================================= */

  if (
    !prefersReducedMotion &&
    !isTouchDevice
  ) {

    const cursorGlow =
      document.createElement(
        "div"
      );


    cursorGlow.setAttribute(
      "aria-hidden",
      "true"
    );


    Object.assign(
      cursorGlow.style,
      {
        position: "fixed",
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "-1",
        background: "rgba(255,255,255,0.025)",
        filter: "blur(45px)",
        transform: "translate(-50%, -50%)",
        opacity: "0",
        transition: "opacity .3s ease"
      }
    );


    document.body.appendChild(
      cursorGlow
    );


    let cursorX = 0;
    let cursorY = 0;

    let glowX = 0;
    let glowY = 0;


    window.addEventListener(
      "mousemove",
      event => {

        cursorX =
          event.clientX;

        cursorY =
          event.clientY;

        cursorGlow.style.opacity =
          "1";

      },
      {
        passive: true
      }
    );


    window.addEventListener(
      "mouseleave",
      () => {

        cursorGlow.style.opacity =
          "0";

      }
    );


    function animateCursor() {

      glowX +=
        (cursorX - glowX) * 0.08;

      glowY +=
        (cursorY - glowY) * 0.08;


      cursorGlow.style.left =
        `${glowX}px`;

      cursorGlow.style.top =
        `${glowY}px`;


      requestAnimationFrame(
        animateCursor
      );

    }


    animateCursor();

  }


  /* =======================================================
     PROJECT CARD TILT
  ======================================================= */

  if (
    !prefersReducedMotion &&
    !isTouchDevice
  ) {

    const projectCards =
      document.querySelectorAll(
        ".project-card"
      );


    projectCards.forEach(
      card => {

        card.addEventListener(
          "mousemove",
          event => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;


            const centerX =
              rect.width / 2;

            const centerY =
              rect.height / 2;


            const rotateX =
              ((y - centerY) /
                centerY) * -1.5;

            const rotateY =
              ((x - centerX) /
                centerX) * 1.5;


            card.style.transform =
              `translateY(-10px)
               perspective(900px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)`;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     EXTERNAL LINK SAFETY
  ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach(link => {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    });


  /* =======================================================
     SERVICE CTA TRACKING
     Lightweight visual feedback only.
  ======================================================= */

  const serviceLinks =
    document.querySelectorAll(
      'a[href*="buildwithroothub"]'
    );


  serviceLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          link.classList.add(
            "clicked"
          );

        }
      );

    }
  );


  /* =======================================================
     YEAR
     Keeps footer current automatically.
  ======================================================= */

  const footerYear =
    document.querySelector(
      "[data-year]"
    );


  if (footerYear) {

    footerYear.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     PAGE READY
  ======================================================= */

  document.body.classList.add(
    "portfolio-ready"
  );

});
```
