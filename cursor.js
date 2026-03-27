// ============================================
// MØRK CURSOR — standalone, inject en cualquier página
// ============================================
(function () {
  // Inyectar HTML
  const dot = document.createElement('div');
  dot.className = 'mork-cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'mork-cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Inyectar CSS
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }

    .mork-cursor-dot {
      width: 4px;
      height: 4px;
      background: #ffffff;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease, transform 0.15s ease;
    }

    .mork-cursor-ring {
      width: 24px;
      height: 24px;
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 999998;
      transform: translate(-50%, -50%);
      transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  border-color 0.35s ease,
                  opacity 0.35s ease;
    }

    .mork-cursor-ring.hovering {
      width: 48px;
      height: 48px;
      border-color: rgba(255, 255, 255, 0.25);
    }

    .mork-cursor-dot.hovering {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
    }
  `;
  document.head.appendChild(style);

  // Lógica de movimiento
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.10;
    ringY += (mouseY - ringY) * 0.10;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover en links y botones
  function attachHover() {
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('hovering');
        dot.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hovering');
        dot.classList.remove('hovering');
      });
    });
  }
  attachHover();

  // Re-attach si el DOM cambia dinámicamente
  const observer = new MutationObserver(attachHover);
  observer.observe(document.body, { childList: true, subtree: true });
})();