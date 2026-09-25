import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { carData } from '../data/carData';
import { hospitalData } from '../data/hospitalData';
import { dentalData } from '../data/dentalData';
import { realEstateData } from '../data/realEstateData';
import { ArrowRight, ChevronDown, CheckCircle2, ShieldCheck, Star } from 'lucide-react';

export function HeroSection({ onOpenBooking, onExplore3D }) {
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  const contentMap = {
    [VERTICAL_KEYS.CAR]: carData.hero,
    [VERTICAL_KEYS.HOSPITAL]: hospitalData.hero,
    [VERTICAL_KEYS.DENTAL]: dentalData.hero,
    [VERTICAL_KEYS.REALESTATE]: realEstateData.hero,
  };

  const heroData = contentMap[activeVertical];

  return (
    <div className="relative pt-24 pb-8 sm:pt-28 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVertical}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          {/* Top Industry Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono font-semibold tracking-wider text-theme-primary mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
            <span>{heroData.badge}</span>
          </div>

          {/* Dynamic Headlines */}
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-theme-text uppercase leading-none drop-shadow-sm">
              <span className="block">{heroData.titleLine1}</span>
              <span className="block theme-gradient-text mt-1">{heroData.titleLine2}</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-theme-text-muted max-w-2xl font-body leading-relaxed">
              {heroData.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className={`px-8 py-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase flex items-center gap-3 transition-all duration-300 shadow-xl ${theme.buttonClass}`}
              >
                <span>{heroData.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const servicesEl = document.getElementById('services-section');
                  if (servicesEl) servicesEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase glass-panel text-theme-text hover:border-theme-primary/80 transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Services</span>
                <ChevronDown className="w-4 h-4 text-theme-primary" />
              </button>
            </div>

            {/* Live Metrics Grid */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-theme-border/30 max-w-3xl">
              {heroData.metrics.map((metric, i) => (
                <div key={i} className="text-left">
                  <div className="text-2xl sm:text-3xl font-bold font-heading text-theme-text">
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase text-theme-text-muted tracking-wider mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
