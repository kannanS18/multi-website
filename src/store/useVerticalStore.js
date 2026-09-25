import { create } from 'zustand';
import { VERTICAL_KEYS } from '../themes';

export const useVerticalStore = create((set, get) => ({
  activeVertical: VERTICAL_KEYS.CAR,
  previousVertical: null,
  isTransitioning: false,
  transitionProgress: 0,
  
  // Customizer controls for 3D elements
  carCustomizer: {
    color: '#FF4D00',
    wheelFinish: 'gold', // 'gold' | 'black' | 'silver'
    underglow: true,
    headlights: true,
    autoRotate: true,
  },

  hospitalCustomizer: {
    mode: 'molecular', // 'molecular' | 'cranial'
    pulseIntensity: 1.2,
    scanBeam: true,
    wireframe: false,
    autoRotate: true,
  },

  dentalCustomizer: {
    whiteningGlow: true,
    sparkleIntensity: 2.0,
    orbitTools: true,
    laserScan: true,
    autoRotate: true,
  },

  realEstateCustomizer: {
    timeOfDay: 'sunset', // 'sunset' | 'night' | 'day'
    interiorLights: true,
    goldenHourParticles: true,
    autoRotate: true,
  },

  // Actions
  setActiveVertical: (verticalKey) => {
    const current = get().activeVertical;
    if (current === verticalKey || get().isTransitioning) return;

    set({
      previousVertical: current,
      activeVertical: verticalKey,
      isTransitioning: true,
      transitionProgress: 0,
    });

    // Animate transition progress
    let start = performance.now();
    const duration = 1200; // 1.2s smooth dissolve morph

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      set({ transitionProgress: progress });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        set({
          isTransitioning: false,
          previousVertical: null,
          transitionProgress: 1,
        });
      }
    };
    requestAnimationFrame(step);
  },

  updateCarCustomizer: (partial) =>
    set((state) => ({ carCustomizer: { ...state.carCustomizer, ...partial } })),

  updateHospitalCustomizer: (partial) =>
    set((state) => ({ hospitalCustomizer: { ...state.hospitalCustomizer, ...partial } })),

  updateDentalCustomizer: (partial) =>
    set((state) => ({ dentalCustomizer: { ...state.dentalCustomizer, ...partial } })),

  updateRealEstateCustomizer: (partial) =>
    set((state) => ({ realEstateCustomizer: { ...state.realEstateCustomizer, ...partial } })),
}));
