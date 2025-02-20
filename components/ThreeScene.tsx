import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
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
        // const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        // const geometry = new THREE.BufferGeometry();
        // const vertices = new Float32Array([
        //     -2.0, -2.0, 1.0, // Vertex 1
        //     1.0, -1.0, 1.0, // Vertex 2
        //     1.0, 1.0, 1.0, // Vertex 3
        //     -1.0, 1.0, 1.0, // Vertex 4
        //     // ... more vertices
        // ]);
        // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({ color: "#6969D7" });
        const cylinder = new THREE.Mesh(geometry, material);
        scene.add(cylinder);

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cylinder.rotation.x += 0.02;
            cylinder.rotation.y += 0.02;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup on component unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeScene;
