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


// THUMBNAIL LAVORI
const rows = document.querySelectorAll(".works__row");

rows.forEach((row) => {
  const thumb = row.querySelector(".works__thumb");
  if (!thumb) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  row.addEventListener("mouseenter", (e) => {
    const rect = row.getBoundingClientRect();
    targetX = currentX = e.clientX - rect.left;
    targetY = currentY = e.clientY - rect.top;
  });

  row.addEventListener("mousemove", (e) => {
    const rect = row.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    thumb.style.transform = `translate(${currentX + 20}px, calc(${currentY}px - 50%))`;
    requestAnimationFrame(animate);
  }
  animate();
});

const links = document.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => cursor.classList.add("cursor--hover"));
  link.addEventListener("mouseleave", () => cursor.classList.remove("cursor--hover"));
});

// PAGE TRANSITION
const overlay = document.querySelector(".page-transition");
const navLinks = document.querySelectorAll('a[href$=".html"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const destination = link.href;
    overlay.classList.add("is-active");
    setTimeout(() => {
      window.location.href = destination;
    }, 600);
  });
});