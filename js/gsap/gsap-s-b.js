document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const mediaQuery = window.matchMedia("(min-width: 992px)");

    function initializeSmoothScroll() {
        if (mediaQuery.matches) {
            // Create ScrollSmoother only for screens 992px and above
            ScrollSmoother.create({
                wrapper: '#smooth-wrapper',   // Outer wrapper
                content: '#main-wrapper',     // Inner content container
                smooth: 0.8,                  // Smoothness
                effects: true,                // Parallax effects enabled
            });
        }
    }

    // Initial check
    initializeSmoothScroll();

    // Watch for screen size changes
    mediaQuery.addEventListener("change", function (e) {
        if (e.matches) {
            // Reinitialize if the viewport is resized to 992px or above
            initializeSmoothScroll();
        } else {
            // Kill ScrollSmoother below 992px
            ScrollSmoother.get()?.kill();
        }
    });
});
