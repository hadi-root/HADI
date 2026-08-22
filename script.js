/* =====================================================
   HADI PORTFOLIO
   SCRIPT.JS
===================================================== */


/* =====================================================
   DOM
===================================================== */

const loader =
  document.getElementById("loader");

const menuBtn =
  document.getElementById("menuBtn");

const navLinks =
  document.getElementById("navLinks");

const header =
  document.getElementById("header");

const backToTop =
  document.getElementById("backToTop");

const currentYear =
  document.getElementById("currentYear");


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


const isTouchDevice =
  window.matchMedia(
    "(pointer: coarse)"
  ).matches;


/* =====================================================
   CURRENT YEAR
===================================================== */

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =====================================================
   LOADER
===================================================== */

function hideLoader() {

  if (!loader) return;

  loader.classList.add("hidden");

  document.body.classList.remove(
    "loading"
  );

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

    }
  );

}


/* =====================================================
   SAFETY LOADER FALLBACK
===================================================== */

setTimeout(
  () => {

    hideLoader();

  },
  5000
);


/* =====================================================
   MOBILE MENU
===================================================== */

function closeMobileMenu() {

  if (!navLinks || !menuBtn) {
    return;
  }


  navLinks.classList.remove(
    "active"
  );


  menuBtn.textContent =
    "☰";


  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );


  menuBtn.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

}


if (menuBtn && navLinks) {

  menuBtn.addEventListener(
    "click",
    event => {

      event.stopPropagation();


      const isOpen =
        navLinks.classList.toggle(
          "active"
        );


      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      menuBtn.textContent =
        isOpen
          ? "✕"
          : "☰";


      menuBtn.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    }
  );

}


/* =====================================================
   NAV LINK CLICK
===================================================== */

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        closeMobileMenu();

      }
    );

  });


/* =====================================================
   CLICK OUTSIDE MENU
===================================================== */

document.addEventListener(
  "click",
  event => {

    if (!navLinks || !menuBtn) {
      return;
    }


    if (
      !navLinks.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {

      closeMobileMenu();

    }

  }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeMobileMenu();

    }

  }
);


/* =====================================================
   NAVBAR SCROLL
===================================================== */

function updateHeader() {

  if (!header) {
    return;
  }


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


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (prefersReducedMotion) {

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
        threshold: .10
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


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
  document.querySelectorAll(
    "main section"
  );


const navigationLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


if (
  sections.length &&
  navigationLinks.length
) {

  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            navigationLinks.forEach(
              link => {

                link.classList.remove(
                  "active"
                );

              }
            );


            const activeLink =
              document.querySelector(
                `.nav-links a[href="#${entry.target.id}"]`
              );


            if (activeLink) {

              activeLink.classList.add(
                "active"
              );

            }

          }
        );

      },

      {
        rootMargin:
          "-25% 0px -55% 0px"
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


/* =====================================================
   SMOOTH ANCHOR SCROLL
===================================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute(
            "href"
          );


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
          headerHeight;


        window.scrollTo({

          top:
            targetPosition,

          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth"

        });

      }
    );

  });


/* =====================================================
   BACK TO TOP
===================================================== */

function updateBackToTop() {

  if (!backToTop) {
    return;
  }


  if (window.scrollY > 600) {

    backToTop.classList.add(
      "visible"
    );

  } else {

    backToTop.classList.remove(
      "visible"
    );

  }

}


window.addEventListener(
  "scroll",
  updateBackToTop,
  {
    passive: true
  }
);


updateBackToTop();


if (backToTop) {

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior:
          prefersReducedMotion
            ? "auto"
            : "smooth"

      });

    }
  );

}


/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const particleContainer =
  document.querySelector(
    ".particles"
  );


if (
  particleContainer &&
  !prefersReducedMotion
) {

  const particleCount =
    isTouchDevice
      ? 18
      : 35;


  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );


    particle.className =
      "particle";


    particle.style.left =
      `${Math.random() * 100}%`;


    particle.style.setProperty(
      "--duration",
      `${8 + Math.random() * 14}s`
    );


    particle.style.setProperty(
      "--drift",
      `${-100 + Math.random() * 200}px`
    );


    particle.style.animationDelay =
      `${Math.random() * -20}s`;


    particleContainer.appendChild(
      particle
    );

  }

}


/* =====================================================
   DESKTOP CURSOR GLOW
===================================================== */

if (
  !prefersReducedMotion &&
  !isTouchDevice
) {

  const cursorGlow =
    document.createElement(
      "div"
    );


  cursorGlow.className =
    "cursor-glow";


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


      cursorGlow.classList.add(
        "active"
      );

    },
    {
      passive: true
    }
  );


  window.addEventListener(
    "mouseleave",
    () => {

      cursorGlow.classList.remove(
        "active"
      );

    }
  );


  function animateCursor() {

    glowX +=
      (cursorX - glowX) *
      .08;


    glowY +=
      (cursorY - glowY) *
      .08;


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


/* =====================================================
   MOUSE PARALLAX BACKGROUND
===================================================== */

if (
  !prefersReducedMotion &&
  !isTouchDevice
) {

  const background =
    document.querySelector(
      ".background-system"
    );


  window.addEventListener(
    "mousemove",
    event => {

      if (!background) {
        return;
      }


      const x =
        (event.clientX /
          window.innerWidth -
          .5) *
        20;


      const y =
        (event.clientY /
          window.innerHeight -
          .5) *
        20;


      background.style.transform =
        `translate(${x}px, ${y}px)`;

    },
    {
      passive: true
    }
  );

}


/* =====================================================
   PROJECT CARD TILT
===================================================== */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


if (
  !prefersReducedMotion &&
  !isTouchDevice
) {

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


          const rotateY =
            ((x - centerX) /
              centerX) *
            1.5;


          const rotateX =
            ((centerY - y) /
              centerY) *
            1.5;


          card.style.transform =
            `
              translateY(-10px)
              perspective(900px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;

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


/* =====================================================
   BUTTON RIPPLE
===================================================== */

const buttons =
  document.querySelectorAll(
    ".btn, .project-btn"
  );


if (!prefersReducedMotion) {

  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          const ripple =
            document.createElement(
              "span"
            );


          ripple.className =
            "button-ripple";


          const rect =
            button.getBoundingClientRect();


          ripple.style.left =
            `${event.clientX - rect.left}px`;


          ripple.style.top =
            `${event.clientY - rect.top}px`;


          button.appendChild(
            ripple
          );


          setTimeout(
            () => {

              ripple.remove();

            },
            600
          );

        }
      );

    }
  );

}


/* =====================================================
   SKILL INTERACTION
===================================================== */

document
  .querySelectorAll(".skill")
  .forEach(skill => {

    skill.addEventListener(
      "mouseenter",
      () => {

        if (
          !prefersReducedMotion
        ) {

          skill.style.zIndex =
            "2";

        }

      }
    );


    skill.addEventListener(
      "mouseleave",
      () => {

        skill.style.zIndex =
          "";

      }
    );

  });


/* =====================================================
   PAGE VISIBILITY
===================================================== */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.visibilityState ===
      "visible"
    ) {

      updateHeader();

      updateBackToTop();

    }

  }
);


/* =====================================================
   CONSOLE BRANDING
===================================================== */

console.log(
  "%c HADI ",
  "background:#fff;color:#000;font-size:20px;font-weight:900;padding:6px 12px;"
);


console.log(
  "%c Developer • Creator • Builder ",
  "color:#999;font-size:12px;"
);


console.log(
  "%c Building Code. Creating Tomorrow. ",
  "color:#777;font-size:11px;"
);
