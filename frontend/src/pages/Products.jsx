import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import Loading from '../components/common/Loading';

const DEFAULT_FILTERS = { search: '', category: '', minPrice: '', maxPrice: '', sort: '', page: 1, limit: 12 };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
      const { data } = await productAPI.getAll(cleanFilters);
      setProducts(data.products);
      setMeta(data.meta);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col gap-2 mb-12">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Explore Collections</h1>
        <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">
                {meta.total !== undefined ? `${meta.total} Items Available` : 'Loading...'}
            </p>
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 btn-secondary text-[10px] tracking-widest uppercase font-black py-2 px-4 shadow-none border-gray-900"
            >
                <SlidersHorizontal className="h-3 w-3" />
                Filters
            </button>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          <ProductFilter filters={filters} onChange={setFilters} onReset={handleReset} />
        </aside>

        {/* Mobile Filters Drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-black border-l border-gray-900 p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-900">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-white transition-colors">
                    <X className="h-5 w-5" />
                </button>
              </div>
              <ProductFilter filters={filters} onChange={(f) => { setFilters(f); setShowFilters(false); }} onReset={() => { handleReset(); setShowFilters(false); }} />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {/* Skeletons could go here, for now using Loading component */}
                <div className="col-span-full py-32 text-center">
                    <Loading fullScreen={false} />
                </div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                {products.map((product) => <ProductCard key={product._id} product={product} />)}
              </div>
              
              {/* Pagination */}
              {meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-24 border-t border-gray-900 pt-12">
                  <button
                    onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                    disabled={!meta.hasPrev}
                    className="p-3 text-white hover:bg-gray-950 disabled:opacity-20 border border-gray-900 transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                        key={page}
                        onClick={() => setFilters((f) => ({ ...f, page }))}
                        className={`w-10 h-10 text-[11px] font-black transition-all border ${
                            filters.page === page 
                            ? 'bg-white text-black border-white' 
                            : 'text-gray-500 border-gray-900 hover:border-gray-600'
                        }`}
                        >
                        {page}
                        </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                    disabled={!meta.hasNext}
                    className="p-3 text-white hover:bg-gray-950 disabled:opacity-20 border border-gray-900 transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-40 bg-[#020202] border border-dashed border-gray-900">
              <p className="text-xs font-black text-gray-500 uppercase tracking-[0.4em] mb-6">No matches found in our records</p>
              <button onClick={handleReset} className="btn-primary">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
