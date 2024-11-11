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

// Prevent default scroll-to-anchor behavior for `#` links
window.addEventListener('hashchange', (event) => {
    event.preventDefault();
}, false);

// Determine duration for `menuDiv` based on viewport width
const menuDivDuration = window.innerWidth <= 478 ? 0.5 : 0.8; // 0.5s for mobile, 0.8s for larger screens

// Create a GSAP timeline for the menu animation with conditional duration
const menuTimeline = gsap.timeline({ paused: true, reversed: true, invalidateOnRefresh: true });

// Define the animation sequence for menu entrance
menuTimeline.to(menuDiv, { 
    right: '0%', 
    duration: menuDivDuration,  // Adjusted duration based on viewport width
    ease: 'sine.out'       
});
menuTimeline.fromTo(menuLinks, 
    { x: '100%', opacity: 0 },
    { 
        x: '0%',                  
        opacity: 1,
        duration: 0.4,
        ease: 'sine.out',       
        stagger: 0.1
    },
    '-=0.5'
);

// Functions to show and hide the menu
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

// Toggle the menu based on viewport size
function toggleMenu() {
    if (menuTimeline.reversed()) {
        menuTimeline.play();
    } else {
        menuTimeline.reverse();
    }
}

// Event listeners based on viewport width
if (window.innerWidth <= 991) {
    // For mobile/tablet viewports, toggle the menu on click
    menuButton.addEventListener('click', toggleMenu);
} else {
    // For desktop viewports, use hover to show/hide menu
    menuButton.addEventListener('mouseenter', showMenu);
    menuDiv.addEventListener('mouseenter', showMenu);
    menuButton.addEventListener('mouseleave', handleMouseLeave);
    menuDiv.addEventListener('mouseleave', handleMouseLeave);
}

// Add a delay on mouse leave to avoid accidental hiding (for desktop only)
function handleMouseLeave() {
    setTimeout(() => {
        if (!menuButton.matches(':hover') && !menuDiv.matches(':hover')) {
            hideMenu();
        }
    }, 100);
}

// Helper function to calculate dynamic scroll duration based on distance
function getScrollDuration(target) {
    const currentScroll = window.scrollY;
    const targetOffset = document.querySelector(target).offsetTop;
    const distance = Math.abs(targetOffset - currentScroll);

    let duration;
    if (distance > 2000) {
        duration = distance * 0.001;
    } else if (distance > 1000) {
        duration = distance * 0.0009;
    } else {
        duration = distance * 0.0009;
    }

    return Math.min(Math.max(duration, 0.8), 2.5);
}

// Scroll-to-section functionality with adjusted duration and easing for menu links
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

// Additional scroll-to functionality for the new buttons
document.getElementById('but-hero-1').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#contact"), scrollTo: "#contact", ease: "power2.out" });
});

document.getElementById('but-hero-2').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#intro"), scrollTo: "#intro", ease: "power2.out" });
});

document.getElementById('but-intro').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#service"), scrollTo: "#service", ease: "power2.out" });
});

document.getElementById('but-proc').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#contact"), scrollTo: "#contact", ease: "power2.out" });
});

document.getElementById('but-faq').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#contact"), scrollTo: "#contact", ease: "power2.out" });
});

document.getElementById('but-f-1').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#service"), scrollTo: "#service", ease: "power2.out" });
});

document.getElementById('but-f-2').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#technology"), scrollTo: "#technology", ease: "power2.out" });
});

document.getElementById('but-f-3').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#process"), scrollTo: "#process", ease: "power2.out" });
});

document.getElementById('but-f-4').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#contact"), scrollTo: "#contact", ease: "power2.out" });
});

document.getElementById('but-f-5').addEventListener('click', () => {
    gsap.to(window, { duration: getScrollDuration("#faq"), scrollTo: "#faq", ease: "power2.out" });
});
