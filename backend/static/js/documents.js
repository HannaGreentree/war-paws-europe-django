// documents page

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Keep search input value from ?q=...
const params = new URLSearchParams(window.location.search);
const q = params.get("q");
const qInput = document.getElementById("q");
if (qInput && q !== null) qInput.value = q;
