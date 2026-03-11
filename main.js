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

