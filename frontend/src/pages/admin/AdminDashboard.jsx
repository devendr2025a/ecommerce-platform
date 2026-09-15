import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Package,
  ShoppingBag,
  IndianRupee,
  ArrowRight,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  MapPin,
  ShoppingCart,
  ShieldCheck,
} from 'lucide-react';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const STATUS_CONFIG = {
  Pending: {
    badge: 'bg-amber-100/70 text-amber-800 border-amber-200/80',
    barColor: 'bg-amber-500',
    icon: Clock,
    iconColor: 'text-amber-600 bg-amber-50',
  },
  Processing: {
    badge: 'bg-sky-100/70 text-sky-800 border-sky-200/80',
    barColor: 'bg-sky-500',
    icon: Package,
    iconColor: 'text-sky-600 bg-sky-50',
  },
  Shipped: {
    badge: 'bg-purple-100/70 text-purple-800 border-purple-200/80',
    barColor: 'bg-purple-500',
    icon: Truck,
    iconColor: 'text-purple-600 bg-purple-50',
  },
  Delivered: {
    badge: 'bg-emerald-100/70 text-emerald-800 border-emerald-200/80',
    barColor: 'bg-[#008848]',
    icon: CheckCircle2,
    iconColor: 'text-emerald-600 bg-emerald-50',
  },
  Cancelled: {
    badge: 'bg-rose-100/70 text-rose-800 border-rose-200/80',
    barColor: 'bg-rose-500',
    icon: XCircle,
    iconColor: 'text-rose-600 bg-rose-50',
  },
};

