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
menuTimeline.to(menuDiv, { right: '0%', duration: 0.5, ease: 'power2.out' });
menuTimeline.fromTo(menuLinks, 
    { x: '100%', opacity: 0 },
    { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
    '-=0.5' // Sync start of links with menuDiv animation
);

// Function to show the menu by playing the timeline forward
function showMenu() {
    if (menuTimeline.reversed()) {
        menuTimeline.play(); // Play the timeline forward if it's reversed
    }
}

// Function to hide the menu by reversing the timeline
function hideMenu() {
    if (!menuTimeline.reversed()) {
        menuTimeline.reverse(); // Reverse the timeline if it's currently playing forward
    }
}

// Helper function to handle mouse leave with delay
function handleMouseLeave() {
    setTimeout(() => {
        if (!menuButton.matches(':hover') && !menuDiv.matches(':hover')) {
            hideMenu();
        }
    }, 100); // Adjusted delay for smoother UX
}

// Event listeners for hover functionality
menuButton.addEventListener('mouseenter', showMenu);
menuDiv.addEventListener('mouseenter', showMenu); // Keep menu visible when hovering over it

// Use the helper function for mouse leave on both elements
menuButton.addEventListener('mouseleave', handleMouseLeave);
menuDiv.addEventListener('mouseleave', handleMouseLeave);
