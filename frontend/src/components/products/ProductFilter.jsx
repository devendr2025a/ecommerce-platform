import React from 'react';
import { Search, X } from 'lucide-react';

const CATEGORIES = [
  "Women's Wear",
  "Men's Wear",
  "Kids' Wear",
  'Ethnic Wear',
  'Western Wear',
  'Footwear',
  'Accessories',
  'Bags & Handbags',
  'Jewellery',
  'Activewear',
  'Innerwear & Sleepwear',
  'Winter Wear',
  'Sarees',
  'Kurtas & Suits',
];

export default function ProductFilter({ filters, onChange, onReset }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div className="bg-[#000000] border border-gray-900 p-6 space-y-8 sticky top-28">
      <div className="flex items-center justify-between border-b border-gray-900 pb-4">
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Filters</h3>
        <button onClick={onReset} className="text-[9px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1">
          <X className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Search */}
      <div className="space-y-3">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Search Keywords</label>
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 stroke-[1.5]" />
            <input
            type="text"
            placeholder="TYPE TO SEARCH..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-field pl-11 text-[10px] font-bold tracking-widest uppercase"
            />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Category</label>
        <select value={filters.category || ''} onChange={(e) => handleChange('category', e.target.value)} className="input-field text-[10px] font-bold tracking-widest uppercase">
          <option value="">All Collections</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Price Range (₹)</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number" placeholder="MIN" value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="input-field text-[10px] font-bold tracking-widest font-mono" min="0"
          />
          <input
            type="number" placeholder="MAX" value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="input-field text-[10px] font-bold tracking-widest font-mono" min="0"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-3">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Sort Preference</label>
        <select value={filters.sort || ''} onChange={(e) => handleChange('sort', e.target.value)} className="input-field text-[10px] font-bold tracking-widest uppercase">
          <option value="">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Most Popular</option>
        </select>
      </div>
    </div>
  );
}
