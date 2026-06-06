import { motion } from 'motion/react';
import { Shield, Battery, HardDrive, Cpu, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { VehicleSpec } from '../types';

interface ExecutiveOverviewProps {
  selectedVehicle: VehicleSpec;
}

export default function ExecutiveOverview({ selectedVehicle }: ExecutiveOverviewProps) {
  // Color-coded helpers
  const getStatusBulb = (score: number) => {
    if (score >= 97) {
      return {
        text: 'Excellent',
        bg: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400',
        dot: 'bg-emerald-400',
        icon: <CheckCircle className="w-5 h-5 text-emerald-400" />
      };
    } else if (score >= 90) {
      return {
        text: 'Calibration Check',
        bg: 'bg-amber-950/40 border-amber-800/60 text-amber-400',
        dot: 'bg-amber-400',
        icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
      };
    } else {
      return {
        text: 'Action Recommended',
        bg: 'bg-rose-950/40 border-rose-800/60 text-rose-400',
        dot: 'bg-rose-400',
        icon: <AlertCircle className="w-5 h-5 text-rose-400" />
      };
    }
  };

  const cards = [
    {
      title: 'Power Train Integration',
      score: selectedVehicle.stats.systemHealth,
      desc: 'OBD-II CAN connection physical integrity check and engine/motor signal alignment metrics.',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      tag: 'System Health'
    },
    {
      title: 'Lossless Frame Capture',
      score: selectedVehicle.stats.telemetryCapture,
      desc: 'Real-time telemetry frames stored securely in buffer without packet drops or timing delays.',
      icon: <HardDrive className="w-5 h-5 text-cyan-400" />,
      tag: 'Buffer State'
    },
    {
      title: 'Enclave Processing Power',
      score: selectedVehicle.stats.localProcessing,
      desc: 'Secure onboard hardware coprocessor capability status. All operations done locally, 0% cloud load.',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      tag: 'Edge Enclave'
    },
    {
      title: 'Canadian Privacy Compliance',
      score: selectedVehicle.stats.privacyCompliance,
      desc: 'Assuring absolute compliance with PIPEDA Schedule 1. Identifiable transport logs never broadcast.',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      tag: 'Data Shield'
    }
  ];

  return (
    <div className="py-10 border-b border-slate-800/60" id="executive-overview">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">Part I — Executive Readiness Audit</span>
        <h2 className="font-display font-semibold text-2xl text-[#F8F9FA] mt-1">Core Telemetry Audit (KPI Overview)</h2>
        <p className="font-sans text-slate-400 text-sm mt-1">
          High-fidelity indicators monitoring passive read compatibility across four critical telemetry dimensions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const status = getStatusBulb(card.score);
          return (
            <div
              key={idx}
              className="bg-[#131D2E] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition flex flex-col justify-between h-52 group relative"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#0B1120] rounded-lg border border-slate-800">
                    {card.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500">{card.tag}</div>
                    <div className="text-2xl font-bold text-slate-100 font-mono mt-0.5">{card.score}%</div>
                  </div>
                </div>

                <h3 className="font-sans font-medium text-sm text-[#F8F9FA] group-hover:text-cyan-400 transition-colors">
                  {card.title}
                </h3>
                
                <p className="font-sans text-slate-400 text-xs mt-1.5 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Color-coded rating indicator at the bottom */}
              <div className={`mt-4 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border ${status.bg} w-max`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                <span>{status.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
