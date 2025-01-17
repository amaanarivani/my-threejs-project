import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCursorImage() {
    const mountRef: any = useRef(null);

    useEffect(() => {
        // Set up the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Load the texture (image file)
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('https://static.vecteezy.com/system/resources/previews/035/489/926/non_2x/ai-generated-bear-face-clipart-design-illustration-free-png.png'); // Replace with your image path

        // Create a plane geometry and apply the texture
        const geometry = new THREE.PlaneGeometry(2, 2); // Width, Height
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        camera.position.z = 5;

        // Mouse movement tracking
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

            // Move the plane based on mouse position
            plane.rotation.x = mouseY * Math.PI * 0.1;
            plane.rotation.y = mouseX * Math.PI * 0.1;

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
}