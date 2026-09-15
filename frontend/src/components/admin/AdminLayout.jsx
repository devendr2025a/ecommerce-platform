import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ClipboardList,
  BarChart2,
  Settings,
  Menu,
  X,
  LogOut,
  Store,
  ExternalLink,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GrosliyLogo from '../common/GrosliyLogo';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/users', label: 'Customers', icon: Users },
  { to: '/admin/products?tab=inventory', label: 'Inventory', icon: ClipboardList },
  { to: '/admin/reports', label: 'Reports', icon: BarChart2 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-gray-800 border-r border-gray-100 select-none">
      {/* 1. Header & Brand Logo */}
      <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <GrosliyLogo />
        </Link>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => {
          const basePath = to.split('?')[0];
          const isActive =
            location.pathname === basePath ||
            (basePath === '/admin' && location.pathname === '/admin');

          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-xs sm:text-[13px] font-bold ${
                isActive
                  ? 'bg-[#e8f5ed] text-[#008848] shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:bg-emerald-50/50 hover:text-[#008848]'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform ${
                  isActive ? 'text-[#008848]' : 'text-gray-500'
                }`}
              />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. Bottom Card: Better Food Happier Homes */}
      <div className="p-3 border-t border-gray-100">
        <div className="relative rounded-2xl overflow-hidden border border-emerald-100/90 shadow-2xs hover:shadow-xs transition-all bg-[#f0fdf4]">
          <img
            src="/images/dashboard/sidebar_promo.png"
            alt="Better Food Happier Homes"
            className="w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8faf8] text-gray-800 font-sans overflow-hidden">
      {/* ── Desktop Sidebar (White Modern Style) ── */}
      <aside className="hidden md:flex w-60 flex-shrink-0 flex-col shadow-xs z-20">
        <SidebarContent />
      </aside>

      {/* ── Mobile Drawer Sidebar ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-60 max-w-[80vw] h-full flex flex-col z-10 shadow-2xl bg-white">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar (Matching Mockup Header) */}
        <header className="bg-white border-b border-gray-200/70 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs z-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-gray-600 hover:text-[#008848] hover:bg-emerald-50 transition-colors"
              aria-label="Open Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Global Search Bar (Matching Mockup with Ctrl + K) */}
            <div className="relative w-64 sm:w-80 lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, products, customers..."
                className="w-full pl-9 pr-14 py-1.5 bg-gray-50 border border-gray-200/80 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-2xs">
                  Ctrl + K
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell with Red Badge Dot */}
            <div className="relative w-8 h-8 rounded-full bg-gray-50 border border-gray-200/80 flex items-center justify-center text-gray-600 hover:text-[#008848] hover:bg-emerald-50 transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </div>

            {/* Admin User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-gray-50 border border-gray-200/80 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-black text-xs shrink-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Admin Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span>{user?.name ? user.name.slice(0, 1).toUpperCase() : 'A'}</span>
                </div>
                <div className="hidden sm:block text-left pr-1 leading-tight">
                  <span className="text-xs font-bold text-gray-900 block">
                    {user?.name || 'Admin'}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 block">
                    Super Admin
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 space-y-1">
                  <Link
                    to="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#008848] transition-colors"
                  >
                    <Store className="w-4 h-4 text-emerald-600" />
                    <span>View Public Store</span>
                  </Link>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    type="button"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 lg:p-6 bg-[#f8faf8]">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
