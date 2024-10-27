document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Select all headings
    const headings = document.querySelectorAll('.heading-style-h2-typed');

    // Loop through each heading and create the desired animation
    headings.forEach((heading) => {
        // Hide the original text initially
        const originalText = heading.textContent;
        heading.style.opacity = '0';
        heading.textContent = '01_'; // Initial binary text

        // Step 1: ScrollTrigger to detect when heading comes into view
        ScrollTrigger.create({
            trigger: heading,
            start: 'top 100%', // Trigger when 100% of the heading is in view
            onEnter: function() {
                gsap.to(heading, { opacity: 1, duration: 0.1 });
                // Step 2: Static Binary Text visible for 0.5 seconds
                gsap.to(heading, {
                    duration: 0.1,
                    delay: 0.1, // Show binary text for 0.5 seconds before backspacing
                    onComplete: function() {
                        // Step 3: Backspace Effect
                        gsap.to(heading, {
                            duration: 0.1,
                            text: "_",
                            ease: "none",
                            onComplete: function() {
                                // Step 4: Typing the actual heading content
                                gsap.to(heading, {
                                    duration: originalText.length * 0.1, // Adjust duration based on text length
                                    text: {
                                        value: originalText + "_",
                                        delimiter: "",
                                    },
                                    ease: "power2.out"
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});
