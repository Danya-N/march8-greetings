(() => {
  const els = [...document.querySelectorAll("[data-reveal]")];
  if (!els.length) return;

  // якщо браузер не підтримує — просто показати
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  els.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 220)}ms`;
    io.observe(el);
  });
})();

(() => {
  // 1 раз на кожен ключ; після refresh знову буде
  const played = new Set();

  function spawnPetals(color) {
    const container = document.createElement("div");
    container.className = "modal-petals";
    document.body.appendChild(container);

    const count = 10;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "modal-petal";

      // старт десь зверху
      p.style.left = (8 + Math.random() * 84) + "vw";
      p.style.top = (-10 - Math.random() * 15) + "vh";

      // плавність
      p.style.animationDelay = (Math.random() * 0.35) + "s";

      // індивідуальна “дрейф” і поворот
      const drift = (Math.random() * 120 - 60).toFixed(0); // -60..60px
      const rot = (180 + Math.random() * 140).toFixed(0); // 180..320deg
      p.style.setProperty("--drift", drift + "px");
      p.style.setProperty("--rot", rot + "deg");

      // трохи різний розмір — виглядає природніше
      const scale = (0.85 + Math.random() * 0.55).toFixed(2);
      p.style.width = (12 * scale).toFixed(1) + "px";
      p.style.height = (16 * scale).toFixed(1) + "px";

      // колір
      p.style.background = color;

      container.appendChild(p);
    }

    // прибрати контейнер після завершення
    setTimeout(() => container.remove(), 4200);
  }

  const colors = {
    mom: "#f4b400",
    grandma: "#ff6aa2",
    aunt: "#1f7a53"
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-wish]");
    if (!trigger) return;

    const key = trigger.dataset.wish;
    if (!key) return;

    // якщо вже грали для цієї модалки — не повторюємо
    if (played.has(key)) return;
    played.add(key);

    spawnPetals(colors[key] || "#ff4f8d");
  }, { passive: true });
})();