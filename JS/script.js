document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos todos los enlaces de navegación y las secciones de contenido
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');

    // 2. Lógica para cambiar de vista (Sistema SPA) al hacer clic en el menú
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evitamos el comportamiento por defecto del enlace

            // Obtenemos el ID de la sección destino desde el atributo data-target
            const targetId = link.getAttribute('data-target');
            if (!targetId) return;

            // Actualizamos la clase 'active' en los enlaces del menú
            navLinks.forEach(navItem => navItem.classList.remove('active'));
            link.classList.add('active');

            // Recorremos las secciones: removemos 'active' de todas y la agregamos solo a la seleccionada
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('id') === targetId) {
                    section.classList.add('active');
                }
            });

            // Si estamos en dispositivos móviles y el menú está abierto, lo cerramos al hacer clic
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }

            // Subimos el scroll suavemente al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. Lógica para abrir y cerrar el menú en dispositivos móviles
    if (menuIcon && nav) {
        menuIcon.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

// 4. Carrusel automático para los proyectos de diseño gráfico (Estilo Adobe Portfolio)
    const adobeProjectCards = document.querySelectorAll('.adobe-project-card');
    
    adobeProjectCards.forEach(card => {
        const images = card.querySelectorAll('.carousel-img');
        let currentIndex = 0;
        
        if (images.length > 1) {
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3500); // Cambia de imagen cada 3.5 segundos de forma fluida
        }
    });