import React from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  MapPin, 
  GraduationCap, 
  ArrowUpDown, 
  DollarSign,
  Layers
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingType, ItemCondition } from '../types';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, currentCollege, filteredListings } = useMarketplace();

  const hasActiveFilters = 
    filters.query !== '' ||
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.condition !== 'all' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.courseCode !== '' ||
    filters.pickupLocation !== '' ||
    filters.onlyVerifiedSellers ||
    filters.onlyFree;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800 py-3 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Results count & active hub indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} available
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-indigo-500" />
              {currentCollege.shortName} Campus
            </span>
          </div>

          {/* Controls Bar with Bento rounded-2xl chips */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Listing Type Filter */}
            <select
              id="filter-type-select"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as ListingType | 'all' }))}
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-2xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold shadow-sm"
            >
              <option value="all">All Trade Types</option>
              <option value="sell">For Sale ($)</option>
              <option value="trade">Item Exchange / Trade</option>
              <option value="free">Free Giveaway (Free)</option>
              <option value="service">Skills & Services</option>
            </select>

            {/* Condition Filter */}
            <select
              id="filter-condition-select"
              value={filters.condition}
              onChange={(e) => setFilters(prev => ({ ...prev, condition: e.target.value as ItemCondition | 'all' }))}
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-2xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold shadow-sm"
            >
              <option value="all">Any Condition</option>
              <option value="brand-new">Brand New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good Condition</option>
              <option value="fair">Fair / Functional</option>
            </select>

            {/* Campus Pickup Hub filter */}
            <select
              id="filter-hub-select"
              value={filters.pickupLocation}
              onChange={(e) => setFilters(prev => ({ ...prev, pickupLocation: e.target.value }))}
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-2xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold shadow-sm hidden md:block"
            >
              <option value="">All Campus Pickup Spots</option>
              {currentCollege.popularHubs.map((hub) => (
                <option key={hub} value={hub}>{hub}</option>
              ))}
            </select>

            {/* Course Code input */}
            <div className="relative hidden sm:block">
              <input
                id="filter-course-input"
                type="text"
                placeholder="Course code (e.g. CS106B)"
                value={filters.courseCode}
                onChange={(e) => setFilters(prev => ({ ...prev, courseCode: e.target.value }))}
                className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-2xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-36 font-semibold shadow-sm"
              />
            </div>

            {/* Max Price input */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs shadow-sm">
              <span className="text-slate-400 font-bold text-[11px]">Max $</span>
              <input
                id="filter-max-price-input"
                type="number"
                placeholder="Any"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : '' }))}
                className="w-12 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none text-xs font-bold"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs shadow-sm">
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              <select
                id="filter-sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none text-xs font-semibold"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Reset Filters button */}
            {hasActiveFilters && (
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-bold px-2.5 py-1 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

