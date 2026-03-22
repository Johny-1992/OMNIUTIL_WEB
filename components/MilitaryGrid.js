"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// Animated grid plane with pulse effect
function GridPlane() {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
      gridRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const gridLines = useMemo(() => {
    const lines = [];
    const size = 40;
    const divisions = 20;
    const step = size / divisions;
    
    for (let i = -size / 2; i <= size / 2; i += step) {
      // Horizontal lines
      lines.push([[i, 0, -size / 2], [i, 0, size / 2]]);
      // Vertical lines
      lines.push([[-size / 2, 0, i], [size / 2, 0, i]]);
    }
    return lines;
  }, []);

  return (
    <group ref={gridRef}>
      {gridLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#06b6d4"
          lineWidth={0.5}
          transparent
          opacity={0.15 + Math.sin(i * 0.5) * 0.05}
        />
      ))}
    </group>
  );
}

// Satellite connection beam
function SatelliteBeam() {
  const beamRef = useRef();
  
  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 5, -10]}>
      <coneGeometry args={[3, 15, 32, 1, true]} />
      <meshBasicMaterial 
        color="#06b6d4" 
        transparent 
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating data nodes representing network connections
function DataNode({ position, delay = 0 }) {
  const nodeRef = useRef();
  
  useFrame((state) => {
    if (nodeRef.current) {
      const t = state.clock.elapsedTime + delay;
      nodeRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
      nodeRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={nodeRef} position={position}>
        <mesh>
          <octahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
        </mesh>
        <mesh scale={1.5}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} wireframe />
        </mesh>
      </group>
    </Float>
  );
}

// Washington marker with pulsing effect
function WashingtonMarker() {
  const markerRef = useRef();
  const ringRef = useRef();
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.scale.x = ringRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      ringRef.current.material.opacity = 0.3 - Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={[8, -1, -5]}>
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        IAD1
      </Text>
    </group>
  );
}

// Orbiting satellite
function OrbitingSatellite() {
  const satRef = useRef();
  
  useFrame((state) => {
    if (satRef.current) {
      const t = state.clock.elapsedTime * 0.2;
      satRef.current.position.x = Math.cos(t) * 12;
      satRef.current.position.z = Math.sin(t) * 8 - 5;
      satRef.current.position.y = 6 + Math.sin(t * 2) * 0.5;
      satRef.current.rotation.y = t;
    }
  });

  return (
    <group ref={satRef}>
      <mesh>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Particle system for ambient atmosphere
function Particles() {
  const particlesRef = useRef();
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#06b6d4" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <GridPlane />
      <SatelliteBeam />
      <OrbitingSatellite />
      <WashingtonMarker />
      <Particles />
      
      {/* Data nodes representing network connections */}
      <DataNode position={[-5, 0, -8]} delay={0} />
      <DataNode position={[3, 1, -12]} delay={1} />
      <DataNode position={[-8, 0.5, -4]} delay={2} />
      <DataNode position={[6, 0.3, -6]} delay={0.5} />
      <DataNode position={[-3, 0.8, -15]} delay={1.5} />
    </>
  );
}

export default function MilitaryGrid() {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-[#010409]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#010409]/50 via-transparent to-[#010409]/50 pointer-events-none" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line pointer-events-none" />
      
      {/* Subtle noise overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
