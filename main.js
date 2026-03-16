window.scrollTo(0, 0);
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 6 + 'px';
  cursor.style.top = e.clientY - 6 + 'px';
});

const clicables = document.querySelectorAll('a, .servicio');

clicables.forEach((elemento) => {
    elemento.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(3)';
        cursor.style.bordercolor = '#ffffff';
    });
    elemento.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.bordercolor = '#ffffff';
    });
});
const hero = document.querySelector('h1');
hero.style.transform = 'translateY(0px)';

window .addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(${scrollY * 0.4}px)`;
});

// ANIMACIONES AL SCROLL
const elementos = document.querySelectorAll('.servicio, .work-item, .contact h2, .contact p, .section-label');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.05
});
elementos.forEach(elemento => {
    observer.observe(elemento);     
}); 
// TEXTE REVEAL
const titulo = document.querySelector('.hero h1');
const texto = titulo.textContent;
titulo.textContent = '';

let i = 0;
const intervalo = setInterval(() => {
    titulo.textContent += texto[i];
    i++;
    if (i >= texto.length) {
        clearInterval(intervalo);
    }
}, 135);

// NAV BLUR AL SCROLL 
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
        nav.style.backdropFilter = 'none';
        nav.style.backgroundColor = 'transparent';
    }
}
);
