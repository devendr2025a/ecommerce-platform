import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  MapPin,
  ChevronDown,
  User,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Package,
  Heart,
  Settings,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { GROSLIY_CATEGORIES } from "../../data/groceryData";
import GrosliyLogo from "./GrosliyLogo";

const CITIES = ["Lucknow"];

const CATEGORY_GROUPS = [
  {
    title: "Grocery & Fresh",
    items: [
      { name: "Fruits & Vegetables", slug: "fruits-vegetables" },
      { name: "Dairy & Breakfast", slug: "dairy-breakfast" },
      { name: "Bakery & Cakes", slug: "bakery-cakes" },
      { name: "Meat & Seafood", slug: "meat-seafood" },
    ],
  },
  {
    title: "Snacks & Drinks",
    items: [
      { name: "Snacks & Branded Foods", slug: "snacks-branded-foods" },
      { name: "Beverages & Drinks", slug: "beverages" },
    ],
  },
  {
    title: "Home & Care",
    items: [
      { name: "Household Essentials", slug: "household-essentials" },
      { name: "Personal Care", slug: "personal-care" },
      { name: "Baby Care", slug: "baby-care" },
      { name: "Pharma & Wellness", slug: "pharma-wellness" },
      { name: "Pet Care", slug: "pet-care" },
    ],
  },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cart, cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Lucknow");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cityRef = useRef(null);
  const userRef = useRef(null);
  const categoryRef = useRef(null);
  const categoryTimeoutRef = useRef(null);

  const handleCategoryMouseEnter = () => {
    if (categoryTimeoutRef.current) clearTimeout(categoryTimeoutRef.current);
    setCategoryDropdownOpen(true);
  };

  const handleCategoryMouseLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setCategoryDropdownOpen(false);
    }, 160);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCityDropdownOpen(false);
    setCategoryDropdownOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs transition-all">
      {/* ── 0. Top Utility Bar (Dark Forest Green) ── */}
      <div className="bg-[#0b3b24] text-emerald-100 text-[11px] font-medium py-1.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-950/40">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          {/* Left Guarantees */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">🛡️</span>
              <span className="hidden xs:inline">Freshness Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">🚚</span>
              <span>Free Delivery Above ₹499</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-emerald-400">🌿</span>
              <span>100% Organic & Safe</span>
            </div>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              to="/track-order"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>📍</span>
              <span>Track Order</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>🎧</span>
              <span>Need Help?</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 1. Main Navbar ── */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[74px] gap-4 lg:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#008848] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <GrosliyLogo />
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-gray-700">
            <Link
              to="/"
              className={`transition-colors hover:text-[#008848] ${
                location.pathname === "/" ? "text-[#008848]" : "text-gray-700"
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown Trigger & Popover */}
            <div
              className="relative"
              ref={categoryRef}
              onMouseEnter={handleCategoryMouseEnter}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1 transition-colors py-1.5 px-2.5 rounded-lg cursor-pointer text-xs font-bold ${
                  categoryDropdownOpen || (location.pathname === "/products" && !location.search)
                    ? "text-[#008848] bg-emerald-50"
                    : "text-gray-700 hover:text-[#008848] hover:bg-gray-50"
                }`}
                aria-expanded={categoryDropdownOpen}
              >
                <span>All Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    categoryDropdownOpen ? "rotate-180 text-[#008848]" : "text-gray-400"
                  }`}
                />
              </button>

              {/* Dropdown Menu - Pure Text, Category-Wise, Ultra Compact with Clean Typography */}
              {categoryDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-1.5 w-[510px] bg-white rounded-xl shadow-xl border border-gray-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={handleCategoryMouseEnter}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <div className="grid grid-cols-3 gap-2.5">
                    {CATEGORY_GROUPS.map((group) => (
                      <div key={group.title} className="flex flex-col">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800/85 px-2 pb-1 border-b border-gray-100 mb-1">
                          {group.title}
                        </div>
                        <div className="space-y-0.5">
                          {group.items.map((cat) => {
                            const isCurrent = location.search.includes(`category=${cat.slug}`);
                            return (
                              <Link
                                key={cat.name}
                                to={`/products?category=${cat.slug}`}
                                onClick={() => setCategoryDropdownOpen(false)}
                                className={`block px-2 py-1 text-[12px] rounded-md transition-colors truncate font-semibold ${
                                  isCurrent
                                    ? "text-[#008848] bg-emerald-50 font-bold"
                                    : "text-gray-700 hover:text-[#008848] hover:bg-emerald-50/70"
                                }`}
                              >
                                {cat.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between px-2 text-[11px]">
                    <Link
                      to="/products"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="font-bold text-[#008848] hover:text-[#00703b] hover:underline"
                    >
                      All Categories &amp; Products →
                    </Link>
                    <Link
                      to="/offers"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="font-bold text-orange-600 hover:underline"
                    >
                      Special Offers 🔥
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Offers with Hot Badge */}
            <Link
              to="/offers"
              className="flex items-center gap-1 hover:text-[#008848] transition-colors relative"
            >
              <span>Offers</span>
              <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">
                Hot
              </span>
            </Link>

            <Link
              to="/about"
              className="hover:text-[#008848] transition-colors"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="hover:text-[#008848] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md lg:max-w-lg">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white text-gray-900 placeholder:text-gray-400 text-xs pl-10 pr-24 py-2.5 rounded-full border border-gray-200/90 focus:border-[#008848] focus:ring-2 focus:ring-[#008848]/15 outline-none transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#008848] hover:bg-[#00703b] text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Account Dropdown */}
            <div className="relative" ref={userRef}>
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-800 hover:text-[#008848] py-1 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#008848]/10 text-[#008848] flex items-center justify-center font-bold text-xs">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden md:inline max-w-[90px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">Signed in as</p>
                        <p className="text-xs font-bold text-gray-800 truncate">{user.name}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#008848] transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#008848] transition-colors"
                      >
                        <Package className="w-4 h-4 text-gray-400" /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#008848] hover:bg-emerald-50 transition-colors"
                        >
                          <Settings className="w-4 h-4" /> Admin Portal
                        </Link>
                      )}
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-[#008848] text-xs font-bold py-1.5 px-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="hidden md:inline">My Account</span>
                </Link>
              )}
            </div>

            {/* Cart Pill (Icon + Count + Price) */}
            <Link
              to="/cart"
              className="flex items-center gap-2 bg-[#f0fdf4] hover:bg-emerald-100/70 border border-emerald-200 text-[#008848] px-3 py-1.5 rounded-full transition-all shadow-2xs hover:shadow-xs group"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#008848] text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-extrabold text-gray-900 group-hover:text-[#008848] transition-colors">
                ₹{cart?.totalAmount ? cart.totalAmount.toLocaleString("en-IN") : "0"}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full bg-[#f1f4f6] text-gray-800 placeholder:text-gray-400 text-sm pl-10 pr-4 py-2 rounded-lg border border-transparent focus:border-[#008848] focus:bg-white focus:outline-none"
            />
          </form>
        </div>
      </div>

      {/* ── 2. Category Navigation Bar (Auto-running smoothly from Right to Left, pause on hover) ── */}
      <div className="border-t border-gray-100 bg-[#fbfdfc] hidden lg:block overflow-hidden relative group">
        {/* Subtle left & right gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#fbfdfc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#fbfdfc] to-transparent z-10 pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="animate-marquee-left flex items-center gap-2 py-1.5 text-xs font-semibold text-gray-700">
            {/* Duplicated list of categories for seamless continuous right-to-left loop */}
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="flex items-center gap-2 flex-shrink-0">
                <Link
                  to="/products"
                  className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors text-[12px] font-bold ${
                    location.pathname === "/products" && !location.search
                      ? "bg-[#008848] text-white shadow-2xs"
                      : "hover:bg-emerald-50 hover:text-[#008848]"
                  }`}
                >
                  All Items
                </Link>
                {GROSLIY_CATEGORIES.filter((c) => c.id !== "more").map((cat) => {
                  const isActive = location.search.includes(`category=${cat.slug}`);
                  return (
                    <Link
                      key={`${copyIndex}-${cat.id}`}
                      to={`/products?category=${cat.slug}`}
                      className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-all text-[12px] font-semibold ${
                        isActive
                          ? "bg-[#008848] text-white shadow-2xs"
                          : "text-gray-700 hover:text-[#008848] hover:bg-emerald-50"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
                <span className="text-gray-300 select-none px-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[118px] bg-black/40 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="w-72 max-w-[80vw] h-full bg-white shadow-2xl p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4 text-[#008848]" />
                <span className="text-xs">Location: <strong className="text-gray-900">{selectedCity}</strong></span>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                to="/products"
                className="flex items-center gap-2 py-2 px-2 text-sm font-bold text-gray-800 hover:bg-emerald-50 hover:text-[#008848] rounded-lg transition-colors"
              >
                <span>🧺</span>
                <span>All Groceries</span>
              </Link>
              <Link
                to="/offers"
                className="flex items-center justify-between py-2 px-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50 hover:text-[#008848] rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>🔥</span>
                  <span>Offers &amp; Deals</span>
                </div>
                <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  HOT
                </span>
              </Link>

              <div className="pt-2 pb-1 border-t border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-2 mb-1">
                  All Categories
                </p>
                {GROSLIY_CATEGORIES.filter((c) => c.id !== "more").map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="block py-1.5 px-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#008848] rounded-lg transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100">
                <Link to="/about" className="block py-2 px-2 text-xs font-medium text-gray-600 hover:text-[#008848]">
                  About Grosliy
                </Link>
                <Link to="/contact" className="block py-2 px-2 text-xs font-medium text-gray-600 hover:text-[#008848]">
                  Customer Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
