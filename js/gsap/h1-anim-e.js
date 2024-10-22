document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP ScrambleTextPlugin
    gsap.registerPlugin(ScrambleTextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['Development', 'Projektowanie', 'Utrzymanie', 'Outsourcing']; // Removed 'Wdrożenia'
    let currentWord = 0;

    // Apply static "0101010101010101" string for all lines
    function applyBinaryEffect(line, callback) {
        line.textContent = "0101010101010101"; // Static binary string (16 digits)
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
                setTimeout(eraseChar, 35);
            } else {
                line.textContent = '_';
                setTimeout(callback, 350);
            }
        }
        eraseChar();
    }

    // GSAP ScrambleText for H1 line1
    function typeWords() {
        function typeNextWord() {
            let word = words[currentWord];
            gsap.to(firstLine, {
                duration: 1.5,
                scrambleText: {
                    text: word,
                    chars: "01",
                    speed: 0.1,
                    revealDelay: 0.01,
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
    function applyStaticEffect(line, duration = 3.0, speed = 0.35, hideCursor = false) {
        const originalText = line.textContent.replace('_', '');
        applyBinaryEffect(line, function () {
            gsap.to(line, {
                duration: duration,
                scrambleText: {
                    text: originalText,
                    chars: "01",
                    speed: speed,
                    revealDelay: 0.35,
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
                        applyStaticEffect(secondLine, 3.0, 0.35, true); // No cursor for H1 line2
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
