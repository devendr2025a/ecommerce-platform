import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Package, LogOut, LayoutDashboard, ShoppingBag, Heart, Search, ChevronDown, Grid3X3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CATEGORIES = [
  { name: "Women's Wear",         emoji: '👗' },
  { name: "Men's Wear",           emoji: '👔' },
  { name: "Kids' Wear",           emoji: '🧒' },
  { name: 'Ethnic Wear',          emoji: '🥻' },
  { name: 'Western Wear',         emoji: '👖' },
  { name: 'Footwear',             emoji: '👟' },
  { name: 'Accessories',          emoji: '👜' },
  { name: 'Bags & Handbags',      emoji: '👛' },
  { name: 'Jewellery',            emoji: '💍' },
  { name: 'Activewear',           emoji: '🏃' },
  { name: 'Innerwear & Sleepwear',emoji: '🩲' },
  { name: 'Winter Wear',          emoji: '🧥' },
  { name: 'Sarees',               emoji: '🪭' },
  { name: 'Kurtas & Suits',       emoji: '👘' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen]           = useState(false);
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [catOpen, setCatOpen]             = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');

  const dropdownRef = useRef(null);
  const catRef      = useRef(null);

  // close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (catRef.current      && !catRef.current.contains(e.target))      setCatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      {/* ── Top bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl flex-shrink-0">
            <ShoppingBag className="h-6 w-6" />
            <span className="hidden sm:inline">ShopEasy</span>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full rounded-xl border border-gray-200 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input
                type="text"
                placeholder="Search products, brands & more…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm outline-none bg-gray-50 text-gray-800 placeholder-gray-400"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 flex items-center justify-center flex-shrink-0">
                <Search className="h-4 w-4 text-white" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 text-gray-500 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User menu — desktop */}
            {user ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="h-4 w-4 text-gray-400" /> My Profile
                    </Link>
                    <Link to="/orders" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Package className="h-4 w-4 text-gray-400" /> My Orders
                    </Link>
                    <Link to="/wishlist" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Heart className="h-4 w-4 text-gray-400" /> Wishlist
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors">
                        <LayoutDashboard className="h-4 w-4" /> Admin Panel
                      </Link>
                    )}
                    <hr className="my-1.5 border-gray-100" />
                    <button onClick={handleLogout}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left transition-colors">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login"    className="btn-secondary text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary  text-sm py-2 px-4">Sign Up</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Category bar — desktop ── */}
      <div className="hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1.5">

            {/* All Categories dropdown */}
            <div className="relative flex-shrink-0" ref={catRef}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${catOpen ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Grid3X3 className="h-4 w-4" />
                All Categories
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <Link to="/products" onClick={() => setCatOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold">
                    <span>🛍️</span> All Products
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <span>{cat.emoji}</span> {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Individual category pills */}
            <div className="w-px h-5 bg-gray-200 mx-1 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap flex-shrink-0"
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          {/* Mobile search */}
          <div className="px-4 pt-3 pb-2">
            <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }}
              className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-blue-500 transition-colors">
              <input
                type="text" placeholder="Search products…"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm outline-none bg-gray-50 placeholder-gray-400"
              />
              <button type="submit" className="bg-blue-600 px-4 flex items-center">
                <Search className="h-4 w-4 text-white" />
              </button>
            </form>
          </div>

          {/* Categories section */}
          <div className="px-4 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-1">Categories</p>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span>{cat.emoji}</span> {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 mx-4" />

          {/* Account links */}
          <div className="px-4 py-2 space-y-0.5">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <User className="h-4 w-4 text-gray-400" /> My Profile
                </Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Package className="h-4 w-4 text-gray-400" /> My Orders
                </Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Heart className="h-4 w-4 text-gray-400" /> Wishlist
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-colors">
                    <LayoutDashboard className="h-4 w-4" /> Admin Panel
                  </Link>
                )}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl w-full text-left transition-colors">
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1 pb-2">
                <Link to="/login"    onClick={() => setMenuOpen(false)} className="flex-1 btn-secondary text-sm py-2.5 text-center">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 btn-primary  text-sm py-2.5 text-center">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
