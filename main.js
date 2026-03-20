window.scrollTo(0, 0);

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseover', e => {
  if (e.target.closest('a') || e.target.closest('.servicio')) {
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.background = 'transparent';
    cursor.style.border = '1px solid #ffffff';
  } else {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.background = '#ffffff';
    cursor.style.border = 'none';
  }
});

const heroH1 = document.querySelector('.hero h1');
if (heroH1) {
  window.addEventListener('scroll', () => {
    heroH1.style.transform = `translateY(${window.scrollY * 0.4}px)`;
  });
}

const elementos = document.querySelectorAll('.servicio, .work-item, .section-label');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0, rootMargin: '0px 0px 200px 0px' });

elementos.forEach(el => observer.observe(el));

window.addEventListener('load', () => {
  elementos.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight + 200) {
      el.classList.add('visible');
    }
  });
});

const titulo = document.querySelector('.hero h1');
if (titulo) {
  const texto = titulo.textContent;
  titulo.textContent = '';
  let i = 0;
  const intervalo = setInterval(() => {
    titulo.textContent += texto[i];
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, 135);
}

const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  } else {
    nav.style.backdropFilter = 'none';
    nav.style.backgroundColor = 'transparent';
  }
});

// PAGE TRANSITIONS
const transition = document.querySelector('.page-transition');

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href.startsWith('#') && !href.startsWith('mailto')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      transition.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  }
});

window.addEventListener('load', () => {
  setTimeout(() => {
    transition.classList.remove('active');
  }, 100);
});