export function initTabs() {
  document.querySelectorAll('[data-jura-tabs]').forEach((tabsRoot) => {
    const tabButtons = tabsRoot.querySelectorAll('[data-jura-tab]');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-jura-tab');
        if (!target) return;

        tabButtons.forEach((b) => b.classList.remove('is-active'));
        button.classList.add('is-active');

        const panels = tabsRoot.parentElement?.querySelectorAll('.jura-tab-panel') ?? [];
        panels.forEach((panel) => panel.classList.remove('is-active'));
        const activePanel = document.getElementById(target);
        if (activePanel) activePanel.classList.add('is-active');
      });
    });
  });
}
