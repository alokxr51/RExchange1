import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Gift, 
  Repeat, 
  Image as ImageIcon, 
  BookOpen, 
  Laptop, 
  FileText, 
  Ticket, 
  Check, 
  Info 
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CategoryId, ListingType, ItemCondition } from '../types';
import { CATEGORIES, PRESET_LISTING_IMAGES } from '../data/mockData';

export const CreateListingModal: React.FC = () => {
  const { 
    isCreateModalOpen, 
    setIsCreateModalOpen, 
    createListing, 
    currentCollege, 
    currentUser,
    showToast 
  } = useMarketplace();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('books');
  const [type, setType] = useState<ListingType>('sell');
  const [price, setPrice] = useState<string>('25');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [tradeFor, setTradeFor] = useState<string>('');
  const [condition, setCondition] = useState<ItemCondition>('like-new');
  const [courseCode, setCourseCode] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>(currentCollege.popularHubs[0] || 'Main Campus Library');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(PRESET_LISTING_IMAGES.books[0]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isCustomImageOpen, setIsCustomImageOpen] = useState(false);

  if (!isCreateModalOpen) return null;

  const handleCategoryChange = (newCat: CategoryId) => {
    setCategory(newCat);
    // Switch default image preset to match category
    const presets = PRESET_LISTING_IMAGES[newCat] || PRESET_LISTING_IMAGES.other;
    if (presets && presets.length > 0) {
      setSelectedImage(presets[0]);
    }
    if (newCat === 'free') {
      setType('free');
      setPrice('0');
    }
  };

  const handleTypeChange = (newType: ListingType) => {
    setType(newType);
    if (newType === 'free') {
      setPrice('0');
    } else if (price === '0') {
      setPrice('20');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please provide a listing title');
      return;
    }

    if (!description.trim()) {
      showToast('Please provide a brief description');
      return;
    }

    const finalPrice = type === 'free' || type === 'trade' ? 0 : Number(price) || 0;
    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (courseCode.trim() && !parsedTags.includes(courseCode.trim())) {
      parsedTags.unshift(courseCode.trim());
    }

    createListing({
      title: title.trim(),
      description: description.trim(),
      category,
      type,
      price: finalPrice,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      tradeFor: type === 'trade' ? tradeFor.trim() : undefined,
      condition,
      courseCode: courseCode.trim() || undefined,
      images: [finalImage],
      pickupLocation: pickupLocation.trim() || currentCollege.popularHubs[0] || 'Campus Library',
      status: 'active',
      tags: parsedTags,
    });

    setIsCreateModalOpen(false);
  };

  const availablePresets = PRESET_LISTING_IMAGES[category] || PRESET_LISTING_IMAGES.other || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        id="create-listing-modal"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[92vh]"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Post to {currentCollege.shortName} Exchange</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Zero Fees
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Available instantly to {currentCollege.name} verified students
            </p>
          </div>

          <button
            id="close-create-modal-btn"
            onClick={() => setIsCreateModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          
          {/* Category Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              1. Select Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                    category === cat.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Listing Type & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Listing Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                2. Exchange Type *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleTypeChange('sell')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    type === 'sell'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  For Sale ($)
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('trade')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    type === 'trade'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5" />
                  Trade / Swap
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('free')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    type === 'free'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  Free Giveaway
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('service')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    type === 'service'
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Skill / Service
                </button>
              </div>
            </div>

            {/* Price Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {type === 'trade' ? 'Item Desired for Trade *' : 'Pricing *'}
              </label>

              {type === 'trade' ? (
                <input
                  type="text"
                  value={tradeFor}
                  onChange={(e) => setTradeFor(e.target.value)}
                  placeholder="e.g. Open to Nintendo Switch games or desk chair"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              ) : type === 'free' ? (
                <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-teal-600" />
                  Listing price is set to $0 (Free giveaway)
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold text-sm">$</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Asking Price"
                      min="1"
                      className="w-full pl-7 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold text-sm">$</span>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Retail price (opt)"
                      className="w-full pl-7 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Title & Course Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Title *
              </label>
              <input
                id="create-listing-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Algorithms (CLRS 4th Ed) or TI-84 Plus"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Course Code (Optional)
              </label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
                placeholder="e.g. CS106B, MATH51"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>
          </div>

          {/* Condition & Pickup Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="brand-new">Brand New (Unopened / Unused)</option>
                <option value="like-new">Like New (Flawless condition)</option>
                <option value="good">Good (Minor wear, works perfectly)</option>
                <option value="fair">Fair (Visible cosmetic wear, works)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Safe Campus Meetup Spot *
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {currentCollege.popularHubs.map((hub) => (
                  <option key={hub} value={hub}>{hub}</option>
                ))}
                <option value="Main Campus Library Lobby">Main Campus Library Lobby</option>
                <option value="Student Union Center">Student Union Center</option>
                <option value="North Campus Dorm Lobby">North Campus Dorm Lobby</option>
                <option value="Online / Electronic Transfer">Online / Electronic Transfer</option>
              </select>
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Photo Selection
              </label>
              <button
                type="button"
                onClick={() => setIsCustomImageOpen(!isCustomImageOpen)}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
              >
                {isCustomImageOpen ? 'Use preset photos' : '+ Custom image URL'}
              </button>
            </div>

            {isCustomImageOpen ? (
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Paste image web address (e.g. https://...)"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {availablePresets.map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === imgUrl ? 'border-emerald-600 ring-2 ring-emerald-500' : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="preset" className="w-full h-full object-cover" />
                    {selectedImage === imgUrl && (
                      <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Description & Details *
            </label>
            <textarea
              id="create-listing-desc-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the edition, condition, what's included, annotations, or pickup flexibility..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Search Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Textbook, Hardcover, CS161, Algorithms"
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Posting as <strong>{currentUser.name}</strong> ({currentUser.major})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                id="submit-listing-btn"
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Publish Listing
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
