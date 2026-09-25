import React from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { Wrench, Activity, Sparkles, Building2, ShieldCheck, Heart, Award } from 'lucide-react';

export function FooterSection() {
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-12 border-t border-theme-border/30 bg-theme-bg text-theme-text transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/40 flex items-center justify-center text-theme-primary">
                {activeVertical === VERTICAL_KEYS.CAR && <Wrench className="w-5 h-5" />}
                {activeVertical === VERTICAL_KEYS.HOSPITAL && <Activity className="w-5 h-5" />}
                {activeVertical === VERTICAL_KEYS.DENTAL && <Sparkles className="w-5 h-5" />}
                {activeVertical === VERTICAL_KEYS.REALESTATE && <Building2 className="w-5 h-5" />}
              </div>
              <div className="text-2xl font-bold font-heading tracking-wider">
                {theme.brandName}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-theme-text-muted font-body leading-relaxed max-w-sm">
              {activeVertical === VERTICAL_KEYS.CAR &&
                'Bespoke supercar tuning, dyno calibration, and composite aerodynamic craftsmanship engineered for the track and the road.'}
              {activeVertical === VERTICAL_KEYS.HOSPITAL &&
                'JCI-accredited tertiary medical center uniting robotic surgical innovation, genomic oncology, and humanized patient care.'}
              {activeVertical === VERTICAL_KEYS.DENTAL &&
                'Spa-inspired gentle dental wellness studio designed to eliminate dental anxiety and deliver radiant, natural smiles.'}
              {activeVertical === VERTICAL_KEYS.REALESTATE &&
                'Representing architectural landmarks, coastal villas, and private reserve penthouses for generational global collectors.'}
            </p>

            {/* Accreditations Banner */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-theme-primary">
              <Award className="w-4 h-4" />
              <span>
                {activeVertical === VERTICAL_KEYS.CAR && 'FIA Homologated • SEMA Certified Atelier'}
                {activeVertical === VERTICAL_KEYS.HOSPITAL && 'Joint Commission Gold Seal • Magnet Recognition'}
                {activeVertical === VERTICAL_KEYS.DENTAL && 'ADA Member • Invisalign VIP Diamond Plus'}
                {activeVertical === VERTICAL_KEYS.REALESTATE && 'Global Architectural Real Estate Board'}
              </span>
            </div>
          </div>

          {/* Links Column 1: Services */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-theme-text mb-4">
              {activeVertical === VERTICAL_KEYS.CAR && 'Engineering'}
              {activeVertical === VERTICAL_KEYS.HOSPITAL && 'Specialties'}
              {activeVertical === VERTICAL_KEYS.DENTAL && 'Treatments'}
              {activeVertical === VERTICAL_KEYS.REALESTATE && 'Portfolio'}
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-text-muted">
              {activeVertical === VERTICAL_KEYS.CAR && (
                <>
                  <li className="hover:text-theme-primary cursor-pointer">ECU Dyno Tuning</li>
                  <li className="hover:text-theme-primary cursor-pointer">Inconel Exhausts</li>
                  <li className="hover:text-theme-primary cursor-pointer">Pre-Preg Carbon Fiber</li>
                  <li className="hover:text-theme-primary cursor-pointer">Forged Centerlocks</li>
                  <li className="hover:text-theme-primary cursor-pointer">PPF & Ceramic Armor</li>
                </>
              )}
              {activeVertical === VERTICAL_KEYS.HOSPITAL && (
                <>
                  <li className="hover:text-theme-primary cursor-pointer">Cardiology Institute</li>
                  <li className="hover:text-theme-primary cursor-pointer">Cranial Neurosciences</li>
                  <li className="hover:text-theme-primary cursor-pointer">Precision Oncology</li>
                  <li className="hover:text-theme-primary cursor-pointer">Level 1 Emergency</li>
                  <li className="hover:text-theme-primary cursor-pointer">Robotic Surgical Suites</li>
                </>
              )}
              {activeVertical === VERTICAL_KEYS.DENTAL && (
                <>
                  <li className="hover:text-theme-primary cursor-pointer">Laser Cold Whitening</li>
                  <li className="hover:text-theme-primary cursor-pointer">Invisalign Clear Aligners</li>
                  <li className="hover:text-theme-primary cursor-pointer">Porcelain Veneers</li>
                  <li className="hover:text-theme-primary cursor-pointer">Gentle Ultrasonic Clean</li>
                  <li className="hover:text-theme-primary cursor-pointer">Anxiety Sedation Care</li>
                </>
              )}
              {activeVertical === VERTICAL_KEYS.REALESTATE && (
                <>
                  <li className="hover:text-theme-primary cursor-pointer">Prime Acquisitions</li>
                  <li className="hover:text-theme-primary cursor-pointer">Private Dispositions</li>
                  <li className="hover:text-theme-primary cursor-pointer">Architectural Villas</li>
                  <li className="hover:text-theme-primary cursor-pointer">Sky Penthouses</li>
                  <li className="hover:text-theme-primary cursor-pointer">Family Office Advisory</li>
                </>
              )}
            </ul>
          </div>

          {/* Links Column 2: Client Access */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-theme-text mb-4">
              Client Access
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-text-muted">
              <li className="hover:text-theme-primary cursor-pointer">Client Portal / Telemetry</li>
              <li className="hover:text-theme-primary cursor-pointer">Schedule Consultation</li>
              <li className="hover:text-theme-primary cursor-pointer">Verify Certifications</li>
              <li className="hover:text-theme-primary cursor-pointer">Emergency Hotline</li>
              <li className="hover:text-theme-primary cursor-pointer">Privacy & HIPAA Policy</li>
            </ul>
          </div>

          {/* Links Column 3: Contact Summary */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-theme-text mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-theme-text-muted font-body">
              <p>24/7 Priority Dispatch</p>
              <p className="font-mono font-bold text-theme-primary text-sm">
                {activeVertical === VERTICAL_KEYS.CAR && '+44 20 8921 4400'}
                {activeVertical === VERTICAL_KEYS.HOSPITAL && '1-800-MEDICARE'}
                {activeVertical === VERTICAL_KEYS.DENTAL && '+1 (718) 390-2100'}
                {activeVertical === VERTICAL_KEYS.REALESTATE && '+1 (212) 890-7700'}
              </p>
              <p className="text-[11px] text-theme-text-muted/70 pt-2">
                Silverstone • Boston • New York • Dubai
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-theme-border/20 flex flex-col sm:flex-row items-center justify-between text-xs text-theme-text-muted gap-4">
          <div>
            © {currentYear} {theme.brandName} Group. All rights reserved. Powered by React + Three.js WebGL.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-theme-text cursor-pointer">Terms of Engagement</span>
            <span className="hover:text-theme-text cursor-pointer">Confidentiality</span>
            <span className="hover:text-theme-text cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
