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
    duration: 0.8,         
    ease: 'sine.out'       
});
menuTimeline.fromTo(menuLinks, 
    { x: '100%', opacity: 0 },
    { 
        x: '0%',                  
        opacity: 1,
        duration: 0.4,            // Increased duration by 10% for slower appearance
        ease: 'sine.out',       
        stagger: 0.1              // Kept stagger for a gradual reveal
    },
    '-=0.6'
);

menuTimeline.eventCallback("onReverseComplete", () => {
    gsap.to(menuLinks, {
        x: '100%',                
        opacity: 0,
        duration: 0.4,            // Matched duration for reverse
        ease: 'sine.in',        
        stagger: -0.1             // Matched stagger for reverse order
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

// Helper function to calculate dynamic scroll duration based on distance
function getScrollDuration(target) {
    const currentScroll = window.scrollY;
    const targetOffset = document.querySelector(target).offsetTop;
    const distance = Math.abs(targetOffset - currentScroll);

    // Adjust the multiplier for slower scroll for far distances and faster for close distances
    let duration;
    if (distance > 2000) {
        duration = distance * 0.0012; // Increased multiplier for far distances
    } else if (distance > 1000) {
        duration = distance * 0.0009; // Moderate multiplier for medium distances
    } else {
        duration = distance * 0.0007; // Base multiplier for close distances
    }

    // Cap the duration between 0.3s (minimum) and 3.5s (maximum)
    return Math.min(Math.max(duration, 0.3), 3.5);
}

// Scroll-to-section functionality with adjusted duration and easing
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
