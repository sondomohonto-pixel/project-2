(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const navbar = document.querySelector('.site-navbar');
  const setNavbarState = () => {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  setNavbarState();
  window.addEventListener('scroll', setNavbarState, { passive: true });

  const collapseEl = document.getElementById('mainNav');
  const bsCollapse = collapseEl && window.bootstrap ? window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false }) : null;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (bsCollapse) bsCollapse.hide();
    });
  });

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar .nav-link[href^="#"]'));

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { root: null, rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.1, 0.2, 0.3] }
    );

    sections.forEach((s) => observer.observe(s));
  }
})();
