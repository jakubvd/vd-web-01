document.addEventListener("DOMContentLoaded", function() {
    const containers = document.querySelectorAll('.obj-3d-octa'); // Select all elements with the class 'obj-3d-octa'

    // Only run the code for viewports 992px or wider
    if (window.innerWidth >= 992) {
        containers.forEach(container => {

            function initOctahedronScene(container) {
                if (typeof THREE === 'undefined' || typeof THREE.OrbitControls === 'undefined') {
                    console.error('Three.js or OrbitControls not loaded.');
                    return;
                }

                const scene = new THREE.Scene();
                const aspect = container.clientWidth / container.clientHeight;
                const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
                camera.position.z = 2.5;

                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(renderer.domElement);

                // Create Octahedron Geometry
                const geometry = new THREE.OctahedronGeometry(1);
                const edges = new THREE.EdgesGeometry(geometry);
                const material = new THREE.LineBasicMaterial({ color: 0x595958 });
                const octahedron = new THREE.LineSegments(edges, material);

                scene.add(octahedron);

                const controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableZoom = false;
                controls.rotateSpeed = 0.15;
                controls.enableDamping = true;
                controls.dampingFactor = 0.1;

                // Disable right-click rotation but keep left-click rotation
                controls.mouseButtons = {
                    LEFT: THREE.MOUSE.ROTATE,
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: null
                };

                // Keep the native automatic spin speed
                let targetRotationX = 0.0025;
                let targetRotationY = 0.0025;

                function onResize() {
                    const aspect = container.clientWidth / container.clientHeight;
                    camera.aspect = aspect;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.clientWidth, container.clientHeight);
                }
                window.addEventListener('resize', onResize);

                function animate() {
                    controls.update();

                    // Continuous native spinning
                    octahedron.rotation.x += targetRotationX;
                    octahedron.rotation.y += targetRotationY;

                    renderer.render(scene, camera);
                    requestAnimationFrame(animate);
                }

                animate();
            }

            const options = {
                root: null,
                rootMargin: '10px 0px 10px 0px',
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        initOctahedronScene(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            observer.observe(container);
        });
    }
});
