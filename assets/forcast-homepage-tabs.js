document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-forcast-tabs]').forEach((tabsRoot) => {
    const triggers = tabsRoot.querySelectorAll('[data-tab-trigger]');
    const panels = tabsRoot.querySelectorAll('[data-tab-panel]');

    const activate = (key) => {
      triggers.forEach((trigger) => {
        const active = trigger.dataset.tabTrigger === key;
        trigger.classList.toggle('is-active', active);
        trigger.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        const active = panel.dataset.tabPanel === key;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => activate(trigger.dataset.tabTrigger));
    });

    tabsRoot.querySelectorAll('[data-auto-scroll]').forEach((rail) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let direction = 1;
      let paused = false;

      const step = () => {
        if (!paused && rail.scrollWidth > rail.clientWidth + 24) {
          rail.scrollLeft += direction * 0.35;
          if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2) direction = -1;
          if (rail.scrollLeft <= 1) direction = 1;
        }
        window.requestAnimationFrame(step);
      };

      rail.addEventListener('mouseenter', () => {
        paused = true;
      });
      rail.addEventListener('mouseleave', () => {
        paused = false;
      });
      rail.addEventListener('touchstart', () => {
        paused = true;
      }, { passive: true });
      rail.addEventListener('touchend', () => {
        paused = false;
      });

      window.requestAnimationFrame(step);
    });
  });
});
