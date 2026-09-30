/* ===================================
   SCRIPT PRINCIPAL
   Página web personal - Edison Ogonaga
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navegación: scroll y menú móvil ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('.section, .hero');

    // Navbar scroll effect
    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar shadow
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Botón scroll top
        scrollTopBtn.classList.toggle('visible', scrollY > 500);

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Estado inicial

    // Toggle menú móvil
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Cerrar menú al clickear un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Efecto de escritura (typing) ----
    const typingElement = document.getElementById('typingText');
    const phrases = [
        'Estudiante de Ing. en Computación',
        'Aprendiendo nuevas tecnologías',
        'Escuela Politécnica Nacional',
        'Construyendo proyectos con código'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pausa al completar la frase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Iniciar efecto de escritura
    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }

    // ---- Scroll Reveal (animaciones al hacer scroll) ----
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay escalonado para elementos del mismo grupo
                const delay = Array.from(entry.target.parentElement.children)
                    .filter(el => el.hasAttribute('data-reveal'))
                    .indexOf(entry.target) * 100;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Smooth scroll para links internos ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});

