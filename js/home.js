document.addEventListener('DOMContentLoaded', function () {
    /* --- Global Logic (Header Scroll & Mobile Menu) --- */

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (menuBtn && mainNav) {
        // Remove any existing event listeners by cloning (optional, but good for cleanup if needed)
        // For now, just adding one.
        menuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('show');
            // Animate hamburger menu
            const spans = menuBtn.querySelectorAll('span');
            if (mainNav.classList.contains('show')) {
                // Add active state styles if needed, or rely on CSS
            }
        });
    }

    /* --- Homepage Slider Logic --- */
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        let slideIndex = 0;
        let slideInterval;
        let slides = document.getElementsByClassName("slide");

        // Initialize slider if slides exist
        if (slides.length > 0) {
            showSlides();
            startAutoplay();
        }

        function showSlides() {
            let i;
            // Hide all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                slides[i].classList.remove('active');
            }

            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }

            // Show current slide
            slides[slideIndex - 1].style.display = "block";
            slides[slideIndex - 1].classList.add('active');
        }

        function startAutoplay() {
            // Clear existing interval if any to prevent multiple timers
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlides();
            }, 5000); // Change every 5 seconds
        }
    }
    /* --- Back to Top Logic --- */
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        window.onscroll = function () {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        };

        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* --- Lightbox Logic --- */
    function initLightbox() {
        // Create lightbox structure if not exists
        if (!document.getElementById('lightbox')) {
            const lb = document.createElement('div');
            lb.id = 'lightbox';
            lb.className = 'lightbox';
            lb.innerHTML = `
                <span class="lightbox-close" aria-label="Cerrar">&times;</span>
                <img class="lightbox-content" id="lightbox-img">
                <div id="lightbox-caption" class="lightbox-caption"></div>
            `;
            document.body.appendChild(lb);

            const closeBtn = lb.querySelector('.lightbox-close');
            closeBtn.onclick = () => lb.style.display = "none";
            lb.onclick = (e) => {
                if (e.target === lb) lb.style.display = "none";
            };

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape") lb.style.display = "none";
            });
        }

        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        const lbCaption = document.getElementById('lightbox-caption');

        // Add click event to all gallery images that should open in lightbox
        // Focus on images within .card-foto-img-container
        const galleryImages = document.querySelectorAll('.card-foto-img-container img');
        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.onclick = function () {
                lb.style.display = "block";
                lbImg.src = this.src;
                lbCaption.innerHTML = this.alt;
            }
        });
    }

    initLightbox();
});
