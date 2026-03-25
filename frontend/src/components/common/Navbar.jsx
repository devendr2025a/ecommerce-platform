import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Package, LogOut, LayoutDashboard, ShoppingBag, Heart, Search, ChevronDown, Grid3X3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CATEGORIES = [
  { name: "Women's Wear", emoji: '👗' },
  { name: "Men's Wear", emoji: '👔' },
  { name: "Kids' Wear", emoji: '🧒' },
  { name: 'Ethnic Wear', emoji: '🥻' },
  { name: 'Western Wear', emoji: '👖' },
  { name: 'Footwear', emoji: '👟' },
  { name: 'Accessories', emoji: '👜' },
  { name: 'Bags & Handbags', emoji: '👛' },
  { name: 'Jewellery', emoji: '💍' },
  { name: 'Activewear', emoji: '🏃' },
  { name: 'Innerwear & Sleepwear', emoji: '🩲' },
  { name: 'Winter Wear', emoji: '🧥' },
  { name: 'Sarees', emoji: '🪭' },
  { name: 'Kurtas & Suits', emoji: '👘' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const catRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
    <div className="sticky top-0 z-50">
      {/* ── Announcement Bar ── */}
      <div className="bg-[#000000] text-white text-[10px] font-bold uppercase tracking-[0.3em] py-2 px-4 text-center border-b border-gray-900">
        Free Shipping on all orders above ₹499
      </div>

      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-[#000000]/95 backdrop-blur-md shadow-2xl py-2' : 'bg-[#000000] py-4'} border-b border-gray-900`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Left: Mobile Menu Trigger & Categories Link */}
            <div className="flex items-center gap-6 flex-1">
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-1">
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <div className="hidden lg:flex items-center gap-8">
                <Link to="/products" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors">Shop All</Link>
                <div className="relative group" ref={catRef}>
                  <button 
                    onClick={() => setCatOpen(!catOpen)}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    Collections <ChevronDown className={`h-3 w-3 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {catOpen && (
                    <div className="absolute left-0 top-full mt-4 w-[600px] bg-[#000000] border border-gray-800 shadow-2xl p-6 grid grid-cols-3 gap-6 rounded-sm">
                      {CATEGORIES.slice(0, 15).map((cat) => (
                        <Link 
                          key={cat.name} 
                          to={`/products?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setCatOpen(false)}
                          className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors py-1"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link to="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors">About</Link>
              </div>
            </div>

            {/* Center: Brand Identity */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="flex items-center gap-2">
                <img src="/assets/logo.png" alt="AVROTIDE" className="h-10 w-auto brightness-0 invert select-none" />
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-3 flex-1">
              {/* Search Toggle (Desktop) */}
              <div className="hidden md:block relative max-w-[180px]">
                <form onSubmit={handleSearch}>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#111111] border border-gray-800 text-[11px] px-3 py-1.5 rounded-full w-full focus:outline-none focus:border-gray-500 text-white placeholder:text-gray-600"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                </form>
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="p-2 text-gray-400 hover:text-white transition-colors relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full border border-black animate-pulse" />}
              </Link>

              {/* User Account */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2 text-gray-400 hover:text-white transition-colors">
                  <User className="h-5 w-5" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-[#000000] border border-gray-800 shadow-2xl py-3 rounded-sm z-[100]">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-900 mb-2">
                          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">Welcome</p>
                          <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        </div>
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-gray-900">Dashboard</Link>
                        <Link to="/orders" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-gray-900">Orders</Link>
                        {isAdmin && <Link to="/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 hover:bg-gray-900">Admin</Link>}
                        <div className="h-px bg-gray-900 my-2" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 hover:bg-gray-900">Sign Out</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-gray-900">Sign In</Link>
                        <Link to="/register" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-gray-900">Create Account</Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="flex items-center gap-1.5 p-2 bg-[#111111] hover:bg-[#1a1a1a] border border-gray-800 rounded-full transition-all group px-3">
                <ShoppingCart className="h-4 w-4 text-gray-100 group-hover:text-white" />
                <span className="text-[10px] font-black text-white min-w-[12px] text-center">{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Mobile Search & Menu ── */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#000000] border-t border-gray-900 h-screen overflow-y-auto px-6 py-8">
            <form onSubmit={handleSearch} className="mb-10">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="SEARCH PRODUCTS..." 
                  className="w-full bg-transparent border-b border-gray-800 py-3 text-sm focus:outline-none focus:border-white text-white uppercase tracking-widest placeholder:text-gray-600" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </form>
            
            <div className="flex flex-col gap-6">
              <Link to="/products" className="text-lg font-black uppercase tracking-widest text-white border-b border-gray-900 pb-2">Shop All</Link>
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Categories</p>
                <div className="grid grid-cols-1 gap-4">
                  {CATEGORIES.map((cat) => (
                    <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
