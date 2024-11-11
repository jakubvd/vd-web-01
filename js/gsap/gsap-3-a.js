document.addEventListener('DOMContentLoaded', function() {
    function isMobile() {
        return window.innerWidth <= 767;
    }

    let startValue = isMobile() ? "top 80%" : "top 90%";
    let endValue = isMobile() ? "bottom 60%" : "bottom 60%";

    const sections = [
        { selector: ".section_intro", textClass: ".intro-text-anim", start: startValue, end: endValue },
        { selector: ".section_outro", textClass: ".outro-text-anim", start: isMobile() ? "top 80%" : "top 90%", end: "bottom center" }
    ];

    sections.forEach(({ selector, textClass, start, end }) => {
        const layoutText = new SplitType(textClass, { types: "words" });

        gsap.from(layoutText.words, {
            opacity: 0.5,
            stagger: 0.05,
            scrollTrigger: {
                trigger: selector,
                start: start,
                end: end,
                scrub: 2,
                toggleActions: "restart none none none"
            }
        });
    });
});
