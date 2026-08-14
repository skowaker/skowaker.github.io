// IntersectionObserver scroll reveals. Elements are only hidden by CSS when
// scripting is enabled (media query), so nothing depends on this running.
// Each element reveals exactly once.
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll('[data-reveal]');

if (reduced || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.setAttribute('data-reveal', 'in'));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-reveal', 'in');
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px' });

  targets.forEach((el) => io.observe(el));
}
