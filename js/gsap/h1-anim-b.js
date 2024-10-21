document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP TextPlugin
    gsap.registerPlugin(TextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['Projektowanie', 'Development', 'Utrzymanie', 'Outsourcing']; // Words to cycle through
    let currentWord = 0; // Keep track of the current word

    // Typing effect for H1 first line (cycling through words)
    function typeWords() {
        function typeNextWord() {
            let word = words[currentWord]; // Get the current word
            gsap.to(firstLine, {
                duration: 1.4, // Duration of the typing effect
                text: { value: word }, // Use TextPlugin to type the word
                ease: "power2.inOut",
                onUpdate: function () {
                    firstLine.innerHTML += '<span class="cursor">_</span>'; // Ensure cursor is visible
                },
                onComplete: function () {
                    setTimeout(eraseWord, 1500); // Pause before erasing the word
                }
            });
        }

        // Function to erase the word and move to the next
        function eraseWord() {
            gsap.to(firstLine, {
                duration: 1.5,
                text: { value: "" }, // Erase the current word (empty string)
                ease: "power1.out",
                onComplete: function () {
                    currentWord = (currentWord + 1) % words.length; // Move to the next word
                    setTimeout(typeNextWord, 250); // Delay before typing the next word
                }
            });
        }

        typeNextWord(); // Start typing the first word
    }

    // Static typing effect for second and third lines without the need to erase
    function applyStaticEffect(line, textContent) {
        gsap.to(line, {
            duration: 1.4, // Duration of the text reveal
            text: { value: textContent }, // Use TextPlugin to reveal the text
            ease: "power2.out",
            onComplete: function () {
                line.innerHTML += '<span class="cursor">_</span>'; // Add the cursor
            }
        });
    }

    // Observer API to trigger animations when H1-wrapper enters the viewport
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    if (target === h1Wrapper) {
                        // Apply animations to H1 lines only when the full H1 wrapper is in view
                        typeWords(); // Apply typing effect to the first line (cycling through words)
                        applyStaticEffect(secondLine, "Stron Internetowych"); // Static typing for second line
                        applyStaticEffect(thirdLine, "dla Twojej Firmy"); // Static typing for third line
                    }
                    observer.unobserve(target); // Stop observing after the animation is triggered
                }
            });
        },
        {
            threshold: 1.0, // 100% visibility for triggering
        }
    );

    // Observe the entire H1 wrapper
    observer.observe(h1Wrapper);
});
