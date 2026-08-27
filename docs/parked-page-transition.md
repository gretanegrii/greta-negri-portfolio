# Page transition — PARCHEGGIATA (27/08/2026)

Pannello rosa che scorreva verticalmente passando da una pagina all'altra.
**Rimossa** perché su iPhone/Safari faceva comparire un bordo fucsia sopra e sotto
(Safari colorava le sue barre pescando il rosa del pannello fisso).
Da rivalutare a **sito finito**, magari con un colore/comportamento diverso.

## 1. HTML — come primo figlio di `<body>` (in ogni pagina)
```html
<div class="page-transition" aria-hidden="true"></div>
```

## 2. CSS — in `src/css/index.css`
```css
/* --- PAGE TRANSITION --- */
.page-transition {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: var(--color-pink);
  transform: translateY(100%);
  pointer-events: none;
  transition: transform 0.6s cubic-bezier(0.7, 0, 0.3, 1);
  animation: reveal 0.6s cubic-bezier(0.7, 0, 0.3, 1);
}

@keyframes reveal {
  from {
    transform: translateY(0); /* copre lo schermo */
  }
  to {
    transform: translateY(-100%); /* sale e se ne va, sopra */
  }
}

.page-transition.is-active {
  transform: translateY(0);
}
```

## 3. JS — in `src/js/main.js`
Intercetta i click sui link interni (`a[href$=".html"]`), attiva il pannello e naviga dopo 600ms.
```js
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
```

## Per rimetterla
1. Reincolla il `<div>` come primo figlio di `<body>` in tutte le pagine.
2. Reincolla il blocco CSS in `index.css`.
3. Reincolla il blocco JS in `main.js`.
4. Testa su iPhone: se torna il bordo fucsia, aggiungi `<meta name="theme-color">`
   e/o cambia il colore del pannello, oppure tienila solo su desktop.
