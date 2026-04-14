import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { productAPI } from "../services/api";
import ProductCard from "../components/products/ProductCard";
import ProductFilter from "../components/products/ProductFilter";
import Loading from "../components/common/Loading";
import { useSearchParams } from "react-router-dom";

const DEFAULT_FILTERS = {
  search: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  sort: "",
  page: 1,
  limit: 12,
};

// Pagination Component
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
      <button
        onClick={handlePrev}
        disabled={!hasPrevPages}
        className={`p-3 rounded-md border border-[var(--vg-border)] transition-all duration-200 ${
          hasPrevPages
            ? "hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] cursor-pointer"
            : "opacity-40 cursor-not-allowed"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {isBeyondFirstBlock && (
        <button
          onClick={handlePrevBlock}
          className="px-3 py-2 text-xs font-bold rounded-md border border-[var(--vg-border)] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] transition-all duration-200"
          aria-label="Previous block"
        >
          ...
        </button>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`min-w-[38px] h-9 px-2 text-sm font-bold rounded-md border transition-all duration-200 ${
            currentPage === page
              ? "bg-[var(--vg-red)] text-white border-[var(--vg-red)] cursor-default"
              : "border-[var(--vg-border)] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)]"
          }`}
        >
          {page}
        </button>
      ))}

      {hasNextPages && (
        <button
          onClick={handleNextBlock}
          className="px-3 py-2 text-xs font-bold rounded-md border border-[var(--vg-border)] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] transition-all duration-200"
          aria-label="Next block"
        >
          ...
        </button>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-3 rounded-md border border-[var(--vg-border)] transition-all duration-200 ${
          currentPage !== totalPages
            ? "hover:bg-[var(--vg-gray)] hover:border-[var(--vg-red)] hover:text-[var(--vg-red)] cursor-pointer"
            : "opacity-40 cursor-not-allowed"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <span className="text-[10px] text-[var(--vg-muted)] ml-2">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [meta, setMeta] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Get category from URL
  const categoryFromUrl = searchParams.get("category");

  // Update page title based on category
  const pageTitle = categoryFromUrl
    ? `${categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1)}`
    : "All Products";

  // URL se category read karo
  useEffect(() => {
    if (categoryFromUrl) {
      console.log("Setting category filter to:", categoryFromUrl);
      setFilters((prev) => ({ ...prev, category: categoryFromUrl, page: 1 }));
    } else {
      setFilters((prev) => ({ ...prev, category: "", page: 1 }));
    }
  }, [categoryFromUrl]);

  // Fetch all products once
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.getAll({ limit: 500 }); // Fetch more products
        console.log("All products fetched:", data.products?.length);
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Filter products based on category and other filters
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    // Apply category filter
    if (filters.category) {

      filtered = filtered.filter((product) => {
        console.log("Product category:", product.category);
        console.log("Filter category:", filters.category);

        return product.category
          ?.toLowerCase()
                    // .includes("pashmina shwal");

          .includes(filters.category.toLowerCase());
      });
    }

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter((product) =>
        (product.name || "")
          .toLowerCase()
          .includes(filters.search.toLowerCase()),
      );
    }

    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => (product.price || 0) >= Number(filters.minPrice),
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => (product.price || 0) <= Number(filters.maxPrice),
      );
    }

    // Apply sorting
    if (filters.sort === "price_asc") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (filters.sort === "price_desc") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (filters.sort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    // Pagination
    const start = (filters.page - 1) * filters.limit;
    const paginatedProducts = filtered.slice(start, start + filters.limit);

    setProducts(paginatedProducts);
    setMeta({
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / filters.limit),
      page: filters.page,
      limit: filters.limit,
    });
  }, [allProducts, filters]);

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    // Remove category from URL
    const newUrl = window.location.pathname;
    window.history.pushState({}, "", newUrl);
  };

  const handlePageChange = (newPage) => {
    setFilters((f) => ({ ...f, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">
              {pageTitle}
            </h1>
            <p className="text-[11px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.3em] mt-0.5">
              {meta.total !== undefined
                ? `${meta.total} items available`
                : "Loading..."}
            </p>
            {filters.category && (
              <p className="text-[10px] text-[var(--vg-red)] mt-1">
                Showing: {filters.category}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="md:hidden flex items-center gap-2 border border-[var(--vg-border)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-black)] hover:bg-[var(--vg-gray)] transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>
        </div>

        <div className="flex gap-10">
          <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 self-start sticky top-28">
            <ProductFilter
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
            />
          </aside>

          {showFilters && (
            <div className="fixed inset-0 z-[100] md:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white p-6 overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--vg-border)]">
                  <h3 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.3em]">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-[var(--vg-muted)] hover:text-[var(--vg-black)] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <ProductFilter
                  filters={filters}
                  onChange={(f) => {
                    setFilters(f);
                    setShowFilters(false);
                  }}
                  onReset={() => {
                    handleReset();
                    setShowFilters(false);
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loading fullScreen={false} />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-5 md:gap-y-12">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={meta.totalPages || 1}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-24 bg-[var(--vg-gray)] border border-dashed border-[var(--vg-border])">
                <p className="text-[12px] font-bold text-[var(--vg-muted)] uppercase tracking-[0.4em] mb-6">
                  No products found in this category
                </p>
                <button onClick={handleReset} className="btn-primary">
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
