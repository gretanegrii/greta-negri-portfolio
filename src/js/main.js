// SMOOTH SCROLL (Lenis) — scroll morbido con inerzia, come lamalama
// rispetta chi ha chiesto "meno animazioni" nelle impostazioni di sistema
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (typeof Lenis !== "undefined" && !prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 1.2, // durata dello scivolamento: più alto = più "lungo"
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // decelerazione morbida
  });

  // Lenis ha bisogno di essere "risvegliato" a ogni frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// TESTO ACCESO ALLO SCROLL (#4) — le parole di .reveal-text prendono colore scorrendo
const revealTexts = document.querySelectorAll(".reveal-text");

if (revealTexts.length && !prefersReducedMotion) {
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 1) spezza ogni frase in parole avvolte in <span class="word">
  revealTexts.forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((w) => `<span class="word">${esc(w)}</span>`)
      .join(" ");
    el._words = el.querySelectorAll(".word"); // le parole di questa frase
  });

  // 2) accende le parole in ordine, in base a quanto la frase ha "attraversato" la linea
  function lightWords() {
    const line = window.innerHeight * 0.8; // linea di accensione (80% dello schermo)
    revealTexts.forEach((el) => {
      const rect = el.getBoundingClientRect();
      let progress = (line - rect.top) / rect.height; // 0 → 1
      progress = Math.max(0, Math.min(1, progress));
      const lit = Math.round(progress * el._words.length);
      el._words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
    });
  }

  // 3) throttle con requestAnimationFrame (non ricalcolare a ogni pixel)
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        lightWords();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", lightWords);
  lightWords(); // stato iniziale
}

// CURSORE
const cursor = document.querySelector(".cursor");

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  curX += (mouseX - curX) * 0.15;
  curY += (mouseY - curY) * 0.15;
  cursor.style.left = curX + "px";
  cursor.style.top = curY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();


const links = document.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => cursor.classList.add("cursor--hover"));
  link.addEventListener("mouseleave", () => cursor.classList.remove("cursor--hover"));
});


// CONTACT OVERLAY — apre il pannello fucsia dal link "Contatti" del menu
const contactTrigger = document.querySelector(".link-list--index button");
const contactOverlay = document.querySelector(".contact-overlay");

if (contactTrigger && contactOverlay) {
  const contactClose = contactOverlay.querySelector(".contact-overlay__close");

  function openContact() {
    contactOverlay.classList.add("is-open");
    contactOverlay.setAttribute("aria-hidden", "false");
    contactClose.focus();
  }

  function closeContact() {
    contactOverlay.classList.remove("is-open");
    contactOverlay.setAttribute("aria-hidden", "true");
  }

  contactTrigger.addEventListener("click", openContact);
  contactClose.addEventListener("click", closeContact);

  // chiudi con il tasto Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeContact();
  });
}



document.querySelector('video').playbackRate = 1.5;
