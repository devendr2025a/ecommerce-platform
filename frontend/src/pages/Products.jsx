import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
  ArrowLeft,
  ShoppingBag,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import ProductFilter from "../components/products/ProductFilter";
import ProductSkeleton from "../components/products/ProductSkeleton";
import { ALL_GROCERY_PRODUCTS, GROSLIY_CATEGORIES } from "../data/groceryData";
import { productAPI } from "../services/api";

// ── 1. Canonical Quick-Commerce Category Sequence ──
const CATEGORY_SEQUENCE = [
  {
    key: "dairy-breakfast",
    label: "Dairy, Bread & Eggs",
    icon: "🥛",
    aliases: ["dairy-breakfast", "dairy", "milk"],
  },
  {
    key: "fruits-vegetables",
    label: "Fresh Fruits & Vegetables",
    icon: "🍏",
    aliases: ["fruits-vegetables", "fruits", "vegetables"],
  },
  {
    key: "beverages",
    label: "Cold Drinks & Juices",
    icon: "🧃",
    aliases: ["beverages", "drinks", "cold drinks"],
  },
  {
    key: "snacks-branded-foods",
    label: "Snacks & Munchies",
    icon: "🍿",
    aliases: ["snacks-branded-foods", "snacks", "munchies", "biscuits"],
  },
  {
    key: "bakery-cakes",
    label: "Bakery, Cakes & Sweets",
    icon: "🎂",
    aliases: ["bakery-cakes", "bakery", "cakes", "sweet"],
  },
  {
    key: "personal-care",
    label: "Personal Care & Hygiene",
    icon: "👤",
    aliases: ["personal-care", "personal care", "bath"],
  },
  {
    key: "household-essentials",
    label: "Household & Cleaning",
    icon: "🏠",
    aliases: ["household-essentials", "household", "cleaning"],
  },
  {
    key: "baby-care",
    label: "Baby Care",
    icon: "👶",
    aliases: ["baby-care", "baby"],
  },
  {
    key: "pharma-wellness",
    label: "Pharma & Wellness",
    icon: "💊",
    aliases: ["pharma-wellness", "pharma", "wellness"],
  },
  {
    key: "meat-seafood",
    label: "Chicken, Meat & Seafood",
    icon: "🥩",
    aliases: ["meat-seafood", "meat", "chicken", "fish"],
  },
  {
    key: "pet-care",
    label: "Pet Care",
    icon: "🐾",
    aliases: ["pet-care", "pet"],
  },
];

// Priority rank mapping for global sorting
const CATEGORY_PRIORITY = {
  "dairy-breakfast": 1,
  "dairy, bread & eggs": 1,
  "dairy & breakfast": 1,
  "fruits-vegetables": 2,
  "fruits & vegetables": 2,
  "beverages": 3,
  "cold drinks & juices": 3,
  "snacks-branded-foods": 4,
  "snacks & branded foods": 4,
  "snacks & munchies": 4,
  "bakery-cakes": 5,
  "bakery & cakes": 5,
  "sweet tooth": 5,
  "personal-care": 6,
  "personal care": 6,
  "household-essentials": 7,
  "household essentials": 7,
  "cleaning essentials": 7,
  "baby-care": 8,
  "baby care": 8,
  "pharma-wellness": 9,
  "pharma & wellness": 9,
  "meat-seafood": 10,
  "meat & seafood": 10,
  "chicken, meat & fish": 10,
  "pet-care": 11,
  "pet care": 11,
};

const getCategoryRank = (product) => {
  const slug = (product.categorySlug || "").toLowerCase();
  const cat = (product.category || "").toLowerCase();
  return CATEGORY_PRIORITY[slug] || CATEGORY_PRIORITY[cat] || 90;
};

// Sub-ranking within category to group identical/adjacent products together
const getSubRank = (product) => {
  const name = (product.name || "").toLowerCase();

  // Dairy: Milk (1) -> Bread (2) -> Butter/Paneer/Cheese (3) -> Eggs (4)
  if (name.includes("milk") && !name.includes("silk")) return 1;
  if (name.includes("bread") || name.includes("pav")) return 2;
  if (name.includes("butter") || name.includes("paneer") || name.includes("cheese")) return 3;
  if (name.includes("egg")) return 4;

  // Fruits & Veg: Essentials (Potato, Onion, Tomato) (1) -> Fruits (2)
  if (name.includes("potato") || name.includes("onion") || name.includes("tomato") || name.includes("aloo") || name.includes("pyaz")) return 1;
  if (name.includes("apple") || name.includes("banana") || name.includes("fruit")) return 2;

  // Beverages: Cold Drinks (1) -> Juices (2) -> Tea/Coffee (3)
  if (name.includes("sprite") || name.includes("coca-cola") || name.includes("coke") || name.includes("thums up")) return 1;
  if (name.includes("juice") || name.includes("frooti")) return 2;
  if (name.includes("tea") || name.includes("coffee")) return 3;

  // Snacks: Chips/Crisps (1) -> Biscuits/Cookies (2)
  if (name.includes("chip") || name.includes("kurkure") || name.includes("lay's")) return 1;
  if (name.includes("biscuit") || name.includes("cookie") || name.includes("good day")) return 2;

  // Baby Care: Diapers/Pants (1) -> Lotions/Shampoos (2) -> Cereals (3)
  if (name.includes("diaper") || name.includes("pants") || name.includes("pampers")) return 1;
  if (name.includes("lotion") || name.includes("cream") || name.includes("wash") || name.includes("wipes")) return 2;
  if (name.includes("cerelac")) return 3;

  // Pharma: Acidity/Digestion (1) -> Pain Relief (2) -> Health/Antiseptic (3)
  if (name.includes("eno")) return 1;
  if (name.includes("moov") || name.includes("volini") || name.includes("vicks")) return 2;
  if (name.includes("dettol") || name.includes("news")) return 3;

  // Meat: Chicken (1) -> Fish/Seafood (2)
  if (name.includes("chicken")) return 1;
  if (name.includes("fish") || name.includes("salmon")) return 2;

  // Pet: Dog Food/Treats (1) -> Cat Food (2)
  if (name.includes("dog") || name.includes("pedigree") || name.includes("choostix")) return 1;
  if (name.includes("cat") || name.includes("whiskas")) return 2;

  return 50;
};

