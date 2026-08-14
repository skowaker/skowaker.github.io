const modal = document.getElementById('contact-modal');
const triggers = [...document.querySelectorAll('[data-contact-modal]')];

if (modal && triggers.length) {
  const panel = modal.querySelector('.contact-modal__panel');
  const closers = [...modal.querySelectorAll('[data-contact-close]')];
  let previousFocus = null;

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const focusables = () => [...modal.querySelectorAll(focusableSelector)]
    .filter((item) => item.offsetParent !== null);

  const openModal = () => {
    previousFocus = document.activeElement;
    modal.hidden = false;
    document.documentElement.classList.add('u-no-scroll');

    const firstField = modal.querySelector('input[name="name"]');
    requestAnimationFrame(() => (firstField || panel).focus());
  };

  const closeModal = () => {
    modal.hidden = true;
    document.documentElement.classList.remove('u-no-scroll');
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closers.forEach((closer) => closer.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;

    if (event.key === 'Escape') {
      closeModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
