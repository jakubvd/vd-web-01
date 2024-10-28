document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP TextPlugin
    gsap.registerPlugin(TextPlugin);

    const h1Wrapper = document.querySelector('.h1-wrapper'); // H1 wrapper
    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1
    const words = ['Development', 'Projektowanie', 'Utrzymanie', 'Outsourcing']; // Removed 'Wdrożenia'
    let currentWord = 0;

    function applyBinaryEffect(line, callback) {
        line.style.textAlign = 'left'; // Temporarily align text to the left
        line.textContent = "010101010101010101_"; // Set static 10-digit binary text with underscore
        line.classList.add('show');
        setTimeout(function () {
            backspace(line, callback);
        }, 500);
    }

    function backspace(line, callback) {
        let charIndex = 18; // Start erasing from the end of "0101010101_"
        function eraseChar() {
            if (charIndex > 0) {
                line.textContent = line.textContent.slice(0, charIndex - 1) + '_';
                charIndex--;
                setTimeout(eraseChar, 30);
            } else {
                line.textContent = '_';
                line.style.textAlign = ''; // Reset text alignment after backspacing completes
                setTimeout(callback, 250);
            }
        }
        eraseChar();
    }

    function typeWords() {
        function typeNextWord() {
            let word = words[currentWord];
            gsap.to(firstLine, {
                duration: 2.2,
                text: word, // Use TextPlugin for smooth typing
                ease: "power2.out",
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
                    setTimeout(eraseChar, 30);
                } else {
                    currentWord = (currentWord + 1) % words.length;
                    setTimeout(typeNextWord, 250);
                }
            }
            eraseChar();
        }

        typeNextWord();
    }

    function applyStaticEffect(line, duration = 2.2, hideCursor = false) {
        const originalText = line.textContent.replace('_', '');

        applyBinaryEffect(line, function () {
            gsap.to(line, {
                duration: duration,
                text: originalText,  // Using TextPlugin for smooth typing
                ease: "power2.out",
                onUpdate: function () {
                    if (!hideCursor) {
                        line.innerHTML = line.textContent + '<span class="cursor">_</span>';
                    }
                },
                onComplete: function () {
                    line.innerHTML = originalText + (hideCursor ? '' : '<span class="cursor">_</span>');
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
                        applyStaticEffect(secondLine, 2.2, true); // No cursor for H1 line2
                        applyStaticEffect(thirdLine);
                    }
                    observer.unobserve(target); // Stop observing after the animation is triggered
                }
            });
        },
        { threshold: 1.0 } // Trigger only when fully visible
    );

    // Observe the entire H1 wrapper
    observer.observe(h1Wrapper);
});
