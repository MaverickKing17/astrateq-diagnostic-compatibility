import { useState } from 'react';
import { Lock, CloudOff, RefreshCw, Key, ChevronDown, ChevronUp } from 'lucide-react';

export default function PrivacySecurityAssessment() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tests = [
    {
      id: 'encryption',
      title: 'Aerospace-Grade Data Encryption',
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      summary: 'Diagnostic databases stored on-board are encrypted via hardware-accelerated AES-256 standards.',
      details: 'All locally stored diagnostic traces, CAN metrics, and vehicle coordinates are encrypted at rest inside the device flash storage. The decryption keys never leave your physical vehicle environment and are stored in a secure cryptographic enclave.'
    },
    {
      id: 'cloud',
      title: 'Complete Cloud Independence',
      icon: <CloudOff className="w-5 h-5 text-[#FFB020]" />,
      summary: 'Data stays inside the physical vehicle. Zero diagnostic metrics, coordinates, or habits are sent to cloud servers.',
      details: 'Unlike other OBD telematics dongles that stream continuous vehicle location and behavioral data to third-party cloud engines, Astrateq runs completely air-gapped. Real-time telemetry is displayed via short-range secured local links directly to user interfaces.'
    },
    {
      id: 'local',
      title: 'Full Local Edge Processing',
      icon: <RefreshCw className="w-5 h-5 text-cyan-400" />,
      summary: 'All telemetry analytical calculations and diagnostic logs are generated directly inside the co-processor.',
      details: 'Vehicle diagnostic profiling, threshold checks, and cold weather calibration are resolved entirely at the edge on our 32-bit quad-core processor. This ensures fast, zero-latency local alert response systems without external network reliance.'
    },
    {
      id: 'secureboot',
      title: 'Cryptographic Secure Boot',
      icon: <Key className="w-5 h-5 text-emerald-400" />,
      summary: 'Protects the integrity of firmware using physical cryptographic hardware roots of trust.',
      details: 'Ensures that only authentic, certified Astrateq Firmware compiles and executes on the Edge Sentinel. Any third-party intrusion, CAN-hacking injection attempt, or unauthorized firmware modifications will lock down the CAN gateway automatically.'
    }
  ];

  return (
    <div className="py-10 border-b border-white/10" id="privacy-security-assessment">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF]">Part III — Security Shield</span>
        <h2 className="font-display font-semibold text-2xl text-white mt-1">Privacy & Security Assessment</h2>
        <p className="font-sans text-slate-400 text-sm mt-1">
          Detailed cryptographic and privacy audits protecting your vehicle log files. Guaranteed PIPEDA compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map((test) => {
          const isExpanded = expandedId === test.id;
          return (
            <div
              key={test.id}
              onClick={() => setExpandedId(isExpanded ? null : test.id)}
              className="bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-md rounded-2xl p-5 transition-all duration-300 shadow-md cursor-pointer select-none"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="p-2.5 bg-black/40 border border-white/10 rounded-xl h-max self-center">
                    {test.icon}
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-base text-slate-100 hover:text-cyan-400 transition-colors">
                      {test.title}
                    </h3>
                    <p className="font-sans text-slate-300 text-xs mt-1.5 leading-relaxed">
                      {test.summary}
                    </p>
                  </div>
                </div>
                
                <div className="text-slate-400 p-1 print:hidden">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Collapsible details pane */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400 leading-relaxed font-sans bg-black/40 -mx-5 -mb-5 p-5 rounded-b-2xl animate-fade-in print:block">
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider block mb-1">Security Standard Explanation</span>
                  {test.details}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