const DEFAULT_FILTERS = {
  search: "",
  category: "",
  brand: "",
  packSize: "",
  minPrice: "",
  maxPrice: "",
  minDiscount: "",
  sort: "sequence", // Default: Logical Grocery Sequence
  page: 1,
  limit: 50,
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);

  // Sync category & search from URL query params
  useEffect(() => {
    const cat = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    setFilters((prev) => ({
      ...prev,
      category: cat,
      search: search,
      page: 1,
    }));
  }, [searchParams]);

  // Fetch backend products whenever category or search changes
  useEffect(() => {
    setLoading(true);
    const params = {
      limit: 100,
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.search ? { search: filters.search } : {}),
      ...(filters.brand ? { brand: filters.brand } : {}),
    };

    productAPI
      .getAll(params)
      .then(({ data }) => {
        setApiProducts(data?.products || []);
      })
      .catch((err) => {
        console.warn("Backend products fetch info:", err.message);
        setApiProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters.category, filters.search, filters.brand]);

  // Filter and sequence items from combined catalog
  const filteredProducts = useMemo(() => {
    // Merge backend products with complete curated catalog
    const combinedMap = new Map();
    (apiProducts || []).forEach((p) => {
      const key = (p.name || p._id || "").toLowerCase().trim();
      combinedMap.set(key, p);
    });
    ALL_GROCERY_PRODUCTS.forEach((p) => {
      const key = (p.name || p._id || "").toLowerCase().trim();
      combinedMap.set(key, p);
    });
    const combined = Array.from(combinedMap.values());

    return combined
      .filter((p) => {
        // 1. Category Filter
        if (filters.category) {
          const targetCategory = GROSLIY_CATEGORIES.find(
            (c) => c.slug === filters.category
          );
          const targetName = targetCategory?.name?.toLowerCase() || "";
          const pCat = (p.category || "").toLowerCase();
          const pSlug = (p.categorySlug || "").toLowerCase();
          const matchesCategory =
            pSlug === filters.category.toLowerCase() ||
            pCat.includes(filters.category.toLowerCase()) ||
            (targetName && pCat.includes(targetName));

          if (!matchesCategory) return false;
        }

        // 2. Multi-token Search filter
        if (filters.search) {
          const q = filters.search.toLowerCase().trim();
          const tokens = q
            .split(/[\s,&/+-]+/)
            .map((t) => t.trim())
            .filter((t) => t.length >= 2);

          const name = (p.name || "").toLowerCase();
          const brand = (p.brand || "").toLowerCase();
          const cat = (p.category || "").toLowerCase();
          const slug = (p.categorySlug || "").toLowerCase();
          const desc = (p.description || "").toLowerCase();
          const fullText = `${name} ${brand} ${cat} ${slug} ${desc}`;

          const exactMatch = fullText.includes(q);
          const tokenMatch =
            tokens.length > 0 && tokens.some((t) => fullText.includes(t));

          if (!exactMatch && !tokenMatch) return false;
        }

        // 3. Brand filter
        if (filters.brand) {
          if ((p.brand || "").toLowerCase() !== filters.brand.toLowerCase()) {
            return false;
          }
        }

        // 4. Pack Size filter
        if (filters.packSize) {
          const unit = (p.unit || "").toLowerCase();
          const pack = (p.packSize || "").toLowerCase();
          const target = filters.packSize.toLowerCase();
          if (!unit.includes(target) && !pack.includes(target)) {
            return false;
          }
        }

        // 5. Price filter
        const price = p.finalPrice || p.price;
        if (filters.minPrice && price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && price > Number(filters.maxPrice)) return false;

        // 6. Discount filter
        if (filters.minDiscount && (p.discount || 0) < Number(filters.minDiscount)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.finalPrice || a.price;
        const priceB = b.finalPrice || b.price;

        if (filters.sort === "price-asc") return priceA - priceB;
        if (filters.sort === "price-desc") return priceB - priceA;
        if (filters.sort === "discount-desc") return (b.discount || 0) - (a.discount || 0);
        if (filters.sort === "name-asc") return a.name.localeCompare(b.name);

        // Default: Strict Logical Quick-Commerce Grocery Category Sequence
        const rankA = getCategoryRank(a);
        const rankB = getCategoryRank(b);
        if (rankA !== rankB) return rankA - rankB;

        // Sub-ranking within category (e.g. Milk before Bread, Aloo before Apples)
        const subA = getSubRank(a);
        const subB = getSubRank(b);
        if (subA !== subB) return subA - subB;

        return a.name.localeCompare(b.name);
      });
  }, [filters, apiProducts]);

  // Group products into clean sequential sections when viewing "All Items"
  const isAllView = !filters.category && !filters.search && (!filters.sort || filters.sort === "sequence");

  const groupedSections = useMemo(() => {
    if (!isAllView) return null;

    return CATEGORY_SEQUENCE.map((seq) => {
      const items = filteredProducts.filter((p) => {
        const pSlug = (p.categorySlug || "").toLowerCase();
        const pCat = (p.category || "").toLowerCase();
        return (
          seq.aliases.some((alias) => pSlug.includes(alias) || pCat.includes(alias))
        );
      });
      return { ...seq, items };
    }).filter((section) => section.items.length > 0);
  }, [isAllView, filteredProducts]);

  // Current category display details
  const activeCategoryObj = GROSLIY_CATEGORIES.find(
    (c) => c.slug === filters.category
  );
  const pageTitle = activeCategoryObj
    ? activeCategoryObj.name
    : filters.search
    ? `Search: "${filters.search}"`
    : "All Grocery Items";

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (newFilters.category !== filters.category) {
      if (newFilters.category) {
        setSearchParams({ category: newFilters.category });
      } else {
        setSearchParams({});
      }
    }
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchParams({});
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-4 sm:py-6">
      <div className="max-w-[1500px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Breadcrumbs & Title */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Link to="/" className="hover:text-[#008848] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Home
              </Link>
              <span>/</span>
              <span className="text-gray-800 font-semibold">{pageTitle}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-gray-950 tracking-tight flex items-center gap-2">
              {activeCategoryObj?.icon && <span>{activeCategoryObj.icon}</span>}
              <span>{pageTitle}</span>
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Showing {filteredProducts.length} items in Lucknow • 10–30 min delivery
            </p>
          </div>

          {/* Right Controls: Sort Dropdown & Mobile Filter Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#008848]" />
              <select
                value={filters.sort}
                onChange={(e) =>
                  handleFilterChange({ ...filters, sort: e.target.value })
                }
                className="text-xs font-bold text-gray-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="sequence">Sequence: Grocery Standard</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount-desc">Highest Discount</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden inline-flex items-center justify-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#008848]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Chips Bar (Top quick switcher) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3 mb-3">
          <button
            onClick={() => handleFilterChange({ ...filters, category: "", page: 1 })}
            className={`px-3 py-1 text-xs font-bold rounded-full flex-shrink-0 transition-all cursor-pointer ${
              !filters.category
                ? "bg-[#008848] text-white shadow-2xs"
                : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300"
            }`}
          >
            All Items
          </button>
          {CATEGORY_SEQUENCE.map((cat) => {
            const isSelected = filters.category === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() =>
                  handleFilterChange({ ...filters, category: cat.key, page: 1 })
                }
                className={`px-3 py-1 text-xs font-bold rounded-full flex-shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#008848] text-white shadow-2xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label.split(",")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Layout: Sidebar + Products Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <ProductFilter
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right Main Product Showcase (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                <ProductSkeleton count={8} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-10 text-center max-w-md mx-auto shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-black text-gray-900 mb-1">
                  No items found
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Try clearing or adjusting your search filters to find products.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#008848] text-white text-xs font-bold px-5 py-2 rounded-lg shadow-2xs hover:bg-[#00703b] transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : isAllView && groupedSections && groupedSections.length > 0 ? (
              /* ── Grouped Sequential View when browsing All Items ── */
              <div className="space-y-7">
                {groupedSections.map((section) => (
                  <section key={section.key} className="space-y-3 text-left">
                    {/* Section Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{section.icon}</span>
                        <h2 className="text-sm sm:text-base font-black text-gray-950 tracking-tight">
                          {section.label}
                        </h2>
                        <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {section.items.length} items
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          handleFilterChange({
                            ...filters,
                            category: section.key,
                            page: 1,
                          })
                        }
                        className="text-xs font-extrabold text-[#008848] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>See All</span>
                        <span>→</span>
                      </button>
                    </div>

                    {/* Section 4-Column Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                      {section.items.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              /* ── Filtered / Specific Category View ── */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-4 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="text-sm font-black text-gray-900">
                  Filters & Categories
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <ProductFilter
                filters={filters}
                onChange={(f) => {
                  handleFilterChange(f);
                  setShowMobileFilters(false);
                }}
                onReset={() => {
                  handleResetFilters();
                  setShowMobileFilters(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
