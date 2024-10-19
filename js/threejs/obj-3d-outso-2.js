document.addEventListener("DOMContentLoaded", function() {
    // Select only elements with both 'obj-3d-services' and 'is-D' classes
    const svgContainers = document.querySelectorAll('.obj-3d-services.is-D');

    svgContainers.forEach(svgContainer => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, svgContainer.clientWidth / svgContainer.clientHeight, 0.1, 1000);
        camera.position.z = 45;

        // Initialize the WebGLRenderer with red background color, disable alpha transparency
        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
        renderer.setSize(svgContainer.clientWidth, svgContainer.clientHeight);
        renderer.setClearColor(0xff0000, 1); // Set background color to red (hex: #ff0000) and opacity to 1 (opaque)
        svgContainer.appendChild(renderer.domElement);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        scene.add(directionalLight);
        scene.add(new THREE.AmbientLight(0x505050));

        const loader = new THREE.SVGLoader();
        loader.load('https://cdn.prod.website-files.com/670da08b0c9f472a36a20581/670da08b0c9f472a36a20634_out-b1-svg.svg', function(data) {
            const paths = data.paths;
            const group = new THREE.Group();
            group.scale.multiplyScalar(0.1);
            group.scale.y *= 1.25;

            const material = new THREE.MeshStandardMaterial({
                color: 0x131211,
                metalness: 0.5,
                roughness: 0.5,
                opacity: 1,
                transparent: true
            });

            paths.forEach((path) => {
                const shapes = path.toShapes(true);
                shapes.forEach((shape) => {
                    const geometry = new THREE.ExtrudeGeometry(shape, {
                        depth: 30,
                        bevelEnabled: true,
                        bevelThickness: 5,
                        bevelSize: 5,
                        bevelSegments: 8,
                    });

                    const mesh = new THREE.Mesh(geometry, material.clone());
                    group.add(mesh);
                });
            });

            const box = new THREE.Box3().setFromObject(group);
            const center = box.getCenter(new THREE.Vector3());
            group.position.x = -center.x;
            group.position.y = -center.y;
            group.position.z = -center.z;

            const pivot = new THREE.Group();
            scene.add(pivot);
            pivot.add(group);

            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.rotateSpeed = 0.2;
            controls.minPolarAngle = Math.PI / 2;
            controls.maxPolarAngle = Math.PI / 2;

            function animate() {
                requestAnimationFrame(animate);
                pivot.rotation.y += 0.009;
                controls.update();
                renderer.render(scene, camera);
            }
            animate();

            function adjustViewport() {
                const width = svgContainer.clientWidth;
                const height = svgContainer.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;

                if (window.innerWidth <= 478) {
                    camera.fov = 85;
                } else {
                    camera.fov = 75;
                }
                camera.updateProjectionMatrix();

                const box = new THREE.Box3().setFromObject(group);
                const center = box.getCenter(new THREE.Vector3());
                group.position.x = -center.x;
                group.position.y = -center.y;
                group.position.z = -center.z;
            }

            adjustViewport(); // Adjust right after setup

            window.addEventListener('resize', adjustViewport);
            window.addEventListener('orientationchange', adjustViewport);
        });
    });
});
