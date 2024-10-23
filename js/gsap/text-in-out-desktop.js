document.addEventListener('DOMContentLoaded', function() {
    // Function to check if the viewport width is 767px or less
    function isMobile() {
        return window.innerWidth <= 767;
    }

    // Define start and end values for section_intro based on mobile responsiveness
    let startValue = isMobile() ? "top 30%" : "top 90%"; // Start as before
    let endValue = isMobile() ? "bottom 85%" : "bottom 60%"; // Adjusted to finish another 5% earlier on desktop

    // Set up animation for both sections with custom start and adjusted end for section_intro
    const sections = [
        { 
            selector: ".section_intro", 
            textClass: ".intro-text-anim", 
            start: startValue, 
            end: endValue 
        },
        { 
            selector: ".section_outro", 
            textClass: ".outro-text-anim", 
            start: isMobile() ? "top 35%" : "top 90%", 
            end: "bottom center" // default for outro
        }
    ];

    sections.forEach(({ selector, textClass, start, end }) => {
        // Split text into individual words
        const layoutText = new SplitType(textClass, { types: "words" });

        // Set up GSAP animation with ScrollTrigger for each section
        gsap.from(layoutText.words, {
            opacity: 0.5,
            stagger: 0.05, // Reduced stagger for smoother transition between words
            scrollTrigger: {
                trigger: selector,
                start: start, // INDIVIDUAL START POSITION FOR EACH SECTION
                end: end, // ADJUSTED END POSITION FOR SECTION_INTRO TO END EVEN EARLIER
                scrub: 4, // Higher scrub value for smoother scrolling animation
                toggleActions: "restart none none none", // Restart animation each time it enters view
                onEnter: () => console.log(`${selector} entered`), // Optional: Log entry
                onLeave: () => console.log(`${selector} left`), // Optional: Log exit
                onEnterBack: () => console.log(`${selector} re-entered from bottom`) // Optional: Log re-entry
            }
        });
    });
});
