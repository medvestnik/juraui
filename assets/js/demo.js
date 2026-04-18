(function () {
  const layouts = document.querySelectorAll('.jura-layout');
  document.querySelectorAll('[data-jura-sidebar-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      layouts.forEach((layout) => layout.classList.toggle('sidebar-open'));
    });
  });

  document.querySelectorAll('[data-jura-tabs]').forEach((tabsRoot) => {
    const tabs = tabsRoot.querySelectorAll('.jura-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-jura-tab');
        tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const card = tabsRoot.closest('.jura-card') || document;
        card.querySelectorAll('.jura-tab-panel').forEach((panel) => {
          panel.classList.toggle('is-active', panel.id === target);
        });
      });
    });
  });
})();
