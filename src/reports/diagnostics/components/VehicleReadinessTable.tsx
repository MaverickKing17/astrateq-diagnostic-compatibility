import { useState } from 'react';
import { Power, BatteryCharging, Wifi, Shield, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { VehicleSpec } from '../types';

interface VehicleReadinessTableProps {
  selectedVehicle: VehicleSpec;
}

export default function VehicleReadinessTable({ selectedVehicle }: VehicleReadinessTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const subsystems = [
    {
      id: 'powertrain',
      name: selectedVehicle.type === 'EV' ? 'Electric Drive Powertrain' : 'Combustion Engine Diagnostics',
      status: selectedVehicle.stats.engineReadiness,
      icon: <Power className="w-4 h-4 text-cyan-400" />,
      detail: selectedVehicle.type === 'EV' 
        ? 'Decodes electric motor rpm, rotational slip, rotor temperature, and regenerative braking torque values in real-time.'
        : 'Decodes engine speed, manifold absolute pressure (MAP), fuel trim arrays, catalytic oxygen sensor loops, and misfire counts.',
      hoverExplain: 'Uses passive read CAN bus sniffing. No diagnostic codes are injected. It reads parameter IDs (PIDs) dynamically without disrupting normal vehicle ECU operations.'
    },
    {
      id: 'battery',
      name: selectedVehicle.type === 'EV' ? 'High-Voltage Battery (BMS) Audit' : 'Low-Voltage Battery & Starter Subsystem',
      status: selectedVehicle.stats.batteryReadiness,
      icon: <BatteryCharging className="w-4 h-4 text-cyan-400" />,
      detail: selectedVehicle.type === 'EV'
        ? 'Monitors high-voltage cells balance, temperature min/max offsets, direct charger handshakes, and sub-zero capacity retention logs.'
        : 'Monitors battery alternator feed cycles, charge throughput resistance, low-ambient starting voltage, and alternator ripple frequencies.',
      hoverExplain: 'Crucial for Canadian sub-zero weather diagnostics. Analyzes capacity scaling factors to notify owners of cellular or terminal degradation before winter freezes.'
    },
    {
      id: 'connectivity',
      name: 'Onboard Telematics & CAN-Bus Integrity',
      status: selectedVehicle.stats.connectivityReadiness,
      icon: <Wifi className="w-4 h-4 text-cyan-400" />,
      detail: 'Secures local dual CAN Bus data feeds inside the hardware gateway, monitoring overall signal latency and CRC check states.',
      hoverExplain: 'Guarantees that other active bus modules (steering, gateway controller) do not suffer timing overhead. Maintains latency under 5ms, compliant with standard OBD specs.'
    },
    {
      id: 'safety',
      name: 'Passive Passive Safety & Eye-Sight Integration',
      status: selectedVehicle.stats.safetyReadiness,
      icon: <Shield className="w-4 h-4 text-cyan-400" />,
      detail: 'Monitors standard impact logging triggers, passenger airbags safety baseline, and anti-lock traction stats without system overrides.',
      hoverExplain: 'Adheres strictly to CMVSS 105 requirements. Read-only operation guarantees that the vehicle’s active crash avoidance sensors, radar, and cameras are completely unaffected.'
    }
  ];

  const getStatusBadge = (status: 'Ready' | 'Needs Attention' | 'Incompatible') => {
    switch (status) {
      case 'Ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
            <CheckCircle className="w-3.5 h-3.5" />
            Ready
          </span>
        );
      case 'Needs Attention':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-500 bg-amber-950/40 border border-amber-800/40">
            <AlertCircle className="w-3.5 h-3.5" />
            Calibration Check
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-800/40">
            <AlertCircle className="w-3.5 h-3.5" />
            Incompatible
          </span>
        );
    }
  };

  return (
    <div className="py-10 border-b border-white/10" id="readiness-table">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF]">Part II — Vehicle Subsystems</span>
          <h2 className="font-display font-semibold text-2xl text-white mt-1">Vehicle Intelligence Readiness Checklist</h2>
          <p className="font-sans text-slate-400 text-sm mt-1">
            Standardized readiness states for Canadian environmental and CMVSS driving safety classifications.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 w-max print:hidden">
          💡 Hover row for structural tech breakdown
        </div>
      </div>

      {/* Responsive Table layout */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Vehicle Subsystem Check</th>
                <th className="py-4 px-5">Functional Scope Details</th>
                <th className="py-4 px-5">Diagnostics Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {subsystems.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-white/5 transition relative group cursor-pointer"
                  onMouseEnter={() => setHoveredRow(sub.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="py-4 px-5 align-top">
                    <div className="flex items-center gap-2.5 font-sans font-medium text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                      <div className="p-1 px-1.5 bg-black/40 border border-white/10 rounded-lg group-hover:border-cyan-500/30 transition-colors">
                        {sub.icon}
                      </div>
                      <span>{sub.name}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-5 text-xs text-slate-300 leading-relaxed max-w-md relative">
                    <p>{sub.detail}</p>
                    
                    {/* Hover Effect explanation box */}
                    {hoveredRow === sub.id && (
                      <div className="absolute left-5 top-full -translate-y-2 z-20 w-80 bg-black/95 border border-white/10 backdrop-blur-md rounded-xl p-3 shadow-2xl animate-fade-in print:hidden">
                        <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" /> Technical Engine Insight
                        </div>
                        <p className="text-[11px] text-slate-300 leading-normal font-sans">
                          {sub.hoverExplain}
                        </p>
                      </div>
                    )}
                  </td>
                  
                  <td className="py-4 px-5 align-middle">
                    {getStatusBadge(sub.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVehicle.adapterNeeded && (
        <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-xs text-amber-300 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-1">Harness Adapter Required for {selectedVehicle.make} {selectedVehicle.model}</span>
            This vehicle secures physical access to standard CAN bus feeds behind the center storage dashboard. A specialized splitter adapter (included with your Founding Edition box purchase) is required for plug-and-play local diagnostics. Normal mechanics J1962 port checks remain unchanged.
          </div>
        </div>
      )}
    </div>
  );
}
