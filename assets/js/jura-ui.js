/* ================================================================
   Jura UI — v0.3.0
   Production component script — no demo-site dependencies.
   Drop this file alongside jura-ui.css (or jura-ui-core.css) and
   add <script src="jura-ui.js"></script> before </body>.
   ================================================================ */
(function () {
  'use strict';

  /* ── Sidebar toggle ─────────────────────────────────────────── */
  const layouts = document.querySelectorAll('.jura-layout');
  document.querySelectorAll('[data-jura-sidebar-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      layouts.forEach(l => {
        const open = l.classList.toggle('sidebar-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  });

  /* ── Tabs ────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-jura-tabs]').forEach(root => {
    const tabs = [...root.querySelectorAll('.jura-tab')];
    root.setAttribute('role', 'tablist');
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1');
      tab.setAttribute('aria-selected', tab.classList.contains('is-active') ? 'true' : 'false');
      tab.addEventListener('click', () => activateTab(tab, root, tabs));
      tab.addEventListener('keydown', e => {
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
    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('tabindex', '-1');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('aria-selected', 'true');
    const scope = root.closest('[data-jura-tabs-scope]') || root;
    scope.querySelectorAll('.jura-tab-panel').forEach(p =>
      p.classList.toggle('is-active', p.id === target)
    );
  }

  /* ── Dropdowns ───────────────────────────────────────────────── */
  document.querySelectorAll('[data-jura-dropdown]').forEach(trigger => {
    const menu = trigger.parentElement.querySelector('.jura-dropdown-menu');
    if (!menu) return;
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('is-open');
      closeAllDropdowns();
      if (!isOpen) {
        menu.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        menu.querySelector('.jura-dropdown-item')?.focus();
      }
    });
    menu.addEventListener('keydown', e => {
      const items = [...menu.querySelectorAll('.jura-dropdown-item')];
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(idx + 1, items.length - 1)]?.focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); items[Math.max(idx - 1, 0)]?.focus(); }
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.jura-dropdown-menu.is-open').forEach(m => {
      m.classList.remove('is-open');
      m.closest('.jura-dropdown')
        ?.querySelector('[data-jura-dropdown]')
        ?.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', closeAllDropdowns);

  /* ── Modals ──────────────────────────────────────────────────── */
  let _lastFocused = null;

  function openModal(id) {
    const bd = document.getElementById(id);
    if (!bd) return;
    _lastFocused = document.activeElement;
    bd.classList.add('is-open');
    bd.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    const first = _focusable(bd)[0];
    if (first) setTimeout(() => first.focus(), 50);
    _trapFocus(bd);
  }

  function closeModal(bd) {
    if (!bd) return;
    bd.classList.remove('is-open');
    bd.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (bd._trapHandler) bd.removeEventListener('keydown', bd._trapHandler);
    _lastFocused?.focus();
  }

  function _focusable(el) {
    return [...el.querySelectorAll(
      'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )];
  }

  function _trapFocus(el) {
    el._trapHandler = e => {
      if (e.key !== 'Tab') return;
      const nodes = _focusable(el);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first?.focus(); } }
    };
    el.addEventListener('keydown', el._trapHandler);
  }

  document.querySelectorAll('[data-jura-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.juraModalOpen));
  });
  document.querySelectorAll('[data-jura-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.jura-modal-backdrop')));
  });
  document.querySelectorAll('.jura-modal-backdrop').forEach(bd => {
    bd.setAttribute('aria-hidden', 'true');
    bd.addEventListener('click', e => { if (e.target === bd) closeModal(bd); });
  });

  /* ── Escape key ──────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const modal = document.querySelector('.jura-modal-backdrop.is-open');
    if (modal) { closeModal(modal); return; }
    closeAllDropdowns();
  });

  /* ── Accordion ───────────────────────────────────────────────── */
  document.querySelectorAll('.jura-accordion').forEach(acc => {
    const multi = 'juraMulti' in acc.dataset;
    acc.querySelectorAll('.jura-accordion-item').forEach(item => {
      const trigger = item.querySelector('.jura-accordion-trigger');
      if (!trigger) return;
      trigger.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        if (!multi) {
          acc.querySelectorAll('.jura-accordion-item').forEach(i => {
            i.classList.remove('is-open');
            i.querySelector('.jura-accordion-trigger')?.setAttribute('aria-expanded', 'false');
          });
        }
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ── Navbar mobile toggle ─────────────────────────────────────── */
  document.querySelectorAll('[data-jura-nav-toggle]').forEach(btn => {
    const nav = btn.closest('.jura-navbar');
    if (!nav) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ── Tooltip (attr-driven, CSS handles show/hide) ─────────────── */
  document.querySelectorAll('[data-jura-tooltip]').forEach(el => {
    if (el.querySelector('.jura-tooltip-bubble')) return;
    const tip = document.createElement('span');
    tip.className = 'jura-tooltip-bubble';
    tip.setAttribute('role', 'tooltip');
    tip.textContent = el.dataset.juraTooltip;
    el.appendChild(tip);
  });

  /* ── Toast system ─────────────────────────────────────────────── */
  function _getToastContainer() {
    let el = document.getElementById('jura-toasts');
    if (!el) {
      el = document.createElement('div');
      el.id = 'jura-toasts';
      el.className = 'jura-toast-container';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'false');
      document.body.appendChild(el);
    }
    return el;
  }

  window.jura = window.jura || {};

  /**
   * Show a toast notification.
   * @param {string} msg       — message text (may include HTML)
   * @param {string} type      — 'default' | 'success' | 'danger' | 'warning' | 'info'
   * @param {number} duration  — ms before auto-dismiss (default 4000)
   */
  window.jura.toast = function (msg, type, duration) {
    type     = type     || 'default';
    duration = duration ?? 4000;

    const container = _getToastContainer();
    const el = document.createElement('div');
    el.className = 'jura-toast' + (type !== 'default' ? ' jura-toast-' + type : '');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.innerHTML = msg;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'jura-toast-close';
    closeBtn.setAttribute('aria-label', 'Dismiss');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => dismiss(el));
    el.appendChild(closeBtn);

    container.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')));
    if (duration > 0) setTimeout(() => dismiss(el), duration);
  };

  function dismiss(el) {
    el.classList.remove('is-visible');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  }

  /* ── Cookie notice ────────────────────────────────────────────── */
  document.querySelectorAll('[data-jura-cookie-accept]').forEach(btn => {
    btn.addEventListener('click', () => {
      const notice = btn.closest('.jura-cookie');
      if (notice) { notice.hidden = true; }
      try { localStorage.setItem('jura-cookie-ok', '1'); } catch (_) {}
    });
  });

  (function () {
    try {
      if (localStorage.getItem('jura-cookie-ok')) {
        document.querySelectorAll('.jura-cookie').forEach(el => el.hidden = true);
      }
    } catch (_) {}
  })();

})();
