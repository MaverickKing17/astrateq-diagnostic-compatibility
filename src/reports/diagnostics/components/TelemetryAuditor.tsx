import { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, Terminal as TerminalIcon, ShieldAlert } from 'lucide-react';
import { VehicleSpec, TelemetryReading } from '../types';

interface TelemetryAuditorProps {
  selectedVehicle: VehicleSpec;
  vehicles: VehicleSpec[];
  onVehicleSelect: (vehicle: VehicleSpec) => void;
  selectedProvinceName: string;
}

export default function TelemetryAuditor({
  selectedVehicle,
  vehicles,
  onVehicleSelect,
  selectedProvinceName,
}: TelemetryAuditorProps) {
  const [isRunning, setIsRunning] = useState(true);
  const [simSpeed, setSimSpeed] = useState<'idle' | 'active' | 'cold'>('active');
  const [readings, setReadings] = useState<TelemetryReading[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [ticker, setTicker] = useState(0);

  // Initialize readings
  useEffect(() => {
    const initial: TelemetryReading[] = [];
    const now = new Date();
    for (let i = 19; i >= 0; i--) {
      const timeStr = new Date(now.getTime() - i * 1000).toLocaleTimeString('en-US', { hour12: false });
      initial.push(generateReading(timeStr, i));
    }
    setReadings(initial);

    // Initial logs
    setLogs([
      `[SYSTEM] Initializing Edge Sentinel Diagnostics Kernel v1.4.1...`,
      `[REGULATORY] Loading Transport Canada CMVSS Safety Guardrails: OK`,
      `[PRIVACY] Aligning with PIPEDA Client Privacy Directive (No Outer Log Mode)`,
      `[HARDWARE] Handshaking with vehicle ${selectedVehicle.make} ${selectedVehicle.model} via CAN-Bus @ ${selectedVehicle.canBusSpeed}...`,
      `[OBD] Port interface confirmed: ${selectedVehicle.obdLocation}`,
      `[SECURE] Enclave lock engaged. Local processing loop authorized: YES`,
      `[SYSTEM] Diagnostic monitoring active...`
    ]);
  }, [selectedVehicle]);

  // Telemetry fluctuation generator
  function generateReading(timeStr: string, indexOffset = 0): TelemetryReading {
    const rand = Math.sin((Date.now() / 3000) + indexOffset);
    let rpmBase = simSpeed === 'idle' ? 800 : simSpeed === 'cold' ? 1200 : 3200;
    if (selectedVehicle.type === 'EV') rpmBase = simSpeed === 'idle' ? 0 : simSpeed === 'cold' ? 1500 : 7500; // EV Motor RPM
    
    const rpm = Math.round(rpmBase + (rand * (selectedVehicle.type === 'EV' ? 100 : 50)));
    const voltageBase = selectedVehicle.type === 'EV' ? 385 : selectedVehicle.type === 'Hybrid' ? 240 : 14.1;
    const voltage = parseFloat((voltageBase + (rand * (selectedVehicle.type === 'EV' ? 1.5 : 0.1))).toFixed(2));
    
    let tempBase = simSpeed === 'cold' ? -12 : 82;
    if (selectedVehicle.type === 'EV') tempBase = simSpeed === 'cold' ? -8 : 34; // Battery cells run cooler
    const temp = Math.round(tempBase + (rand * 2));

    const busLoad = Math.round(42 + (rand * 6));
    const obdLatency = Math.round(18 + Math.abs(rand * 5));

    return {
      timestamp: timeStr,
      rpm,
      voltage,
      temp,
      busLoad,
      obdLatency
    };
  }

  // Periodic ticker and log updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      
      setReadings((prev) => {
        const next = [...prev.slice(1), generateReading(timeStr)];
        return next;
      });

      // Generate realistic logs
      const hexId = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');
      const canAddr = ['0x18EAFF', '0x18FEE0', '0x0CF004', '0x18FEF1', '0x18FEEE'][Math.floor(Math.random() * 5)];
      
      let logMsg = '';
      const r = Math.random();
      if (r < 0.2) {
        logMsg = `[CAN-BUS] Rx: ${canAddr} Frame: ${hexId} FF FF A2 B1 C0 (Decoded Ok)`;
      } else if (r < 0.4) {
        logMsg = `[INTELLIGENCE] Processing vehicle state dynamically inside local secure enclave`;
      } else if (r < 0.6) {
        logMsg = `[HARDWARE] Cell Voltage: ${selectedVehicle.type === 'EV' ? '3.82V' : '1.41V'} Balance Check: +/- 0.01V (Perfect)`;
      } else if (r < 0.75) {
        logMsg = `[PRIVACY] Blocked external telemetry log call - fully decoupled cloud sandbox active`;
      } else {
        const tempCheck = simSpeed === 'cold' ? `Sub-zero Cold Weather Calibration engaged (-10°C environment)` : 'Thermal management nominal';
        logMsg = `[DIAGNOSTIC] ${tempCheck}`;
      }

      setLogs((prev) => [...prev, `[${timeStr}] ${logMsg}`].slice(-40));
      setTicker((t) => t + 1);

    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, simSpeed, selectedVehicle]);

  // Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Sparkline generator path helper
  const latestReadings = readings.map(r => r.rpm);
  const maxVal = Math.max(...latestReadings, 1);
  const minVal = Math.min(...latestReadings, 0);
  const chartPoints = readings.map((r, i) => {
    const x = (i / (readings.length - 1)) * 320;
    const norm = (r.rpm - minVal) / (maxVal - minVal || 1);
    const y = 80 - (norm * 60); // Invert + offset
    return `${x},${y}`;
  }).join(' ');

  // Live indicators based on selected vehicle and simulated condition
  const liveReading = readings[readings.length - 1] || { rpm: 0, voltage: 0, temp: 0, busLoad: 0, obdLatency: 0 };

  return (
    <div className="py-10 border-b border-white/10 print:pb-4 print:border-none">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 print:mb-2">
        <div>
          <h2 className="font-display font-semibold text-2xl text-white flex items-center gap-1.5">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            Dynamic On-Device Telemetry Auditing
          </h2>
          <p className="font-sans text-slate-400 text-sm mt-1">
            Auditing real-time CAN bus frames and vehicle powertrain health under local conditions in {selectedProvinceName}.
          </p>
        </div>

        {/* Vehicle Selection dropdown and Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto print:hidden">
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Active Vehicle Model</label>
            <select
              value={selectedVehicle.id}
              onChange={(e) => {
                const found = vehicles.find((v) => v.id === e.target.value);
                if (found) onVehicleSelect(found);
              }}
              className="bg-white/5 border border-white/10 text-[#F8F9FA] text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50 transition duration-300 font-mono"
              id="vehicle-simulator-select"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id} className="bg-[#050510] text-[#F8F9FA]">
                  {v.year} {v.make} {v.model} ({v.type})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Powertrain Simulation Mode</label>
            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1 gap-1">
              <button
                onClick={() => setSimSpeed('idle')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-300 cursor-pointer ${simSpeed === 'idle' ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-[#F8F9FA]'}`}
              >
                Idle
              </button>
              <button
                onClick={() => setSimSpeed('active')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-300 cursor-pointer ${simSpeed === 'active' ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-[#F8F9FA]'}`}
              >
                Driving
              </button>
              <button
                onClick={() => setSimSpeed('cold')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-300 cursor-pointer ${simSpeed === 'cold' ? 'bg-amber-400 text-black font-semibold shadow-[0_0_10px_rgba(251,191,36,0.4)]' : 'text-slate-400 hover:text-[#F8F9FA]'}`}
              >
                Cold Audit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Micro percentage metrics & Live Simulation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Gauges Column */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-4">Precision Telemetry Gauges</div>
          
          <div className="space-y-4">
            {/* Gauge 1: System Health */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-slate-300">System Health Baseline</span>
                <span className="font-bold text-emerald-400">{selectedVehicle.stats.systemHealth}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                  style={{ width: `${selectedVehicle.stats.systemHealth}%` }}
                />
              </div>
            </div>

            {/* Gauge 2: Telemetry Capture */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-slate-300">Telemetry Capture Rate</span>
                <span className="font-bold text-cyan-400">{selectedVehicle.stats.telemetryCapture}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                  style={{ width: `${selectedVehicle.stats.telemetryCapture}%` }}
                />
              </div>
            </div>

            {/* Gauge 3: Local Processing */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-slate-300">Local Processing Enclave</span>
                <span className="font-bold text-cyan-400">100% (Air-Gapped)</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Gauge 4: Privacy Compliance */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-slate-300">PIPEDA Privacy Compliance</span>
                <span className="font-bold text-emerald-400">100% (No Cloud Leak)</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5 text-[11px] text-slate-400 font-sans flex items-start gap-2">
            <span className="inline-block mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="leading-relaxed">Factual: 100% local edge processing guarantees that vehicle speed, passenger logs, and private coordinates are never streamed to any remote servers.</span>
          </div>
        </div>

        {/* Live Graphic Ticker (Powertrain Metrics + Live Chart) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Live Powertrain Telemetry</span>
            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-1 px-3 bg-black/40 hover:bg-white/10 text-xs text-cyan-400 rounded-lg border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3 h-3 fill-cyan-400 hover:scale-105" /> Pause Feed
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-cyan-400 hover:scale-105" /> Resume Feed
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-black/40 border border-white/5 hover:border-white/10 transition-colors rounded-xl p-3">
              <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">{selectedVehicle.type === 'EV' ? 'Motor Speed' : 'Engine RPM'}</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {liveReading.rpm.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">RPM</span>
              </div>
            </div>
            
            <div className="bg-black/40 border border-white/5 hover:border-white/10 transition-colors rounded-xl p-3">
              <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Bus Potential</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {liveReading.voltage} <span className="text-xs text-slate-400 font-sans font-normal">V</span>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 hover:border-white/10 transition-colors rounded-xl p-3">
              <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Core Temp</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {liveReading.temp}°C
                {simSpeed === 'cold' && <span className="text-[8px] block text-amber-400 font-mono uppercase mt-0.5">Cold Certified</span>}
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 hover:border-white/10 transition-colors rounded-xl p-3">
              <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">OBD Ping RTT</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {liveReading.obdLatency} <span className="text-xs text-slate-400 font-normal">ms</span>
              </div>
            </div>
          </div>

          {/* Live SVG Sparkline Chart */}
          <div className="flex-1 bg-black/60 border border-white/5 rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden h-24">
            <div className="absolute top-1.5 text-[8px] font-mono text-slate-500 uppercase left-2">Real-time Powertrain Signal Oscillation</div>
            <div className="absolute bottom-1.5 text-[8px] font-mono text-slate-500 uppercase right-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> {selectedVehicle.canBusSpeed}
            </div>

            <div className="flex-1 flex items-end">
              <svg className="w-full h-16 overflow-visible" viewBox="0 0 320 80" preserveAspectRatio="none">
                {/* SVG path representing readings */}
                <path
                  d={`M ${chartPoints}`}
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                
                {/* Visual gridlines */}
                <line x1="0" y1="20" x2="320" y2="20" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Monospace Interactive Diagnostic Terminal Logging */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col h-72 md:h-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              Decoded Local CAN Logs (PIPEDA)
            </span>
            <div className="text-[9px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" /> Passive Read
            </div>
          </div>

          {/* Log Window Container */}
          <div
            ref={logContainerRef}
            className="flex-1 bg-black/80 border border-white/5 rounded-xl p-3.5 overflow-y-auto font-mono text-[10px] leading-relaxed text-[#1adbff] space-y-2 max-h-[190px] md:max-h-none select-text"
          >
            {logs.map((log, index) => {
              let colorClasses = 'text-cyan-300/90';
              if (log.includes('[SYSTEM]')) colorClasses = 'text-white font-bold';
              else if (log.includes('[REGULATORY]') || log.includes('[PRIVACY]')) colorClasses = 'text-emerald-400';
              else if (log.includes('[HARDWARE]')) colorClasses = 'text-cyan-400';
              else if (log.includes('[SECURE]')) colorClasses = 'text-indigo-400';
              else if (log.includes('[CAN-BUS]')) colorClasses = 'text-slate-400';
              
              return (
                <div key={index} className={`${colorClasses} whitespace-pre-wrap`}>
                  {log}
                </div>
              );
            })}
          </div>
          
          <div className="mt-2 text-[9px] text-slate-500 font-mono flex items-center justify-between">
            <span>Terminal Sandbox Mode</span>
            <span>Host: On-Device Co-Processor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
