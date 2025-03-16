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

// Create a GSAP timeline for the menu animation
const menuTimeline = gsap.timeline({ paused: true, reversed: true });

// Define the animation sequence for menu entrance
menuTimeline.to(menuDiv, { 
    right: '0px', 
    duration: window.innerWidth <= 478 ? 0.5 : 0.8, 
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

// Show and hide functions
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

// Toggle function for mobile menu open/close on click
function toggleMenu() {
    if (menuTimeline.reversed()) {
        menuTimeline.play();
    } else {
        menuTimeline.reverse();
    }
}

// Apply different behavior based on viewport size
function applyMenuBehavior() {
    const isMobile = window.innerWidth <= 991;

    // Reset event listeners to avoid duplicates
    menuButton.removeEventListener('mouseenter', showMenu);
    menuDiv.removeEventListener('mouseenter', showMenu);
    menuButton.removeEventListener('mouseleave', hideMenu);
    menuDiv.removeEventListener('mouseleave', hideMenu);
    menuButton.removeEventListener('click', toggleMenu);
    document.removeEventListener('click', handleOutsideClick);

    if (isMobile) {
        // Mobile: Toggle menu on button click
        menuButton.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', hideMenu);
        });

        // Close menu if clicking outside
        document.addEventListener('click', handleOutsideClick);
    } else {
        // Desktop: Show menu on hover
        menuButton.addEventListener('mouseenter', showMenu);
        menuDiv.addEventListener('mouseenter', showMenu);
        menuButton.addEventListener('mouseleave', hideMenu);
        menuDiv.addEventListener('mouseleave', hideMenu);

        // Remove click-to-close for desktop
        menuLinks.forEach(link => {
            link.removeEventListener('click', hideMenu);
        });
    }
}

// Handle click outside menu to close it on mobile
function handleOutsideClick(event) {
    const isOutsideMenu = !menuDiv.contains(event.target) && !menuButton.contains(event.target);
    if (isOutsideMenu && !menuTimeline.reversed()) {
        hideMenu();
    }
}

// Initial call to set behavior based on current viewport
applyMenuBehavior();

// Reapply behavior on window resize to adjust based on viewport width changes
window.addEventListener('resize', applyMenuBehavior);

// Scroll-to-section functionality with adjusted duration and easing for menu links
menuLinks.forEach((link, index) => {
    const sectionIds = ["#service", "#technology", "#process", "#contact", "#faq"];
    link.addEventListener('click', () => {
        gsap.to(window, { duration: getScrollDuration(sectionIds[index]), scrollTo: sectionIds[index], ease: "power2.out" });
    });
});

// Helper function to calculate dynamic scroll duration based on distance
function getScrollDuration(target) {
    const currentScroll = window.scrollY;
    const targetOffset = document.querySelector(target).offsetTop;
    const distance = Math.abs(targetOffset - currentScroll);

    return Math.min(Math.max(distance * 0.0009, 0.8), 2.5); // Adjusted for smoother scrolling
}

// Additional scroll-to functionality for other buttons
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
