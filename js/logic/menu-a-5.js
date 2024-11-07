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

// Function to show the menu with staggered animation
function showMenu() {
    gsap.to(menuDiv, { right: '0%', duration: 0.5, ease: 'power2.out' }); // Slide menu container into view

    // Stagger each menu link to slide in one by one
    gsap.fromTo(menuLinks, 
        { x: '100%', opacity: 0 },  // Start position: out of view (right)
        { 
            x: '0%',                  // End position: in view
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1              // Delay between each link
        }
    );
}

// Function to hide the menu with staggered reverse animation
function hideMenu() {
    // Stagger each menu link to slide out in reverse order
    gsap.to(menuLinks, 
        { 
            x: '100%',               // Move back out to the right
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            stagger: -0.1            // Negative stagger for reverse effect
        }
    );

    // Hide the entire menu container after links finish moving out
    gsap.to(menuDiv, { right: '-20%', duration: 0.5, delay: 0.5, ease: 'power2.in' });
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
