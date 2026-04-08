import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import Loading from '../components/common/Loading';

const DEFAULT_FILTERS = { search: '', category: '', minPrice: '', maxPrice: '', sort: '', page: 1, limit: 12 };

// Pagination Component - Inline for this page
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const visiblePages = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  };

  const visiblePages = getVisiblePages();
  const hasNextPages = totalPages > 5;
  const hasPrevPages = currentPage > 1;
  const isBeyondFirstBlock = currentPage > 5;

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextBlock = () => {
    const nextBlockStart = Math.floor((currentPage - 1) / 5) * 5 + 6;
    if (nextBlockStart <= totalPages) {
      onPageChange(nextBlockStart);
    }
  };

  const handlePrevBlock = () => {
    const prevBlockStart = Math.floor((currentPage - 1) / 5) * 5;
    if (prevBlockStart >= 1) {
      onPageChange(prevBlockStart);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16 pt-10 border-t border-[var(--vg-border)] flex-wrap">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={!hasPrevPages}
        className={`p-3 rounded-md border border-[var(--vg-border)] transition-all duration-200 ${
          hasPrevPages 
            ? 'hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] cursor-pointer' 
            : 'opacity-40 cursor-not-allowed'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Previous Block Button */}
      {isBeyondFirstBlock && (
        <button
          onClick={handlePrevBlock}
          className="px-3 py-2 text-xs font-bold rounded-md border border-[var(--vg-border)] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] transition-all duration-200"
          aria-label="Previous block"
        >
          ...
        </button>
      )}

      {/* Page Numbers (1 to 5) */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`min-w-[38px] h-9 px-2 text-sm font-bold rounded-md border transition-all duration-200 ${
            currentPage === page
              ? 'bg-[var(--vg-red)] text-white border-[var(--vg-red)] cursor-default'
              : 'border-[var(--vg-border)] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)]'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Block Button */}
      {hasNextPages && (
        <button
          onClick={handleNextBlock}
          className="px-3 py-2 text-xs font-bold rounded-md border border-[var(--vg-border)] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] transition-all duration-200"
          aria-label="Next block"
        >
          ...
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-3 rounded-md border border-[var(--vg-border)] transition-all duration-200 ${
          currentPage !== totalPages
            ? 'hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] cursor-pointer'
            : 'opacity-40 cursor-not-allowed'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Total Pages Indicator */}
      <span className="text-[10px] text-[var(--vg-muted)] ml-2">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

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
      console.log("here i am =================================>");
      console.log(data.products);
      setMeta(data.meta);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  const handlePageChange = (newPage) => {
    setFilters((f) => ({ ...f, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">

        {/* Header bar */}
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">
              All Products
            </h1>
            <p className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.3em] mt-0.5">
              {meta.total !== undefined ? `${meta.total} items available` : 'Loading...'}
            </p>
          </div>
          {/* Mobile filter trigger */}
          <button
            onClick={() => setShowFilters(true)}
            className="md:hidden flex items-center gap-2 border border-[var(--vg-border)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 self-start sticky top-28">
            <ProductFilter filters={filters} onChange={setFilters} onReset={handleReset} />
          </aside>

          {/* Mobile Filters Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-[100] md:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white p-6 overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--vg-border)]">
                  <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-[var(--vg-muted)] hover:text-[var(--vg-black)] transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <ProductFilter
                  filters={filters}
                  onChange={(f) => { setFilters(f); setShowFilters(false); }}
                  onReset={() => { handleReset(); setShowFilters(false); }}
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loading fullScreen={false} />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-5 md:gap-y-12">
                  {products.map((product) => <ProductCard key={product._id} product={product} />)}
                </div>

                {/* New Pagination Component */}
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={meta.totalPages || 1}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-24 bg-[var(--vg-gray)] border border-dashed border-[var(--vg-border)]">
                <p className="text-[12px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.4em] mb-6">No matches found</p>
                <button onClick={handleReset} className="btn-primary">Clear All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}