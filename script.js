/* =====================================================
   HADI PORTFOLIO — SCRIPT.JS
===================================================== */


/* =====================================================
   DOM ELEMENTS
===================================================== */

const loader = document.getElementById("loader");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const header = document.getElementById("header");

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =====================================================
   LOADER
===================================================== */

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


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const isOpen =
      navLinks.classList.toggle("active");

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuBtn.textContent =
      isOpen ? "✕" : "☰";

  });

}


/* =====================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
===================================================== */

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      if (!navLinks || !menuBtn) return;

      navLinks.classList.remove("active");

      menuBtn.textContent = "☰";

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

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


/* =====================================================
   SCROLL REVEAL
===================================================== */

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


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
  document.querySelectorAll("section");

const navigationLinks =
  document.querySelectorAll(".nav-links a");


if (sections.length && navigationLinks.length) {

  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;


          navigationLinks.forEach(link => {

            link.style.color = "#aaa";

          });


          const activeLink =
            document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );


          if (activeLink) {

            activeLink.style.color = "white";

          }

        });

      },

      {
        threshold: 0.35
      }

    );


  sections.forEach(section => {

    sectionObserver.observe(section);

  });

}


/* =====================================================
   DESKTOP CURSOR GLOW
===================================================== */

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

      cursorX = event.clientX;
      cursorY = event.clientY;

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


  function animateCursorGlow() {

    glowX +=
      (cursorX - glowX) * 0.08;

    glowY +=
      (cursorY - glowY) * 0.08;


    cursorGlow.style.left =
      `${glowX}px`;

    cursorGlow.style.top =
      `${glowY}px`;


    requestAnimationFrame(
      animateCursorGlow
    );

  }


  animateCursorGlow();

}


/* =====================================================
   ESCAPE KEY — CLOSE MOBILE MENU
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Escape"
    ) {
      return;
    }


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

  }
);


/* =====================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
  "click",
  event => {

    if (!navLinks || !menuBtn) {
      return;
    }


    const clickedInsideMenu =
      navLinks.contains(event.target);

    const clickedMenuButton =
      menuBtn.contains(event.target);


    if (
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {

      navLinks.classList.remove(
        "active"
      );


      menuBtn.textContent =
        "☰";


      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


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

          top: targetPosition,

          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth"

        });

      }
    );

  });


/* =====================================================
   PROJECT CARD TILT EFFECT
===================================================== */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


if (
  !prefersReducedMotion &&
  !isTouchDevice
) {

  projectCards.forEach(card => {

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
          2;


        const rotateX =
          ((centerY - y) /
            centerY) *
          2;


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

        card.style.transform = "";

      }
    );

  });

}


/* =====================================================
   SKILL HOVER MICRO INTERACTION
===================================================== */

const skills =
  document.querySelectorAll(
    ".skill"
  );


skills.forEach(skill => {

  skill.addEventListener(
    "mouseenter",
    () => {

      if (prefersReducedMotion) {
        return;
      }

      skill.style.zIndex = "2";

    }
  );


  skill.addEventListener(
    "mouseleave",
    () => {

      skill.style.zIndex = "";

    }
  );

});


/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */

const buttons =
  document.querySelectorAll(
    ".btn, .project-btn"
  );


if (!prefersReducedMotion) {

  buttons.forEach(button => {

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


        setTimeout(() => {

          ripple.remove();

        }, 600);

      }
    );

  });

}


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
