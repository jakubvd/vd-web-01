document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP ScrambleTextPlugin
    gsap.registerPlugin(ScrambleTextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['PROJEKTOWANIE', 'DEVELOPMENT', 'UTRZYMANIE', 'OUTSOURCING']; // Words in capital letters for Line 1
    let currentWord = 0;

    // ScrambleText settings for a smoother "01" effect
    const scrambleSettings = {
        chars: "01", // Keep binary "01" characters for scrambling
        speed: 1, // Slower scramble speed for a smoother effect
        revealDelay: 0.2 // Small delay before revealing the final word
    };

    // Apply even "010101..." binary string for initial effect and ensure visibility
    function applyBinaryEffect(line, callback) {
        line.textContent = "010101010101010"; // Static, even-length binary string for visual symmetry
        line.style.opacity = 1; // Make sure the line is visible
        setTimeout(function () {
            backspace(line, callback);
        }, 500);
    }

    // Backspace effect function
    function backspace(line, callback) {
        let charIndex = line.textContent.length - 1;
        function eraseChar() {
            if (charIndex > 0) {
                line.textContent = line.textContent.slice(0, charIndex - 1) + '_';
                charIndex--;
                setTimeout(eraseChar, 25);
            } else {
                line.textContent = '_';
                setTimeout(callback, 250);
            }
        }
        eraseChar();
    }

    // Typing effect for Line 1 (cycling through words)
    function typeWords() {
        function typeNextWord() {
            let word = words[currentWord];
            gsap.to(firstLine, {
                duration: 2, // Longer duration for smoother effect
                scrambleText: {
                    text: word,
                    ...scrambleSettings, // Keep "01" scramble settings for Line 1
                },
                onUpdate: function () {
                    firstLine.innerHTML = firstLine.textContent + '<span class="cursor">_</span>';
                },
                onComplete: function () {
                    setTimeout(eraseWord, 1500); // Pause before erasing the word
                }
            });
        }

        function eraseWord() {
            let word = words[currentWord];
            let charIndex = word.length;
            function eraseChar() {
                if (charIndex > 0) {
                    firstLine.innerHTML = word.slice(0, charIndex - 1) + '<span class="cursor">_</span>';
                    charIndex--;
                    setTimeout(eraseChar, 25);
                } else {
                    currentWord = (currentWord + 1) % words.length;
                    setTimeout(typeNextWord, 250);
                }
            }
            eraseChar();
        }

        typeNextWord();
    }

    // Apply static typing effect for Line 2 and Line 3 with capital letters and ensure visibility
    function applyStaticEffect(line, textContent, hideCursor = false) {
        line.style.opacity = 1; // Make sure the line is visible
        gsap.to(line, {
            duration: 2, // Longer duration for smoother effect
            scrambleText: {
                text: textContent.toUpperCase(), // Convert static text to uppercase
                chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Use capital letters for the static text scramble
                speed: 1, // Same speed for smoother effect
                revealDelay: 0.1 // Small delay before revealing the final text
            },
            onUpdate: function () {
                if (!hideCursor) {
                    line.innerHTML = line.textContent + '<span class="cursor">_</span>';
                }
            },
            onComplete: function () {
                if (!hideCursor) {
                    line.innerHTML = textContent.toUpperCase() + '<span class="cursor">_</span>';
                } else {
                    line.innerHTML = textContent.toUpperCase(); // No cursor for specific lines
                }
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
                        applyBinaryEffect(firstLine, typeWords);
                        applyStaticEffect(secondLine, "STRON INTERNETOWYCH", true); // No cursor for Line 2
                        applyStaticEffect(thirdLine, "DLA TWOJEJ FIRMY"); // Static cursor for Line 3
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
