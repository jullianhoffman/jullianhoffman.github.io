// Menú móvil
const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');
let mobileNav;

// Crear el menú móvil si no existe
function createMobileNav() {
    if (!document.querySelector('.mobile-nav')) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Recorrer todos los elementos hijos directos del nav
        Array.from(nav.children).forEach(item => {
            // Si es un enlace normal, añadirlo directamente
            if (item.tagName === 'A') {
                const newLink = item.cloneNode(true);
                mobileNav.appendChild(newLink);
            }
            // Si es el dropdown, procesarlo especialmente
            else if (item.classList.contains('dropdown')) {
                const dropdownToggle = item.querySelector('.dropdown-toggle');
                const dropdownMenu = item.querySelector('.dropdown-menu');
                
                if (dropdownToggle) {
                    // Crear el enlace principal de Portafolios
                    const portafoliosLink = document.createElement('a');
                    portafoliosLink.href = dropdownToggle.getAttribute('href');
                    portafoliosLink.textContent = 'Portafolios';
                    
                    // Añadir el botón desplegable para móvil
                    const mobileDropdownToggle = document.createElement('div');
                    mobileDropdownToggle.className = 'mobile-dropdown-toggle';
                    mobileDropdownToggle.innerHTML = '<i class="bx bxs-chevrons-down"></i>';
                    portafoliosLink.appendChild(mobileDropdownToggle);
                    
                    // Añadir el enlace principal al menú móvil
                    mobileNav.appendChild(portafoliosLink);
                    
                    // Crear el contenedor del submenú móvil
                    const mobileSubmenu = document.createElement('div');
                    mobileSubmenu.className = 'mobile-dropdown-menu';
                    
                    // Añadir los enlaces del submenú
                    if (dropdownMenu) {
                        const submenuLinks = dropdownMenu.querySelectorAll('a');
                        submenuLinks.forEach(subLink => {
                            const newSubLink = subLink.cloneNode(true);
                            mobileSubmenu.appendChild(newSubLink);
                        });
                    }
                    
                    // Insertar el submenú después del enlace de Portafolios
                    mobileNav.appendChild(mobileSubmenu);
                    
                    // Añadir evento para mostrar/ocultar el submenú en móvil
                    mobileDropdownToggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        mobileSubmenu.classList.toggle('active');
                        mobileDropdownToggle.classList.toggle('active');
                    });
                }
            }
        });
        
        document.body.appendChild(mobileNav);
        
        // Añadir eventos a los enlaces del menú móvil
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // No cerrar el menú si se hace clic en el botón desplegable
                if (link.querySelector('.mobile-dropdown-toggle') && 
                    e.target.closest('.mobile-dropdown-toggle')) {
                    return;
                }
                mobileNav.classList.remove('active');
                menuIcon.classList.remove('active');
            });
        });
    } else {
        mobileNav = document.querySelector('.mobile-nav');
    }
}

// Inicializar el menú móvil
createMobileNav();

menuIcon.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuIcon.classList.toggle('active');
});

// Navegación activa según la sección visible
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animación de scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
};

// Añadir clase para animación a elementos
window.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.home-content h1',
        '.home-content p',
        '.roles',
        '.cta-buttons',
        '.home-image',
        '.informacion-content h2',
        '.informacion-content p',
        '.social-links',
        '.cv-button',
        '.informacion-image',
        '.portafolios h2',
        '.portfolio-item',
        '.contacto h2',
        '.contact-options',
        '.contact-form'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

// No necesitamos prevenir el envío del formulario ya que ahora usamos Web3Forms
// El formulario se enviará directamente a través de POST
// Web3Forms se encargará de redirigir al usuario después del envío

// Validación del formulario
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Verificar si se ha configurado la clave de acceso
        const accessKey = contactForm.querySelector('input[name="access_key"]').value;
        if (accessKey === 'TU-CLAVE-DE-ACCESO-WEB3FORMS') {
            e.preventDefault();
            alert('Por favor, configura tu clave de acceso de Web3Forms antes de enviar el formulario. Visita https://web3forms.com/ para obtener tu clave.');
            return false;
        }
        
        // Validar el formato del teléfono
        const telefono = document.getElementById('Telefono');
        if (telefono.value && !/^\d{8,}$/.test(telefono.value.replace(/[\s-]/g, ''))) {
            e.preventDefault();
            alert('Por favor, ingresa un número de teléfono válido (mínimo 8 dígitos)');
            return false;
        }
        
        // Si todo está bien, el formulario se enviará normalmente a Web3Forms
    });
}

// Animaciones para los elementos del portafolio
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
        item.classList.remove('hover');
    });
});

// Animaciones para las tarjetas de video (para complementar las animaciones de Swiper)
document.addEventListener('DOMContentLoaded', function() {
    // Añadir efectos de hover a las tarjetas de video si no están manejados por CSS
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Las animaciones ya están manejadas por CSS, pero podemos añadir efectos adicionales aquí si es necesario
        });
        card.addEventListener('mouseleave', () => {
            // Las animaciones ya están manejadas por CSS, pero podemos añadir efectos adicionales aquí si es necesario
        });
    });
});