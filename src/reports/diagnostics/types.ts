export interface VehicleSpec {
  id: string;
  make: string;
  model: string;
  year: number;
  type: 'EV' | 'Hybrid' | 'ICE';
  obdLocation: string;
  canBusSpeed: string;
  coldWeatherRating: string;
  adapterNeeded: boolean;
  notes: string;
  stats: {
    systemHealth: number;
    telemetryCapture: number;
    localProcessing: number;
    privacyCompliance: number;
    engineReadiness: 'Ready' | 'Needs Attention' | 'Incompatible';
    batteryReadiness: 'Ready' | 'Needs Attention' | 'Incompatible';
    connectivityReadiness: 'Ready' | 'Needs Attention' | 'Incompatible';
    safetyReadiness: 'Ready' | 'Needs Attention' | 'Incompatible';
    overallScore: number;
  };
}

export interface TelemetryReading {
  timestamp: string;
  rpm: number;
  voltage: number;
  temp: number;
  busLoad: number;
  obdLatency: number;
}
