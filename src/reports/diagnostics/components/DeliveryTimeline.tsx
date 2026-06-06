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
    <div className="py-10 border-b border-white/10" id="delivery-timeline">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF]">Part VI — Delivery Roadmap</span>
        <h2 className="font-display font-semibold text-2xl text-white mt-1">Astrateq Architecture Delivery Timeline</h2>
        <p className="font-sans text-slate-400 text-sm mt-1">
          Tracking the exact engineering stages of your Edge Sentinel hardware packet from factory allocation to your doorstep.
        </p>
      </div>

      <div className="relative">
        {/* Continuous Line */}
        <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-white/10 print:hidden" />

        <div className="space-y-8 relative">
          {timelineSteps.map((step) => (
            <div key={step.id} className="flex gap-6 items-start group">
              
              {/* Node bullet */}
              <div className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full bg-black/60 border border-white/10 group-hover:border-cyan-500/30 transition duration-300">
                {step.icon}
              </div>

              {/* Step info card */}
              <div className="flex-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-sans font-semibold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <span className={`text-[10px] font-mono uppercase px-2- py-0.5 rounded border tracking-wider w-max px-2 ${
                    step.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : step.status === 'active'
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'bg-black/40 text-slate-500 border-white/5'
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
