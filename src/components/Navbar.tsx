import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  MessageCircle, 
  Heart, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  Check, 
  X, 
  Shield, 
  Layers,
  Compass
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    allUsers,
    switchDemoUser,
    currentCollege,
    allColleges,
    selectCollegeById,
    filters,
    setSearchQuery,
    favorites,
    unreadMessagesCount,
    setIsCreateModalOpen,
    setIsVerifyModalOpen,
    setIsProfileModalOpen,
    setIsMessagesModalOpen,
    setIsSafetyModalOpen,
    resetFilters,
  } = useMarketplace();

  const [isCollegeMenuOpen, setIsCollegeMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top micro-bar: Verified Campus Notice */}
      <div className="bg-slate-900 text-slate-100 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 font-medium px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified Student Network
            </span>
            <span className="hidden sm:inline text-slate-300 text-xs">
              Trading exclusively within <strong className="text-white font-semibold">{currentCollege.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="safety-guide-btn"
              onClick={() => setIsSafetyModalOpen(true)}
              className="hover:text-emerald-300 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
            >
              <Shield className="w-3 h-3 text-emerald-400" />
              Campus Safe Trade Hubs
            </button>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
              <span className="text-slate-400">Demo Persona:</span>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
                className="text-indigo-300 font-medium hover:underline flex items-center gap-0.5"
              >
                {currentUser.name} ({currentUser.major.split(' ')[0]})
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Logo & College Selector */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => resetFilters()} 
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              {/* Bento geometric logo mark */}
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <div className="w-3.5 h-3.5 border-2 border-white rotate-45" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  RExchange
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-md border border-indigo-100 dark:border-indigo-800">
                  {currentCollege.shortName}
                </span>
              </div>
            </button>

            {/* Campus Selector Dropdown */}
            <div className="relative">
              <button
                id="college-selector-btn"
                onClick={() => {
                  setIsCollegeMenuOpen(!isCollegeMenuOpen);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Change campus community"
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="max-w-[100px] sm:max-w-[130px] truncate">{currentCollege.shortName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isCollegeMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Select Campus Community
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {allColleges.map((college) => {
                      const isSelected = college.id === currentCollege.id;
                      return (
                        <button
                          key={college.id}
                          onClick={() => {
                            selectCollegeById(college.id);
                            setIsCollegeMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                            isSelected ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{college.name}</span>
                            <span className="text-[10px] text-slate-500">{college.domain} • {college.city}, {college.state}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Bento Search Bar */}
          <div className="flex-1 max-w-lg mx-2 hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                id="main-search-input"
                type="text"
                value={filters.query}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources, textbooks, CS106B, dorm items..."
                className="w-full pl-10 pr-9 py-2 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 rounded-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
              {filters.query && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Quick text links */}
            <button
              onClick={() => resetFilters()}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 hidden md:block transition-colors"
            >
              Browse
            </button>

            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 hidden md:block transition-colors"
            >
              My Listings
            </button>

            {/* Create Listing CTA */}
            <button
              id="create-listing-btn"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-2xl shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Post Listing</span>
            </button>

            {/* Messages Button */}
            <button
              id="messages-btn"
              onClick={() => setIsMessagesModalOpen(true)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Campus Chats & Inquiries"
            >
              <MessageCircle className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Saved Items */}
            <button
              id="saved-items-btn"
              onClick={() => setIsProfileModalOpen(true)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Profile Avatar with Bento styling */}
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsCollegeMenuOpen(false);
                }}
                className="flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <div className="h-8 w-8 rounded-full overflow-hidden border border-white dark:border-slate-700 shadow-sm ring-2 ring-indigo-500/30">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {/* Profile Header */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-700 mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                      />
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {currentUser.name}
                          </p>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                          {currentUser.major} • '{currentUser.gradYear.slice(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Profile Actions */}
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-slate-400" />
                        Manage My Listings & Saved
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsVerifyModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 rounded-xl flex items-center justify-between font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        .edu Student Badge
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">Active</span>
                    </button>
                  </div>

                  {/* Switch Demo Student Persona */}
                  <div className="px-3 pt-3 pb-1 border-t border-slate-100 dark:border-slate-700 mt-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Switch Student Account (Demo)
                    </p>
                  </div>
                  <div className="space-y-1 py-1">
                    {allUsers.map((user) => {
                      const isCurrent = user.id === currentUser.id;
                      return (
                        <button
                          key={user.id}
                          onClick={() => {
                            switchDemoUser(user.id);
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                            isCurrent ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 font-bold' : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                            <span>{user.name}</span>
                            <span className="text-[10px] text-slate-400">({user.major.split(' ')[0]})</span>
                          </div>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Search input bar */}
        <div className="pb-3 pt-1 sm:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, CS106B, tech, tickets..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {filters.query && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

