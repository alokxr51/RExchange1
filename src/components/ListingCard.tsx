import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Eye, 
  Repeat, 
  Gift, 
  GraduationCap 
} from 'lucide-react';
import { Listing } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    setActiveListingDetail, 
    incrementListingViews 
  } = useMarketplace();

  const favorited = isFavorite(listing.id);

  const handleCardClick = () => {
    incrementListingViews(listing.id);
    setActiveListingDetail(listing);
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'brand-new': return 'Brand New';
      case 'like-new': return 'Like New';
      case 'good': return 'Good Condition';
      case 'fair': return 'Fair Condition';
      default: return condition;
    }
  };

  const getConditionBadgeStyle = (condition: string) => {
    switch (condition) {
      case 'brand-new': return 'bg-emerald-600 text-white';
      case 'like-new': return 'bg-indigo-600 text-white';
      case 'good': return 'bg-slate-800 text-white';
      default: return 'bg-amber-600 text-white';
    }
  };

  return (
    <div 
      id={`listing-card-${listing.id}`}
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Box with Bento inner radius */}
      <div>
        <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden mb-3.5 border border-slate-100 dark:border-slate-700/50">
          <img
            src={listing.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Condition & Course Code Tags */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm ${getConditionBadgeStyle(listing.condition)}`}>
              {getConditionLabel(listing.condition)}
            </span>
            {listing.courseCode && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-700 text-white shadow-sm">
                🎓 {listing.courseCode}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(listing.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 z-10 ${
              favorited
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/85 dark:bg-slate-900/85 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-rose-500 shadow-sm'
            }`}
            title={favorited ? 'Remove from saved' : 'Save item'}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
          </button>

          {/* Floating Bento Price Pill in bottom right */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            {listing.type === 'free' ? (
              <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-md flex items-center gap-1">
                <Gift className="w-3.5 h-3.5" />
                FREE
              </span>
            ) : listing.type === 'trade' ? (
              <span className="bg-indigo-600 text-white font-bold text-xs px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1">
                <Repeat className="w-3.5 h-3.5" />
                TRADE
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-slate-200/60 dark:border-slate-700">
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  ${listing.price}
                </span>
                {listing.originalPrice && listing.originalPrice > listing.price && (
                  <span className="text-[10px] text-slate-400 line-through">
                    ${listing.originalPrice}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Status Overlay if reserved or sold */}
          {listing.status === 'reserved' && (
            <div className="absolute inset-0 bg-amber-950/70 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="bg-amber-500 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Reserved / Meetup
              </span>
            </div>
          )}
          {listing.status === 'sold' && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="bg-slate-700 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Completed / Sold
              </span>
            </div>
          )}
        </div>

        {/* Title & snippet */}
        <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {listing.title}
        </h3>

        {listing.tradeFor ? (
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 line-clamp-1">
            🔄 Seeking: {listing.tradeFor}
          </p>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        )}
      </div>

      {/* Footer Meta & Seller info */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        {/* Pickup spot */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 truncate max-w-[160px]" title={listing.pickupLocation}>
            <MapPin className="w-3 h-3 text-indigo-500 shrink-0" />
            <span className="truncate">{listing.pickupLocation}</span>
          </span>
          <span className="text-slate-400 shrink-0 text-[10px]">{listing.createdAt}</span>
        </div>

        {/* Seller Chip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img
              src={listing.sellerAvatar}
              alt={listing.sellerName}
              className="w-5 h-5 rounded-full object-cover border border-emerald-500"
            />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
              {listing.sellerName}
            </span>
            {listing.sellerVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Verified Student" />
            )}
          </div>

          <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
            <span>Class '{listing.sellerGradYear.slice(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

