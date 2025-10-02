// Inicialização de Múltiplos Swipers para Equipa (Loop Infinito por Categoria) - Fix Mobile Centralização
document.addEventListener('DOMContentLoaded', function() {
    const swipers = [
        { selector: '.leadership-swiper', slides: 4 },
        { selector: '.programming-swiper', slides: 4 },
        { selector: '.cctv-swiper', slides: 4 },
        { selector: '.networks-swiper', slides: 4 },
        { selector: '.support-swiper', slides: 4 },
        { selector: '.marketing-swiper', slides: 4 }
    ];

    swipers.forEach(config => {
        new Swiper(config.selector, {
            slidesPerView: 1,
            spaceBetween: 0, // Zero space em mobile para fit perfeito
            centeredSlides: true, // Centraliza slide em mobile
            loop: true,
            pagination: {
                el: `.${config.selector.replace('.', '')} .swiper-pagination`,
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    centeredSlides: false,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                    centeredSlides: false,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    centeredSlides: false,
                },
            },
            speed: 600,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    });
});