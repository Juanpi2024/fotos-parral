/**
 * Slideshow Logic for Historia and Ecos Pages
 * Handles slide navigation, keyboard controls, touch gestures, and progress dots.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check if we are on a page with slides
    const slidesContainer = document.getElementById('slidesContainer');
    if (!slidesContainer) return;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    const progressDotsContainer = document.getElementById('progressDots');

    // Initialize total slides count
    if (totalSlidesSpan) totalSlidesSpan.textContent = totalSlides;

    // Create progress dots
    if (progressDotsContainer) {
        progressDotsContainer.innerHTML = ''; // Clear existing
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
            dot.onclick = () => goToSlide(i);
            progressDotsContainer.appendChild(dot);
        }
    }

    const dots = document.querySelectorAll('.dot');

    function showSlide(n) {
        // Validate range
        if (n >= totalSlides) {
            currentSlide = totalSlides - 1;
        } else if (n < 0) {
            currentSlide = 0;
        } else {
            currentSlide = n;
        }

        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');

        // Update counter
        if (currentSlideSpan) currentSlideSpan.textContent = currentSlide + 1;

        // Update buttons state
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

        // Smooth scroll to top of slide container (optional, adjusted for sticky header)
        // const headerOffset = 80; // Approximate header height
        // const elementPosition = slidesContainer.getBoundingClientRect().top;
        // const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Only scroll if the slide top is not visible (scrolled past)
        // window.scrollTo({ top: 0, behavior: 'smooth' }); 
        // NOTE: Removed auto-scroll to top on slide change to prevent jarring jumps with sticky header, 
        // user might be reading bottom content.
    }

    // Expose functions globally if needed for inline onclick handles, 
    // but better to attach event listeners here.
    window.changeSlide = function (direction) {
        showSlide(currentSlide + direction);
    };

    window.goToSlide = function (n) {
        showSlide(n);
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });

    // Touch navigation (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left -> Next
            changeSlide(1);
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right -> Prev
            changeSlide(-1);
        }
    }

    // Initialize first slide
    showSlide(0);
});

// Back To Top Button Logic
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.onscroll = function () {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        };

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
