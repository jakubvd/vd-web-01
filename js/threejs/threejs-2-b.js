document.addEventListener("DOMContentLoaded", function () {
    const objectsConfig = [
        {
            className: '.obj-a-mobile',
            svgPath: 'https://cdn.prod.website-files.com/670ad0d1afb3192c7dfff38c/670ad0d1afb3192c7dfff486_dev-b1-svg.svg',
            scale: 0.1,
            color: 0x131211,
        },
        {
            className: '.obj-b-mobile',
            svgPath: 'https://cdn.prod.website-files.com/670da08b0c9f472a36a20581/670da08b0c9f472a36a206ad_des-b1-up-svg.svg',
            scale: 0.1,
            color: 0x131211,
        },
        {
            className: '.obj-c-mobile',
            svgPath: 'https://cdn.prod.website-files.com/671432984c4141713295f3e9/67158ce7b37a32f88f072114_maint-b2-4.svg',
            scale: 0.098,
            color: 0x131211,
        },
        {
            className: '.obj-d-mobile',
            svgPath: 'https://cdn.prod.website-files.com/671fe555f2f51c189f2cc584/67cf70778f5995fe1b39abe6_visiondevs%20logo%20-%202.2.svg',
            scale: 0.1,
            color: 0x131211,
        },
    ];

    function load3DObject(container, config) {
        const { svgPath, scale, color } = config;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 45;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        scene.add(directionalLight);
        scene.add(new THREE.AmbientLight(0x505050));

        const loader = new THREE.SVGLoader();
        loader.load(svgPath, function (data) {
            const group = new THREE.Group();
            group.scale.multiplyScalar(scale);
            group.scale.y *= 1.25;

            const material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.5,
                roughness: 0.5,
                opacity: 1,
                transparent: true,
            });

            data.paths.forEach((path) => {
                const shapes = path.toShapes(true);
                shapes.forEach((shape) => {
                    const geometry = new THREE.ExtrudeGeometry(shape, {
                        depth: 30,
                        bevelEnabled: true,
                        bevelThickness: 8,
                        bevelSize: 6,
                        bevelSegments: 10,
                    });
                    const mesh = new THREE.Mesh(geometry, material.clone());
                    group.add(mesh);
                });
            });

            const box = new THREE.Box3().setFromObject(group);
            const center = box.getCenter(new THREE.Vector3());
            group.position.set(-center.x, -center.y, -center.z);

            const pivot = new THREE.Group();
            scene.add(pivot);
            pivot.add(group);

            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.rotateSpeed = 0.1;
            controls.minPolarAngle = Math.PI / 2;
            controls.maxPolarAngle = Math.PI / 2;

            function animate() {
                pivot.rotation.y += 0.005;
                controls.update();
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
            animate();

            window.addEventListener('resize', () => {
                const width = container.clientWidth;
                const height = container.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            });
        });
    }

    objectsConfig.forEach((config) => {
        const containers = document.querySelectorAll(config.className);
        containers.forEach(container => {
            let hasLoaded = false;

            function isInViewport() {
                const rect = container.getBoundingClientRect();
                return rect.top <= window.innerHeight && rect.bottom >= 0;
            }

            function onScroll() {
                if (isInViewport() && !hasLoaded) {
                    load3DObject(container, config);
                    hasLoaded = true;
                    window.removeEventListener('scroll', onScroll);
                }
            }

            window.addEventListener('scroll', onScroll);
            if (isInViewport()) onScroll();
        });
    });
});
