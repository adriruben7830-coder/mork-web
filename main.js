

// ============================================
// NAV BLUR ON SCROLL
// ============================================
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.background = 'rgba(0,0,0,0.4)';
    } else {
      nav.style.backdropFilter = 'none';
      nav.style.background = 'transparent';
    }
  });
}

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');

    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// ============================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================
const animatedElements = document.querySelectorAll('.servicio, .work-item, .section-label');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

animatedElements.forEach(el => observer.observe(el));

// ============================================
// PAGE TRANSITIONS
// ============================================
const transition = document.querySelector('.page-transition');

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (
    href &&
    !href.startsWith('#') &&
    !href.startsWith('mailto') &&
    !href.startsWith('http')
  ) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (transition) transition.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  }
});

window.addEventListener('pageshow', () => {
  if (transition) transition.classList.remove('active');
});