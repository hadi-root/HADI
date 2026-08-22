/* =========================================================
   HADI PORTFOLIO
   SCRIPT.JS
========================================================= */


/* =========================================================
   LOADER
========================================================= */

const loader = document.getElementById("loader");

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


function hideLoader() {

  if (!loader) return;

  loader.classList.add("hidden");

  document.body.classList.remove("loading");
}


if (prefersReducedMotion) {

  hideLoader();

} else {

  window.addEventListener("load", () => {

    setTimeout(() => {
      hideLoader();
    }, 900);

  });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
  document.getElementById("menuBtn");

const navLinks =
  document.getElementById("navLinks");


function closeMobileMenu() {

  if (!navLinks || !menuBtn) return;

  navLinks.classList.remove("active");

  menuBtn.textContent = "☰";

  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );
}


if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const isOpen =
      navLinks.classList.toggle("active");

    menuBtn.textContent =
      isOpen ? "✕" : "☰";

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    });

}


/* =========================================================
   ESCAPE CLOSES MENU
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeMobileMenu();
  }

});


/* =========================================================
   HEADER SCROLL
========================================================= */

const header =
  document.getElementById("header");


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
  { passive: true }
);

updateHeader();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if (prefersReducedMotion) {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

} else {

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.10
      }

    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll("main section");

const navigationLinks =
  document.querySelectorAll(".nav-links a");


if (sections.length && navigationLinks.length) {

  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          navigationLinks.forEach(link => {
            link.classList.remove("active");
          });


          const activeLink =
            document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );


          if (activeLink) {
            activeLink.classList.add("active");
          }

        });

      },

      {
        rootMargin: "-35% 0px -55% 0px"
      }

    );


  sections.forEach(section => {
    sectionObserver.observe(section);
  });

}


/* =========================================================
   DESKTOP CURSOR GLOW
========================================================= */

const isCoarsePointer =
  window.matchMedia(
    "(pointer: coarse)"
  ).matches;


if (!prefersReducedMotion && !isCoarsePointer) {

  const cursorGlow =
    document.createElement("div");


  cursorGlow.style.position = "fixed";
  cursorGlow.style.width = "180px";
  cursorGlow.style.height = "180px";
  cursorGlow.style.borderRadius = "50%";
  cursorGlow.style.pointerEvents = "none";
  cursorGlow.style.zIndex = "-1";

  cursorGlow.style.background =
    "rgba(255,255,255,0.025)";

  cursorGlow.style.filter =
    "blur(45px)";

  cursorGlow.style.transform =
    "translate(-50%, -50%)";

  cursorGlow.style.opacity = "0";

  cursorGlow.style.transition =
    "opacity .3s ease";


  document.body.appendChild(cursorGlow);


  let cursorX = 0;
  let cursorY = 0;

  let glowX = 0;
  let glowY = 0;


  window.addEventListener(
    "mousemove",
    event => {

      cursorX = event.clientX;
      cursorY = event.clientY;

      cursorGlow.style.opacity = "1";

    },
    { passive: true }
  );


  function animateCursor() {

    glowX +=
      (cursorX - glowX) * .08;

    glowY +=
      (cursorY - glowY) * .08;


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

if (!prefersReducedMotion && !isCoarsePointer) {

  const projectCards =
    document.querySelectorAll(".project-card");


  projectCards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const rotateX =
          ((y / rect.height) - .5) * -2;

        const rotateY =
          ((x / rect.width) - .5) * 2;


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

        card.style.transform = "";

      }
    );

  });

}


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
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
          document.querySelector(targetId);


        if (!target) {
          return;
        }


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

  });


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );

      }
    );

  });


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.visibilityState === "visible"
    ) {

      document.title =
        "HADI — Developer Portfolio";

    } else {

      document.title =
        "HADI — Come back soon";

    }

  }
);


/* =========================================================
   INITIAL STATE
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-ready"
    );

  }
);
