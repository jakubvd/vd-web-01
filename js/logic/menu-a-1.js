// Select elements by their class names
const menuButton = document.querySelector('.menu-button');
const menuDiv = document.querySelector('.menu-div');

// Function to show the menu with GSAP animation
function showMenu() {
    gsap.to(menuDiv, { right: '0%', duration: 0.5, ease: 'power2.out' }); // Slide menu into view
}

// Function to hide the menu with GSAP animation
function hideMenu() {
    gsap.to(menuDiv, { right: '-20%', duration: 0.5, ease: 'power2.in' }); // Slide menu out of view
}

// Event listeners for hover functionality
menuButton.addEventListener('mouseenter', showMenu);
menuDiv.addEventListener('mouseenter', showMenu); // Keep menu visible when hovering over it

// Hide menu when mouse leaves both elements
menuButton.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!menuButton.matches(':hover') && !menuDiv.matches(':hover')) {
            hideMenu();
        }
    }, 100); // Small delay for smoother UX
});

menuDiv.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!menuButton.matches(':hover') && !menuDiv.matches(':hover')) {
            hideMenu();
        }
    }, 100); // Small delay for smoother UX
});
