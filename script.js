```javascript
/* =========================================================
   HADI PORTFOLIO
   JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const loader =
  document.getElementById("loader");

const header =
  document.getElementById("header");

const menuBtn =
  document.getElementById("menuBtn");

const navLinks =
  document.getElementById("navLinks");

const revealElements =
  document.querySelectorAll(".reveal");

const navigationLinks =
  document.querySelectorAll(".nav-links a");

const sections =
  document.querySelectorAll("main section");


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   LOADER
========================================================= */

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
        800
      );

    },
    { once: true }
  );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

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


navigationLinks.forEach(
  link => {

    link.addEventListener(
      "click",
      closeMenu
    );

  }
);


/* =========================================================
   ESCAPE CLOSE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

  if (!header) return;

  if (window.scrollY > 30) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

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


/* =========================================================
   SCROLL REVEAL
========================================================= */

if (
  prefersReducedMotion
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
        threshold: 0.10,
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


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

if (
  !prefersReducedMotion &&
  sections.length
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

                  link.style.color =
                    "#aaa";

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
        threshold: 0.35
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


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) return;

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior:
              prefersReducedMotion
                ? "auto"
                : "smooth",
            block: "start"
          });

        }
      );

    }
  );


/* =========================================================
   DESKTOP CURSOR GLOW
========================================================= */

const isTouchDevice =
  window.matchMedia(
    "(pointer: coarse)"
  ).matches;


if (
  !prefersReducedMotion &&
  !isTouchDevice
) {

  const cursorGlow =
    document.createElement("div");


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
      background:
        "rgba(255,255,255,0.025)",
      filter: "blur(45px)",
      transform:
        "translate(-50%, -50%)",
      opacity: "0",
      transition:
        "opacity .3s ease"
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


/* =========================================================
   PROJECT CARD POINTER EFFECT
========================================================= */

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

          const rotateY =
            ((x / rect.width) - .5) * 3;

          const rotateX =
            ((y / rect.height) - .5) * -3;


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


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 900
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   PAGE READY
========================================================= */

document.documentElement
  .classList.add(
    "js-enabled"
  );
```
