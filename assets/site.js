(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  function revealContent() {
    observer?.disconnect();
    document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
  }
  if (!motion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.08});
    document.querySelectorAll('.project-row, .experience-row, .download-card, .case-body section').forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add('reveal-pending');
        observer.observe(el);
      }
    });
  }
  motion.addEventListener('change', revealContent);
  window.addEventListener('beforeprint', revealContent);
  document.querySelectorAll('.print-button').forEach(button => button.addEventListener('click', () => window.print()));
  const topLink = document.querySelector('.back-top');
  const updateTop = () => topLink?.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateTop, {passive: true});
  updateTop();
})();
