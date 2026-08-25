import React from 'react';
import { 
  Plus, 
  SearchX, 
  Sparkles, 
  RotateCcw, 
  ShoppingBag, 
  BookOpen, 
  Laptop, 
  GraduationCap 
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';

export const ListingGrid: React.FC = () => {
  const { 
    filteredListings, 
    filters, 
    resetFilters, 
    setIsCreateModalOpen,
    currentCollege 
  } = useMarketplace();

  if (filteredListings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No campus items matched your filter
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Try broadening your search keywords, adjusting the price limit, or removing category restrictions for {currentCollege.shortName}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
            <button
              onClick={resetFilters}
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Post This Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Featured Header / Category Intro if specific category selected */}
      {filters.category !== 'all' && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white capitalize">
            {filters.category} on {currentCollege.shortName}
          </h2>
          <span className="text-xs text-slate-500">
            {filteredListings.length} active listings
          </span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

    </div>
  );
};
