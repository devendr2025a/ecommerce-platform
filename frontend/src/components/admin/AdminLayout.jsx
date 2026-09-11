import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Menu,
  X,
  LogOut,
  Store,
  ExternalLink,
  ShieldCheck,
  Bell,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GrosliyLogo from '../common/GrosliyLogo';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products & Inventory', icon: Package },
  { to: '/admin/orders', label: 'Orders & Fulfillment', icon: ShoppingBag },
  { to: '/admin/users', label: 'Customers & Users', icon: Users },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#062417] text-white select-none">
      {/* 1. Header & Brand Logo */}
      <div className="p-5 border-b border-emerald-900/60 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2.5">
          <GrosliyLogo variant="light" />
        </Link>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#008848] bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded-md">
          Admin Ops
        </span>
      </div>

      {/* 2. Admin Quick Profile / Hub Badge */}
      <div className="mx-4 my-3.5 p-3 rounded-2xl bg-emerald-950/50 border border-emerald-800/40 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#008848] to-[#044424] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
          {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white truncate block">
              {user?.name || 'Administrator'}
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-300/80 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Lucknow Hub Live</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-500/70">
          Management
        </div>

        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-xs sm:text-sm font-bold group ${
                isActive
                  ? 'bg-[#008848] text-white shadow-md shadow-[#008848]/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-emerald-400/80 group-hover:text-white'
                }`}
              />
              <span className="truncate">{label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white ml-auto shadow-xs" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 4. Bottom Actions (View Store & Logout) */}
      <div className="p-3 border-t border-emerald-900/60 space-y-1">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-200/80 hover:bg-emerald-900/40 hover:text-white transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Store className="w-4 h-4 text-emerald-400" />
            <span>View Public Store</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-300/80 hover:bg-rose-950/30 hover:text-rose-200 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f7f9f7] text-gray-800 font-sans overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-60 flex-shrink-0 flex-col shadow-xl z-20 border-r border-emerald-950/80">
        <SidebarContent />
      </aside>

      {/* ── Mobile Drawer Sidebar ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-60 max-w-[80vw] h-full flex flex-col z-10 shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200/80 px-4 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs z-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-gray-600 hover:text-[#008848] hover:bg-emerald-50 transition-colors"
              aria-label="Open Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#008848]" />
              <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
                Grosliy Operations Console
              </span>
              <span className="hidden sm:inline-block text-gray-300">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#008848] bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                <span>Lucknow Delivery Active</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Direct Store Link Button */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 px-3 py-1 rounded-full transition-all"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            {/* Notification Bell Icon */}
            <div className="w-7.5 h-7.5 rounded-full bg-gray-50 border border-gray-200/80 flex items-center justify-center text-gray-600 hover:text-[#008848] hover:bg-emerald-50 transition-colors cursor-pointer relative">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#008848]" />
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 lg:p-6">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
