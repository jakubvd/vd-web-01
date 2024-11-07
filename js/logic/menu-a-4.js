// Select elements by their class names
const menuButton = document.querySelector('.menu-button');
const menuDiv = document.querySelector('.menu-div');

// Check if we're in the desktop range (992px to 1920px)
function isDesktop() {
    const width = window.innerWidth;
    return width >= 992 && width <= 1920;
}

// Function to show the menu with GSAP animation
function showMenu() {
    if (isDesktop()) {
        gsap.to(menuDiv, { right: '0%', duration: 1.0, ease: 'power2.out' }); // Slide menu into view
        console.log('Menu shown'); // Debug: Confirm function runs on desktop breakpoints
    }
}

// Function to hide the menu with GSAP animation
function hideMenu() {
    if (isDesktop()) {
        gsap.to(menuDiv, { right: '-20%', duration: 1.0, ease: 'power2.in' }); // Slide menu out of view
        console.log('Menu hidden'); // Debug: Confirm function runs on desktop breakpoints
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
