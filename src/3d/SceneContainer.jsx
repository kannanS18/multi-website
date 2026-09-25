import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { CarScene } from './scenes/CarScene';
import { HospitalScene } from './scenes/HospitalScene';
import { DentalScene } from './scenes/DentalScene';
import { RealEstateScene } from './scenes/RealEstateScene';
import { TransitionShader } from './TransitionShader';
import { CustomizerToolbar } from './components/CustomizerToolbar';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 p-4 rounded-xl glass-panel shadow-2xl">
        <div className="w-8 h-8 border-2 border-theme-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase text-theme-text font-bold">
          Synthesizing 3D Geometry...
        </span>
      </div>
    </Html>
  );
}

// Dynamic Camera Controller on theme switch
function CameraRig({ activeVertical }) {
  const controlsRef = useRef();

  useEffect(() => {
    if (!controlsRef.current) return;

    if (activeVertical === VERTICAL_KEYS.CAR) {
      controlsRef.current.target.set(0, 0.2, 0);
    } else if (activeVertical === VERTICAL_KEYS.HOSPITAL) {
      controlsRef.current.target.set(0, 0.2, 0);
    } else if (activeVertical === VERTICAL_KEYS.DENTAL) {
      controlsRef.current.target.set(0, 0.1, 0);
    } else if (activeVertical === VERTICAL_KEYS.REALESTATE) {
      controlsRef.current.target.set(0, 0.8, 0);
    }
  }, [activeVertical]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={2.2}
      maxDistance={8.5}
      maxPolarAngle={Math.PI / 2 - 0.05} // Don't dip below floor
      dampingFactor={0.05}
    />
  );
}

export function SceneContainer() {
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  return (
    <div className="relative w-full h-[650px] md:h-[750px] lg:h-[820px] overflow-hidden select-none">
      <Canvas
        shadows
        camera={{ position: [3.8, 2.2, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<Loader />}>
          {/* Environment Lighting based on vertical */}
          <Environment preset={theme.envPreset} environmentIntensity={0.6} />

          {/* Ambient & Key Lights */}
          <ambientLight intensity={theme.lightIntensity * 0.5} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={theme.lightIntensity}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* 3D Scene Components */}
          {activeVertical === VERTICAL_KEYS.CAR && <CarScene />}
          {activeVertical === VERTICAL_KEYS.HOSPITAL && <HospitalScene />}
          {activeVertical === VERTICAL_KEYS.DENTAL && <DentalScene />}
          {activeVertical === VERTICAL_KEYS.REALESTATE && <RealEstateScene />}

          {/* Transition Plane */}
          <TransitionShader />

          {/* Camera Orbit Rig */}
          <CameraRig activeVertical={activeVertical} />
        </Suspense>
      </Canvas>

      {/* 3D Floating Live Controls Toolbar */}
      <CustomizerToolbar />

      {/* Subtle Bottom Vignette Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-theme-bg to-transparent pointer-events-none" />
    </div>
  );
}
