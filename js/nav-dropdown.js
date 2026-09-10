// Services nav dropdown: hover-revealed flyout with a close delay so moving
// the pointer from the trigger down into the panel doesn't flicker it shut.
// Falls back to click-toggle for touch/keyboard users (no hover available).
const CLOSE_DELAY = 200; // ms — matches the open/close grace period pattern

document.querySelectorAll('.site-header__item--dropdown').forEach((item) => {
  const trigger = item.querySelector('.site-header__link--trigger');
  let closeTimer = null;

  const open = () => {
    clearTimeout(closeTimer);
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(close, CLOSE_DELAY);
  };

  item.addEventListener('mouseenter', open);
  item.addEventListener('mouseleave', scheduleClose);
  item.addEventListener('focusin', open);

  item.addEventListener('focusout', (e) => {
    if (!item.contains(e.relatedTarget)) close();
  });

  // Touch/click: the link still navigates to /services/ on a plain tap,
  // but a tap while closed opens the panel first so the sub-links are
  // reachable without a hover state.
  trigger.addEventListener('click', (e) => {
    if (!matchMedia('(hover: hover)').matches && !item.classList.contains('is-open')) {
      e.preventDefault();
      open();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && item.classList.contains('is-open')) {
      close();
      trigger.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!item.contains(e.target)) close();
  });
});
