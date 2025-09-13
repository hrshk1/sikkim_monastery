"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model(props: any) {
  // Corrected the URL to a .glb 3D model file
  const { scene } = useGLTF('https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/dharmawheel.glb');
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return <primitive object={scene} ref={meshRef} {...props} />;
}

export default function ThreeDScene() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model position={[0, -1, 0]} scale={[2, 2, 2]} />
    </Canvas>
  );
}