document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Simple Animation for Elements on Scroll (Optional enrichment)
    const fadeElements = document.querySelectorAll('.product-card, .category-card');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        fadeInObserver.observe(el);
    });

    // Product Slider Auto & Manual Controls
    const productGrid = document.querySelector('.product-grid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (productGrid) {
        // Find width of a single item including gap
        const getScrollStep = () => {
            const firstCard = productGrid.querySelector('.product-card');
            return firstCard ? firstCard.clientWidth + 30 : 300; // 30 is the gap
        };

        const slideNext = () => {
            const maxScrollLeft = productGrid.scrollWidth - productGrid.clientWidth;
            // If near the end, wrap to start
            if (productGrid.scrollLeft >= maxScrollLeft - 10) {
                productGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                productGrid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
            }
        };

        const slidePrev = () => {
            if (productGrid.scrollLeft <= 0) {
                productGrid.scrollTo({ left: productGrid.scrollWidth, behavior: 'smooth' });
            } else {
                productGrid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
            }
        };

        if (nextBtn) nextBtn.addEventListener('click', slideNext);
        if (prevBtn) prevBtn.addEventListener('click', slidePrev);

        // Auto slide every 3 seconds
        let autoSlideInterval = setInterval(slideNext, 3000);

        // Pause on hover
        productGrid.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        productGrid.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(slideNext, 3000);
        });
    }
});
