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

  function spawnPetals(flowerUrl) {
    const container = document.createElement("div");
    container.className = "modal-petals";
    document.body.appendChild(container);

    const count = 10;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "modal-petal";

      // старт зверху
      p.style.left = (8 + Math.random() * 84) + "vw";
      p.style.top = (-10 - Math.random() * 15) + "vh";

      p.style.animationDelay = (Math.random() * 0.35) + "s";

      const drift = (Math.random() * 120 - 60).toFixed(0);
      const rot = (180 + Math.random() * 140).toFixed(0);

      p.style.setProperty("--drift", drift + "px");
      p.style.setProperty("--rot", rot + "deg");

      const scale = (0.85 + Math.random() * 0.55).toFixed(2);
      p.style.width = (18 * scale) + "px";
      p.style.height = (18 * scale) + "px";

      // 🔥 підставляємо svg квітку
      p.style.setProperty("--flower-url", flowerUrl);

      container.appendChild(p);
    }

    setTimeout(() => container.remove(), 4200);
  }

  const flowers = {
    mom: "url('../assets/flower-yellow.svg')",
    grandma: "url('../assets/flower-pink.svg')",
    aunt: "url('../assets/flower-green.svg')"
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-wish]");
    if (!trigger) return;

    const key = trigger.dataset.wish;
    if (!key) return;

    if (played.has(key)) return;
    played.add(key);

    spawnPetals(flowers[key] || "url('../assets/flower-pink.svg')");
  }, { passive: true });
})();