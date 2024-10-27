document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP TextPlugin
    gsap.registerPlugin(TextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['Projektowanie', 'Development', 'Utrzymanie', 'Outsourcing']; // Words to cycle through for line 1
    let currentWord = 0; // Track the current word for line 1

    // CSS class to initially hide all lines
    function hideLines() {
        firstLine.style.opacity = '0';
        secondLine.style.opacity = '0';
        thirdLine.style.opacity = '0';
    }

    // Apply binary strings "010101" to each line
    function showBinaryEffect() {
        firstLine.textContent = "010101010101010";
        secondLine.textContent = "010101010101010";
        thirdLine.textContent = "010101010101010";
        gsap.to([firstLine, secondLine, thirdLine], { opacity: 1, duration: 0.5 });
    }

    // Backspace effect for each line
    function backspaceLine(line, callback) {
        gsap.to(line, {
            duration: 0.4,
            text: { value: "" }, // Erase the text
            ease: "power1.out",
            onComplete: callback // Trigger the next step after erasing
        });
    }

    // Typing effect for Line 1 (infinite loop of words)
    function typeLine1() {
        function typeNextWord() {
            let word = words[currentWord]; // Get the current word
            gsap.to(firstLine, {
                duration: 1.0,
                text: { value: word }, // Type the word
                ease: "power2.inOut",
                onComplete: function () {
                    setTimeout(eraseWord, 2000); // Pause before erasing
                }
            });
        }

        // Erase the word and move to the next
        function eraseWord() {
            gsap.to(firstLine, {
                duration: 0.5,
                text: { value: "" }, // Erase the current word
                ease: "power1.out",
                onComplete: function () {
                    currentWord = (currentWord + 1) % words.length; // Move to the next word
                    setTimeout(typeNextWord, 250); // Delay before typing the next word
                }
            });
        }

        typeNextWord(); // Start typing the first word
    }

    // Typing effect for Line 2 and Line 3 (only once)
    function typeStaticLine(line, text, hasStaticCursor = false) {
        gsap.to(line, {
            duration: 0.5,
            text: { value: text },
            ease: "power2.out",
            onComplete: function () {
                if (hasStaticCursor) {
                    line.innerHTML = text + '<span class="static-cursor">_</span>'; // Static cursor at the end for line 3
                } else {
                    line.innerHTML += '<span class="cursor">_</span>'; // Blinking cursor for other lines
                }
            }
        });
    }

    // Master function to control the sequence
    function startSequence() {
        showBinaryEffect(); // Start by showing the binary strings

        // After a short delay, backspace and start typing
        setTimeout(function () {
            // Backspace all three lines
            backspaceLine(firstLine, function () {
                typeLine1(); // Start infinite loop typing for Line 1
            });
            backspaceLine(secondLine, function () {
                typeStaticLine(secondLine, "Stron Internetowych"); // Type Line 2 (once)
            });
            backspaceLine(thirdLine, function () {
                typeStaticLine(thirdLine, "dla Twojej Firmy", true); // Type Line 3 (once, with static cursor)
            });
        }, 500); // 2 second delay after showing the binary
    }

    // Observer to trigger animations when H1-wrapper is visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startSequence(); // Start the sequence when the H1 wrapper is fully visible
                    observer.unobserve(entry.target); // Stop observing after the animation is triggered
                }
            });
        },
        {
            threshold: 1.0, // 100% visibility for triggering
        }
    );

    // Initially hide all lines and observe H1 wrapper
    hideLines();
    observer.observe(h1Wrapper);
});
