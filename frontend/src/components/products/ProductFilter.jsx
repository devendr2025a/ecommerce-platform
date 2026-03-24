import React from 'react';
import { Search, X } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty', 'Toys', 'Automotive', 'Grocery', 'Other'];

export default function ProductFilter({ filters, onChange, onReset }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button onClick={onReset} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
          <X className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
          className="input-field pl-9 text-sm"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select value={filters.category || ''} onChange={(e) => handleChange('category', e.target.value)} className="input-field text-sm">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number" placeholder="Min" value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="input-field text-sm" min="0"
          />
          <input
            type="number" placeholder="Max" value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="input-field text-sm" min="0"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select value={filters.sort || ''} onChange={(e) => handleChange('sort', e.target.value)} className="input-field text-sm">
          <option value="">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}
