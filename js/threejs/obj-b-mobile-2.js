document.addEventListener("DOMContentLoaded", function() {
    // Select only elements with obj-b-mobile
    const svgContainers = document.querySelectorAll('.obj-b-mobile');

    svgContainers.forEach(svgContainer => {
        let hasLoaded = false; // To track if the 3D object has already been loaded

        function load3DObject() {
            if (hasLoaded) return; // Skip if it's already loaded

            // Create the scene and other 3D components
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, svgContainer.clientWidth / svgContainer.clientHeight, 0.1, 1000);
            camera.position.z = 45;

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(svgContainer.clientWidth, svgContainer.clientHeight);
            svgContainer.appendChild(renderer.domElement);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            scene.add(directionalLight);
            scene.add(new THREE.AmbientLight(0x505050));

            const loader = new THREE.SVGLoader();
            loader.load('https://cdn.prod.website-files.com/670da08b0c9f472a36a20581/670da08b0c9f472a36a206ad_des-b1-up-svg.svg', function(data) {
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

                // Orbit Controls
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

                window.addEventListener('resize', () => {
                    const width = svgContainer.clientWidth;
                    const height = svgContainer.clientHeight;
                    renderer.setSize(width, height);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                });
            });

            hasLoaded = true; // Mark the 3D object as loaded
        }

        // Function to check if the element is in the viewport
        function isInViewport() {
            const rect = svgContainer.getBoundingClientRect();
            return rect.top <= window.innerHeight && rect.bottom >= 0;
        }

        // Scroll event listener to load the 3D object when it is in view
        window.addEventListener('scroll', function() {
            if (isInViewport() && !hasLoaded) {
                load3DObject();
            }
        });

        // Check on load if already in view
        if (isInViewport()) {
            load3DObject();
        }
    });
});
