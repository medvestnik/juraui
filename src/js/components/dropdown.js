export function initDropdowns() {
  document.querySelectorAll('[data-jura-toggle="dropdown"]').forEach((trigger) => {
    const targetSelector = trigger.getAttribute('data-jura-target');
    if (!targetSelector) return;
    const menu = document.querySelector(targetSelector);
    if (!menu) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      menu.hidden = !menu.hidden;
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.jura-dropdown-menu').forEach((menu) => {
      menu.hidden = true;
    });
  });
}
