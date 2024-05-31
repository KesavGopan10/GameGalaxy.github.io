import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './three.css'; // Make sure you have the appropriate CSS styles defined

const ThreeScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(360, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.5, 10);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setClearColor(0x00, 0); // Set clear color to white to match the div's background color

    const geometry = new THREE.BoxGeometry(4, 50, 7); // Changed geometry to BoxGeometry for a cube
    const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red material
    const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue material
    const materials = [material1, material2];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 6;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01; // No rotation on x-axis
      cube.rotation.y += 0.003; // Reduced rotation speed on y-axis
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className='glassmorphism-background'>
      <canvas ref={canvasRef} />
      <div className='cube'></div>
    </div>
  );
};

export default ThreeScene;
