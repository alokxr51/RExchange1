import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  ArrowRight,
  KeyRound
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const StudentVerifyModal: React.FC = () => {
  const { 
    isVerifyModalOpen, 
    setIsVerifyModalOpen, 
    currentCollege, 
    currentUser, 
    verifyStudentEmail,
    showToast 
  } = useMarketplace();

  const [step, setStep] = useState<'email' | 'code' | 'success'>('email');
  const [studentEmail, setStudentEmail] = useState(`${currentUser.name.toLowerCase().replace(' ', '.')}@${currentCollege.domain}`);
  const [verificationCode, setVerificationCode] = useState('');
  const [simulatedCode, setSimulatedCode] = useState('782941');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isVerifyModalOpen) return null;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEmail.includes('@')) {
      setErrorMessage('Please enter a valid student email address.');
      return;
    }
    setErrorMessage('');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedCode(code);
    setStep('code');
    showToast(`Verification code sent to ${studentEmail}!`);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim() !== simulatedCode && verificationCode.trim() !== '123456') {
      setErrorMessage(`Code doesn't match. Click "Auto-fill (${simulatedCode})" to test.`);
      return;
    }

    const res = verifyStudentEmail(studentEmail, currentCollege.id);
    if (res.success) {
      setStep('success');
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleAutoFill = () => {
    setVerificationCode(simulatedCode);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="student-verify-modal"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col"
      >
        
        {/* Close Button */}
        <button
          id="close-verify-modal-btn"
          onClick={() => {
            setIsVerifyModalOpen(false);
            setStep('email');
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Enter Student Email */}
        {step === 'email' && (
          <form onSubmit={handleSendCode} className="space-y-4 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Verify Your Student Identity
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Join the trusted peer exchange for <strong>{currentCollege.name}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Institutional Domain: @{currentCollege.domain}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Only verified university students can trade, message, and post listings within {currentCollege.shortName}.
              </p>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 font-medium text-center">{errorMessage}</p>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Your Official Student Email (.edu)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder={`student@${currentCollege.domain}`}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Send Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Enter 6-digit Code */}
        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="space-y-4 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Enter Security Code
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We sent a 6-digit verification token to:
                <br />
                <strong className="text-slate-800 dark:text-slate-200">{studentEmail}</strong>
              </p>
            </div>

            {/* Instant Demo Auto-fill Helper */}
            <div className="bg-indigo-50 dark:bg-indigo-950/50 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-xs">
              <span className="text-indigo-900 dark:text-indigo-300 font-medium">
                Demo Code: <strong>{simulatedCode}</strong>
              </span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[11px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-md hover:bg-indigo-700"
              >
                1-Click Auto-Fill
              </button>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 font-medium text-center">{errorMessage}</p>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1 text-center">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-[0.5em] text-lg font-black py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Verify & Activate Badge
            </button>
          </form>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 'success' && (
          <div className="space-y-4 pt-2 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Student Status Verified! 🎉
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your verified badge is now attached to all your listings, chat offers, and profile at <strong>{currentCollege.name}</strong>.
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-left space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  Verified Student Identity Badge Unlocked
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                • 100% Trust Score Boost for Buyer Confidence
                <br />
                • Campus Exclusivity: Direct access to {currentCollege.shortName} peer hub
              </p>
            </div>

            <button
              onClick={() => {
                setIsVerifyModalOpen(false);
                setStep('email');
              }}
              className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors"
            >
              Return to Marketplace
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
