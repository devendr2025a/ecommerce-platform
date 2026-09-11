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
import GrosliyLogo from "./GrosliyLogo";

const CITIES = ["Lucknow"];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cart, cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Lucknow");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cityRef = useRef(null);
  const userRef = useRef(null);

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCityDropdownOpen(false);
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

            {/* Categories Link */}
            <Link
              to="/products"
              className="flex items-center gap-1 hover:text-[#008848] transition-colors"
            >
              <span>All Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </Link>

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

            <div className="space-y-3">
              <Link to="/products" className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#008848]">
                All Groceries
              </Link>
              <Link to="/offers" className="flex items-center justify-between py-2 text-sm font-bold text-emerald-700 hover:text-[#008848]">
                <span>Offers &amp; Wholesale</span>
                <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  HOT
                </span>
              </Link>
              <Link to="/products?category=fruits-vegetables" className="block py-2 text-sm text-gray-600 hover:text-[#008848]">
                Fruits & Vegetables
              </Link>
              <Link to="/products?category=dairy-breakfast" className="block py-2 text-sm text-gray-600 hover:text-[#008848]">
                Dairy & Breakfast
              </Link>
              <Link to="/products?category=snacks-branded-foods" className="block py-2 text-sm text-gray-600 hover:text-[#008848]">
                Snacks & Branded Foods
              </Link>
              <Link to="/products?category=beverages" className="block py-2 text-sm text-gray-600 hover:text-[#008848]">
                Beverages
              </Link>
              <Link to="/about" className="block py-2 text-sm text-gray-600 hover:text-[#008848]">
                About Grosliy
              </Link>
              <Link to="/contact" className="block py-2 text-sm text-gray-600 hover:text-[#008848]">
                Customer Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
