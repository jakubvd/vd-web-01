document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(TextPlugin);

    let duration = 2.0;
    let speed = 0.4;
    const mediaQuery = window.matchMedia("(max-width: 478px)");

    function adjustAnimationSettings(e) {
        if (e.matches) {
            duration = 2.5;
            speed = 0.2;
        } else {
            duration = 2.0;
            speed = 0.4;
        }
    }

    adjustAnimationSettings(mediaQuery);
    mediaQuery.addEventListener("change", adjustAnimationSettings);

    const staticLines = document.querySelectorAll('.heading-style-h2-typed .line1, .heading-style-h2-typed .line2');
    const noCursorLines = [
        document.querySelector('#typed-heading-13 .line1'),
        document.querySelector('#typed-heading-15 .line1')
    ];

    noCursorLines.forEach(line => {
        if (line) line.classList.add('no-cursor');
    });

    function applyBinaryEffect(line, callback) {
        line.textContent = "01_";
        line.classList.add('show');
        setTimeout(function() {
            backspace(line, callback);
        }, 500);
    }

    function backspace(line, callback) {
        let charIndex = 2;

        function eraseChar() {
            if (charIndex > 0) {
                line.textContent = line.textContent.slice(0, charIndex - 1) + '_';
                charIndex--;
                setTimeout(eraseChar, 100);
            } else {
                line.textContent = '_';
                setTimeout(callback, 200);
            }
        }
        eraseChar();
    }

    function applyStaticEffect(line) {
        const originalText = line.textContent.replace('_', '');

        applyBinaryEffect(line, function() {
            gsap.to(line, {
                duration: duration,
                ease: "power3.out",
                text: originalText,
                onUpdate: function() {
                    if (!line.nextElementSibling || !line.classList.contains('line2')) {
                        line.innerHTML = line.textContent + '<span class="cursor">_</span>';
                    } else {
                        line.innerHTML = line.textContent;
                    }
                },
                onComplete: function() {
                    line.innerHTML = originalText + (line.classList.contains('no-cursor') ? '' : '<span class="cursor">_</span>');
                    if (line.nextElementSibling && line.classList.contains('line2')) {
                        const cursor = line.querySelector('.cursor');
                        if (cursor) cursor.remove();
                    }
                },
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                applyStaticEffect(target);
                observer.unobserve(target);
            }
        });
    }, { threshold: 1.0 });

    const allLines = document.querySelectorAll('.heading-style-h2-typed .line1, .heading-style-h2-typed .line2');
    allLines.forEach(line => observer.observe(line));
});
