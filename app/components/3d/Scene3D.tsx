"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Single subtle background shape
function BackgroundShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slightly faster, still background-safe
    meshRef.current.rotation.y += 0.0012;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Soft geometric core */}
      <icosahedronGeometry args={[3.2, 0]} />
      <meshStandardMaterial
        color="#d4d4d8"
        transparent
        opacity={0.08}
        roughness={0.6}
        metalness={0.05}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Soft, neutral lighting */}
          <ambientLight intensity={0.45} />

          <directionalLight
            position={[6, 8, 6]}
            intensity={0.25}
            color="#ffffff"
          />

          <directionalLight
            position={[-6, -4, 4]}
            intensity={0.15}
            color="#a1a1aa"
          />

          <BackgroundShape />
        </Suspense>
      </Canvas>
    </div>
  );
}
