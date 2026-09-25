import React, { useState } from 'react';
import { useVerticalStore } from '../../store/useVerticalStore';
import { VERTICAL_KEYS } from '../../themes';
import { Sliders, RotateCw, Lightbulb, Sparkles, Shield, Sun, Moon, Sunset, Palette } from 'lucide-react';

export function CustomizerToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeVertical = useVerticalStore((state) => state.activeVertical);

  const carConfig = useVerticalStore((state) => state.carCustomizer);
  const updateCar = useVerticalStore((state) => state.updateCarCustomizer);

  const hospitalConfig = useVerticalStore((state) => state.hospitalCustomizer);
  const updateHospital = useVerticalStore((state) => state.updateHospitalCustomizer);

  const dentalConfig = useVerticalStore((state) => state.dentalCustomizer);
  const updateDental = useVerticalStore((state) => state.updateDentalCustomizer);

  const realEstateConfig = useVerticalStore((state) => state.realEstateCustomizer);
  const updateRealEstate = useVerticalStore((state) => state.updateRealEstateCustomizer);

  const carColors = [
    { name: 'Rosso Corsa', hex: '#FF4D00' },
    { name: 'Obsidian Black', hex: '#0D0E11' },
    { name: 'Electric Cyan', hex: '#00D9FF' },
    { name: 'Acid Green', hex: '#76FF03' },
    { name: 'Forged Gold', hex: '#D4AF37' },
    { name: 'Frozen Pearl', hex: '#F0F4F8' },
  ];

  return (
    <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-panel shadow-lg hover:border-theme-primary transition-all duration-300 group"
      >
        <Sliders className="w-4 h-4 text-theme-primary group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-xs font-semibold tracking-wider uppercase text-theme-text font-heading">
          3D Live Controls
        </span>
        <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
      </button>

      {/* Expanded Control Drawer */}
      {isOpen && (
        <div className="mt-3 p-5 rounded-2xl glass-panel shadow-2xl border border-theme-border w-80 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
            <span className="text-xs font-bold tracking-widest uppercase text-theme-primary font-heading">
              {activeVertical === VERTICAL_KEYS.CAR && 'Ferrari 458 Atelier'}
              {activeVertical === VERTICAL_KEYS.HOSPITAL && 'Medical Diagnostic Matrix'}
              {activeVertical === VERTICAL_KEYS.DENTAL && 'Tooth Anatomy & Laser'}
              {activeVertical === VERTICAL_KEYS.REALESTATE && 'Architectural Environment'}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-theme-text-muted hover:text-theme-text text-xs"
            >
              ✕
            </button>
          </div>

          {/* CAR CUSTOMIZER */}
          {activeVertical === VERTICAL_KEYS.CAR && (
            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-theme-text-muted uppercase block mb-1.5">
                  Bespoke Body Finish
                </label>
                <div className="flex gap-2">
                  {carColors.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => updateCar({ color: c.hex })}
                      title={c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        carConfig.color === c.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-theme-text-muted uppercase block mb-1.5">
                  Forged Rim Finish
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['gold', 'black', 'silver'].map((finish) => (
                    <button
                      key={finish}
                      onClick={() => updateCar({ wheelFinish: finish })}
                      className={`py-1 text-[11px] font-mono capitalize rounded-md border text-center transition-all ${
                        carConfig.wheelFinish === finish
                          ? 'border-theme-primary bg-theme-primary/20 text-theme-text font-bold'
                          : 'border-theme-border text-theme-text-muted hover:text-theme-text'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-theme-border/30">
                <span className="text-xs text-theme-text">Neon Underglow</span>
                <input
                  type="checkbox"
                  checked={carConfig.underglow}
                  onChange={(e) => updateCar({ underglow: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">LED Headlights</span>
                <input
                  type="checkbox"
                  checked={carConfig.headlights}
                  onChange={(e) => updateCar({ headlights: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Turntable Rotation</span>
                <input
                  type="checkbox"
                  checked={carConfig.autoRotate}
                  onChange={(e) => updateCar({ autoRotate: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* HOSPITAL CUSTOMIZER */}
          {activeVertical === VERTICAL_KEYS.HOSPITAL && (
            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-theme-text-muted uppercase block mb-1.5">
                  Diagnostic Target Scan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateHospital({ mode: 'molecular' })}
                    className={`py-1.5 text-xs font-heading font-semibold rounded-lg border text-center transition-all ${
                      hospitalConfig.mode === 'molecular'
                        ? 'border-theme-primary bg-theme-primary/20 text-theme-text font-bold'
                        : 'border-theme-border text-theme-text-muted'
                    }`}
                  >
                    🧬 Cellular DNA
                  </button>
                  <button
                    onClick={() => updateHospital({ mode: 'cranial' })}
                    className={`py-1.5 text-xs font-heading font-semibold rounded-lg border text-center transition-all ${
                      hospitalConfig.mode === 'cranial'
                        ? 'border-theme-primary bg-theme-primary/20 text-theme-text font-bold'
                        : 'border-theme-border text-theme-text-muted'
                    }`}
                  >
                    🧠 Cranial Scan
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-theme-border/30">
                <span className="text-xs text-theme-text">Active Laser Beam</span>
                <input
                  type="checkbox"
                  checked={hospitalConfig.scanBeam}
                  onChange={(e) => updateHospital({ scanBeam: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Diagnostic Wireframe</span>
                <input
                  type="checkbox"
                  checked={hospitalConfig.wireframe}
                  onChange={(e) => updateHospital({ wireframe: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Auto Rotate 360</span>
                <input
                  type="checkbox"
                  checked={hospitalConfig.autoRotate}
                  onChange={(e) => updateHospital({ autoRotate: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* DENTAL CUSTOMIZER */}
          {activeVertical === VERTICAL_KEYS.DENTAL && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text font-semibold">Whitening Enamel Glow</span>
                <input
                  type="checkbox"
                  checked={dentalConfig.whiteningGlow}
                  onChange={(e) => updateDental({ whiteningGlow: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Cold Laser Beam</span>
                <input
                  type="checkbox"
                  checked={dentalConfig.laserScan}
                  onChange={(e) => updateDental({ laserScan: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Orbiting Instruments</span>
                <input
                  type="checkbox"
                  checked={dentalConfig.orbitTools}
                  onChange={(e) => updateDental({ orbitTools: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Auto Rotate 360</span>
                <input
                  type="checkbox"
                  checked={dentalConfig.autoRotate}
                  onChange={(e) => updateDental({ autoRotate: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* REAL ESTATE CUSTOMIZER */}
          {activeVertical === VERTICAL_KEYS.REALESTATE && (
            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-theme-text-muted uppercase block mb-1.5">
                  Lighting & Time of Day
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'sunset', label: 'Sunset', icon: Sunset },
                    { id: 'night', label: 'Night', icon: Moon },
                    { id: 'day', label: 'Day', icon: Sun },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => updateRealEstate({ timeOfDay: t.id })}
                        className={`py-1.5 flex items-center justify-center gap-1 text-[11px] font-mono rounded-md border transition-all ${
                          realEstateConfig.timeOfDay === t.id
                            ? 'border-theme-primary bg-theme-primary/20 text-theme-text font-bold'
                            : 'border-theme-border text-theme-text-muted hover:text-theme-text'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-theme-border/30">
                <span className="text-xs text-theme-text">Interior Window Glow</span>
                <input
                  type="checkbox"
                  checked={realEstateConfig.interiorLights}
                  onChange={(e) => updateRealEstate({ interiorLights: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Golden Dust Particles</span>
                <input
                  type="checkbox"
                  checked={realEstateConfig.goldenHourParticles}
                  onChange={(e) => updateRealEstate({ goldenHourParticles: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-text">Architectural Turntable</span>
                <input
                  type="checkbox"
                  checked={realEstateConfig.autoRotate}
                  onChange={(e) => updateRealEstate({ autoRotate: e.target.checked })}
                  className="accent-theme-primary w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
