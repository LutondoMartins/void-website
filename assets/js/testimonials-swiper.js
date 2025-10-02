// Inicialização do Swiper para Testemunhos
// Configuração: 1 slide em smartphones, 2 em tablets, 3 em desktop + loop infinito
document.addEventListener('DOMContentLoaded', function() {
    var swiper = new Swiper('.testimonials-swiper', {
        // Configurações básicas
        slidesPerView: 1, // Padrão para smartphones
        spaceBetween: 20, // Espaçamento entre slides
        loop: true, // Loop infinito ativado
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Permite clicar nos bullets
        },
        // Breakpoints responsivos: tablets (2 slides), desktop (3 slides)
        breakpoints: {
            576: {
                slidesPerView: 1,
                spaceBetween: 25,
            },
            768: {
                slidesPerView: 2, // Tablets: 2 colunas
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3, // Desktop: 3 colunas
                spaceBetween: 40,
            },
        },
        // Efeitos suaves
        speed: 600,
        autoplay: {
            delay: 5000, // Auto-avanço a cada 5s (opcional; remova se não quiser)
            disableOnInteraction: false,
        },
    });
});