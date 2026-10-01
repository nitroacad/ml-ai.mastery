/* Navigation & Scrollspy Module */
export function initNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebarNav = document.querySelector('.sidebar-nav');

  if (menuToggle && sidebarNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = sidebarNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile drawer on backdrop/link click
    document.addEventListener('click', (e) => {
      if (sidebarNav.classList.contains('is-open') &&
          !sidebarNav.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        sidebarNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active page highlight in sidebar
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-item a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('../', ''))) {
      link.classList.add('active');
    }
  });

  // Scrollspy for TOC
  const tocLinks = document.querySelectorAll('.toc-item a');
  const headings = Array.from(tocLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  }).filter(Boolean);

  if (headings.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    headings.forEach(heading => observer.observe(heading));
  }
}
