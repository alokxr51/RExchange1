import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Share2, 
  Flag, 
  Clock, 
  Gift, 
  Repeat, 
  GraduationCap, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Building2,
  ChevronLeft,
  ChevronRight,
  Send
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const ListingDetailModal: React.FC = () => {
  const { 
    activeListingDetail, 
    setActiveListingDetail, 
    isFavorite, 
    toggleFavorite, 
    openChatForListing,
    currentCollege,
    showToast,
    setIsSafetyModalOpen,
    currentUser,
    setFilters
  } = useMarketplace();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [offerAmount, setOfferAmount] = useState<string>('');
  const [isOfferMode, setIsOfferMode] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  if (!activeListingDetail) return null;

  const listing = activeListingDetail;
  const isOwner = currentUser.id === listing.sellerId;
  const favorited = isFavorite(listing.id);

  const images = listing.images && listing.images.length > 0 
    ? listing.images 
    : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'];

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || quickMessage || `Hi ${listing.sellerName}, I'm interested in ${listing.title}. Is it still available?`;
    openChatForListing(listing, textToSend);
    setActiveListingDetail(null);
  };

  const handleSendOffer = () => {
    const num = Number(offerAmount);
    if (!num || num <= 0) {
      showToast('Please enter a valid offer amount');
      return;
    }
    openChatForListing(listing, `I'd like to offer $${num} for this item.`);
    setActiveListingDetail(null);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Listing link copied to clipboard!');
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'brand-new': return 'Brand New (Unopened / Unused)';
      case 'like-new': return 'Like New (Flawless condition)';
      case 'good': return 'Good (Minor cosmetic wear, fully functional)';
      case 'fair': return 'Fair (Visible wear, works properly)';
      default: return condition;
    }
  };

  const savingsPercent = listing.originalPrice && listing.originalPrice > listing.price
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="listing-detail-modal"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[90vh]"
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">{listing.category}</span>
            <span>•</span>
            <span>{currentCollege.shortName} Campus</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(listing.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                favorited 
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50' 
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={favorited ? 'Saved' : 'Save'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
            <button
              id="close-detail-modal-btn"
              onClick={() => setActiveListingDetail(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Top Section: Gallery & Primary Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img
                  src={images[activeImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                  <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                      }}
                      className="p-1.5 rounded-full bg-black/60 text-white pointer-events-auto hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                      }}
                      className="p-1.5 rounded-full bg-black/60 text-white pointer-events-auto hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Status Pill */}
                {listing.status !== 'active' && (
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {listing.status}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-emerald-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Summary */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                {/* Course Code & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {listing.courseCode && (
                    <button
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, courseCode: listing.courseCode || '' }));
                        setActiveListingDetail(null);
                      }}
                      className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                      title="Filter for this course"
                    >
                      🎓 {listing.courseCode}
                    </button>
                  )}
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {listing.createdAt}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {listing.title}
                </h1>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  {listing.type === 'free' ? (
                    <span className="text-2xl font-black text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                      <Gift className="w-6 h-6" />
                      100% FREE
                    </span>
                  ) : listing.type === 'trade' ? (
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <Repeat className="w-5 h-5" />
                        Open for Item Exchange
                      </span>
                      {listing.tradeFor && (
                        <span className="text-xs text-slate-600 dark:text-slate-300 mt-1 bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900">
                          <strong>Wanted in return:</strong> {listing.tradeFor}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        ${listing.price}
                      </span>
                      {listing.originalPrice && listing.originalPrice > listing.price && (
                        <div className="flex flex-col text-left">
                          <span className="text-xs text-slate-400 line-through">
                            ${listing.originalPrice} retail
                          </span>
                          {savingsPercent && (
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              Save {savingsPercent}% vs bookstore
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Condition Box */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/80">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Item Condition
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {getConditionLabel(listing.condition)}
                </div>
              </div>

              {/* Campus Meetup Spot */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl p-3 border border-emerald-200/70 dark:border-emerald-800/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Campus Pickup Location</span>
                  </div>
                  <button 
                    onClick={() => setIsSafetyModalOpen(true)}
                    className="text-[11px] text-emerald-700 dark:text-emerald-400 underline font-medium"
                  >
                    Safety Tips
                  </button>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">
                  {listing.pickupLocation}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Recommended safe public campus exchange zone.
                </p>
              </div>

            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Listing Details & Notes
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {listing.description}
            </p>
          </div>

          {/* Tags */}
          {listing.tags && listing.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-slate-400 font-medium mr-1">Tags:</span>
              {listing.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Seller Verified Trust Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={listing.sellerAvatar}
                alt={listing.sellerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {listing.sellerName}
                  </h4>
                  {listing.sellerVerified && (
                    <span className="inline-flex items-center gap-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified Student
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {listing.sellerMajor} • Class of '{listing.sellerGradYear.slice(2)}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    ★ {listing.sellerRating} Rating
                  </span>
                  <span>•</span>
                  <span>Responds quickly</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[11px] text-slate-400">
                Member of {currentCollege.shortName} community
              </span>
            </div>
          </div>

          {/* Quick Message Starters */}
          {!isOwner && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Quick Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendMessage(`Hi ${listing.sellerName}, is this still available? Can we meet at ${listing.pickupLocation}?`)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  "Is this still available for pickup today?"
                </button>
                <button
                  onClick={() => handleSendMessage(`Hey! Could I check the condition in person at ${listing.pickupLocation}?`)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  "Can I inspect condition at the Library?"
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Zero platform fees • Direct student-to-student handover</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isOwner ? (
              <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-4 py-2 rounded-xl">
                This is your active listing (Manage from Profile)
              </div>
            ) : (
              <>
                {listing.type === 'sell' && (
                  <div className="flex items-center gap-2">
                    {isOfferMode ? (
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-emerald-500">
                        <span className="text-xs font-bold pl-2 text-slate-400">$</span>
                        <input
                          type="number"
                          value={offerAmount}
                          onChange={(e) => setOfferAmount(e.target.value)}
                          placeholder="Your offer"
                          className="w-20 bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={handleSendOffer}
                          className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg"
                        >
                          Send
                        </button>
                        <button
                          onClick={() => setIsOfferMode(false)}
                          className="text-slate-400 text-xs px-1 hover:text-slate-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsOfferMode(true)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                      >
                        Make Offer
                      </button>
                    )}
                  </div>
                )}

                <button
                  id="contact-seller-btn"
                  onClick={() => handleSendMessage()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message {listing.sellerName.split(' ')[0]}</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
