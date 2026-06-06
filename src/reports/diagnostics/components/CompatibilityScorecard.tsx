import { Sparkles, Trophy, CheckCircle, HelpCircle } from 'lucide-react';
import { VehicleSpec } from '../types';

interface CompatibilityScorecardProps {
  selectedVehicle: VehicleSpec;
}

export default function CompatibilityScorecard({ selectedVehicle }: CompatibilityScorecardProps) {
  const score = selectedVehicle.stats.overallScore;
  
  // Custom SVG dash calculation for circular progress
  const radius = 52;
  const circumference = 2 * Math.PI * radius; // ~326.7
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isFullyReady = score >= 97;

  // Breakdown metrics
  const breakdowns = [
    { name: 'Powertrain Calibration', score: selectedVehicle.stats.systemHealth, color: 'bg-emerald-400' },
    { name: 'Sensors / IO Diagnostics', score: selectedVehicle.stats.telemetryCapture, color: 'bg-cyan-400' },
    { name: 'Electronic Control Unit (ECU)', score: 98, color: 'bg-cyan-400' },
    { name: 'On-Board Telemetry Loop', score: 100, color: 'bg-emerald-400' }
  ];

  return (
    <div className="py-10 border-b border-slate-800/60" id="compatibility-scorecard">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">Part IV — Compatibility Appraisal</span>
        <h2 className="font-display font-semibold text-2xl text-[#F8F9FA] mt-1">Founding Member Compatibility Scorecard</h2>
        <p className="font-sans text-slate-400 text-sm mt-1">
          A definitive mathematical baseline scoring your specific vehicle configuration for local Edge Sentinel telemetry loops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#131D2E] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Circular Dial Column */}
        <div className="flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div className="relative flex items-center justify-center">
            {/* SVG circle track */}
            <svg width="140" height="140" viewBox="0 0 120 120" className="transform -rotate-90">
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-[#0B1120]"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-cyan-400 transition-all duration-1000 ease-out"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0px 0px 4px #00D4FF30)' }}
              />
            </svg>
            
            {/* Inner text score */}
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-3xl font-bold font-mono text-slate-100">{score}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">of 100 PTS</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-mono text-cyan-400 font-semibold block uppercase">Rating Verdict</span>
            <span className="text-base font-display font-semibold text-slate-100 mt-1 block">
              {isFullyReady ? 'Complete Compatibility' : 'Partial Compatibility'}
            </span>
          </div>
        </div>

        {/* Breakdown Subsystems Column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3">Diagnostic Telemetry Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {breakdowns.map((item, idx) => (
                <div key={idx} className="bg-[#0B1120]/40 border border-slate-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300">{item.name}</span>
                    <span className="font-bold text-slate-100">{item.score}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict and Recommendations Box */}
          <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg p-4 flex gap-3 text-xs leading-relaxed text-slate-300">
            {isFullyReady ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-1 text-emerald-400">Strategic Integration Recommendation: Fully Ready</span>
                  Your vehicle satisfies all diagnostic requirements. No pre-requisite dealer visits or wiring splicing needed. The passive read system is plug-and-play. Setup will load instantly on system boot.
                </div>
              </>
            ) : (
              <>
                <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-1 text-amber-400">Strategic Integration Recommendation: Partial Compatibility</span>
                  Due to cold battery capacity scaling thresholds on legacy models, you may experience brief diagnostic calibration checks during severe winter temperatures below -15°C. Performance tracking, encryption, and local diagnostics remain 100% operational.
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
