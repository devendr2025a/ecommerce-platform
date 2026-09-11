import React from "react";
import { Search, X, Filter } from "lucide-react";
import { GROSLIY_CATEGORIES } from "../../data/groceryData";

const PACK_SIZES = ["100g", "250g", "500g", "1kg", "750ml", "1L"];

const POPULAR_BRANDS = [
  "Amul",
  "TATA",
  "Maggi",
  "Lay's",
  "Coca-Cola",
  "Britannia",
  "Nestle",
  "Dettol",
  "Farm Fresh",
];

const PRICE_RANGES = [
  { label: "Under ₹50", max: 50 },
  { label: "₹50 – ₹100", min: 50, max: 100 },
  { label: "₹100 – ₹250", min: 100, max: 250 },
  { label: "Above ₹250", min: 250 },
];

export default function ProductFilter({ filters, onChange, onReset }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div className="space-y-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#008848]" />
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-gray-900">
            Filters
          </h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700">Search Item</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. Milk, Potato, Coke..."
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:bg-white focus:border-[#008848] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Grocery Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700">Grocery Category</label>
        <select
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-[#008848] focus:outline-none transition-all font-medium"
        >
          <option value="">All Categories</option>
          {GROSLIY_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Price Ranges */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700">Price Range</label>
        <div className="grid grid-cols-2 gap-1.5">
          {PRICE_RANGES.map((range, idx) => {
            const isSelected =
              filters.minPrice === (range.min || "") &&
              filters.maxPrice === (range.max || "");
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    onChange({ ...filters, minPrice: "", maxPrice: "", page: 1 });
                  } else {
                    onChange({
                      ...filters,
                      minPrice: range.min || "",
                      maxPrice: range.max || "",
                      page: 1,
                    });
                  }
                }}
                className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                  isSelected
                    ? "bg-[#008848] text-white border-[#008848] shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-300"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
        {/* Custom Price Inputs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <input
            type="number"
            placeholder="Min ₹"
            value={filters.minPrice || ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:bg-white focus:border-[#008848] focus:outline-none"
            min="0"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={filters.maxPrice || ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:bg-white focus:border-[#008848] focus:outline-none"
            min="0"
          />
        </div>
      </div>

      {/* Pack Size / Quantity */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700">Pack Size</label>
        <div className="grid grid-cols-3 gap-1.5">
          {PACK_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleChange("packSize", filters.packSize === size ? "" : size)}
              className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-all ${
                filters.packSize === size
                  ? "bg-[#008848] text-white border-[#008848]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Grocery Brands */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700">Brand</label>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_BRANDS.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => handleChange("brand", filters.brand === brand ? "" : brand)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border transition-all ${
                filters.brand === brand
                  ? "bg-[#008848] text-white border-[#008848]"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-emerald-300"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Discount */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700">Minimum Discount</label>
        <div className="grid grid-cols-3 gap-1.5">
          {[10, 20, 25].map((disc) => (
            <button
              key={disc}
              type="button"
              onClick={() => handleChange("minDiscount", filters.minDiscount === disc ? "" : disc)}
              className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-all ${
                filters.minDiscount === disc
                  ? "bg-[#dcfce7] text-[#15803d] border-[#15803d] font-bold"
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
              }`}
            >
              {disc}% or more
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700">Sort By</label>
        <select
          value={filters.sort || "best-selling"}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-[#008848] focus:outline-none transition-all font-medium"
        >
          <option value="best-selling">Best Selling</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="discount-desc">Discount: High → Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}
