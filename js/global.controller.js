(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', () => {
        updateYear();
        handleHeaderScroll();
        setupScrollAnimations();
        setupMobileNav();
    });

    // Atualiza ano no rodapé
    function updateYear() {
        const yearSpan = document.getElementById('js-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    // Header muda ao rolar
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const onScroll = () => {
            if (window.scrollY > 10) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // estado inicial
    }

    // Animações ao entrar na viewport
    function setupScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        if (!elements.length) return;

        if (!('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach(el => observer.observe(el));
    }

    // Menu mobile
    function setupMobileNav() {
        const toggle = document.querySelector('[data-nav-toggle]');
        const nav = document.querySelector('[data-nav]');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
        });

        // Fecha ao clicar em um link
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
            }
        });
    }
})();