/* ---------- animation & interaction helpers (framer-motion-flavor) ---------- */

/* Scramble animation — runs on elements with .scramble when they enter view */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|#*+<>";

function scrambleElement(el, duration = 900) {
  const target = el.dataset.text || el.textContent;
  el.dataset.text = target;
  const len = target.length;
  const start = performance.now();
  const runId = String((parseInt(el.dataset.scrambleRun || "0", 10) || 0) + 1);
  el.dataset.scrambleRun = runId;
  const fixedBy = new Array(len).fill(0).map((_, i) => start + (i / len) * duration * 0.7 + duration * 0.2);

  function tick(now) {
    if (el.dataset.scrambleRun !== runId) return;
    let out = "";
    let done = true;
    for (let i = 0; i < len; i++) {
      const ch = target[i];
      if (ch === " ") { out += " "; continue; }
      if (now >= fixedBy[i]) {
        out += ch;
      } else {
        done = false;
        out += SCRAMBLE_CHARS[(Math.floor(now / 40) + i * 7) % SCRAMBLE_CHARS.length];
      }
    }
    el.textContent = out;
    if (!done) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

function bindChapterTitleScramble() {
  document.querySelectorAll(".section-title.scramble").forEach((title) => {
    if (!title.dataset.scrambleHoverBound) {
      title.dataset.scrambleHoverBound = "1";
      title.addEventListener("mouseenter", () => scrambleElement(title));
    }
  });

  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    if (link.dataset.scrambleNavBound) return;
    link.dataset.scrambleNavBound = "1";
    link.addEventListener("click", () => {
      const id = link.getAttribute("href");
      if (!id || id === "#top") return;
      const section = document.querySelector(id);
      const title = section && section.querySelector(".section-title.scramble");
      if (title) scrambleElement(title);
    });
  });
}

/* Split text into word + line spans for staggered reveals */
function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  const text = el.textContent.replace(/\s+/g, " ").trim();
  el.textContent = "";
  const words = text.split(/(\s+)/);
  words.forEach((w, i) => {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
      return;
    }
    const span = document.createElement("span");
    span.className = "r-word";
    span.textContent = w;
    span.style.transitionDelay = (i * 40) + "ms";
    el.appendChild(span);
  });
}

/* Reveal via scroll-poll — IntersectionObserver can be flaky in sandboxed iframes */
let _revealTracked = new Set();
function _revealCheck() {
  const vh = window.innerHeight;
  document.querySelectorAll(".reveal:not(.in), .r-stagger:not(.in), .scramble:not(.in), .r-fade:not(.in), .split-words:not(.in), .hex-wrap:not(.in)")
    .forEach((el) => {
      if (_revealTracked.has(el) && el.classList.contains("in")) return;
      if (el.classList.contains("split-words") && !_revealTracked.has(el)) {
        splitWords(el);
        _revealTracked.add(el);
      }
      const r = el.getBoundingClientRect();
      const visible = r.top < vh - 40 && r.bottom > 40;
      if (visible) {
        el.classList.add("in");
        if (el.classList.contains("scramble")) scrambleElement(el);
        const staggerKids = el.querySelectorAll(".r-stagger > *");
        staggerKids.forEach((k, i) => { k.style.transitionDelay = (i * 70) + "ms"; });
      }
    });
}
function observeReveal() {
  _revealCheck();
  bindChapterTitleScramble();
  if (!window._revealBound) {
    window._revealBound = true;
    window.addEventListener("scroll", _revealCheck, { passive: true });
    window.addEventListener("resize", _revealCheck);
    // Poll briefly to catch late-mounting React components
    let poll = 0;
    const pid = setInterval(() => { _revealCheck(); if (++poll > 20) clearInterval(pid); }, 150);
  }
}
window.observeReveal = observeReveal;

/* Draw-line animation for SVG — also uses scroll-poll fallback */
function observeSvgDraws() {
  document.querySelectorAll(".draw-line").forEach((path) => {
    if (path.__drawn) return;
    path.__drawn = true;
    try {
      const len = path.getTotalLength();
      path.style.setProperty("--len", len);
    } catch (_) {}
  });
  const check = () => {
    const vh = window.innerHeight;
    document.querySelectorAll(".draw-line:not(.in)").forEach((path) => {
      const r = path.getBoundingClientRect();
      if (r.top < vh - 20 && r.bottom > 20) path.classList.add("in");
    });
  };
  check();
  if (!window._svgDrawBound) {
    window._svgDrawBound = true;
    window.addEventListener("scroll", check, { passive: true });
    let p = 0;
    const id = setInterval(() => { check(); if (++p > 20) clearInterval(id); }, 150);
  }
}

/* Parallax section numbers */
function bindParallax() {
  const items = [...document.querySelectorAll("[data-parallax]")];
  function loop() {
    const vh = window.innerHeight;
    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - vh / 2;
      const amount = parseFloat(el.dataset.parallax) || 0.15;
      el.style.setProperty("--parallax", (-mid * amount) + "px");
    });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* Hero wave (on hand emoji / symbol) */
function heroWave() {
  const h = document.querySelector(".hero-title .hand");
  if (!h) return;
  h.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(14deg)" },
      { transform: "rotate(-8deg)" },
      { transform: "rotate(14deg)" },
      { transform: "rotate(-4deg)" },
      { transform: "rotate(10deg)" },
      { transform: "rotate(0deg)" },
    ],
    { duration: 1800, iterations: Infinity, easing: "ease-in-out" }
  );
}

Object.assign(window, {
  scrambleElement, splitWords, observeReveal, observeSvgDraws,
  bindParallax, heroWave, bindChapterTitleScramble,
});
