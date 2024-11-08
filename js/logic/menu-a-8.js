// Register ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

// Select elements by their class names
const menuButton = document.querySelector('.menu-button');
const menuDiv = document.querySelector('.menu-div');
const menuLinks = [
    document.getElementById('menu-link-1'),
    document.getElementById('menu-link-2'),
    document.getElementById('menu-link-3'),
    document.getElementById('menu-link-4'),
    document.getElementById('menu-link-5')
];

// Create a GSAP timeline for the menu animation
const menuTimeline = gsap.timeline({ paused: true, reversed: true });

// Define the animation sequence for menu entrance
menuTimeline.to(menuDiv, { 
    right: '0%', 
    duration: 0.7,         
    ease: 'sine.out'       
});
menuTimeline.fromTo(menuLinks, 
    { x: '100%', opacity: 0 },
    { 
        x: '0%',                  
        opacity: 1,
        duration: 0.33,            // Increased duration by 10% for slower appearance
        ease: 'power1.out',       
        stagger: 0.11              // Increased stagger by 10% for gradual appearance
    },
    '-=0.3'
);

menuTimeline.eventCallback("onReverseComplete", () => {
    gsap.to(menuLinks, {
        x: '100%',                
        opacity: 0,
        duration: 0.33,            // Matched duration for reverse
        ease: 'power1.in',        
        stagger: -0.11             // Matched stagger for reverse order
    });
});

function showMenu() {
    if (menuTimeline.reversed()) {
        menuTimeline.play();
    }
}

function hideMenu() {
    if (!menuTimeline.reversed()) {
        menuTimeline.reverse();
    }
}

function handleMouseLeave() {
    setTimeout(() => {
        if (!menuButton.matches(':hover') && !menuDiv.matches(':hover')) {
            hideMenu();
        }
    }, 100);
}

menuButton.addEventListener('mouseenter', showMenu);
menuDiv.addEventListener('mouseenter', showMenu);

menuButton.addEventListener('mouseleave', handleMouseLeave);
menuDiv.addEventListener('mouseleave', handleMouseLeave);

// Helper function to calculate dynamic scroll duration with a slightly slower multiplier
function getScrollDuration(target) {
    const currentScroll = window.scrollY;
    const targetOffset = document.querySelector(target).offsetTop;
    const distance = Math.abs(targetOffset - currentScroll);

    // Adjusted multiplier for 15% slower scroll
    return Math.min(Math.max(distance * 0.00089, 0.3), 2.5); // Min 0.3s, max 2.5s
}

// Scroll-to-section functionality with dynamic duration and easing
document.getElementById('menu-link-1').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#service"), scrollTo: "#service", ease: "power2.out" });
});

document.getElementById('menu-link-2').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#technology"), scrollTo: "#technology", ease: "power2.out" });
});

document.getElementById('menu-link-3').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#process"), scrollTo: "#process", ease: "power2.out" });
});

document.getElementById('menu-link-4').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#contact"), scrollTo: "#contact", ease: "power2.out" });
});

document.getElementById('menu-link-5').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#faq"), scrollTo: "#faq", ease: "power2.out" });
});
