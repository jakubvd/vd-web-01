document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);

    // Select all headings
    const headings = document.querySelectorAll('.heading-style-h2-typed');

    // Loop through each heading and create the desired animation
    headings.forEach((heading, index) => {
        // Step 1: Initial Shuffle Effect with ScrambleTextPlugin
        gsap.to(heading, {
            duration: 0.5,
            scrambleText: {
                text: '010101010101010', // 15 characters
                chars: '01', // Shuffle only binary characters
                speed: 0.5,
            },
            onComplete: function() {
                // Step 2: Backspace Effect to remove shuffled text
                gsap.to(heading, {
                    duration: 1,
                    text: "_",
                    ease: "power2.out",
                    onComplete: function() {
                        // Step 3: Typing the actual heading content with TextPlugin
                        const originalText = heading.dataset.text; // Store the final text in a data attribute in HTML
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
    });
});
