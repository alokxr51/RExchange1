import React from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  AlertTriangle, 
  Eye, 
  PhoneCall, 
  CheckCircle, 
  Users 
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const SafetyModal: React.FC = () => {
  const { isSafetyModalOpen, setIsSafetyModalOpen, currentCollege } = useMarketplace();

  if (!isSafetyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="safety-modal"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Campus Trust & Safe Meetup Guide
              </h2>
              <p className="text-xs text-slate-500">
                Protocols for safe student exchanges at {currentCollege.shortName}
              </p>
            </div>
          </div>

          <button
            id="close-safety-modal-btn"
            onClick={() => setIsSafetyModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Safe Hubs on Current Campus */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200/70 dark:border-emerald-800/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Recommended Safe Handover Hubs ({currentCollege.shortName})</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {currentCollege.popularHubs.map((hub) => (
                <div key={hub} className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-lg border border-emerald-200/50 dark:border-emerald-900/50 flex items-center gap-1.5 font-medium text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{hub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Trust Principles */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Trade in Public, Well-Lit Campus Spaces</p>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Always choose high-traffic campus spots such as main library lobbies, campus dining centers, or student union buildings during daytime or well-lit hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Inspect Before Payment</p>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Test electronic devices (chargers, screens, calculators) and check textbook editions/condition before handing over money or sending a Venmo/cash transfer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Verify Student Identity</p>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Look for the green <strong>Verified Student Badge</strong> on listings and member profiles to ensure the counterpart is an authenticated student.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">No Off-Platform Pre-payments</p>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Never wire money or send advance deposits for an item before meeting the seller in person on campus.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setIsSafetyModalOpen(false)}
            className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
