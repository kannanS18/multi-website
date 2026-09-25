import React, { useRef } from 'react';
import { useThemeApply } from './hooks/useThemeApply';
import { useVerticalStore } from './store/useVerticalStore';
import { THEMES } from './themes';
import { Navbar } from './components/Navbar';
import { SceneContainer } from './3d/SceneContainer';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { GallerySection } from './sections/GallerySection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';

export default function App() {
  // Apply dynamic CSS variables and typography classes
  useThemeApply();

  const isTransitioning = useVerticalStore((state) => state.isTransitioning);
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-700 relative selection:bg-theme-primary selection:text-white">
      {/* Fixed Navbar with 4-Vertical Morph Switcher */}
      <Navbar onOpenBooking={scrollToContact} />

      {/* Hero & 3D Interactive Stage */}
      <div className="relative pt-20">
        {/* Background Ambience / Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 -z-10 opacity-30"
          style={{ backgroundColor: theme.colors.primary }}
        />

        {/* Hero Copy Overlay */}
        <HeroSection onOpenBooking={scrollToContact} />

        {/* 3D Scene Viewport */}
        <div className="relative -mt-10 sm:-mt-16 z-10">
          <SceneContainer />
        </div>
      </div>

      {/* Services Section (4 unique designs) */}
      <ServicesSection onOpenBooking={scrollToContact} />

      {/* Gallery Showcase (4 unique designs including Before/After slider) */}
      <GallerySection onOpenBooking={scrollToContact} />

      {/* Testimonials (4 unique formats) */}
      <TestimonialsSection />

      {/* Direct Contact & Booking Section (4 unique forms with validation & confetti) */}
      <ContactSection />

      {/* Comprehensive Footer (4 unique domain accreditations) */}
      <FooterSection />

      {/* Full-Screen Morphing Dissolve Flash (Extra tactile feedback during transition) */}
      {isTransitioning && (
        <div
          className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-500 animate-pulse"
          style={{
            background: `radial-gradient(circle at center, ${theme.colors.primary}22 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
