// Header state change on scroll, throttled via requestAnimationFrame.
const header = document.querySelector('.site-header');

if (header) {
  let ticking = false;

  const update = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 8);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
}
