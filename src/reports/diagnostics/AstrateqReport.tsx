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
import { 
  ShieldCheck, 
  AlertCircle, 
  MapPin, 
  Home, 
  Activity, 
  Shield, 
  Layers, 
  Settings,
  CircleDot
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#020205] text-[#F8F9FA] font-sans antialiased selection:bg-cyan-500 selection:text-slate-900 scroll-smooth flex relative overflow-hidden">
      
      {/* Decorative High-End Sidebar - Hidden in Print and Mobile */}
      <nav className="w-20 border-r border-white/5 bg-[#050510] flex flex-col items-center py-8 justify-between shrink-0 select-none hidden md:flex relative z-20 print:hidden">
        {/* Brand Logo Icon */}
        <div className="flex flex-col items-center gap-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            <span className="text-white font-display font-black text-xl">A</span>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col gap-6">
            <button className="text-cyan-400 cursor-pointer p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all animate-pulse" title="Operations Control">
              <Home className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-white cursor-pointer p-2.5 rounded-xl transition" title="Telemetry Feed">
              <Activity className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-white cursor-pointer p-2.5 rounded-xl transition" title="Security & Shield">
              <Shield className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-white cursor-pointer p-2.5 rounded-xl transition" title="Hardware Subsystems">
              <Layers className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Profile Dot Indicator */}
        <div className="flex flex-col items-center gap-4">
          <button className="text-slate-500 hover:text-white cursor-pointer p-2.5 rounded-xl transition" title="Settings">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full border border-cyan-500/30 p-0.5 flex items-center justify-center relative">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center font-mono text-[9px] font-bold text-cyan-300">
              AUD
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#050510]" />
          </div>
        </div>
      </nav>

      {/* Dynamic Notifications Banner top level */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 max-w-sm w-full bg-black/80 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex items-start gap-4 animate-fade-in print:hidden">
          {notification.type === 'success' ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${notification.type === 'info' ? 'text-cyan-400' : 'text-rose-400'}`} />
          )}
          <div className="flex-1">
            <p className="text-xs font-semibold text-white uppercase tracking-widest font-mono">
              {notification.type === 'success' ? 'Secured System Lock' : 'Edge Broadcast'}
            </p>
            <p className="text-xs text-slate-300 mt-1 leading-normal font-sans">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Main Column Pane with Scrolling */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10 scroll-smooth">
        
        {/* Absolute Glowing Ambient Blobs inside scroll body */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none print:hidden" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none print:hidden" />

        {/* Custom Header from the Immersive UI design specifications */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 sm:px-8 bg-white/2 backdrop-blur-md relative z-10 shrink-0 print:hidden select-none">
          <div className="flex flex-col">
            <h1 className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 uppercase font-mono">Telemetry Systems Operation</h1>
            <p className="text-base sm:text-lg font-medium text-white tracking-wide font-display mt-0.5">ASTRATEQ DIAGNOSTIC CONTROL PANEL</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CircleDot className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider font-mono">Node Synced</span>
            </div>
            
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            
            <div className="text-right hidden sm:block">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Active Territory</p>
              <p className="text-xs font-mono text-cyan-400 font-bold flex items-center justify-end gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-cyan-500" /> {activeProvinceName}, CA
              </p>
            </div>
          </div>
        </header>

        {/* Scrolling Report Container */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 print:px-0 print:py-0 relative z-10">
          
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
      </div>

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
