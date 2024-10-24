document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP ScrambleTextPlugin
    gsap.registerPlugin(ScrambleTextPlugin);

    const firstLine = document.querySelector('.heading-style-h1-typed .line1'); // First line in h1
    const secondLine = document.querySelector('.heading-style-h1-typed .line2'); // Second line in h1
    const thirdLine = document.querySelector('.heading-style-h1-typed .line3'); // Third line in h1

    // Apply binary effect and backspacing for first line
    function applyBinaryEffect(line, callback) {
        gsap.to(line, {
            duration: 1.0, // Set the duration for the scramble effect
            scrambleText: {
                text: "0101010101010101", // Static binary string (16 digits)
                chars: "01", // Scramble using only '0' and '1'
                speed: 0.2, // Control how fast it scrambles
                revealDelay: 0.05, // Delay before revealing the next character
            },
            onUpdate: function () {
                line.innerHTML = line.textContent + '<span class="cursor">_</span>';
                console.log("Current text: ", line.textContent); // Debug the text content
            },
            onComplete: function () {
                console.log("Binary effect complete.");
                setTimeout(callback, 500); // Once done, proceed with the next effect
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

    // GSAP ScrambleText for H1 line1
    function typeWords() {
        const words = ['projektowanie', 'development', 'utrzymanie', 'outsourcing']; // Lowercase words
        let currentWord = 0;

        function typeNextWord() {
            let word = words[currentWord];
            gsap.to(firstLine, {
                duration: 1.4,
                scrambleText: {
                    text: word,
                    chars: "abcdefghijklmnopqrstuvwxyz", // Scramble letters (lowercase)
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

    // Initial call for binary effect on firstLine
    applyBinaryEffect(firstLine, function() {
        // After binary scramble completes, start the word typing effect
        typeWords();
    });
});
