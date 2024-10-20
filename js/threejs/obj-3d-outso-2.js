document.addEventListener("DOMContentLoaded", function () {
    const svgContainers = document.querySelectorAll('.obj-3d-services.is-D');

    svgContainers.forEach(svgContainer => {
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
        loader.load('https://cdn.prod.website-files.com/670da08b0c9f472a36a20581/670da08b0c9f472a36a20634_out-b1-svg.svg', function (data) {
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

            // Update on resize to fix aspect ratio and scaling issues
            function onResize() {
                const width = svgContainer.clientWidth;
                const height = svgContainer.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }

            // Ensure canvas and camera resize properly when changing orientation or viewport size
            window.addEventListener('resize', onResize);

            function animate() {
                requestAnimationFrame(animate);
                pivot.rotation.y += 0.009; // Rotate the object around its own vertical axis
                renderer.render(scene, camera);
            }
            animate();
        });
    });
});