// Fallback grocery thumbnails to match mockup
const GROCERY_THUMBNAILS = [
  '/images/products/veg_basket.png',
  '/images/products/bananas.jpg',
  '/images/products/biscuit1.jpg',
  '/images/products/amul_gold_milk.jpg',
  '/images/products/apples.jpg',
  '/images/products/bread.jpg',
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI
      .getStats()
      .then(({ data }) => setStats(data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading fullScreen={false} />;
  if (!stats) return null;

  const totalOrdersCount = stats.totalOrders || 0;

  // Stat Cards Data with mini sparkline wave curves matching mockup
  const statCards = [
    {
      label: 'TOTAL REVENUE',
      value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN', {
        maximumFractionDigits: 0,
      })}`,
      subtext: 'Lifetime sales earnings',
      icon: IndianRupee,
      iconColor: 'text-[#008848]',
      iconBg: 'bg-emerald-50 border-emerald-200/70',
      trend: '+14.2% this month',
      trendColor: 'text-emerald-700 bg-emerald-50 border border-emerald-200/60',
      sparkline: (
        <svg className="w-18 sm:w-22 h-7 text-[#008848] overflow-visible" viewBox="0 0 100 35" fill="none">
          <path
            d="M4 25 C 22 28, 36 16, 54 22 C 70 27, 82 12, 92 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'TOTAL ORDERS',
      value: (stats.totalOrders || 0).toLocaleString('en-IN'),
      subtext: 'Processed customer orders',
      icon: ShoppingBag,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50 border-sky-200/70',
      trend: '• Lucknow Hub Live',
      trendColor: 'text-sky-700 bg-sky-50 border border-sky-200/60',
      sparkline: (
        <svg className="w-18 sm:w-22 h-7 text-sky-500 overflow-visible" viewBox="0 0 100 35" fill="none">
          <path
            d="M4 26 C 24 28, 40 18, 58 22 C 72 25, 82 14, 92 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'ACTIVE PRODUCTS',
      value: (stats.totalProducts || 0).toLocaleString('en-IN'),
      subtext: 'Grocery catalog items',
      icon: Package,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200/70',
      trend: '+8.5% this week',
      trendColor: 'text-amber-700 bg-amber-50 border border-amber-200/60',
      sparkline: (
        <svg className="w-18 sm:w-22 h-7 text-amber-500 overflow-visible" viewBox="0 0 100 35" fill="none">
          <path
            d="M4 28 C 22 28, 36 22, 54 18 C 68 15, 80 22, 92 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'REGISTERED USERS',
      value: (stats.totalUsers || 0).toLocaleString('en-IN'),
      subtext: 'Active customer accounts',
      icon: Users,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 border-purple-200/70',
      trend: '+5 new',
      trendColor: 'text-purple-700 bg-purple-50 border border-purple-200/60',
      sparkline: (
        <svg className="w-18 sm:w-22 h-7 text-purple-500 overflow-visible" viewBox="0 0 100 35" fill="none">
          <path
            d="M4 24 C 22 20, 38 26, 56 18 C 70 12, 80 20, 92 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  // Map ordersByStatus ensuring Shipped, Delivered, Pending, Cancelled exist
  const statusOrderKeys = ['Shipped', 'Delivered', 'Pending', 'Cancelled'];
  const statusCounts = (stats.ordersByStatus || []).reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP HERO ROW (Good Morning Banner + Fast Delivery Card)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* Left Banner: Good Morning, Admin (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-r from-[#eef9f2] via-[#f5fbf7] to-[#e8f7ee] border border-emerald-100 rounded-2xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between shadow-2xs">
          <div className="relative z-10 max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">☀️</span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Good Morning, Admin
              </h1>
            </div>
            <p className="text-xs sm:text-[13px] text-gray-500 font-medium mb-4">
              Here's what's happening with your store today.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200/90 text-gray-700 font-semibold shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Today: 20 September 2025</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200/90 text-gray-700 font-semibold shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lucknow, Uttar Pradesh</span>
              </span>
            </div>
          </div>

          {/* Right Crate Artwork */}
          <div className="hidden sm:block absolute right-0 bottom-0 top-0 w-64 md:w-80 pointer-events-none select-none">
            <img
              src="/images/dashboard/hero_fresh_veg.png"
              alt="Fresh Food Everyday"
              className="w-full h-full object-contain object-right-bottom"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Right Card: Fast & Fresh Delivery (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0c532e] to-[#063b20] text-white rounded-2xl p-4 sm:p-5 relative flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl bg-white/15 text-emerald-200 flex items-center justify-center mb-2.5">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Fast & Fresh Delivery
            </h2>
            <p className="text-xs text-emerald-100/80 leading-relaxed mt-1 max-w-[200px]">
              Bringing groceries to your doorstep, always!
            </p>
          </div>

          <div className="relative z-10 mt-4">
            <Link
              to="/admin/orders"
              className="bg-white text-[#008848] hover:bg-emerald-50 active:scale-95 text-xs font-bold py-1.5 px-4 rounded-full transition-all shadow-xs inline-flex items-center gap-1.5"
            >
              <span>Manage Delivery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Background Van Graphic */}
          <div className="absolute right-0 bottom-0 top-0 w-36 opacity-30 pointer-events-none select-none">
            <img
              src="/images/dashboard/delivery_card_bg.png"
              alt="Delivery Van"
              className="w-full h-full object-contain object-right-bottom"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STAT CARDS GRID (4 Cards with Sparklines)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-xl border ${card.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-4.5 h-4.5 ${card.iconColor}`} />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${card.trendColor}`}
                >
                  {card.trend}
                </span>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-2xl sm:text-[28px] font-black text-gray-900 tracking-tight leading-none">
                    {card.value}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">
                    {card.label}
                  </p>
                  <p className="text-[11px] text-gray-500 font-normal mt-0.5 truncate">
                    {card.subtext}
                  </p>
                </div>
                <div className="shrink-0 pr-1.5 pb-0.5">{card.sparkline}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN SECTION: Orders Overview & Recent Orders
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* ── Left Column: Orders Overview (5 cols) ── */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#008848] flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 leading-tight">
                  Orders Overview
                </h2>
                <p className="text-[11px] text-gray-400">Fulfillment breakdown</p>
              </div>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-[#008848] hover:text-[#00703b] flex items-center gap-1 group"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {statusOrderKeys.map((statusKey) => {
              const conf = STATUS_CONFIG[statusKey];
              const Icon = conf.icon;
              const count = statusCounts[statusKey] || 0;
              const percentage =
                totalOrdersCount > 0 ? Math.round((count / totalOrdersCount) * 100) : 0;

              return (
                <div
                  key={statusKey}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#fafbfa] border border-gray-100 flex items-center justify-between gap-3 hover:border-emerald-200 transition-all"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${conf.iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${conf.badge}`}
                        >
                          {statusKey}
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-bold text-gray-900">{count}</span>
                          <span className="text-[10px] text-gray-400 ml-1 font-semibold">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1.5 rounded-full bg-gray-200/70 overflow-hidden">
                        <div
                          className={`h-full ${conf.barColor} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(percentage, count > 0 ? 6 : 0)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Column: Recent Orders (7 cols) ── */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#008848] flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 leading-tight">
                  Recent Orders
                </h2>
                <p className="text-[11px] text-gray-400">
                  Latest customer purchases in Lucknow
                </p>
              </div>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-[#008848] hover:text-[#00703b] flex items-center gap-1 group"
            >
              <span>View all orders</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {stats.recentOrders && stats.recentOrders.length > 0 ? (
              stats.recentOrders.slice(0, 4).map((order, idx) => {
                const conf = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Processing;
                const orderDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '';
                const thumbnail =
                  (order.items && order.items[0]?.image) ||
                  GROCERY_THUMBNAILS[idx % GROCERY_THUMBNAILS.length];

                return (
                  <div
                    key={order._id}
                    className="p-2.5 sm:p-3 rounded-xl bg-[#fafbfa] border border-gray-100 hover:border-emerald-200 transition-all flex items-center justify-between gap-3 group"
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-gray-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-emerald-300 transition-colors p-0.5">
                        <img
                          src={thumbnail}
                          alt="Grocery item"
                          className="w-full h-full object-contain rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/images/products/veg_basket.png';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-gray-900 font-mono tracking-tight">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${conf.badge}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span>{order.orderStatus}</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-normal mt-0.5 truncate">
                          {order.user?.name || 'Grosliy User'} • {order.items?.length || 1} items{' '}
                          {orderDate && `• ${orderDate}`}
                        </p>
                      </div>
                    </div>

                    {/* Right: Price & Navigation Arrow */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-black text-gray-900 block">
                          ₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                          {order.paymentMethod || 'COD'}
                        </span>
                      </div>
                      <Link
                        to={`/orders/${order._id}`}
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#008848] hover:border-emerald-300 transition-colors shrink-0 shadow-2xs"
                        title="View order details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-gray-400 font-medium">
                No recent orders found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}