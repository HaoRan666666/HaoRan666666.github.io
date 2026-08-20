// 视觉特效：粒子背景、卡片 3D 倾斜、光标跟随
(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- 粒子背景 ----
  function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w = 0, h = 0;
    let accent = "#6ea8ff";
    let raf = null;

    function refreshAccent() {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (v) accent = v;
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      const count = Math.max(20, Math.min(110, Math.floor((w * h) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      const linkDist = 120;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      ctx.strokeStyle = accent;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / linkDist) * (dark ? 0.32 : 0.2);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = accent;
      ctx.globalAlpha = dark ? 0.7 : 0.5;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (raf) return;
      raf = requestAnimationFrame(draw);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = null;
    }

    refreshAccent();
    resize();
    new MutationObserver(refreshAccent).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("resize", resize);
    start();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });
  }

  // ---- 卡片 3D 倾斜 ----
  function initTilt() {
    document.querySelectorAll(".project-card, .skill-group, .contact-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-py * 10).toFixed(2) + "deg) rotateY(" +
          (px * 10).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  initParticles();
  initTilt();
})();
