/* =========================================================
   HADI PORTFOLIO — ENHANCED ANIMATIONS SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LOADER WITH SMOOTH EXIT ANIMATION
  ======================================================= */

  const loader = document.getElementById("loader");

  const finishLoading = () => {
    document.body.classList.remove("loading");

    if (loader) {
      loader.classList.add("hidden");
      setTimeout(() => {
        loader.style.display = "none";
      }, 700);
    }
  };

  setTimeout(finishLoading, 1000);


  /* =======================================================
     DYNAMIC INTERACTIVE PARTICLE CANVAS
  ======================================================= */

  const createCanvasBackground = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "particle-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "-2";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.3 + 0.1
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();
  };

  createCanvasBackground();


  /* =======================================================
     3D CARD TILT ON MOUSEMOVE
  ======================================================= */

  const tiltCards = document.querySelectorAll(".project-card, .about-card, .skill-category, .contact-card");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.transition = "transform 0.1s ease-out";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.transition = "transform 0.5s ease";
    });
  });


  /* =======================================================
     TEXT TYPING ANIMATION (HERO TAG)
  ======================================================= */

  const heroSubtitle = document.querySelector(".hero h2 span");
  if (heroSubtitle) {
    const textToType = "& Modern Interfaces";
    heroSubtitle.textContent = "";
    let i = 0;

    const typeWriter = () => {
      if (i < textToType.length) {
        heroSubtitle.textContent += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 45);
      }
    };
    setTimeout(typeWriter, 1200);
  }


  /* =======================================================
     STAGGERED SCROLL REVEAL OBSERVER
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Stagger animation children if present
            const children = entry.target.querySelectorAll(".about-card, .skill-category, .project-card, .contact-card");
            children.forEach((child, index) => {
              child.style.animationDelay = `${index * 0.15}s`;
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }


  /* =======================================================
     MOBILE NAVIGATION MENU
  ======================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
      menuBtn.setAttribute("aria-expanded", "false");
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      document.body.style.overflow = isOpen ? "hidden" : "";
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && navLinks.classList.contains("active")) {
        closeMenu();
      }
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
     DYNAMIC YEAR
  ======================================================= */

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

});
