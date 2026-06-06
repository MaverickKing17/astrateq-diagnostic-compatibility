import { motion } from 'motion/react';
import { Shield, Sparkles, Award, MapPin, Printer, Share2 } from 'lucide-react';
import { VehicleSpec } from '../types';

interface HeroSectionProps {
  selectedVehicle: VehicleSpec;
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
  provinces: { code: string; name: string }[];
  onPrint: () => void;
  onShare: () => void;
}

export default function HeroSection({
  selectedVehicle,
  selectedProvince,
  onProvinceChange,
  provinces,
  onPrint,
  onShare
}: HeroSectionProps) {
  return (
    <div className="relative pt-8 pb-12 overflow-hidden border-b border-white/5 print:pt-4 print:pb-4 print:border-none" id="hero-section">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none print:hidden" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none print:hidden" />

      <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
        {/* Text Container */}
        <div className="flex-1 max-w-2xl">
          {/* Status Indicators */}
          <div className="flex flex-wrap items-center gap-2 mb-4 print:mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 rounded-full">
              <Shield className="w-3.5 h-3.5 animate-pulse" />
              Compatibility Certified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide text-amber-400 bg-amber-950/40 border border-amber-800/50 rounded-full">
              <Award className="w-3.5 h-3.5" />
              Founding Edition
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-full">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Edge intelligence
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F8F9FA] leading-tight mb-4 select-none">
            Your Vehicle Is <span className="text-cyan-400">Ready</span> For The Future.
          </h1>
          
          <p className="font-sans text-slate-300 text-lg sm:text-xl font-normal leading-relaxed mb-6 select-none">
            A private intelligence assessment to evaluate compatibility with Astrateq’s Edge&nbsp;Sentinel platform. Engineered to local Canadian transport safety standards.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 print:hidden">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl focus-within:border-cyan-500/50 transition-all duration-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Territory Audit</span>
                <select
                  value={selectedProvince}
                  onChange={(e) => onProvinceChange(e.target.value)}
                  className="bg-transparent text-sm text-[#F8F9FA] font-medium border-none outline-none cursor-pointer pr-1"
                >
                  {provinces.map((prov) => (
                    <option key={prov.code} value={prov.code} className="bg-[#050510] text-[#F8F9FA]">
                      {prov.name} (CMVSS-Ready)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onPrint}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] rounded-xl cursor-pointer"
                id="btn-print-report"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                Print/Export PDF
              </button>
              <button
                onClick={onShare}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition active:scale-95 cursor-pointer"
                id="btn-share-report"
              >
                <Share2 className="w-4 h-4 text-slate-400" />
                Share
              </button>
            </div>
          </div>

          {/* Factual Note for Print */}
          <div className="hidden print:block mt-2 text-xs text-slate-400 font-mono">
            Territory Audit Scope: {provinces.find(p => p.code === selectedProvince)?.name} region, Canada. Fully compliant with Section 4 of CMVSS 101.
          </div>
        </div>

        {/* Dashboard/OBD Hardware Graphic */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg mt-4 lg:mt-0 relative print:hidden">
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl shadow-black/40 overflow-hidden group">
            {/* Ambient indicator lights inside the hardware module */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-[#00D4FF]">
              <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full animate-ping" />
              <span>SENTINEL LINKED</span>
            </div>

            <div className="text-xs uppercase tracking-widest text-[#00D4FF] font-mono mb-4">Hardware Co-Processor Interface</div>
            
            {/* SVG Illustration representing 3D dashboard & OBD system */}
            <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto drop-shadow-lg">
              {/* Dashboard contour */}
              <path d="M 20 220 Q 200 40 380 220" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 40 220 Q 200 60 360 220" stroke="#1E293B" strokeWidth="1" />

              {/* Heads-Up Display Circles */}
              <circle cx="130" cy="140" r="45" stroke="#1E293B" strokeWidth="3" />
              <circle cx="130" cy="140" r="40" stroke="#334155" strokeWidth="1" />
              {/* Velocity Sweep */}
              <path d="M 100 160 A 40 40 0 0 1 150 110" stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" />
              <text x="130" y="145" fill="#F8F9FA" textAnchor="middle" className="font-mono text-[14px] font-bold">100</text>
              <text x="130" y="158" fill="#64748B" textAnchor="middle" className="font-mono text-[7px] uppercase">CAN Bus %</text>

              <circle cx="270" cy="140" r="45" stroke="#1E293B" strokeWidth="3" />
              <circle cx="270" cy="140" r="40" stroke="#334155" strokeWidth="1" />
              {/* Energy Sweep */}
              <path d="M 240 160 A 40 40 0 0 1 290 110" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
              <text x="270" y="145" fill="#F8F9FA" textAnchor="middle" className="font-mono text-[14px] font-bold">EDGE</text>
              <text x="270" y="158" fill="#64748B" textAnchor="middle" className="font-mono text-[7px] uppercase">Processing</text>

              {/* Connected OBD Sentinel Module */}
              <g transform="translate(160, 50)" className="cursor-pointer">
                <rect x="0" y="0" width="80" height="42" rx="6" fill="#1E293B" stroke="#00D4FF" strokeWidth="1.5" />
                <rect x="5" y="5" width="70" height="12" rx="2" fill="#0B1120" />
                
                {/* Pins graphic inside OBD module */}
                <line x1="12" y1="11" x2="16" y2="11" stroke="#FFB020" strokeWidth="1.5" />
                <line x1="22" y1="11" x2="26" y2="11" stroke="#00D4FF" strokeWidth="1.5" />
                <line x1="32" y1="11" x2="36" y2="11" stroke="#00D4FF" strokeWidth="1.5" />
                <line x1="42" y1="11" x2="46" y2="11" stroke="#FFB020" strokeWidth="1.5" />
                <line x1="52" y1="11" x2="56" y2="11" stroke="#00D4FF" strokeWidth="1.5" />
                <line x1="62" y1="11" x2="66" y2="11" stroke="#22C55E" strokeWidth="1.5" />

                {/* Status LED Lights */}
                <circle cx="15" cy="28" r="3" fill="#22C55E" /> {/* Power LED */}
                <circle cx="27" cy="28" r="3" fill="#00D4FF" className="animate-pulse" /> {/* Tx/Rx LED */}
                <circle cx="39" cy="28" r="3" fill="#FFB020" /> {/* GPS Lock LED */}
                
                <text x="75" y="31" fill="#64748B" className="font-mono text-[6px]" textAnchor="end">ASTRATEQ</text>
              </g>

              {/* Connector cable */}
              <path d="M 200 92 Q 200 130 180 150" stroke="#334155" strokeWidth="3" fill="none" />

              {/* Dual Camera HUD Module */}
              <g transform="translate(320, 20)">
                <rect x="0" y="0" width="55" height="30" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1" />
                <circle cx="15" cy="15" r="7" fill="#0B1120" stroke="#00D4FF" strokeWidth="1" />
                <circle cx="15" cy="15" r="2.5" fill="#00D4FF" />
                <circle cx="40" cy="15" r="5" fill="#0B1120" stroke="#475569" strokeWidth="1" />
                <circle cx="40" cy="15" r="1.5" fill="#FFB020" />
                <path d="M 8 28 L 47 28" stroke="#00D4FF" strokeWidth="1.5" />
              </g>
              
              {/* Calibration Alignment Marks */}
              <line x1="10" y1="10" x2="30" y2="10" stroke="#334155" strokeWidth="1" />
              <line x1="10" y1="10" x2="10" y2="30" stroke="#334155" strokeWidth="1" />
              <line x1="390" y1="230" x2="370" y2="230" stroke="#334155" strokeWidth="1" />
              <line x1="390" y1="230" x2="390" y2="210" stroke="#334155" strokeWidth="1" />
            </svg>

            <div className="mt-4 flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/10">
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase">Interfaced Setup</div>
                <div className="text-xs font-bold text-slate-200">Edge Sentinel Bundled Hardware</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono uppercase">Calibration State</div>
                <div className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
