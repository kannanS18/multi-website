import React, { useState } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { Wrench, Activity, Sparkles, Building2, Phone, Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const setActiveVertical = useVerticalStore((state) => state.setActiveVertical);
  const isTransitioning = useVerticalStore((state) => state.isTransitioning);

  const theme = THEMES[activeVertical] || THEMES.car;

  const verticalNavItems = [
    { key: VERTICAL_KEYS.CAR, label: 'Supercar Atelier', icon: Wrench },
    { key: VERTICAL_KEYS.HOSPITAL, label: 'Medical Center', icon: Activity },
    { key: VERTICAL_KEYS.DENTAL, label: 'Dental Studio', icon: Sparkles },
    { key: VERTICAL_KEYS.REALESTATE, label: 'Luxury Realty', icon: Building2 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-theme-border/30 transition-all duration-700">
      {/* Top Hospital Emergency Utility Bar (only for hospital) */}
      {activeVertical === VERTICAL_KEYS.HOSPITAL && (
        <div className="bg-emerald-950/80 text-white text-[11px] font-mono py-1 px-4 flex items-center justify-between border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-semibold text-emerald-300">Level 1 Trauma Emergency Hotline:</span>
            <a href="tel:18006334227" className="underline hover:text-white font-bold">1-800-MEDICARE</a>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <span>Patient Portal Login</span>
            <span>•</span>
            <span>JCI Accredited Facility</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Dynamic Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/40 flex items-center justify-center shadow-lg group">
            {activeVertical === VERTICAL_KEYS.CAR && <Wrench className="w-5 h-5 text-theme-primary" />}
            {activeVertical === VERTICAL_KEYS.HOSPITAL && <Activity className="w-5 h-5 text-theme-primary" />}
            {activeVertical === VERTICAL_KEYS.DENTAL && <Sparkles className="w-5 h-5 text-theme-primary" />}
            {activeVertical === VERTICAL_KEYS.REALESTATE && <Building2 className="w-5 h-5 text-theme-primary" />}
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading tracking-wider text-theme-text flex items-center gap-1.5">
              <span>{theme.brandName}</span>
              {activeVertical === VERTICAL_KEYS.HOSPITAL && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-theme-primary/20 text-theme-primary border border-theme-primary/30">
                  HEALTH
                </span>
              )}
            </div>
            <div className="text-[10px] tracking-widest font-mono text-theme-text-muted uppercase">
              {theme.brandSubtitle}
            </div>
          </div>
        </div>

        {/* Central Vertical Switcher (The 4 Icons) */}
        <div className="hidden md:flex items-center p-1.5 rounded-2xl bg-black/20 backdrop-blur-md border border-theme-border/40 shadow-inner gap-1">
          {verticalNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeVertical === item.key;
            return (
              <button
                key={item.key}
                disabled={isTransitioning}
                onClick={() => setActiveVertical(item.key)}
                className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-heading font-semibold tracking-wider transition-all duration-500 ${
                  isActive
                    ? 'bg-theme-primary text-white shadow-[0_0_20px_var(--glow-color)] scale-105'
                    : 'text-theme-text-muted hover:text-theme-text hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-theme-text-muted'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${theme.buttonClass}`}
          >
            <span>
              {activeVertical === VERTICAL_KEYS.CAR && 'Commission Build'}
              {activeVertical === VERTICAL_KEYS.HOSPITAL && 'Book Consultation'}
              {activeVertical === VERTICAL_KEYS.DENTAL && 'Relaxing Visit'}
              {activeVertical === VERTICAL_KEYS.REALESTATE && 'Private Viewing'}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-theme-text hover:bg-white/10"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-theme-bg border-t border-theme-border/30 space-y-3">
          <div className="text-[11px] font-mono text-theme-text-muted tracking-widest uppercase mb-1">
            Select Service Domain:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {verticalNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeVertical === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveVertical(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-heading font-bold transition-all ${
                    isActive
                      ? 'bg-theme-primary text-white shadow-md'
                      : 'glass-panel text-theme-text hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className={`w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 ${theme.buttonClass}`}
            >
              <span>Book / Inquire Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
