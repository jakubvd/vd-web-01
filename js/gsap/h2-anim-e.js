document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP ScrambleTextPlugin
    gsap.registerPlugin(ScrambleTextPlugin);

    // Get all H2 elements with line1, line2, etc.
    const staticLines = document.querySelectorAll('.heading-style-h2-typed .line1, .heading-style-h2-typed .line2');
    
    // Apply no cursor class to the relevant lines, only if they exist
    const noCursorLines = [
        document.querySelector('#typed-heading-13 .line1'), // H13 line1
        document.querySelector('#typed-heading-15 .line1')  // H15 line1
    ];

    noCursorLines.forEach(line => {
        if (line) {
            line.classList.add('no-cursor'); // Apply no-cursor class to relevant lines
        }
    });

    function generateShuffledBinaryString(length = 4) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.random() > 0.5 ? '1' : '0';
        }
        return result;
    }

    function applyBinaryEffect(line, callback) {
        line.textContent = generateShuffledBinaryString(4); // Set to 4 digits
        line.classList.add('show');
        setTimeout(function () {
            backspace(line, callback);
        }, 500);
    }

    function backspace(line, callback) {
        let charIndex = line.textContent.length - 1;

        function eraseChar() {
            if (charIndex > 0) {
                line.textContent = line.textContent.slice(0, charIndex - 1) + '_';
                charIndex--;
                setTimeout(eraseChar, 25);
            } else {
                line.textContent = '_';
                setTimeout(callback, 150);
            }
        }
        eraseChar();
    }

    function applyStaticEffect(line, duration = 3.0, speed = 0.05) {
        const originalText = line.textContent.replace('_', '');

        applyBinaryEffect(line, function () {
            gsap.to(line, {
                duration: duration,
                ease: "power3.out", // Smooth premium easing
                scrambleText: {
                    text: originalText,
                    chars: "01",
                    speed: speed,
                    revealDelay: 0.04
                },
                onUpdate: function () {
                    // Only add cursor if this is not the first line in a two-lined h2
                    if (!line.nextElementSibling || !line.classList.contains('line2')) {
                        line.innerHTML = line.textContent + '<span class="cursor">_</span>';
                    } else {
                        line.innerHTML = line.textContent; // No cursor during typing for the first line
                    }
                },
                onComplete: function () {
                    // Add the cursor back after typing completes
                    line.innerHTML = originalText + (line.classList.contains('no-cursor') ? '' : '<span class="cursor">_</span>');

                    // Remove cursor for the first line if it has a sibling
                    if (line.nextElementSibling && line.classList.contains('line2')) {
                        const cursor = line.querySelector('.cursor');
                        if (cursor) cursor.remove();
                    }
                },
            });
        });
    }

    // Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                applyStaticEffect(target);
                observer.unobserve(target);
            }
        });
    }, { threshold: 1.0 }); // Trigger only when 100% visible

    // Observe all H2 elements for animation when in view
    const allLines = document.querySelectorAll('.heading-style-h2-typed .line1, .heading-style-h2-typed .line2');
    allLines.forEach(line => observer.observe(line));
});
