document.addEventListener("DOMContentLoaded", function () {
    const objectsToLoad = [
        { className: '.obj-3d-cube', geometryType: 'cube' },
        { className: '.obj-3d-icosa', geometryType: 'icosahedron' },
        { className: '.obj-3d-octa', geometryType: 'octahedron' }
    ];

    function createGeometry(type) {
        switch (type) {
            case 'cube':
                return new THREE.BoxGeometry(1, 1, 1);
            case 'icosahedron':
                return new THREE.IcosahedronGeometry(1);
            case 'octahedron':
                return new THREE.OctahedronGeometry(1);
            default:
                console.error('Unknown geometry type');
                return null;
        }
    }

    function init3DObject(container, geometryType) {
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

        const geometry = createGeometry(geometryType);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({ color: 0x595958 });
        const mesh = new THREE.LineSegments(edges, material);

        scene.add(mesh);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.rotateSpeed = 0.15;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;

        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: null
        };

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
            mesh.rotation.x += targetRotationX;
            mesh.rotation.y += targetRotationY;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();
    }

    objectsToLoad.forEach(obj => {
        const containers = document.querySelectorAll(obj.className);
        containers.forEach(container => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        init3DObject(entry.target, obj.geometryType);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(container);
        });
    });
});
