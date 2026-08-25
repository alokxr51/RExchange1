import React from 'react';
import { 
  BookOpen, 
  Laptop, 
  FileText, 
  Ticket, 
  Sparkles, 
  Gift, 
  Package, 
  Grid, 
  TrendingUp, 
  Tag, 
  Repeat,
  Layers,
  Flame,
  Check
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useMarketplace } from '../context/MarketplaceContext';
import { CategoryId } from '../types';

export const CategoryBar: React.FC = () => {
  const { filters, setSelectedCategory, setFilters, listings, currentCollege } = useMarketplace();

  const collegeListings = listings.filter((l) => l.collegeId === currentCollege.id);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'Ticket': return <Ticket className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Gift': return <Gift className="w-4 h-4" />;
      case 'Package': return <Package className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return collegeListings.length;
    return collegeListings.filter(l => l.category === catId).length;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-3 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category horizontal scroll / bento pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          
          {/* All Categories Pill */}
          <button
            id="cat-all-btn"
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              filters.category === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All Items</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              filters.category === 'all' ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
              {getCategoryCount('all')}
            </span>
          </button>

          {/* 7 Required Categories */}
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                id={`cat-${cat.id}-btn`}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Filter Tag Pills */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0">Tags:</span>
          
          <button
            onClick={() => setFilters(prev => ({ ...prev, onlyFree: !prev.onlyFree }))}
            className={`px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all shrink-0 ${
              filters.onlyFree
                ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-emerald-500" />
            100% Free / Giveaways
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, type: prev.type === 'trade' ? 'all' : 'trade' }))}
            className={`px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all shrink-0 ${
              filters.type === 'trade'
                ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Repeat className="w-3.5 h-3.5 text-indigo-500" />
            Open for Swap / Trade
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, onlyVerifiedSellers: !prev.onlyVerifiedSellers }))}
            className={`px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all shrink-0 ${
              filters.onlyVerifiedSellers
                ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Verified Students Only
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, category: prev.category === 'notes' ? 'all' : 'notes' }))}
            className={`px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all shrink-0 ${
              filters.category === 'notes'
                ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            Exam Study Packs & Notes
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, sortBy: prev.sortBy === 'popular' ? 'newest' : 'popular' }))}
            className={`px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all shrink-0 ${
              filters.sortBy === 'popular'
                ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
            Trending & Most Viewed
          </button>
        </div>

      </div>
    </div>
  );
};

