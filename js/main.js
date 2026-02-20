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

function openWish(key){
  const d = wishes[key];
  if (!d) return;

  modalAvatar.src = d.img;
  modalAvatar.alt = d.title;
  modalTitle.textContent = d.title;
  modalText.textContent = d.text;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeWish(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-wish]");
  if (trigger) openWish(trigger.dataset.wish);

  const close = e.target.closest("[data-close='true']");
  if (close) closeWish();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeWish();
});