import { VehicleSpec } from './types';

export const CANADIAN_PROVINCES = [
  { code: 'ON', name: 'Ontario' },
  { code: 'QC', name: 'Quebec' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'AB', name: 'Alberta' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'PE', name: 'Prince Edward Island' },
];

export const VEHICLE_DATABASE: VehicleSpec[] = [
  {
    id: 'tesla-m3-2023',
    make: 'Tesla',
    model: 'Model Y',
    year: 2023,
    type: 'EV',
    obdLocation: 'Rear of center console (requires standard Tesla-specific harness adapter to external OBD-II port)',
    canBusSpeed: '500 kbps (Dual CAN high/low bus structure)',
    coldWeatherRating: 'Optimal (Pre-heating & BMS telemetry fully integrated)',
    adapterNeeded: true,
    notes: 'Direct CAN bus tapping requires a custom wiring harness adapter. Diagnostic read-out includes precise battery cell balance and coolant pump state metrics.',
    stats: {
      systemHealth: 99,
      telemetryCapture: 98,
      localProcessing: 100,
      privacyCompliance: 100,
      engineReadiness: 'Ready', // EV: Motor system is Ready
      batteryReadiness: 'Ready',
      connectivityReadiness: 'Ready',
      safetyReadiness: 'Ready',
      overallScore: 99
    }
  },
  {
    id: 'ford-f150-2022',
    make: 'Ford',
    model: 'F-150 Lightning',
    year: 2022,
    type: 'EV',
    obdLocation: 'Under drivers side dashboard, standard J1962 connector',
    canBusSpeed: '500 kbps (FHS-CAN / MS-CAN architecture)',
    coldWeatherRating: 'Highly Calibrated (Pro Power onboard diagnostics supported)',
    adapterNeeded: false,
    notes: 'Native J1962 port support. Standard configuration permits immediate, plug-and-play local edge telemetry recording.',
    stats: {
      systemHealth: 98,
      telemetryCapture: 99,
      localProcessing: 100,
      privacyCompliance: 100,
      engineReadiness: 'Ready',
      batteryReadiness: 'Ready',
      connectivityReadiness: 'Ready',
      safetyReadiness: 'Ready',
      overallScore: 98
    }
  },
  {
    id: 'hyundai-ioniq5-2021',
    make: 'Hyundai',
    model: 'Ioniq 5',
    year: 2021,
    type: 'EV',
    obdLocation: 'Drivers side footwell, above the brake pedal assembly',
    canBusSpeed: '500 kbps (C-CAN / E-CAN structures)',
    coldWeatherRating: 'Calibrated (Sub-zero charging diagnostic profiles loaded)',
    adapterNeeded: false,
    notes: 'Plug-and-play OBD-II diagnostic compatible. Read-only CAN access ensures zero-interference operations with 800V fast-charging telemetry.',
    stats: {
      systemHealth: 97,
      telemetryCapture: 98,
      localProcessing: 100,
      privacyCompliance: 100,
      engineReadiness: 'Ready',
      batteryReadiness: 'Ready',
      connectivityReadiness: 'Ready',
      safetyReadiness: 'Ready',
      overallScore: 98
    }
  },
  {
    id: 'subaru-outback-2020',
    make: 'Subaru',
    model: 'Outback',
    year: 2020,
    type: 'ICE',
    obdLocation: 'Lower-left steering column shroud',
    canBusSpeed: '500 kbps (Standard high-speed CAN)',
    coldWeatherRating: 'Excellent (Symmetrical AWD mechanical monitors online)',
    adapterNeeded: false,
    notes: 'Native standard J1962 OBD-II interface. Captures full mechanical telemetry including engine fluid temperature, throttle position, and oxygen sensor loops.',
    stats: {
      systemHealth: 96,
      telemetryCapture: 99,
      localProcessing: 100,
      privacyCompliance: 100,
      engineReadiness: 'Ready',
      batteryReadiness: 'Ready',
      connectivityReadiness: 'Ready',
      safetyReadiness: 'Ready',
      overallScore: 97
    }
  },
  {
    id: 'toyota-rav4-2019',
    make: 'Toyota',
    model: 'RAV4 Hybrid',
    year: 2019,
    type: 'Hybrid',
    obdLocation: 'Beneath steering wheel, near driver side hood release lever',
    canBusSpeed: '500 kbps (H-CAN and V-CAN systems)',
    coldWeatherRating: 'Optimal (Hybrid battery temperature monitor enabled)',
    adapterNeeded: false,
    notes: 'Excellent plug-and-play compliance. Seamless telemetry bridging between combustion engine and electric drive inverter systems.',
    stats: {
      systemHealth: 98,
      telemetryCapture: 99,
      localProcessing: 100,
      privacyCompliance: 100,
      engineReadiness: 'Ready',
      batteryReadiness: 'Ready',
      connectivityReadiness: 'Ready',
      safetyReadiness: 'Ready',
      overallScore: 99
    }
  },
  {
    id: 'chevrolet-bolt-2018',
    make: 'Chevrolet',
    model: 'Bolt EV',
    year: 2018,
    type: 'EV',
    obdLocation: 'Low-left steering panel, standardized OBD assembly',
    canBusSpeed: '500 kbps (GMLAN dual-wire CAN)',
    coldWeatherRating: 'Needs Attention (Cold battery capacity scaling log warnings active)',
    adapterNeeded: false,
    notes: 'Standard plug-and-play layout. Extreme cold diagnostics will request a calibration verification to monitor cell recovery rates below -15°C.',
    stats: {
      systemHealth: 94,
      telemetryCapture: 96,
      localProcessing: 100,
      privacyCompliance: 100,
      engineReadiness: 'Ready',
      batteryReadiness: 'Needs Attention',
      connectivityReadiness: 'Ready',
      safetyReadiness: 'Ready',
      overallScore: 95
    }
  }
];
