import { useState } from 'react';
import { VEHICLE_DATABASE, CANADIAN_PROVINCES } from './data';
import { VehicleSpec } from './types';
import HeroSection from './components/HeroSection';
import TelemetryAuditor from './components/TelemetryAuditor';
import ExecutiveOverview from './components/ExecutiveOverview';
import VehicleReadinessTable from './components/VehicleReadinessTable';
import PrivacySecurityAssessment from './components/PrivacySecurityAssessment';
import CompatibilityScorecard from './components/CompatibilityScorecard';
import ProductEngineeringShowcase from './components/ProductEngineeringShowcase';
import DeliveryTimeline from './components/DeliveryTimeline';
import FooterSection from './components/FooterSection';
import { ShieldCheck, Heart, AlertCircle, Sparkles, MapPin, Printer } from 'lucide-react';

export default function AstrateqReport() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSpec>(VEHICLE_DATABASE[0]);
  const [selectedProvince, setSelectedProvince] = useState<string>('ON');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const activeProvinceName = CANADIAN_PROVINCES.find((p) => p.code === selectedProvince)?.name || 'Ontario';

  const triggerNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handlePrint = () => {
    triggerNotification('Preparing Diagnostic Report for printing...', 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        triggerNotification(`Report Certificate URL copied to clipboard! Share with confidence.`, 'success');
      })
      .catch(() => {
        triggerNotification('Unable to copy URL. Please copy it from your address bar.', 'error');
      });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8F9FA] font-sans antialiased selection:bg-cyan-500 selection:text-slate-900 scroll-smooth">
      
      {/* Dynamic Notifications Banner top level */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 max-w-sm w-full bg-[#131D2E] border border-slate-700/80 rounded-xl p-4 shadow-2xl flex items-start gap-3 animate-fade-in print:hidden">
          {notification.type === 'success' ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${notification.type === 'info' ? 'text-cyan-400' : 'text-rose-400'}`} />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-100 uppercase tracking-wider font-mono text-[11px]">
              {notification.type === 'success' ? 'Secured System Lock' : 'Edge Broadcast'}
            </p>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-sans">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Embedded Client Top Indicator Bar - Matches Premium Reports */}
      <div className="bg-[#060B13] border-b border-slate-900 print:hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00D4FF]">Astrateq Secure Client Handshake Status: Live & Encrypted</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Server: local-edge</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {activeProvinceName}, CA
            </span>
          </div>
        </div>
      </div>

      {/* Main Core View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
        
        {/* Section 1: Hero Section */}
        <HeroSection
          selectedVehicle={selectedVehicle}
          selectedProvince={selectedProvince}
          onProvinceChange={(p) => {
            setSelectedProvince(p);
            const provName = CANADIAN_PROVINCES.find((prov) => prov.code === p)?.name || 'Ontario';
            triggerNotification(`Localized safety audit updated to ${provName} (CMVSS boundaries).`, 'success');
          }}
          provinces={CANADIAN_PROVINCES}
          onPrint={handlePrint}
          onShare={handleShare}
        />

        {/* Section 2: Interactive Telemetry Simulator */}
        <TelemetryAuditor
          selectedVehicle={selectedVehicle}
          vehicles={VEHICLE_DATABASE}
          onVehicleSelect={(vehicle) => {
            setSelectedVehicle(vehicle);
            triggerNotification(`Interfaced with ${vehicle.make} ${vehicle.model} telematics gateway.`, 'success');
          }}
          selectedProvinceName={activeProvinceName}
        />

        {/* Section 3: Executive KPI Overview Cards */}
        <ExecutiveOverview selectedVehicle={selectedVehicle} />

        {/* Section 4: Subsystem Readiness Checklists */}
        <VehicleReadinessTable selectedVehicle={selectedVehicle} />

        {/* Section 5: Security Shield Audits */}
        <PrivacySecurityAssessment />

        {/* Section 6: Compatibility Map Appraisal */}
        <CompatibilityScorecard selectedVehicle={selectedVehicle} />

        {/* Section 7: Product Showcase / early adopters */}
        <ProductEngineeringShowcase />

        {/* Section 8: Timeline progress */}
        <DeliveryTimeline selectedProvinceName={activeProvinceName} />

        {/* Section 9: Brand and Legal support details footer */}
        <FooterSection onPrint={handlePrint} onShare={handleShare} />

      </main>

      {/* Subtle print stylesheet hacks */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          /* Keep text readable by changing dark background colors */
          main {
            max-width: 100% !important;
            padding: 0 !important;
          }
          #hero-section, #readiness-table, #privacy-security-assessment, #compatibility-scorecard, #product-showcase, #delivery-timeline, #footer-section {
            border-bottom: 2px solid #e2e8f0 !important;
            page-break-inside: avoid !important;
            background: transparent !important;
            color: #0c0f17 !important;
          }
          h1, h2, h3, h4, span, p, td, th {
            color: #0c0f17 !important;
          }
          .bg-\\[\\#131D2E\\] {
            background-color: #f8fafc !important;
            border: 1px solid #cbd5e1 !important;
          }
          .bg-\\[\\#0B1120\\] {
            background-color: transparent !important;
          }
          .text-slate-400, .text-slate-300, .text-slate-500 {
            color: #475569 !important;
          }
          .text-cyan-400 {
            color: #0284c7 !important; /* dark slate/dark sky blue for printers */
            font-weight: 700 !important;
          }
          .text-[#F8F9FA] {
            color: #0f172a !important;
          }
          .border-slate-800 {
            border-color: #cbd5e1 !important;
          }
        }
      `}</style>

    </div>
  );
}
