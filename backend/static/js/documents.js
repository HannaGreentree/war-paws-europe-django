// documents.js

// 1) Footer year (safe if main.js already does it)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 2) Keep search input value from ?q=...
const params = new URLSearchParams(window.location.search);
const q = params.get("q");
const qInput = document.getElementById("q");
if (qInput && q !== null) qInput.value = q;
