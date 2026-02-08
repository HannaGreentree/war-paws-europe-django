document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  const warDayEl = document.getElementById("warDayNumber");
  if (warDayEl) {
    const warStartUTC = Date.UTC(2022, 1, 24); 
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


    mainNav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) closeMenu();
    });

  
    document.addEventListener("click", (e) => {
      if (
        mainNav.classList.contains("is-open") &&
        !e.target.closest(".main-nav") &&
        !e.target.closest(".menu-btn")
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  const overlayTiles = document.querySelectorAll(".hero-overlay-photos");
  if (overlayTiles.length) {
    const WAIT_BEFORE_START = 800; 
    const STAGGER = 400; 

    const tilesSorted = Array.from(overlayTiles).sort(
      (a, b) => Number(a.dataset.order) - Number(b.dataset.order)
    );

    setTimeout(() => {
      tilesSorted.forEach((tile, index) => {
        setTimeout(() => tile.classList.add("is-revealed"), index * STAGGER);
      });
    }, WAIT_BEFORE_START);
  }


  const swaps = document.querySelectorAll(".story-swap");
  if (swaps.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const swap = entry.target;
          const overlay = swap.querySelector(".story-overlay");
          if (!overlay) return;

          obs.unobserve(swap);

       
          setTimeout(() => overlay.classList.add("is-revealed"), 500);
        });
      },
      { threshold: 0.6 }
    );

    swaps.forEach((swap) => observer.observe(swap));
  }

  // CONTACT form 
  const switchButtons = document.querySelectorAll(".switch-btn");
  const contactForms = document.querySelectorAll(".contact-form");

 
  if (switchButtons.length && contactForms.length) {
    switchButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
    
        switchButtons.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });

     
        contactForms.forEach((f) => f.classList.add("hidden"));

       
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

     
        const targetId = btn.dataset.target;
        const targetForm = document.getElementById(targetId);
        if (targetForm) targetForm.classList.remove("hidden");
      });
    });
  }
});