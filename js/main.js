const wishes = {
  mom: {
    title: "Матусі",
    img: "./assets/chamomile.jpg",
    text:
      "“Люба матусю! Дякую тобі за твоє безмежне терпіння, ласку та любов. Ти — мій ангел-охоронець. Нехай кожен твій день буде сповнений радості, а очі сяють від щастя. Зі святом весни!”"
  },
  grandma: {
    title: "Бабусі",
    img: "./assets/peony.jpg",
    text:
      "“Люба бабусю! Дякую тобі за тепло, турботу та мудрість. Нехай здоров’я буде міцним, а серце — спокійним. Бажаю багато світлих днів і щасливих моментів поруч із рідними. Зі святом!”"
  },
  aunt: {
    title: "Тітоньці",
    img: "./assets/tulips.jpg",
    text:
      "“Люба тітко! Бажаю тобі натхнення, радості та гармонії. Нехай у житті буде багато приємних подій, щирих усмішок і тепла. З 8 Березня!”"
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

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-wish]");
  if (trigger) openWish(trigger.dataset.wish);

  const close = e.target.closest("[data-close='true']");
  if (close) closeWish();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && (modal.classList.contains("is-open") || modal.classList.contains("is-closing"))) {
    closeWish();
  }
});