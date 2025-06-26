document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navLinks');

    // Toggle for the main mobile menu
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !navList.contains(event.target)) {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        }
    });

    // Handle resize to reset menu state
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navList.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // --- No Search Bar Functionality on this page (DOC's & FAQ's) ---
});
