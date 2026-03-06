const wishes = {
  mom: {
    title: "Матусі",
    img: "./assets/chamomile2.jpg",
    text:
      "“Люба матусю, вітаю тебе з 8 Березня! Дякую тобі за любов, турботу і тепло, яке ти даруєш щодня. Ти завжди поруч, завжди підтримуєш і допомагаєш. І ще дякую за твою фірмову підливу — вона для мене найсмачніша у світі. Напевно, секрет у тому, що ти готуєш її з любов’ю. Бажаю тобі здоров’я, радості, спокою в душі та багато щасливих днів!”",
    top: "#fff7cc",
    line: "#eab308",
  },
  grandma: {
    title: "Бабусі",
    img: "./assets/crocuses2.jpg",
    text:
      "“Люба бабусю, щиро вітаю тебе зі святом весни! Дякую тобі за доброту, мудрість і тепло, яким ти завжди огортаєш. Поруч із тобою завжди затишно й спокійно. І, звісно, неможливо не згадати твою випічку — особливо той самий тертий пиріг, який завжди неймовірно смачний. Для мене це справжній смак дому і дитинства. Бажаю тобі здоров’я, радості та ще багато світлих і щасливих днів!”",
    top:"#f3e8ff",
    line:"#8b5cf6",
  },
  aunt: {
  title: "Тітоньці",
  img: "./assets/tulips2.jpg",
  text:
    "“Люба тітонько, вітаю тебе з 8 Березня! Ми з тобою інколи як справжня «шерочка з машерочкою» — постійно разом кудись ходимо, їздимо і проводимо час. І я дуже ціную ці моменти. Дякую тобі за турботу, підтримку і за все, що ти для мене робиш. Ти завжди була поруч і багато вкладала в мене, і я це дуже ціную. Бажаю тобі радості, гармонії, багато усмішок і теплих днів. І нехай якнайшвидше здійсниться те, чого ти найбільше бажаєш. Я дуже вірю, що все найважливіше обов’язково збудеться.”",
  top: "#ffe1ea",
  line: "#ff6aa2",
}
};

const modal = document.getElementById("wishModal");
const modalAvatar = document.getElementById("modalAvatar");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

let lastFocus = null;

function openWish(key){
  const d = wishes[key];
  if (!d) return;

  lastFocus = document.activeElement;

  modalAvatar.src = d.img;
  modalAvatar.alt = d.title;
  modalTitle.textContent = d.title;
  modalText.textContent = d.text;

  modal.classList.remove("is-closing");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.style.setProperty("--wishTop", d.top || "#ffd9df");
modal.style.setProperty("--wishLine", d.line || "#ff8aa6");

  // фокус на кнопку закриття (приємно для UX)
  const closeBtn = modal.querySelector("[data-close='true']");
  closeBtn?.focus({ preventScroll: true });
}

function closeWish(){
  if (!modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  modal.classList.add("is-closing");
  modal.setAttribute("aria-hidden", "true");

  const onEnd = (e) => {
    if (e.target !== modal) return;
    modal.classList.remove("is-closing");
    document.body.style.overflow = "";

    // повернути фокус назад
    lastFocus?.focus?.({ preventScroll: true });
    lastFocus = null;

    modal.removeEventListener("transitionend", onEnd);
  };

  // чекаємо завершення transition opacity у .modal
  modal.addEventListener("transitionend", onEnd);
}

// --- Tap-safe open on card or button (prevents accidental open while scrolling)
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;

document.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  touchMoved = false;
}, { passive: true });

document.addEventListener("touchmove", (e) => {
  const t = e.touches[0];
  const dx = Math.abs(t.clientX - touchStartX);
  const dy = Math.abs(t.clientY - touchStartY);
  if (dx > 12 || dy > 12) touchMoved = true; // threshold against scroll
}, { passive: true });

// відкриття: або кнопка, або сама картка
document.addEventListener("click", (e) => {
  // закриття завжди пріоритет
  const close = e.target.closest("[data-close='true']");
  if (close) return closeWish();

  // якщо клік по модалці — не відкривати нічого
  if (e.target.closest("#wishModal")) return;

  // тригер: кнопка або card (в обох є data-wish)
  const trigger = e.target.closest("[data-wish]");
  if (!trigger) return;

  // якщо на мобілі це був скрол — ігноруємо
  if (touchMoved) return;

  openWish(trigger.dataset.wish);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && (modal.classList.contains("is-open") || modal.classList.contains("is-closing"))) {
    closeWish();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro");
  const cards = document.querySelector(".cards");
  if (!intro || !cards) return;

  intro.addEventListener("click", (e) => {
    // клік тільки в нижній зоні, де “стрілочка”
    const rect = intro.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y < rect.height - 90) return;

    cards.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


window.addEventListener("load", () => {
  const textBlock = document.getElementById("delayedText");
  const intro = document.querySelector(".intro");

  if (!textBlock || !intro) return;

  setTimeout(() => {
    textBlock.classList.add("is-visible");

    setTimeout(() => {
      intro.classList.add("show-hint");
    },600);

  }, 1500);
});
