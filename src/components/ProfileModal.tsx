import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Heart, 
  Layers, 
  User as UserIcon, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  MapPin,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingStatus } from '../types';

export const ProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    currentUser, 
    updateProfile, 
    listings, 
    updateListingStatus, 
    deleteListing, 
    favorites, 
    toggleFavorite, 
    setActiveListingDetail, 
    setIsCreateModalOpen,
    setIsVerifyModalOpen,
    currentCollege,
    switchDemoUser,
    allUsers 
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'my-listings' | 'wishlist' | 'profile-edit' | 'personas'>('my-listings');
  const [listingFilter, setListingFilter] = useState<ListingStatus | 'all'>('all');

  // Edit form state
  const [editMajor, setEditMajor] = useState(currentUser.major);
  const [editGradYear, setEditGradYear] = useState(currentUser.gradYear);
  const [editDorm, setEditDorm] = useState(currentUser.dormLocation);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editContact, setEditContact] = useState(currentUser.phoneOrContact || '');

  if (!isProfileModalOpen) return null;

  const myListings = listings.filter((l) => l.sellerId === currentUser.id);
  const filteredMyListings = listingFilter === 'all' 
    ? myListings 
    : myListings.filter((l) => l.status === listingFilter);

  const savedListings = listings.filter((l) => favorites.includes(l.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      major: editMajor,
      gradYear: editGradYear,
      dormLocation: editDorm,
      bio: editBio,
      phoneOrContact: editContact,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="profile-modal"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[90vh]"
      >
        
        {/* Header with User summary card */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white p-6 relative">
          <button
            id="close-profile-modal-btn"
            onClick={() => setIsProfileModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black">{currentUser.name}</h2>
                {currentUser.isStudentVerified ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Student
                  </span>
                ) : (
                  <button
                    onClick={() => setIsVerifyModalOpen(true)}
                    className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold"
                  >
                    Verify .edu ID
                  </button>
                )}
              </div>
              <p className="text-xs text-emerald-100 mt-1">
                {currentUser.major} • Class of {currentUser.gradYear} • {currentUser.dormLocation}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-2">
                <span className="font-semibold">⭐ {currentUser.rating} Trust Score</span>
                <span>•</span>
                <span>{myListings.length} items posted</span>
                <span>•</span>
                <span>{savedListings.length} saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 px-4 sm:px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('my-listings')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'my-listings'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            My Listings ({myListings.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Heart className="w-4 h-4" />
            Wishlist & Saved ({savedListings.length})
          </button>

          <button
            onClick={() => setActiveTab('profile-edit')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile-edit'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            Profile Settings
          </button>

          <button
            onClick={() => setActiveTab('personas')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'personas'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Switch Demo Account
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: My Listings */}
          {activeTab === 'my-listings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setListingFilter('all')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                      listingFilter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    All ({myListings.length})
                  </button>
                  <button
                    onClick={() => setListingFilter('active')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                      listingFilter === 'active' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setListingFilter('reserved')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                      listingFilter === 'reserved' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Reserved
                  </button>
                  <button
                    onClick={() => setListingFilter('sold')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                      listingFilter === 'sold' ? 'bg-white dark:bg-slate-700 text-slate-900 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Sold
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setIsCreateModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Item
                </button>
              </div>

              {filteredMyListings.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                  <p className="text-xs text-slate-500">
                    No items in this status. Post course notes, electronics, or textbooks to exchange on campus!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMyListings.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              item.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                              item.status === 'reserved' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-800'
                            }`}>
                              {item.status}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.type === 'free' ? 'Free Giveaway' : item.type === 'trade' ? 'Item Trade' : `$${item.price}`} • {item.pickupLocation}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {item.status === 'active' && (
                          <button
                            onClick={() => updateListingStatus(item.id, 'reserved')}
                            className="px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 rounded-lg border border-amber-200"
                          >
                            Mark Reserved
                          </button>
                        )}
                        {item.status === 'reserved' && (
                          <button
                            onClick={() => updateListingStatus(item.id, 'active')}
                            className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-lg border border-emerald-200"
                          >
                            Reactivate
                          </button>
                        )}
                        {item.status !== 'sold' && (
                          <button
                            onClick={() => updateListingStatus(item.id, 'sold')}
                            className="px-2.5 py-1 text-xs font-semibold bg-slate-900 text-white rounded-lg"
                          >
                            Mark Sold
                          </button>
                        )}
                        <button
                          onClick={() => deleteListing(item.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-3">
              {savedListings.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-400">
                  You haven't saved any items yet. Click the heart icon on any listing to bookmark it!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedListings.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveListingDetail(item);
                        setIsProfileModalOpen(false);
                      }}
                      className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </p>
                          <p className="text-xs font-bold text-emerald-600">
                            {item.type === 'free' ? 'Free' : `$${item.price}`}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Profile Edit */}
          {activeTab === 'profile-edit' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Major / Field of Study
                </label>
                <input
                  type="text"
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={editGradYear}
                    onChange={(e) => setEditGradYear(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Campus Dorm / Residence
                  </label>
                  <input
                    type="text"
                    value={editDorm}
                    onChange={(e) => setEditDorm(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Short Bio
                </label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Contact / Telegram / Venmo handle (optional)
                </label>
                <input
                  type="text"
                  value={editContact}
                  onChange={(e) => setEditContact(e.target.value)}
                  placeholder="@username"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Save Profile Changes
              </button>
            </form>
          )}

          {/* TAB 4: Switch Demo Personas */}
          {activeTab === 'personas' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Instantly switch between different student accounts to experience buyer, seller, and peer communication features:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allUsers.map((user) => {
                  const isCurrent = user.id === currentUser.id;
                  return (
                    <button
                      key={user.id}
                      onClick={() => switchDemoUser(user.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {user.name}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-emerald-600 font-semibold truncate">
                          {user.major} • '{user.gradYear.slice(2)}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {user.dormLocation}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
