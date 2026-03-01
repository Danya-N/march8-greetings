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