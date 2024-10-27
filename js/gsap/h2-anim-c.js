document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Select all H2 headings
    const headings = document.querySelectorAll('.heading-style-h2-typed');

    // Intersection Observer to trigger animations when heading comes into view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    animateHeading(target);
                    observer.unobserve(target); // Stop observing after the animation is triggered
                }
            });
        },
        {
            threshold: 1.0, // 100% visibility for triggering
        }
    );

    // Observe all H2 headings
    headings.forEach((heading) => {
        heading.style.opacity = '0'; // Hide the original text initially
        heading.textContent = '01_'; // Set initial binary text
        observer.observe(heading);
    });

    // Function to animate each heading
    function animateHeading(heading) {
        const originalText = heading.dataset.text || heading.textContent; // Use data attribute if available

        // Step 1: Show Binary Text for 0.2 seconds
        gsap.to(heading, {
            opacity: 1,
            duration: 0.1,
            onComplete: function () {
                // Step 2: Backspace Effect
                let charIndex = 2; // Start from length of '01_'
                function eraseChar() {
                    if (charIndex > 0) {
                        heading.textContent = heading.textContent.slice(0, charIndex - 1) + '_';
                        charIndex--;
                        setTimeout(eraseChar, 50);
                    } else {
                        // Step 3: Typing the actual heading content
                        typeContent(heading, originalText);
                    }
                }
                eraseChar();
            },
        });
    }

    // Function to type the actual content of the heading
    function typeContent(heading, text) {
        let charIndex = 0;
        function typeChar() {
            if (charIndex < text.length) {
                heading.textContent = text.slice(0, charIndex + 1) + '_';
                charIndex++;
                setTimeout(typeChar, 100); // Typing speed
            } else {
                heading.textContent = text + '_'; // Keep cursor at the end
            }
        }
        typeChar();
    }
});
