const wishes = {
  mom: {
    title: "Матусі",
    img: "./assets/chamomile.jpg",
    text:
      "“Люба матусю! Дякую тобі за твоє безмежне терпіння, ласку та любов. Ти — мій ангел-охоронець. Нехай кожен твій день буде сповнений радості, а очі сяють від щастя. Зі святом весни!”",
    top: "#fff6d9",
    line: "#f4b400",
  },
  grandma: {
    title: "Бабусі",
    img: "./assets/peony.jpg",
    text:
      "“Люба бабусю! Дякую тобі за тепло, турботу та мудрість. Нехай здоров’я буде міцним, а серце — спокійним. Бажаю багато світлих днів і щасливих моментів поруч із рідними. Зі святом!”",
    top:"#ffe1ea", 
    line:"#ff6aa2",
  },
  aunt: {
    title: "Тітоньці",
    img: "./assets/tulips.jpg",
    text:
      "“Люба тітко! Бажаю тобі натхнення, радості та гармонії. Нехай у житті буде багато приємних подій, щирих усмішок і тепла. З 8 Березня!”",
    top: "#e6f4ec",
    line: "#1f7a53",
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