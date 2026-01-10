/* =========================
   War Paws International
   Home page main.js
   ========================= */

/**
 * 1) Footer year
 */
(function setYear() {
  const yearEl = document.getElementById("year");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
})();

/**
 * 2) Live war-day counter
 * You told me: 27/12/2025 = Day 1402
 * This script calculates the day number for "today"
 * and updates it automatically every time the page loads.
 */
(function warDayCounter() {
  const dayEl = document.getElementById("warDayNumber");
  if (!dayEl) return;

  // Base: 27 Dec 2025 is Day 1402
  const baseDate = new Date(Date.UTC(2025, 11, 27)); // months are 0-based (11 = Dec)
  const baseDayNumber = 1402;

  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((todayUTC - baseDate) / msPerDay);

  const currentDayNumber = baseDayNumber + diffDays;

  // Safety: avoid showing negative numbers if system date is earlier than base date
  dayEl.textContent = currentDayNumber > 0 ? String(currentDayNumber) : String(baseDayNumber);
})();

/**
 * 3) Hero overlay animation (4 images slide down and cover base images)
 * CSS already animates .hero-overlay with @keyframes overlayDrop.
 * This JS is here so you can:
 * - delay the animation slightly
 * - or disable animation for users who prefer reduced motion
 */
(function heroOverlayControl() {
  const overlay = document.querySelector(".hero-overlay");
  if (!overlay) return;

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    overlay.style.animation = "none";
    overlay.style.transform = "translateY(0)";
    return;
  }

  // Optional: small delay so images load first
  overlay.style.animationDelay = "0.2s";
})();

/**
 * 4) Simple search behavior (optional)
 * Your header search sends to documents.html?q=...
 * This adds a tiny improvement: if the input is empty, do nothing.
 */
(function searchGuard() {
  const form = document.querySelector(".site-search");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const input = form.querySelector("input[type='search']");
    if (!input) return;

    if (input.value.trim().length === 0) {
      e.preventDefault();
      input.focus();
    }
  });
})();


✅ js/shelters.js

/* =========================
   War Paws International
   Shelters page JavaScript
   ========================= */

