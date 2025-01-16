import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCursorCube = () => {
    const mountRef: any = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Cube setup
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: "#6969D7" });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 3;

        let mouseX = 0;
        let mouseY = 0;
        const onMouseMove = (event: any) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate cube based on mouse position
            cube.rotation.x = mouseY * Math.PI;
            cube.rotation.y = mouseX * Math.PI;

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeCursorCube;
