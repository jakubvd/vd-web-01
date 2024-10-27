document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP ScrambleTextPlugin
    gsap.registerPlugin(ScrambleTextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['projektowanie', 'development', 'utrzymanie', 'outsourcing']; // Removed 'Wdrożenia'
    let currentWord = 0;

    // Apply binary effect (using "01") only during initial load, then call the callback
    function applyBinaryEffect(line, callback) {
        gsap.to(line, {
            duration: 1.0,
            scrambleText: {
                text: "0101010101010101", // Static binary string (16 digits)
                chars: "01", // Binary scramble
                speed: 0.2,
                revealDelay: 0.05,
            },
            onUpdate: function () {
                line.innerHTML = line.textContent + '<span class="cursor">_</span>';
            },
            onComplete: function () {
                setTimeout(callback, 500); // Proceed to backspace and type words
            }
        });
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

    // Typing function for H1 line1 with letter scrambling
    function typeWords() {
        function typeNextWord() {
            let word = words[currentWord];
            gsap.to(firstLine, {
                duration: 1.4,
                scrambleText: {
                    text: word,
                    chars: "abcdefghijklmnopqrstuvwxyz", // Use letters for scrambling
                    speed: 0.4,
                    revealDelay: 0.05,
                },
                onUpdate: function () {
                    firstLine.innerHTML = firstLine.textContent + '<span class="cursor">_</span>';
                },
                onComplete: function () {
                    setTimeout(eraseWord, 1500);
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

    // Apply static typing effect with letters for specific lines
    function applyStaticEffect(line, duration = 1.4, speed = 0.4, hideCursor = false) {
        const originalText = line.textContent.replace('_', '');
        applyBinaryEffect(line, function () {
            gsap.to(line, {
                duration: duration,
                scrambleText: {
                    text: originalText,
                    chars: "abcdefghijklmnopqrstuvwxyz", // Use letters after initial binary effect
                    speed: speed,
                    revealDelay: 0.05,
                },
                onUpdate: function () {
                    if (!hideCursor) {
                        line.innerHTML = line.textContent + '<span class="cursor">_</span>';
                    }
                },
                onComplete: function () {
                    if (!hideCursor) {
                        line.innerHTML = originalText + '<span class="cursor">_</span>';
                    } else {
                        line.innerHTML = originalText; // No cursor for specific lines
                    }
                },
            });
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
                        applyStaticEffect(secondLine, 1.4, 0.4, true); // No cursor for H1 line2
                        applyStaticEffect(thirdLine);
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
