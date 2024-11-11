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

// Create a GSAP timeline for the menu animation without altering CSS positioning
const menuTimeline = gsap.timeline({ paused: true, reversed: true, invalidateOnRefresh: true });
let menuDivDuration = window.innerWidth <= 478 ? 0.5 : 0.8;

// Define the animation sequence for menu entrance
menuTimeline.to(menuDiv, { 
    right: '0%', 
    duration: menuDivDuration, 
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

// Toggle menu function for mobile (991px and below)
function toggleMenu() {
    if (menuTimeline.reversed()) {
        menuTimeline.play();
    } else {
        menuTimeline.reverse();
    }
}

// Function to add event listeners based on viewport width
function applyMenuBehavior() {
    if (window.innerWidth <= 991) {
        // Remove hover listeners
        menuButton.removeEventListener('mouseenter', showMenu);
        menuDiv.removeEventListener('mouseenter', showMenu);
        menuButton.removeEventListener('mouseleave', handleMouseLeave);
        menuDiv.removeEventListener('mouseleave', handleMouseLeave);

        // Add click toggle for mobile/tablet viewports
        menuButton.addEventListener('click', toggleMenu);

        // Close menu when clicking outside menu-button or menu-div
        document.addEventListener('click', (event) => {
            const isOutsideMenu = !menuDiv.contains(event.target) && !menuButton.contains(event.target);
            if (isOutsideMenu && !menuTimeline.reversed()) {
                hideMenu();
            }
        });
    } else {
        // Remove mobile click listener
        menuButton.removeEventListener('click', toggleMenu);

        // Apply desktop hover listeners
        menuButton.addEventListener('mouseenter', showMenu);
        menuDiv.addEventListener('mouseenter', showMenu);
        menuButton.addEventListener('mouseleave', handleMouseLeave);
        menuDiv.addEventListener('mouseleave', handleMouseLeave);
    }
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

// Call once initially and then again on resize
applyMenuBehavior();
window.addEventListener('resize', applyMenuBehavior);
