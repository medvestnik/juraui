const THEME_KEY = 'jura-theme';
const THEMES = ['light', 'dark', 'auto'];

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved && THEMES.includes(saved)) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  document.querySelectorAll('[data-jura-theme="toggle"]').forEach((button) => {
    button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') ?? 'auto';
      const next = current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
  });
}
