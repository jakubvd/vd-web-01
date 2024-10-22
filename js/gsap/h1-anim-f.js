document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP ScrambleTextPlugin
    gsap.registerPlugin(ScrambleTextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['development', 'projektowanie', 'utrzymanie', 'outsourcing']; // Removed 'wdrożenia'
    let currentWord = 0;

    // Apply initial "0101010101010101" binary scramble
    function applyBinaryEffect(line, callback) {
        gsap.to(line, {
            duration: 0.8, // Short scramble duration
            scrambleText: {
                text: "0101010101010101", // Static binary string (16 digits)
                chars: "01",
                speed: 0.05, // Smooth binary scramble
                revealDelay: 0.02, // Fast reveal to minimize the scramble
            },
            onUpdate: function () {
                line.innerHTML = line.textContent + '<span class="cursor">_</span>';
            },
            onComplete: function () {
                setTimeout(callback, 500);
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
                setTimeout(eraseChar, 40);
            } else {
                line.textContent = '_';
                setTimeout(callback, 400);
            }
        }
        eraseChar();
    }

    // GSAP ScrambleText for H1 line1 - Scramble lowercase letters during the typing effect
    function typeWords() {
        function typeNextWord() {
            let word = words[currentWord];
            gsap.to(firstLine, {
                duration: 2.0, // Smooth typing duration
                scrambleText: {
                    text: word,
                    chars: "abcdefghijklmnopqrstuvwxyz", // Lowercase letters scramble only
                    speed: 0.3, // Smooth scrambling speed for letters
                    revealDelay: 0.02, // Smooth transition
                },
                onUpdate: function () {
                    firstLine.innerHTML = firstLine.textContent + '<span class="cursor">_</span>';
                },
                onComplete: function () {
                    setTimeout(eraseWord, 2000);
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
                    setTimeout(eraseChar, 35);
                } else {
                    currentWord = (currentWord + 1) % words.length;
                    setTimeout(typeNextWord, 350);
                }
            }
            eraseChar();
        }

        typeNextWord();
    }

    // Apply static typing effect without cursor for specific lines
    function applyStaticEffect(line, duration = 1.4, speed = 0.2, hideCursor = false) {
        const originalText = line.textContent.replace('_', '');
        applyBinaryEffect(line, function () {
            gsap.to(line, {
                duration: duration,
                scrambleText: {
                    text: originalText,
                    chars: "abcdefghijklmnopqrstuvwxyz", // Lowercase letters scramble for static lines
                    speed: speed,
                    revealDelay: 0.02,
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
                        // Apply binary scramble first, then type letters scramble
                        applyBinaryEffect(firstLine, typeWords);
                        applyStaticEffect(secondLine, 1.4, 0.2, true); // Scramble letters for line2
                        applyStaticEffect(thirdLine, 1.4, 0.2); // Scramble letters for line3
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
