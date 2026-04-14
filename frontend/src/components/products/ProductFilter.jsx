import React from 'react';
import { Search, X } from 'lucide-react';

const CATEGORIES = [
  "Silk Sarees", // silk sarees
  '100% Cotton Kurtas',
  'Chikankari Suits',
  'Pashmina Shwal',
  'Linen Shirts & Pants',
  'Accessories'
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const MATERIALS = ['Cotton', 'Linen', 'Silk', 'Denim', 'Wool', 'Synthetic'];
const OCCASIONS = ['Casual', 'Formal', 'Party', 'Ethnic', 'Sport'];

export default function ProductFilter({ filters, onChange, onReset }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--vg-border)]">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--vg-black)]">Filter</h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--vg-muted)] hover:text-[var(--vg-red)] transition-colors"
        >
          <X className="h-3 w-3" /> Clear All
        </button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--vg-muted)]">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--vg-muted)]" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-field pl-9 text-[12px]"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--vg-muted)]">Category</label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="input-field text-[12px] uppercase"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--vg-muted)]">Size</label>
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => handleChange('size', filters.size === size ? '' : size)}
              className={`h-9 text-[10px] font-bold border uppercase tracking-wider transition-colors ${
                filters.size === size
                  ? 'bg-[var(--vg-black)] text-white border-[var(--vg-black)]'
                  : 'bg-white text-[var(--vg-muted)] border-[var(--vg-border)] hover:border-[var(--vg-black)] hover:text-[var(--vg-black)]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--vg-muted)]">Price (₹)</label>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={(e) => handleChange('minPrice', e.target.value)} className="input-field text-[12px]" min="0" />
          <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={(e) => handleChange('maxPrice', e.target.value)} className="input-field text-[12px]" min="0" />
        </div>
      </div>

      {/* Material */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--vg-muted)]">Material</label>
        <select value={filters.material || ''} onChange={(e) => handleChange('material', e.target.value)} className="input-field text-[12px] uppercase">
          <option value="">Any Material</option>
          {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Occasion */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--vg-muted)]">Occasion</label>
        <select value={filters.occasion || ''} onChange={(e) => handleChange('occasion', e.target.value)} className="input-field text-[12px] uppercase">
          <option value="">All Occasions</option>
          {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--vg-muted)]">Sort By</label>
        <select value={filters.sort || 'best-selling'} onChange={(e) => handleChange('sort', e.target.value)} className="input-field text-[12px] uppercase">
          <option value="best-selling">Best Selling</option>
          <option value="trending">Trending Now</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Most Popular</option>
        </select>
      </div>
    </div>
  );
}
