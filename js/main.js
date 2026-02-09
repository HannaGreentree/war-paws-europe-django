document.addEventListener("DOMContentLoaded", () => {
  // Footer year (only works if you add <span id="year"></span> in HTML)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // War day counter (UTC-safe)
  const warDayEl = document.getElementById("warDayNumber");
  if (warDayEl) {
    const warStartUTC = Date.UTC(2022, 1, 24); // Feb 24 2022
    const now = new Date();
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const days = Math.floor((todayUTC - warStartUTC) / (24 * 60 * 60 * 1000));
    warDayEl.textContent = String(days);
  }

  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (menuBtn && mainNav) {
    const closeMenu = () => {
      mainNav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    };

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking a link inside nav
    mainNav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) closeMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        mainNav.classList.contains("is-open") &&
        !e.target.closest(".main-nav") &&
        !e.target.closest(".menu-btn")
      ) {
        closeMenu();
      }
    });

    // Close menu on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // HERO overlay reveal (stagger by data-order)
  // Updated to match your new HTML/CSS class: .hero-overlay-photos
  const overlayTiles = document.querySelectorAll(".hero-overlay-photos");
  if (overlayTiles.length) {
    const WAIT_BEFORE_START = 800; // 0.8 seconds before starting
    const STAGGER = 400; // 0.4 seconds between tiles

    const tilesSorted = Array.from(overlayTiles).sort(
      (a, b) => Number(a.dataset.order) - Number(b.dataset.order)
    );

    setTimeout(() => {
      tilesSorted.forEach((tile, index) => {
        setTimeout(() => tile.classList.add("is-revealed"), index * STAGGER);
      });
    }, WAIT_BEFORE_START);
  }

  // STORY IMAGE SWAP: run once when scrolled into view
  const swaps = document.querySelectorAll(".story-swap");
  if (swaps.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const swap = entry.target;
          const overlay = swap.querySelector(".story-overlay");
          if (!overlay) return;

          obs.unobserve(swap);

          // base image visible first, then slide overlay
          setTimeout(() => overlay.classList.add("is-revealed"), 500);
        });
      },
      { threshold: 0.6 }
    );

    swaps.forEach((swap) => observer.observe(swap));
  }
});
