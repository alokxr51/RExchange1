import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Laptop, 
  FileText, 
  Gift, 
  ArrowRight,
  Plus,
  Shield,
  CheckCircle2,
  Lock,
  TrendingUp,
  MapPin,
  Flame,
  Award
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const CampusBanner: React.FC = () => {
  const { 
    currentCollege, 
    listings, 
    setIsCreateModalOpen, 
    setIsVerifyModalOpen,
    setIsSafetyModalOpen,
    currentUser,
    setFilters 
  } = useMarketplace();

  const collegeListings = listings.filter((l) => l.collegeId === currentCollege.id);
  const freeItemsCount = collegeListings.filter((l) => l.type === 'free' || l.price === 0).length;
  const booksCount = collegeListings.filter((l) => l.category === 'books' || l.category === 'notes').length;
  const techCount = collegeListings.filter((l) => l.category === 'electronics').length;

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          
          {/* Main Hero Bento Tile (Span 8 cols) */}
          <div className="lg:col-span-8 bg-indigo-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between text-white shadow-lg min-h-[280px] sm:min-h-[320px] border border-indigo-800">
            {/* Ambient decorative glow orbs */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 -mb-12 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Tag */}
            <div className="relative z-10 flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-700/60 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-indigo-400/30 text-indigo-100">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Featured Today • {currentCollege.shortName} Exchange
              </span>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 my-4 space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Buy, Sell, Trade & Share <br className="hidden sm:inline" />
                <span className="text-emerald-300">Within Your Campus Community</span>
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-xl">
                Save hundreds on textbooks, dorm essentials, lecture notes, and event tickets. 
                Trade with verified classmates with zero middleman fees and safe campus handovers.
              </p>
            </div>

            {/* Bottom Actions & Quick Metrics */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  id="hero-post-listing-btn"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-indigo-900 font-bold text-xs sm:text-sm rounded-full shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-indigo-900" />
                  <span>Post Listing</span>
                </button>

                <button
                  onClick={() => setFilters(prev => ({ ...prev, onlyFree: true }))}
                  className="px-4 py-2.5 bg-indigo-800/70 hover:bg-indigo-700/70 text-white font-semibold text-xs sm:text-sm rounded-full border border-indigo-400/30 backdrop-blur-md transition-colors flex items-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5 text-teal-300" />
                  <span>Free Items ({freeItemsCount})</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-indigo-200">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% Peer-to-Peer
                </span>
                <span>•</span>
                <span>$0 Platform Fees</span>
              </div>
            </div>
          </div>

          {/* Right Trust & Campus Score Bento Tile (Span 4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Campus Trust Meter
              </span>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                .edu Verified
              </span>
            </div>

            {/* Circular Gauge / Score representation */}
            <div className="my-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-700"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray="98, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xs font-black text-slate-900 dark:text-white leading-none">98%</span>
                  <span className="text-[8px] text-slate-400 font-bold">TRUST</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Level 4 Campus Trader
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {currentUser.verifiedExchangesCount} completed exchanges • 5.0 star student rating
                </p>
                <div className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                  <span>{currentCollege.shortName} Directory Match</span>
                </div>
              </div>
            </div>

            {/* Quick Safety Hub Links */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Primary Meetup Hub:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] flex items-center gap-1 truncate max-w-[140px]">
                  <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                  {currentCollege.popularHubs[0] || 'Campus Library'}
                </span>
              </div>

              <button
                onClick={() => setIsSafetyModalOpen(true)}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>View Safe Exchange Guidelines</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

