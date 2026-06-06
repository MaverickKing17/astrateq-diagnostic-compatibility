import { ShieldAlert, Globe, ArrowUpRight } from 'lucide-react';

interface FooterSectionProps {
  onPrint: () => void;
  onShare: () => void;
}

export default function FooterSection({ onPrint, onShare }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 mt-12 border-t border-slate-800/80 text-slate-400 font-sans" id="footer-section">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        
        {/* Brand & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-2 select-none">
            <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-display font-bold text-lg text-slate-100 tracking-tight">Astrateq<span className="text-cyan-400">Gadgets</span></span>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">Drive Safer. Drive Smarter.</p>
        </div>

        {/* Action Quick Links */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono select-none print:hidden">
          <button
            onClick={onPrint}
            className="text-slate-300 hover:text-cyan-400 transition cursor-pointer flex items-center gap-1"
          >
            Export diagnostics printout <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={onShare}
            className="text-slate-300 hover:text-cyan-400 transition cursor-pointer flex items-center gap-1"
          >
            Share certificate url <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-900 text-xs text-slate-500 leading-relaxed">
        
        {/* Canadian Support Center */}
        <div className="space-y-1.5 border-r border-[#131D2E] pr-4">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Canadian Support & Logistics
          </div>
          <p>
            Regional client engineering teams deployed in Toronto, ON and Vancouver, BC. Toll-free bilingual assistance dial: <span className="font-mono text-slate-400">1-800-ASTRATEQ</span>.
          </p>
          <p className="text-[10px] italic">
            *Assistance bilingue disponible pour tous les clients canadiens.
          </p>
        </div>

        {/* Legal Regulatory Disclaimers */}
        <div className="space-y-1.5 border-r border-[#131D2E] pr-4">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            Passive Sniffing Regulatory Disclaimer
          </div>
          <p>
            Astrateq Edge Sentinel operates solely in continuous passive CAN-Bus monitoring mode. The harness does NOT write command strings to transmission, engine speed governors, active cruise control, or direct hydraulic lines. Compliance with Canada Motor Vehicle Safety Standard (CMVSS) 101/105 is fully sustained.
          </p>
        </div>

        {/* Legal Corporate footer info */}
        <div className="space-y-1.5">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
            Federal Privacy Compliance
          </div>
          <p>
            All vehicle performance logs, battery cell balance metrics, diagnostics fault triggers, and local GPS alignments are stored exclusively in localized AES-256 secure memory loops inside the hardware. Handled fully in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA) Schedule 1.
          </p>
          <p className="text-[10px] mt-2 font-mono">
            © {currentYear} Astrateq Technologies Inc. All rights reserved. Registered patent filings in Canada.
          </p>
        </div>

      </div>
    </footer>
  );
}