/*
  This script allows users to search shelters by:
  - shelter name
  - city / location
  - description text

  It hides cards that do not match the search query.
*/

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".shelter-search");
  const shelterCards = document.querySelectorAll(".shelter-card");

  if (!searchInput || shelterCards.length === 0) {
    return;
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();

    shelterCards.forEach(function (card) {
      const cardText = card.innerText.toLowerCase();

      if (cardText.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});










/* =========================
   War Paws International
   Documents page JavaScript
   ========================= */

/*
  This file adds small, useful interactions to the Documents page:
  1) Accordion-style toggle for step items (optional, but improves UX)
  2) Search/highlight within the Documents page using ?q=
     - reads the query from the URL
     - highlights matching words inside the main content area
*/

document.addEventListener("DOMContentLoaded", function () {
  initAccordion();
  highlightFromQueryString();
});

/* -------------------------
   1) Accordion for steps
   ------------------------- */
function initAccordion() {
  const stepItems = document.querySelectorAll(".step-item");

  // If the page doesn't have steps, do nothing
  if (!stepItems.length) return;

  stepItems.forEach(function (item) {
    const title = item.querySelector("h3");
    if (!title) return;

    // Wrap all content after the title so we can toggle it
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "step-content";

    // Move siblings after h3 into the wrapper
    let next = title.nextElementSibling;
    while (next) {
      const current = next;
      next = next.nextElementSibling;
      contentWrapper.appendChild(current);
    }

    item.appendChild(contentWrapper);

    // Start collapsed on mobile only (optional)
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
    if (isSmallScreen) {
      contentWrapper.style.display = "none";
      title.setAttribute("aria-expanded", "false");
      title.style.cursor = "pointer";
    } else {
      title.setAttribute("aria-expanded", "true");
    }

    // Toggle on click (only if collapsed initially)
    title.addEventListener("click", function () {
      if (!isSmallScreen) return;

      const isOpen = contentWrapper.style.display !== "none";
      contentWrapper.style.display = isOpen ? "none" : "block";
      title.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });
}

/* -------------------------
   2) Highlight from ?q=
   ------------------------- */
function highlightFromQueryString() {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();

  // If no query, do nothing
  if (!query) return;

  // Only highlight inside the main area to avoid messing with nav/footer
  const main = document.querySelector("main");
  if (!main) return;

  // Highlight only simple words (avoid special regex issues)
  const safeQuery = escapeRegExp(query);

  // Avoid highlighting extremely short queries (like 1 letter)
  if (safeQuery.length < 2) return;

  // Walk text nodes and wrap matches
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  let node;

  while ((node = walker.nextNode())) {
    // Skip empty nodes
    if (!node.nodeValue || !node.nodeValue.trim()) continue;
    textNodes.push(node);
  }

  const regex = new RegExp(`(${safeQuery})`, "gi");

  textNodes.forEach(function (textNode) {
    const parent = textNode.parentNode;
    if (!parent) return;

    // Don't highlight inside scripts/styles
    const tag = parent.nodeName.toLowerCase();
    if (tag === "script" || tag === "style") return;

    const originalText = textNode.nodeValue;

    if (!regex.test(originalText)) return;

    const span = document.createElement("span");
    span.innerHTML = originalText.replace(regex, '<mark class="docs-mark">$1</mark>');

    parent.replaceChild(span, textNode);
  });
}

/* -------------------------
   Helpers
   ------------------------- */
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}












/* =========================
   War Paws International
   documents.js (Documents page)
   =========================

   Features:
   1) Step accordion (collapses/expands each step by clicking its title)
   2) Optional highlight from URL query ?q= (useful for site search)

   This file expects your step items to use:
   - <li class="step-item"><h3>...</h3> ...</li>
*/

document.addEventListener("DOMContentLoaded", () => {
  setupStepAccordion();
  highlightFromQueryParam();
});

/* -------------------------
   1) Accordion for steps
   ------------------------- */
function setupStepAccordion() {
  const stepItems = document.querySelectorAll(".step-item");
  if (stepItems.length === 0) return;

  stepItems.forEach((item) => {
    const title = item.querySelector("h3");
    if (!title) return;

    // Put everything after the h3 into a wrapper we can show/hide
    const content = document.createElement("div");
    content.className = "step-content";

    let next = title.nextElementSibling;
    while (next) {
      const current = next;
      next = next.nextElementSibling;
      content.appendChild(current);
    }
    item.appendChild(content);

    // Make the title behave like a button (accessible)
    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    title.style.cursor = "pointer";

    // Start open by default (you can change to "false" if you want collapsed)
    let open = true;
    title.setAttribute("aria-expanded", "true");

    title.addEventListener("click", () => {
      open = !open;
      content.style.display = open ? "block" : "none";
      title.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Keyboard support (Enter/Space)
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        title.click();
      }
    });
  });
}

/* -------------------------
   2) Highlight from ?q=
   ------------------------- */
function highlightFromQueryParam() {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();
  if (query.length < 2) return;

  const main = document.querySelector("main");
  if (!main) return;

  const safe = escapeRegExp(query);
  const regex = new RegExp(`(${safe})`, "gi");

  // Walk text nodes and wrap matches in <mark>
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  let node;

  while ((node = walker.nextNode())) {
    if (!node.nodeValue || !node.nodeValue.trim()) continue;
    nodes.push(node);
  }

  nodes.forEach((textNode) => {
    const parent = textNode.parentNode;
    if (!parent) return;

    const tag = parent.nodeName.toLowerCase();
    if (tag === "script" || tag === "style") return;

    const text = textNode.nodeValue;
    if (!regex.test(text)) return;

    const span = document.createElement("span");
    span.innerHTML = text.replace(regex, '<mark class="docs-mark">$1</mark>');
    parent.replaceChild(span, textNode);
  });
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}











/* =========================
   War Paws International
   blog.js
   ========================= */

/*
  Features:
  - Filters blog posts by keyword (title, excerpt, meta text)
  - Uses plain JavaScript (no libraries)
*/

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('.site-search input[name="q"]');
  const posts = document.querySelectorAll(".blog-post");

  if (!searchInput || posts.length === 0) {
    return;
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();

    posts.forEach(function (post) {
      const postText = post.innerText.toLowerCase();

      if (postText.includes(query)) {
        post.style.display = "grid";
      } else {
        post.style.display = "none";
      }
    });
  });
});










