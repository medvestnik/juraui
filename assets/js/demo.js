/* Jura UI — Demo site JS */
(function () {
  'use strict';

  /* ── Sidebar toggle ─────────────────────────────────────────── */
  const layouts = document.querySelectorAll('.jura-layout');
  document.querySelectorAll('[data-jura-sidebar-toggle]').forEach((btn) => {
    btn.addEventListener('click', () =>
      layouts.forEach((l) => l.classList.toggle('sidebar-open'))
    );
  });

  /* ── Tabs ────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-jura-tabs]').forEach((root) => {
    root.querySelectorAll('.jura-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.juraTab;
        root.querySelectorAll('.jura-tab').forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const scope = root.closest('[data-jura-tabs-scope]') || root;
        scope.querySelectorAll('.jura-tab-panel').forEach((p) =>
          p.classList.toggle('is-active', p.id === target)
        );
      });
    });
  });

  /* ── Dropdowns ───────────────────────────────────────────────── */
  document.querySelectorAll('[data-jura-dropdown]').forEach((trigger) => {
    const menu = trigger.parentElement.querySelector('.jura-dropdown-menu');
    if (!menu) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('is-open');
      document.querySelectorAll('.jura-dropdown-menu.is-open').forEach((m) =>
        m.classList.remove('is-open')
      );
      if (!isOpen) menu.classList.add('is-open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.jura-dropdown-menu.is-open').forEach((m) =>
      m.classList.remove('is-open')
    );
  });

  /* ── Modals ──────────────────────────────────────────────────── */
  document.querySelectorAll('[data-jura-modal-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.juraModalOpen;
      document.getElementById(id)?.classList.add('is-open');
    });
  });
  document.querySelectorAll('[data-jura-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.jura-modal-backdrop')?.classList.remove('is-open');
    });
  });
  document.querySelectorAll('.jura-modal-backdrop').forEach((bd) => {
    bd.addEventListener('click', (e) => {
      if (e.target === bd) bd.classList.remove('is-open');
    });
  });

  /* ── Color Theme Picker ──────────────────────────────────────── */
  const THEME_KEY = 'jura-color-theme';
  const html = document.documentElement;

  function applyColorTheme(name) {
    if (!name || name === 'indigo') {
      html.removeAttribute('data-jura-theme');
    } else {
      html.setAttribute('data-jura-theme', name);
    }
  }

  const saved = localStorage.getItem(THEME_KEY) || 'indigo';
  applyColorTheme(saved);

  document.querySelectorAll('[data-jura-color-theme]').forEach((swatch) => {
    const t = swatch.dataset.juraColorTheme;
    swatch.classList.toggle('is-active', t === saved);

    swatch.addEventListener('click', () => {
      document.querySelectorAll('[data-jura-color-theme]').forEach((s) =>
        s.classList.remove('is-active')
      );
      swatch.classList.add('is-active');
      applyColorTheme(t);
      localStorage.setItem(THEME_KEY, t);
    });
  });
})();
