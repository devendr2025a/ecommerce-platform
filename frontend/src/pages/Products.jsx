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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          {meta.total !== undefined && <p className="text-sm text-gray-500 mt-1">{meta.total} products found</p>}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 btn-secondary text-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <ProductFilter filters={filters} onChange={setFilters} onReset={handleReset} />
        </aside>

        {/* Mobile Filters Drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-72 bg-white p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
              </div>
              <ProductFilter filters={filters} onChange={(f) => { setFilters(f); setShowFilters(false); }} onReset={() => { handleReset(); setShowFilters(false); }} />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <Loading fullScreen={false} />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => <ProductCard key={product._id} product={product} />)}
              </div>
              {/* Pagination */}
              {meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                    disabled={!meta.hasPrev}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setFilters((f) => ({ ...f, page }))}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        filters.page === page ? 'bg-blue-600 text-white' : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                    disabled={!meta.hasNext}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-semibold text-gray-700">No products found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              <button onClick={handleReset} className="btn-primary mt-4">Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
