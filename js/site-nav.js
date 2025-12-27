document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', function () {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mobileBtn.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                body.classList.remove('no-scroll');
                mobileBtn.focus();
            }
        });
    }
});
