document.addEventListener("DOMContentLoaded", function() {
    const containers = document.querySelectorAll('.webgl-bg');

    containers.forEach(container => {
        const scene = new THREE.Scene();
        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
        camera.position.z = 1.25;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const resizeObserver = new ResizeObserver(() => {
            const aspect = container.clientWidth / container.clientHeight;
            camera.left = -aspect;
            camera.right = aspect;
            camera.top = 1;
            camera.bottom = -1;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        resizeObserver.observe(container);

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float time;
            varying vec2 vUv;

            float random(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453 + time);
            }

            void main() {
                vec2 uv = vUv * 2.0;
                float n = random(uv);
                gl_FragColor = vec4(vec3(1.26 - n), 0.2);
            }
        `;

        const shaderMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: { time: { value: 0.0 } },
            transparent: true,
        });

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 2), shaderMaterial);
        scene.add(plane);

        function animate() {
            shaderMaterial.uniforms.time.value += 0.0013;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();
    });
});
