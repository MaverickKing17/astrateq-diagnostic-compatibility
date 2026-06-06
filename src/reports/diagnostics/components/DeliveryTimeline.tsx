import { CheckCircle2, Circle, Clock, Flame } from 'lucide-react';

interface DeliveryTimelineProps {
  selectedProvinceName: string;
}

export default function DeliveryTimeline({ selectedProvinceName }: DeliveryTimelineProps) {
  // Current date formatting for Canada
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

  const timelineSteps = [
    {
      id: 1,
      title: 'Reservation Confirmed',
      date: formattedToday,
      desc: `Your Edge Sentinel hardware reservation has been logged under priority batch status for the ${selectedProvinceName} region.`,
      status: 'completed',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 2,
      title: 'OBD Hardware Allocation',
      date: 'Pending Handover',
      desc: 'Sourcing individual 1080P optical sensors and processor chips. Casing CNC anodization checks complete.',
      status: 'active',
      icon: <Flame className="w-5 h-5 text-cyan-400 animate-pulse" />
    },
    {
      id: 3,
      title: 'Pre-Launch Firmware Stage',
      date: 'Target Q3 2026',
      desc: 'Pre-installing local secure enclaves, local encryption handshakes, and regional Transport Canada regulatory compliance checks.',
      status: 'upcoming',
      icon: <Clock className="w-5 h-5 text-slate-500" />
    },
    {
      id: 4,
      title: 'Home Delivery & Verification',
      date: 'Target Q4 2026',
      desc: 'Courier packet dispatch containing OBD module, split wire harness adaptors (if model-required), adhesive dashboard mounts, and setup instructions.',
      status: 'upcoming',
      icon: <Circle className="w-5 h-5 text-slate-600" />
    }
  ];

  return (
    <div className="py-10 border-b border-slate-800/60" id="delivery-timeline">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">Part VI — Delivery Roadmap</span>
        <h2 className="font-display font-semibold text-2xl text-[#F8F9FA] mt-1">Astrateq Architecture Delivery Timeline</h2>
        <p className="font-sans text-slate-400 text-sm mt-1">
          Tracking the exact engineering stages of your Edge Sentinel hardware packet from factory allocation to your doorstep.
        </p>
      </div>

      <div className="relative">
        {/* Continuous Line */}
        <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-800 print:hidden" />

        <div className="space-y-8 relative">
          {timelineSteps.map((step) => (
            <div key={step.id} className="flex gap-6 items-start group">
              
              {/* Node bullet */}
              <div className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full bg-[#131D2E] border border-slate-800 group-hover:border-slate-700 transition">
                {step.icon}
              </div>

              {/* Step info card */}
              <div className="flex-1 bg-[#131D2E] border border-slate-800/80 rounded-xl p-5 hover:border-slate-700/80 transition shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-sans font-semibold text-base text-[#F8F9FA] group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border tracking-wider w-max ${
                    step.status === 'completed'
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                      : step.status === 'active'
                      ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/50'
                      : 'bg-[#0B1120] text-slate-500 border-slate-800'
                  }`}>
                    {step.date}
                  </span>
                </div>

                <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
