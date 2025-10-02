(function ($) {
    "use strict";

    // Debug: Log para confirmar jQuery carregado
    console.log("Custom JS carregado com jQuery v" + $.fn.jquery);

    // Sticky Header on Scroll
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height() || 0; // Evita erro se não existir
        var header = $('header').height() || 0;

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });

    // Portfolio Isotope Filters
    $('.portfolio-filters .nav-link').click(function(e) {
        e.preventDefault();
        console.log("Filtro clicado: " + $(this).attr('data-filter')); // Debug

        $('.portfolio-filters .nav-link').removeClass('active');
        $(this).addClass('active');

        var filterValue = $(this).attr('data-filter');
        $('.portfolio-grid').isotope({
            filter: filterValue
        });
    });

    // Initialize Isotope for Portfolio Grid
    $(document).ready(function() {
        if ($('.portfolio-grid').length) {
            var $grid = $(".portfolio-grid").isotope({
                itemSelector: ".portfolio-item",
                percentPosition: true,
                masonry: {
                    columnWidth: ".portfolio-item"
                }
            });
            console.log("Isotope inicializado"); // Debug
        }
    });

    // Mobile Menu Toggle (Fix Responsivo)
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Previne bubble para outros eventos

            var $nav = $('.header-area .nav');
            var isVisible = $nav.is(':visible');

            console.log("Menu toggle: " + (isVisible ? "Fechando" : "Abrindo")); // Debug

            if (isVisible) {
                $nav.slideUp(200).css('display', 'none'); // Force none após slide
                $(this).removeClass('active');
            } else {
                $nav.css('display', 'block').slideDown(200); // Force block antes de slide
                $(this).addClass('active');
            }
        });

        // Fechar menu ao clicar fora (melhora UX mobile)
        $(document).on('click touchstart', function(e) {
            if (!$(e.target).closest('.main-nav').length && $('.menu-trigger').hasClass('active')) {
                $('.menu-trigger').trigger('click');
            }
        });
    }

    // Close mobile menu on resize to desktop
    $(window).resize(function() {
        if ($(window).width() > 767) {
            $('.header-area .nav').removeAttr('style').hide(); // Reset styles
            $('.menu-trigger').removeClass('active');
            console.log("Resize: Menu fechado para desktop"); // Debug
        }
    });

    // Smooth Scroll for Navigation Links
    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            var width = $(window).width();
            if (width < 991) {
                $('.menu-trigger').removeClass('active');
                $('.header-area .nav').slideUp(200).css('display', 'none');
            }
            $('html,body').animate({
                scrollTop: (target.offset().top) - 80
            }, 700);
        }
    });

    // Active Nav Link on Scroll
    $(document).ready(function () {
        $(document).on("scroll", onScroll);

        $('.scroll-to-section a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('.scroll-to-section a').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            var target = $(this.hash);
            $('html, body').stop().animate({
                scrollTop: (target.offset().top) - 79
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    }

    // Page Loading Animation (Condicional)
    $(window).on('load', function() {
        if ($('#preloader').length) {
            $("#preloader").animate({
                'opacity': '0'
            }, 600, function() {
                setTimeout(function() {
                    $("#preloader").css("visibility", "hidden").fadeOut();
                }, 300);
            });
        }
    });

    // Submenu Dropdown Toggle (Desktop only)
    const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                if ($(window).width() <= 767) return; // Desabilita em mobile

                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

    // Counter Animation on Scroll (Condicional, se .count-digit existir)
    function visible(partial) {
        var $t = partial,
            $w = jQuery(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));
    }

    if ($('.count-digit').length) {
        $(window).scroll(function() {
            if (visible($('.count-digit'))) {
                if ($('.count-digit').hasClass('counter-loaded')) return;
                $('.count-digit').addClass('counter-loaded');

                $('.count-digit').each(function() {
                    var $this = $(this);
                    jQuery({
                        Counter: 0
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
                console.log("Counters animados"); // Debug
            }
        });
    }

})(window.jQuery);