// Mobile navigation overlay: toggle, focus trap, escape-to-close, scroll lock.
const toggle = document.querySelector('.site-header__toggle');
const overlay = document.getElementById('mobile-nav');

if (toggle && overlay) {
  // The toggle ships hidden so a JS-less page never shows a dead button.
  toggle.hidden = false;

  const links = () => [...overlay.querySelectorAll('a')];
  const focusables = () => [toggle, ...links()];

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    overlay.hidden = !open;
    document.documentElement.classList.toggle('u-no-scroll', open);
  };

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  overlay.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;

    if (e.key === 'Escape') {
      setOpen(false);
      toggle.focus();
      return;
    }

    if (e.key === 'Tab') {
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Leaving the mobile range while open would strand the scroll lock.
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches && isOpen()) setOpen(false);
  });
}
