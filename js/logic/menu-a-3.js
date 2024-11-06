// Select elements by their class names
const menuButton = document.querySelector('.menu-button');
const menuDiv = document.querySelector('.menu-div');

// Function to show the menu with GSAP animation (quicker entrance)
function showMenu() {
    gsap.to(menuDiv, { right: '0%', duration: 1.0, ease: 'power2.out' }); // Slide menu into view
}

// Function to hide the menu with GSAP animation (slower exit)
function hideMenu() {
    gsap.to(menuDiv, { right: '-20%', duration: 1.0, ease: 'power2.in' }); // Slide menu out of view
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
