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

// Observer to track visibility changes
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        console.log(`Mutation detected on ${mutation.target.id}:`, mutation);
    });
});
observer.observe(document.getElementById('menu-link-1'), { attributes: true, attributeFilter: ['style'] });

// Force repaint on hover to stabilize visibility
menuLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.willChange = 'transform, opacity';
        requestAnimationFrame(() => {
            link.style.opacity = 1;
            link.style.transform = 'translateZ(0)';
        });
    });
});

// Ensure key CSS properties are set on menu links in JavaScript
menuLinks.forEach(link => {
    link.style.display = 'flex';
    link.style.opacity = 1;
    link.style.transform = 'translateZ(0)';
    link.style.maxWidth = '100%';
    link.style.position = 'relative';
});

// Create a GSAP timeline for the menu animation
const menuTimeline = gsap.timeline({ paused: true, reversed: true, invalidateOnRefresh: true });

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
        duration: 0.4,
        ease: 'sine.out',       
        stagger: 0.1
    },
    '-=0.6'
);

menuTimeline.eventCallback("onComplete", () => {
    menuLinks.forEach(link => {
        console.log(`Link ${link.id} visibility: ${getComputedStyle(link).opacity}`);
    });
});

menuTimeline.eventCallback("onReverseComplete", () => {
    gsap.to(menuLinks, {
        x: '100%',                
        opacity: 0,
        duration: 0.4,
        ease: 'sine.in',        
        stagger: -0.1
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

    let duration;
    if (distance > 2000) {
        duration = distance * 0.0012;
    } else if (distance > 1000) {
        duration = distance * 0.0009;
    } else {
        duration = distance * 0.0007;
    }

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
