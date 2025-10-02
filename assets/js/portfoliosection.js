// Portfolio Filters
document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.portfolio-filters .nav-link');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');

            // Remove active class from all links
            filterLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === '*') {
                    item.classList.remove('hidden');
                } else {
                    if (item.classList.contains(filterValue.replace('.', ''))) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Fancybox for zoom (requires Fancybox library - add CDN if needed)
    // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css">
    // <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
    // Then: Fancybox.bind('[data-fancybox="portfolio"]', {});
});