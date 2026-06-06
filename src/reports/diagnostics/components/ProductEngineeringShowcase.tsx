import { Heart, Gift, Cpu, Bell, CpuIcon } from 'lucide-react';

export default function ProductEngineeringShowcase() {
  const benefits = [
    {
      title: 'Lifetime Edge License',
      desc: 'Founding members receive a transferrable Lifetime License for Astrateq’s Edge Sentinel diagnostic layers. Zero monthly subscription fees, forever.',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />
    },
    {
      title: 'Sub-Zero Priority Updates',
      desc: 'Exclusive early access to cold weather calibration firmware profiles. Over-the-air, secure-signed diagnostics tuned for Canadian winter performance.',
      icon: <Bell className="w-4 h-4 text-[#FFB020]" />
    },
    {
      title: 'Passive-Guard Protection',
      desc: 'Get direct mobile notifications if your high-voltage EV cells show thermal degradation, or if your combustion battery indicates winter load failure risks.',
      icon: <CpuIcon className="w-4 h-4 text-emerald-400" />
    },
    {
      title: 'Premium Machined Chassis',
      desc: 'Founding Editions ship with a proprietary, precision-milled aluminum heat dissipating chassis (built for operating environments from -40°C to +85°C).',
      icon: <Gift className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <div className="py-10 border-b border-slate-800/60" id="product-showcase">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">Part V — Product Engineering & Benefits</span>
        <h2 className="font-display font-semibold text-2xl text-[#F8F9FA] mt-1">Founding Member Benefits & Engineering Specs</h2>
        <p className="font-sans text-slate-400 text-sm mt-1">
          Honest, factual advantages for our early-stage pre-reservation subscribers in the Canadian territory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Hardware Details Schematic (SVG representation of the enclosure and optical system) */}
        <div className="lg:col-span-2 bg-[#131D2E] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-4">Edge Sentinel Structural Build</div>
            
            {/* SVG Schematic of the hardware casing details */}
            <svg viewBox="0 0 200 160" className="w-full h-auto text-slate-400">
              {/* Outer enclosure */}
              <rect x="10" y="10" width="180" height="140" rx="10" fill="none" stroke="#334155" strokeWidth="2" />
              <rect x="14" y="14" width="172" height="132" rx="8" fill="none" stroke="#1E293B" strokeWidth="1" />
              
              {/* Thermal fins */}
              <line x1="40" y1="10" x2="40" y2="25" stroke="#475569" strokeWidth="2" />
              <line x1="60" y1="10" x2="60" y2="25" stroke="#475569" strokeWidth="2" />
              <line x1="80" y1="10" x2="80" y2="25" stroke="#475569" strokeWidth="2" />
              <line x1="100" y1="10" x2="100" y2="25" stroke="#475569" strokeWidth="2" />
              <line x1="120" y1="10" x2="120" y2="25" stroke="#475569" strokeWidth="2" />
              <line x1="140" y1="10" x2="140" y2="25" stroke="#475569" strokeWidth="2" />
              <line x1="160" y1="10" x2="160" y2="25" stroke="#475569" strokeWidth="2" />

              {/* Internal Circuit Outline */}
              <rect x="25" y="45" width="150" height="85" rx="4" fill="#0B1120" stroke="#00D4FF" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* ARM Co-Processor */}
              <rect x="35" y="65" width="45" height="40" rx="3" fill="#1E293B" stroke="#00D4FF" strokeWidth="1.5" />
              <text x="57" y="88" fill="#00D4FF" className="font-mono text-[8px] font-bold" textAnchor="middle">ARM32</text>
              <text x="57" y="98" fill="#475569" className="font-mono text-[6px]" textAnchor="middle">Enclave</text>

              {/* Optical Sensors Lens schematic */}
              <circle cx="135" cy="85" r="16" fill="#1E293B" stroke="#FFB020" strokeWidth="1" />
              <circle cx="135" cy="85" r="8" fill="#0B1120" stroke="#00D4FF" strokeWidth="1" />
              <circle cx="135" cy="85" r="3" fill="#00D4FF" />
              <text x="135" y="115" fill="#64748B" className="font-mono text-[7px]" textAnchor="middle">1080P OPTICAL</text>
              
              {/* Wiring harness connection point */}
              <rect x="180" y="65" width="10" height="30" rx="2" fill="#334155" />
              <line x1="170" y1="73" x2="185" y2="73" stroke="#94A3B8" strokeWidth="1" />
              <line x1="170" y1="80" x2="185" y2="80" stroke="#94A3B8" strokeWidth="1" />
              <line x1="170" y1="87" x2="185" y2="87" stroke="#94A3B8" strokeWidth="1" />

              <text x="15" y="142" fill="#475569" className="font-mono text-[6px]">ANODIZED CHASSIS PAT:PEND</text>
            </svg>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 bg-[#0B1120]/40 p-3 rounded-lg text-[11px] text-slate-400 font-sans leading-relaxed">
            <span className="font-medium text-slate-300 block mb-1">Authentic CNC Craftsmanship</span>
            Made of rigid structural aluminum profiles capable of managing battery cell heat loads during continuous diagnostic operations. Fully certified under Transport Canada passive monitoring rules.
          </div>
        </div>

        {/* early adopter benefits column */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-[#131D2E] border border-slate-800 rounded-xl p-5 hover:border-slate-700 hover:bg-slate-900/10 transition">
              <div className="flex gap-3 items-center mb-3">
                <div className="p-2 bg-[#0B1120] border border-slate-800 rounded-lg">
                  {benefit.icon}
                </div>
                <h3 className="font-sans font-medium text-[#F8F9FA] text-sm">
                  {benefit.title}
                </h3>
              </div>
              <p className="font-sans text-slate-300 text-xs leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
