// HERO BG ANIMATION
const heroBg = document.querySelector('.na-hero-bg');
if (heroBg) {
  window.addEventListener('load', () => {
    heroBg.classList.add('loaded');
  });
}

// SCROLL ANIMATIONS
const fadeEls = document.querySelectorAll('.na-about-content, .na-section-header, .na-model-card, .na-feature, .na-contact-content');
fadeEls.forEach(el => el.classList.add('na-fade'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// NAV BLUR ON SCROLL
const nav = document.querySelector('.na-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.backgroundColor = 'rgba(0,0,0,0.8)';
  } else {
    nav.style.backdropFilter = 'none';
    nav.style.backgroundColor = 'transparent';
  }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});