// Header state change on scroll, throttled via requestAnimationFrame.
// Also detects whether a light-themed section is behind the nav and toggles
// a light-mode class so the nav remains legible over light backgrounds.
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

  // --- Section theme detection -------------------------------------------
  // Light sections: section--white, section--gray, section--light-blue
  // Dark sections: hero (default black bg), section--dark-blue, .closing
  const lightSections = document.querySelectorAll(
    '.section--white, .section--gray, .section--light-blue'
  );
  const navHeight = 80; // approx nav offset + pill height

  const navObserver = new IntersectionObserver((entries) => {
    // Find the entry whose top is at or above the nav bar position
    let lightActive = false;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const rect = entry.target.getBoundingClientRect();
        // Check if the section's top is above the nav bar and its
        // bottom is below the nav bar (i.e. the nav is over this section)
        if (rect.top <= navHeight && rect.bottom > navHeight) {
          lightActive = true;
          break;
        }
      }
    }
    header.classList.toggle('site-header--light', lightActive);
  }, {
    rootMargin: `-${navHeight}px 0px -${window.innerHeight - navHeight - 1}px 0px`,
    threshold: 0,
  });

  lightSections.forEach((s) => navObserver.observe(s));
}
