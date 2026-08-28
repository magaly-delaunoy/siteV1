document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* ---------- Dropdown menu ---------- */
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdownMenu.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
      dropdownMenu.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu / dropdown after choosing a link
  document.querySelectorAll('.primary-nav a, .dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      dropdownMenu.classList.remove('open');
    });
  });

  /* ---------- "Hand of cards" navigation ---------- */
  document.querySelectorAll('.card-deal').forEach(card => {
    card.addEventListener('click', () => {
      const target = document.getElementById(card.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const panel = item.querySelector('.acc-panel');
      const isOpen = item.classList.contains('open');

      // close siblings within the same accordion for a tidy, game-like reveal
      const accordion = item.closest('.accordion');
      accordion.querySelectorAll('.acc-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.acc-panel').style.maxHeight = null;
          openItem.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Progress thread dots (scroll-linked) ---------- */
  const dots = document.querySelectorAll('.thread-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = ['pro', 'parents', 'particuliers']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.toggle('active', d.dataset.target === entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.highlight-box, .acc-item, .feature-card, .quiz-card, .practical-strip, .cta-band'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });

});
