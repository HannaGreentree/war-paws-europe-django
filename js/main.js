document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ main.js loaded");

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // War day counter (UTC-safe)
  const warDayEl = document.getElementById("warDayNumber");
  if (warDayEl) {
    const warStartUTC = Date.UTC(2022, 1, 24);
    const now = new Date();
    const todayUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    const days = Math.floor((todayUTC - warStartUTC) / (24 * 60 * 60 * 1000));
    warDayEl.textContent = String(days);
  }

  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn");
  const mainNav = document.querySelector(".main-nav");
  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("is-open");
    });
  }


  
  // ---- HERO VIDEO MASK REVEAL ----
   // ---- HERO VIDEO MASK REVEAL (ALL AT ONCE, LUMINANCE MASK for MP4) ----
const heroGrid = document.getElementById("heroGrid");
const heroOverlay = heroGrid.querySelector(".hero-overlay");
if (heroOverlay) heroOverlay.style.opacity = "0";

const maskVideo = document.getElementById("dripMaskVideo");
if (!heroGrid || !maskVideo) return;

const overlayTiles = heroGrid.querySelectorAll(".hero-overlay-tile");
if (overlayTiles.length !== 4) return;

const WAIT_BEFORE_START = 700;

function drawCover(ctx, source, cw, ch) {
  const sw = source.videoWidth || source.naturalWidth;
  const sh = source.videoHeight || source.naturalHeight;
  if (!sw || !sh) return;

  const scale = Math.max(cw / sw, ch / sh);
  const dw = sw * scale;
  const dh = sh * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;

  ctx.drawImage(source, dx, dy, dw, dh);
}

const items = Array.from(overlayTiles).map((tile) => {
  const img = tile.querySelector(".overlay-img");
  const canvas = tile.querySelector(".overlay-canvas");
  const ctx = canvas ? canvas.getContext("2d", { willReadFrequently: true }) : null;
  return { tile, img, canvas, ctx };
});

// Offscreen canvas to convert mask brightness -> alpha
const maskCanvas = document.createElement("canvas");
const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });

async function ensureImagesLoaded() {
  await Promise.all(
    items.map(({ img }) => {
      if (!img) return Promise.resolve();
      if (img.complete) return Promise.resolve();
      return new Promise((res) => img.addEventListener("load", res, { once: true }));
    })
  );
}

function sizeCanvases() {
  items.forEach(({ tile, canvas, ctx }) => {
    if (!canvas || !ctx) return;

    const rect = tile.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.display = "block";
  });

  // Use first tile size for mask canvas (all tiles same size in the grid)
  const first = items[0];
  if (first && first.canvas) {
    maskCanvas.width = first.canvas.width;
    maskCanvas.height = first.canvas.height;
  }
}

function makeLuminanceMask() {
  // draw current video frame to offscreen
  maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
  drawCover(maskCtx, maskVideo, maskCanvas.width, maskCanvas.height);

  const frame = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
  const data = frame.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // brightness 0..255
    const lum = (r + g + b) / 3;

    // black-on-white mask => invert (black reveals)
    const alpha = 255 - lum;

    // write white pixel with computed alpha
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = alpha;
  }

  maskCtx.putImageData(frame, 0, 0);
}

function renderFrame() {
  if (maskVideo.paused || maskVideo.ended) return;

  makeLuminanceMask();

  // Apply SAME mask to ALL tiles each frame
  items.forEach(({ img, canvas, ctx }) => {
    if (!img || !canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1) draw overlay image
    ctx.globalCompositeOperation = "source-over";
    drawCover(ctx, img, canvas.width, canvas.height);

    // 2) apply luminance mask
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(maskCanvas, 0, 0, canvas.width, canvas.height);
  });

  requestAnimationFrame(renderFrame);
}

function finishReveal() {
  items.forEach(({ img, canvas, ctx }) => {
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "none";
    }
    if (img) img.style.opacity = "1";
  });
}

async function startReveal() {
  await ensureImagesLoaded();
  sizeCanvases();
  if (heroOverlay) heroOverlay.style.opacity = "1";


  // Keep overlay images hidden until reveal ends
  items.forEach(({ img }) => img && (img.style.opacity = "0"));

  maskVideo.pause();
  maskVideo.currentTime = 0;

  await new Promise((res) => {
    if (maskVideo.readyState >= 2) return res();
    maskVideo.addEventListener("loadeddata", res, { once: true });
  });

  try {
    await maskVideo.play();
  } catch (e) {
    // click to start if autoplay blocked
    document.addEventListener(
      "click",
      async () => {
        try {
          await maskVideo.play();
          requestAnimationFrame(renderFrame);
        } catch (err) {
          finishReveal();
        }
      },
      { once: true }
    );
    return;
  }

  requestAnimationFrame(renderFrame);
  maskVideo.addEventListener("ended", finishReveal, { once: true });
}

setTimeout(startReveal, WAIT_BEFORE_START);

window.addEventListener("resize", () => {
  if (!maskVideo.ended) sizeCanvases();
});

});
