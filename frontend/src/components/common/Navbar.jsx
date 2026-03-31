import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const NAV_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'Shop',        to: '/products' },
  { label: 'New',         to: '/products?sort=newest' },
  { label: 'About Us',    to: '/about' },
  { label: 'Contact Us',  to: '/contact' },
  { label: 'Track Order', to: '/track-order' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = async () => { await logout(); navigate('/'); setDropdownOpen(false); };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      {/* ── Announcement Bar ── */}
      <div className="bg-[var(--vg-red)] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] py-2 sm:py-2.5 px-4 text-center leading-tight">
        Free Shipping on all orders above ₹499
      </div>

      {/* ── Main Nav ── */}
      <nav className={`bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md' : ''} border-b border-[var(--vg-border)]`}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center h-[56px] sm:h-[64px] lg:h-[70px]">

            {/* Mobile: Hamburger (left) */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Desktop: Left nav links */}
            <div className="hidden lg:flex items-center gap-7 flex-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[var(--vg-red)] group-hover:w-full transition-all duration-200" />
                </Link>
              ))}
            </div>

            {/* Center: Logo */}
            <div className="flex-1 lg:flex-none flex items-center justify-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/assets/logo.png"
                  alt="AVROTIDE"
                  className="h-7 sm:h-8 lg:h-9 w-auto brightness-0 select-none"
                />
              </Link>
            </div>

            {/* Right: Action Icons */}
            <div className="flex items-center flex-1 justify-end">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 sm:p-2.5 text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors"
                aria-label="Search"
              >
                <Search className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
              </button>

              {/* Wishlist — hidden on very small screens */}
              <Link
                to="/wishlist"
                className="hidden sm:flex p-2 sm:p-2.5 text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[var(--vg-red)] rounded-full" />
                )}
              </Link>

              {/* Account — desktop dropdown, mobile: link in menu */}
              <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2.5 text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors"
                  aria-label="Account"
                >
                  <User className="h-[18px] w-[18px]" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[var(--vg-border)] shadow-xl z-[100]">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-[var(--vg-border)]">
                          <p className="text-[10px] uppercase tracking-widest text-[var(--vg-muted)] mb-0.5">Signed in as</p>
                          <p className="text-xs font-bold text-[var(--vg-black)] truncate">{user.name}</p>
                        </div>
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-text)] hover:text-[var(--vg-red)] hover:bg-[var(--vg-gray)]">My Account</Link>
                        <Link to="/orders" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-text)] hover:text-[var(--vg-red)] hover:bg-[var(--vg-gray)]">My Orders</Link>
                        {isAdmin && <Link to="/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-red)] hover:bg-[var(--vg-gray)]">Admin Panel</Link>}
                        <div className="h-px bg-[var(--vg-border)] my-1" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-muted)] hover:text-[var(--vg-red)] hover:bg-[var(--vg-gray)]">Sign Out</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-text)] hover:text-[var(--vg-red)] hover:bg-[var(--vg-gray)]">Sign In</Link>
                        <Link to="/register" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--vg-text)] hover:text-[var(--vg-red)] hover:bg-[var(--vg-gray)]">Create Account</Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 sm:p-2.5 text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--vg-red)] text-white text-[9px] font-black rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Search Bar ── */}
        {searchOpen && (
          <div className="border-t border-[var(--vg-border)] bg-[var(--vg-gray)] px-4 sm:px-6 py-3 sm:py-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="input-field flex-1 text-sm"
              />
              <button type="submit" className="btn-primary px-4 sm:px-6 whitespace-nowrap">Search</button>
            </form>
          </div>
        )}

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 top-[calc(56px+36px)] sm:top-[calc(64px+36px)] bg-white z-40 overflow-y-auto border-t border-[var(--vg-border)]">
            <div className="px-5 py-4">
              {/* Nav links */}
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center justify-between py-4 border-b border-[var(--vg-border)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors"
                >
                  {label}
                </Link>
              ))}

              {/* Account section */}
              <div className="mt-2">
                {user ? (
                  <>
                    <div className="py-4 border-b border-[var(--vg-border)]">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--vg-muted)] mb-0.5">Signed in as</p>
                      <p className="text-sm font-bold text-[var(--vg-black)]">{user.name}</p>
                    </div>
                    <Link to="/dashboard" className="flex py-4 border-b border-[var(--vg-border)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors">My Account</Link>
                    <Link to="/orders" className="flex py-4 border-b border-[var(--vg-border)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors">My Orders</Link>
                    <Link to="/wishlist" className="flex py-4 border-b border-[var(--vg-border)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors">Wishlist</Link>
                    {isAdmin && <Link to="/admin" className="flex py-4 border-b border-[var(--vg-border)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-red)]">Admin Panel</Link>}
                    <button onClick={handleLogout} className="flex w-full py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-muted)] hover:text-[var(--vg-red)] transition-colors">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex py-4 border-b border-[var(--vg-border)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors">Sign In</Link>
                    <Link to="/register" className="flex py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--vg-text)] hover:text-[var(--vg-red)] transition-colors">Create Account</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
