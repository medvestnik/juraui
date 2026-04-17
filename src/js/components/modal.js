function openModal(modal) {
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.style.overflow = '';
}

export function initModals() {
  document.querySelectorAll('[data-jura-toggle="modal"]').forEach((trigger) => {
    const targetSelector = trigger.getAttribute('data-jura-target');
    if (!targetSelector) return;
    const modal = document.querySelector(targetSelector);
    if (!modal) return;

    trigger.addEventListener('click', () => openModal(modal));

    modal.querySelectorAll('[data-jura-close]').forEach((closeNode) => {
      closeNode.addEventListener('click', () => closeModal(modal));
    });
  });
}
