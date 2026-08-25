import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/Navbar';
import { CampusBanner } from './components/CampusBanner';
import { CategoryBar } from './components/CategoryBar';
import { FilterBar } from './components/FilterBar';
import { ListingGrid } from './components/ListingGrid';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CreateListingModal } from './components/CreateListingModal';
import { ChatModal } from './components/ChatModal';
import { ProfileModal } from './components/ProfileModal';
import { StudentVerifyModal } from './components/StudentVerifyModal';
import { SafetyModal } from './components/SafetyModal';
import { 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Heart, 
  MapPin, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useMarketplace();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 max-w-sm">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

const MarketplaceMain: React.FC = () => {
  const { 
    currentCollege, 
    setIsSafetyModalOpen, 
    setIsVerifyModalOpen,
    setIsCreateModalOpen 
  } = useMarketplace();

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top App Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col">
        {/* Campus Hero & Highlights */}
        <CampusBanner />

        {/* 7 Required Categories Horizontal Bar */}
        <CategoryBar />

        {/* Filter, Sort & Campus Hub Search */}
        <FilterBar />

        {/* Listings Display Grid */}
        <div className="flex-1">
          <ListingGrid />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand column */}
            <div className="space-y-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-base shadow-sm">
                  R
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  RExchange
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The trusted private student marketplace for buying, selling, and sharing textbooks, tech, lecture notes, and event passes.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified .edu student network</span>
              </div>
            </div>

            {/* Exchange Categories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Exchange Categories
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>Textbooks & Prep Guides</li>
                <li>Electronics & Monitors</li>
                <li>Course Notes & Cheat Sheets</li>
                <li>Student Event & Fest Tickets</li>
                <li>Skills & Tutoring Services</li>
                <li>Free Dorm Giveaways</li>
              </ul>
            </div>

            {/* Trust & Campus Safety */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Safety & Campus Hubs
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>
                  <button 
                    onClick={() => setIsSafetyModalOpen(true)}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Campus Safe Trade Zones
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsVerifyModalOpen(true)}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    .edu Student ID Verification
                  </button>
                </li>
                <li>Zero-fee handovers</li>
                <li>In-person item inspection rules</li>
              </ul>
            </div>

            {/* Active College Community */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Current Community
              </h4>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>{currentCollege.name}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {currentCollege.city}, {currentCollege.state} • {currentCollege.domain}
                </p>
                <div className="pt-1 text-[11px] text-emerald-600 font-semibold">
                  {currentCollege.popularHubs.slice(0, 3).join(', ')}
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} RExchange Platform. Designed for verified collegiate communities.</p>
            <div className="flex items-center gap-4">
              <span>Encrypted Student Chat</span>
              <span>•</span>
              <span>100% Peer-to-Peer</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ListingDetailModal />
      <CreateListingModal />
      <ChatModal />
      <ProfileModal />
      <StudentVerifyModal />
      <SafetyModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <MarketplaceMain />
    </MarketplaceProvider>
  );
}
