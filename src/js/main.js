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


// WORK ACCORDION — apre/chiude le strisce progetto (una alla volta)
const workItems = document.querySelectorAll(".work-item");

workItems.forEach((item) => {
  const head = item.querySelector(".work-item__head");
  const toggle = item.querySelector(".work-item__toggle");

  head.addEventListener("click", () => {
    const wasOpen = item.classList.contains("is-open");

    // chiudi tutte (apertura singola)
    workItems.forEach((other) => {
      other.classList.remove("is-open");
      other
        .querySelector(".work-item__toggle")
        .setAttribute("aria-expanded", "false");
    });

    // se non era già aperta, aprila
    if (!wasOpen) {
      item.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});
