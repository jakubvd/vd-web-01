document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Initialize ScrollSmoother with distinct wrapper and content elements
    ScrollSmoother.create({
        wrapper: '#smooth-wrapper',  // Outer wrapper
        content: '#main-wrapper',    // Inner content container
        smooth: 1.2,                 // Controls smoothness of the scroll
        effects: true,               // Enables optional parallax effects
    });
});
