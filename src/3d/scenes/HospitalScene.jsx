import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useVerticalStore } from '../../store/useVerticalStore';

export function HospitalScene() {
  const groupRef = useRef();
  const scanRingRef = useRef();
  const dnaRef = useRef();
  const hospitalConfig = useVerticalStore((state) => state.hospitalCustomizer);

  // Load official Three.js anatomical head scan
  const { scene } = useGLTF('/models/LeePerrySmith.glb');
  const headModel = useMemo(() => scene.clone(true), [scene]);

  // Medical Holographic Material
  const medicalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0D9488'),
      emissive: new THREE.Color('#042F2E'),
      emissiveIntensity: 0.4,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.65,
      transparent: true,
      opacity: 0.85,
      wireframe: hospitalConfig.wireframe,
    });
  }, [hospitalConfig.wireframe]);

  // Apply material to head mesh
  useMemo(() => {
    headModel.traverse((child) => {
      if (child.isMesh) {
        child.material = medicalMaterial;
        child.castShadow = true;
      }
    });
  }, [headModel, medicalMaterial]);

  // Generate DNA Double Helix Nodes
  const dnaNodes = useMemo(() => {
    const nodes = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 4;
      const y = (i / count) * 4 - 2;
      const radius = 1.1;

      // Strand A
      nodes.push({
        posA: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        posB: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
      });
    }
    return nodes;
  }, []);

  // Floating Cellular / Nanomedicine Particles
  const cellParticleCount = 80;
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < cellParticleCount; i++) {
      arr.push({
        pos: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 + 0.5,
          (Math.random() - 0.5) * 6,
        ],
        scale: 0.04 + Math.random() * 0.06,
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return arr;
  }, []);

  // Animation Loop
  useFrame((state, delta) => {
    if (hospitalConfig.autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }

    // Laser scan ring vertical oscillation
    if (scanRingRef.current && hospitalConfig.scanBeam) {
      scanRingRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 1.2 + 0.3;
    }

    // DNA helix rotation
    if (dnaRef.current) {
      dnaRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Central Diagnostic Unit */}
      <group ref={groupRef}>
        {hospitalConfig.mode === 'cranial' ? (
          // 3D Cranial Neuronavigation Anatomy
          <group position={[0, 0.1, 0]}>
            <primitive object={headModel} scale={0.4} position={[0, -0.5, 0]} />
          </group>
        ) : (
          // Molecular / Cellular Diagnostics Core
          <group position={[0, 0.4, 0]}>
            {/* Core Nucleus Sphere */}
            <mesh>
              <sphereGeometry args={[0.9, 32, 32]} />
              <meshPhysicalMaterial
                color="#0D9488"
                roughness={0.15}
                transmission={0.7}
                thickness={1.5}
                emissive="#0F766E"
                emissiveIntensity={0.5}
                wireframe={hospitalConfig.wireframe}
              />
            </mesh>

            {/* Orbiting DNA Double Helix */}
            <group ref={dnaRef}>
              {dnaNodes.map((node, i) => (
                <group key={i}>
                  {/* Strand A base */}
                  <mesh position={node.posA}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial color="#0284C7" emissive="#0284C7" emissiveIntensity={0.6} />
                  </mesh>
                  {/* Strand B base */}
                  <mesh position={node.posB}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial color="#0D9488" emissive="#0D9488" emissiveIntensity={0.6} />
                  </mesh>
                  {/* Hydrogen base pair connection bar */}
                  {i % 2 === 0 && (
                    <line>
                      <bufferGeometry>
                        <bufferAttribute
                          attach="attributes-position"
                          count={2}
                          array={new Float32Array([...node.posA, ...node.posB])}
                          itemSize={3}
                        />
                      </bufferGeometry>
                      <lineBasicMaterial color="#38BDF8" transparent opacity={0.4} />
                    </line>
                  )}
                </group>
              ))}
            </group>
          </group>
        )}

        {/* Laser Scanning Ring Beam */}
        {hospitalConfig.scanBeam && (
          <group ref={scanRingRef} position={[0, 0.3, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.3, 1.38, 64]} />
              <meshBasicMaterial color="#38BDF8" side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>
            <pointLight color="#38BDF8" intensity={2.5} distance={2.5} />
          </group>
        )}
      </group>

      {/* Floating Nanomedicine / Cellular Biomarkers */}
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={p.pos}>
            <dodecahedronGeometry args={[p.scale, 0]} />
            <meshStandardMaterial
              color="#0D9488"
              emissive="#14B8A6"
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Pristine Clean Diagnostic Platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial
          color="#F1F5F9"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Medical Target Grid Rings */}
      <group position={[0, -0.89, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {[1.2, 2.2, 3.4].map((r, i) => (
          <mesh key={i}>
            <ringGeometry args={[r, r + 0.02, 64]} />
            <meshBasicMaterial color="#0D9488" transparent opacity={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

useGLTF.preload('/models/LeePerrySmith.glb');
