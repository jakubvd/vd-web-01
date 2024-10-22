document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP ScrambleTextPlugin
    gsap.registerPlugin(ScrambleTextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['Projektowanie', 'Development', 'Utrzymanie', 'Outsourcing']; // Removed 'Wdrożenia'
    let currentWord = 0;

    // Generates a binary string
    function generateShuffledBinaryString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.random() > 0.5 ? '1' : '0';
        }
        return result;
    }

    // Apply binary effect and backspacing for all lines
    function applyBinaryEffect(line, callback) {
        line.textContent = generateShuffledBinaryString(15);
        line.classList.add('show');
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
                setTimeout(eraseChar, 20); // Speed up backspacing for smoothness
            } else {
                line.textContent = '_';
                setTimeout(callback, 200); // Shorter pause before next effect
            }
        }
        eraseChar();
    }

    // GSAP ScrambleText for H1 line1, smooth typing and subtle scrambling
    function typeWords() {
        function typeNextWord() {
            let word = words[currentWord];
            gsap.to(firstLine, {
                duration: 1.0, // Shorter duration for typing to match other lines
                scrambleText: {
                    text: word,
                    chars: "01",
                    speed: 0.15, // Subtle scramble
                    revealDelay: 0.85, // Reveal most of the word smoothly
                },
                onUpdate: function () {
                    firstLine.innerHTML = firstLine.textContent + '<span class="cursor">_</span>';
                },
                onComplete: function () {
                    setTimeout(eraseWord, 1000); // Shorter delay before erasing
                },
            });
        }

        function eraseWord() {
            let word = words[currentWord];
            let charIndex = word.length;
            function eraseChar() {
                if (charIndex > 0) {
                    firstLine.innerHTML = word.slice(0, charIndex - 1) + '<span class="cursor">_</span>';
                    charIndex--;
                    setTimeout(eraseChar, 20); // Speed up backspacing for consistency
                } else {
                    currentWord = (currentWord + 1) % words.length;
                    setTimeout(typeNextWord, 200); // Quick transition to next word
                }
            }
            eraseChar();
        }

        typeNextWord();
    }

    // Apply static typing effect for Line 2 and Line 3 without scramble
    function applyStaticEffect(line, textContent, hideCursor = false) {
        gsap.to(line, {
            duration: 1.0, // Ensure typing duration matches Line 1
            scrambleText: {
                text: textContent, // Static text for these lines
                chars: "01", // Binary character consistency
                speed: 0.15, // Smooth speed like Line 1
                revealDelay: 0.85, // Make sure it reveals quickly for smoothness
            },
            onUpdate: function () {
                if (!hideCursor) {
                    line.innerHTML = line.textContent + '<span class="cursor">_</span>';
                }
            },
            onComplete: function () {
                if (!hideCursor) {
                    line.innerHTML = textContent + '<span class="cursor">_</span>';
                } else {
                    line.innerHTML = textContent; // No cursor for specific lines
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
                        applyStaticEffect(secondLine, "Stron Internetowych", true); // No cursor for Line 2
                        applyStaticEffect(thirdLine, "dla Twojej Firmy"); // Static cursor for Line 3
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
