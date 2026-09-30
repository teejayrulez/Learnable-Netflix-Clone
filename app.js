/* ============================================
   Netflix Clone — Interactions
   ============================================ */

// ---- Mobile menu ----
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menu.addEventListener("click", () => {
  menu.classList.toggle("fa-x");
  navbar.classList.toggle("open"); // ← fixed: no leading dot
});

// Close mobile menu when a link is clicked
navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menu.classList.remove("fa-x");
  });
});

// ---- FAQ accordion (accessible) ----
document.querySelectorAll(".faq-wrapper").forEach((item) => {
  const toggle = item.querySelector(".faq-toggle");

  const setState = (open) => {
    item.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const activate = () => {
    const isOpen = item.classList.contains("active");
    // Close others (accordion behavior)
    document.querySelectorAll(".faq-wrapper").forEach((other) => {
      if (other !== item) {
        other.classList.remove("active");
        other
          .querySelector(".faq-toggle")
          .setAttribute("aria-expanded", "false");
      }
    });
    setState(!isOpen);
  };

  toggle.addEventListener("click", activate);

  // Keyboard support (Enter / Space)
  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  });
});

// ---- Scroll reveal animations ----
const revealTargets = document.querySelectorAll(
  ".hero-section-container, .faq-wrapper, .landing-footer, .home-moviecard, .second-moviecard, .third-moviecard, .fourth-moviecard, .fifth-moviecard, .sixth-moviecard, .seventh-moviecard"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ---- Navbar background on scroll ----
const nav = document.querySelector(".navbar-container");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });
}

// ---- Email validation (light touch) ----
document.querySelectorAll(".start-section").forEach((form) => {
  const input = form.querySelector("input");
  const btn = form.querySelector("a");
  if (!input || !btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) {
      input.classList.add("shake", "error");
      setTimeout(() => input.classList.remove("shake"), 500);
      input.focus();
      return;
    }
    input.classList.remove("error");
    btn.textContent = "Loading…";
    setTimeout(() => (btn.textContent = "Get Started >"), 1200);
  });
});