/* Jura UI — Demo site JS (v0.3.0) */
(function () {
  'use strict';

  /* ── Hide demo bar when inside a preview iframe ─────────────── */
  if (window.top !== window.self) {
    document.querySelector('.demo-exam-bar')?.remove();
  }

  /* ── Sidebar toggle ─────────────────────────────────────────── */
  const layouts = document.querySelectorAll('.jura-layout');
  document.querySelectorAll('[data-jura-sidebar-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      layouts.forEach((l) => {
        const open = l.classList.toggle('sidebar-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  });

  /* ── Tabs (with arrow key navigation) ───────────────────────── */
  document.querySelectorAll('[data-jura-tabs]').forEach((root) => {
    const tabs = [...root.querySelectorAll('.jura-tab')];
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1');
      tab.addEventListener('click', () => activateTab(tab, root, tabs));
      tab.addEventListener('keydown', (e) => {
        const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        const next = map[e.key];
        if (next === undefined) return;
        e.preventDefault();
        tabs[Math.max(0, Math.min(next, tabs.length - 1))]?.focus();
      });
    });
  });

  function activateTab(tab, root, tabs) {
    const target = tab.dataset.juraTab;
    tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('tabindex', '-1'); });
    tab.classList.add('is-active');
    tab.setAttribute('tabindex', '0');
    const scope = root.closest('[data-jura-tabs-scope]') || root;
    scope.querySelectorAll('.jura-tab-panel').forEach((p) =>
      p.classList.toggle('is-active', p.id === target)
    );
  }

  /* ── Dropdowns ───────────────────────────────────────────────── */
  document.querySelectorAll('[data-jura-dropdown]').forEach((trigger) => {
    const menu = trigger.parentElement.querySelector('.jura-dropdown-menu');
    if (!menu) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('is-open');
      closeAllDropdowns();
      if (!isOpen) menu.classList.add('is-open');
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.jura-dropdown-menu.is-open').forEach((m) =>
      m.classList.remove('is-open')
    );
  }

  document.addEventListener('click', closeAllDropdowns);

  /* ── Modals (with focus trap + scroll lock) ──────────────────── */
  let _lastFocused = null;

  function openModal(id) {
    const bd = document.getElementById(id);
    if (!bd) return;
    _lastFocused = document.activeElement;
    bd.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const first = focusable(bd)[0];
    if (first) setTimeout(() => first.focus(), 50);
    trapFocus(bd);
  }

  function closeModal(bd) {
    if (!bd) return;
    bd.classList.remove('is-open');
    document.body.style.overflow = '';
    if (bd._trap) { bd.removeEventListener('keydown', bd._trap); delete bd._trap; }
    _lastFocused?.focus();
  }

  function focusable(el) {
    return [...el.querySelectorAll(
      'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )];
  }

  function trapFocus(el) {
    el._trap = (e) => {
      if (e.key !== 'Tab') return;
      const nodes = focusable(el);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first?.focus(); } }
    };
    el.addEventListener('keydown', el._trap);
  }

  document.querySelectorAll('[data-jura-modal-open]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.juraModalOpen));
  });
  document.querySelectorAll('[data-jura-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.closest('.jura-modal-backdrop')));
  });
  document.querySelectorAll('.jura-modal-backdrop').forEach((bd) => {
    bd.addEventListener('click', (e) => { if (e.target === bd) closeModal(bd); });
  });

  /* ── Escape key ──────────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const modal = document.querySelector('.jura-modal-backdrop.is-open');
    if (modal) { closeModal(modal); return; }
    closeAllDropdowns();
  });

  /* ── Accordion ───────────────────────────────────────────────── */
  document.querySelectorAll('.jura-accordion').forEach((acc) => {
    const multi = 'juraMulti' in acc.dataset;
    acc.querySelectorAll('.jura-accordion-item').forEach((item) => {
      const trigger = item.querySelector('.jura-accordion-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        if (!multi) {
          acc.querySelectorAll('.jura-accordion-item').forEach((i) => i.classList.remove('is-open'));
        }
        if (!isOpen) item.classList.add('is-open');
      });
    });
  });

  /* ── Navbar mobile toggle ─────────────────────────────────────── */
  document.querySelectorAll('[data-jura-nav-toggle]').forEach((btn) => {
    const nav = btn.closest('.jura-navbar');
    if (!nav) return;
    btn.addEventListener('click', () => nav.classList.toggle('nav-open'));
  });

  /* ── Toast (window.jura.toast) ────────────────────────────────── */
  window.jura = window.jura || {};
  window.jura.toast = function (msg, type, duration) {
    type = type || 'default';
    duration = duration ?? 4000;
    let container = document.getElementById('jura-toasts');
    if (!container) {
      container = document.createElement('div');
      container.id = 'jura-toasts';
      container.className = 'jura-toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    el.className = 'jura-toast' + (type !== 'default' ? ' jura-toast-' + type : '');
    el.setAttribute('role', 'status');
    el.textContent = msg;
    container.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')));
    if (duration > 0) {
      setTimeout(() => {
        el.classList.remove('is-visible');
        el.addEventListener('transitionend', () => el.remove(), { once: true });
      }, duration);
    }
  };

  /* ── Color Theme Picker ──────────────────────────────────────── */
  const THEME_KEY = 'jura-color-theme';
  const html = document.documentElement;

  function applyColorTheme(name) {
    if (!name || name === 'indigo') {
      html.removeAttribute('data-jura-theme');
    } else {
      html.setAttribute('data-jura-theme', name);
    }
    /* Sync theme to all preview iframes (examples index page) */
    document.querySelectorAll('.demo-ex-iframe').forEach((iframe) => {
      try {
        const iDoc = iframe.contentDocument?.documentElement;
        if (iDoc) {
          if (!name || name === 'indigo') iDoc.removeAttribute('data-jura-theme');
          else iDoc.setAttribute('data-jura-theme', name);
        }
      } catch (_) {}
    });
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

  /* Apply stored theme to iframes once they finish loading */
  document.querySelectorAll('.demo-ex-iframe').forEach((iframe) => {
    iframe.addEventListener('load', () => {
      const t = localStorage.getItem(THEME_KEY) || 'indigo';
      try {
        const iDoc = iframe.contentDocument?.documentElement;
        if (iDoc && t !== 'indigo') iDoc.setAttribute('data-jura-theme', t);
      } catch (_) {}
    });
  });
})();
