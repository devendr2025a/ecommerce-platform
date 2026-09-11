import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Package,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  PlusCircle,
  Truck,
} from 'lucide-react';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const STATUS_CONFIG = {
  Pending: {
    badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
    dot: 'bg-amber-500',
  },
  Processing: {
    badge: 'bg-sky-50 text-sky-800 border-sky-200/80',
    dot: 'bg-sky-500',
  },
  Shipped: {
    badge: 'bg-purple-50 text-purple-800 border-purple-200/80',
    dot: 'bg-purple-500',
  },
  Delivered: {
    badge: 'bg-emerald-50 text-[#008848] border-emerald-200/80',
    dot: 'bg-emerald-500',
  },
  Cancelled: {
    badge: 'bg-rose-50 text-rose-800 border-rose-200/80',
    dot: 'bg-rose-500',
  },
};

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

  const statCards = [
    {
      label: 'Total Revenue',
      value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN', {
        maximumFractionDigits: 0,
      })}`,
      subtext: 'Lifetime sales earnings',
      icon: IndianRupee,
      iconColor: 'text-[#008848]',
      iconBg: 'bg-emerald-50 border-emerald-200/60',
      trend: '+14.2% this month',
      trendColor: 'text-emerald-700 bg-emerald-50',
    },
    {
      label: 'Total Orders',
      value: (stats.totalOrders || 0).toLocaleString('en-IN'),
      subtext: 'Processed customer orders',
      icon: ShoppingBag,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50 border-sky-200/60',
      trend: 'Lucknow Hub Live',
      trendColor: 'text-sky-700 bg-sky-50',
    },
    {
      label: 'Active Products',
      value: (stats.totalProducts || 0).toLocaleString('en-IN'),
      subtext: 'Grocery catalog items',
      icon: Package,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200/60',
      trend: 'Fresh inventory',
      trendColor: 'text-amber-700 bg-amber-50',
    },
    {
      label: 'Registered Users',
      value: (stats.totalUsers || 0).toLocaleString('en-IN'),
      subtext: 'Active customer accounts',
      icon: Users,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 border-purple-200/60',
      trend: 'Verified shoppers',
      trendColor: 'text-purple-700 bg-purple-50',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ── 1. Welcome & Actions Banner (Compact) ── */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4.5 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#008848] animate-pulse" />
            <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Dashboard Overview
            </h1>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full ml-1 hidden sm:inline-flex">
              Lucknow Hub Live
            </span>
          </div>
          <p className="text-xs text-gray-500 font-normal">
            Real-time fulfillment, inventory & revenue summary for today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 bg-[#008848] hover:bg-[#00703b] active:scale-98 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 bg-[#f4faf6] hover:bg-emerald-100/70 border border-emerald-200/80 text-[#008848] text-xs font-bold py-1.5 px-3 rounded-lg transition-all cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>All Orders</span>
          </Link>
        </div>
      </div>

      {/* ── 2. Stat Cards Grid (4 Columns Compact) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map(
          ({
            label,
            value,
            subtext,
            icon: Icon,
            iconColor,
            iconBg,
            trend,
            trendColor,
          }) => (
            <div
              key={label}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 p-3.5 sm:p-4 shadow-xs hover:border-emerald-300/80 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={`w-9 h-9 rounded-lg border ${iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${trendColor}`}
                >
                  {trend}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  {value}
                </h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  {label}
                </p>
                <p className="text-[11px] text-gray-500 font-normal mt-0.5 truncate">
                  {subtext}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* ── 3. Middle Section (Orders by Status & Recent Orders) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Orders by Status (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Orders by Status
              </h2>
              <p className="text-[11px] text-gray-400">Fulfillment breakdown</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-[#008848] hover:text-[#00703b] flex items-center gap-1 group"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2">
            {stats.ordersByStatus && stats.ordersByStatus.length > 0 ? (
              stats.ordersByStatus.map(({ _id, count }) => {
                const conf = STATUS_CONFIG[_id] || {
                  badge: 'bg-gray-50 text-gray-700 border-gray-200',
                  dot: 'bg-gray-400',
                };
                const percentage =
                  totalOrdersCount > 0 ? Math.round((count / totalOrdersCount) * 100) : 0;

                return (
                  <div
                    key={_id}
                    className="p-2.5 rounded-xl bg-gray-50/70 hover:bg-emerald-50/40 border border-gray-100 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${conf.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
                        <span>{_id}</span>
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-900">{count}</span>
                        <span className="text-[10px] text-gray-400 ml-1 font-semibold">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>

                    {/* Mini visual progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-gray-200/60 overflow-hidden">
                      <div
                        className={`h-full ${conf.dot} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-gray-400 font-medium">
                No orders processed yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Recent Orders
              </h2>
              <p className="text-[11px] text-gray-400">
                Latest customer purchases in Lucknow
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-[#008848] hover:text-[#00703b] flex items-center gap-1 group"
            >
              <span>View all orders</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2">
            {stats.recentOrders && stats.recentOrders.length > 0 ? (
              stats.recentOrders.slice(0, 6).map((order) => {
                const conf = STATUS_CONFIG[order.orderStatus] || {
                  badge: 'bg-gray-50 text-gray-700 border-gray-200',
                  dot: 'bg-gray-400',
                };
                const orderDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '';

                return (
                  <div
                    key={order._id}
                    className="p-2.5 rounded-xl bg-gray-50/70 hover:bg-emerald-50/40 border border-gray-100 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center font-bold text-xs text-gray-700 shrink-0 shadow-2xs group-hover:border-emerald-300 transition-colors">
                        📦
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-900 font-mono">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${conf.badge}`}
                          >
                            <span className={`w-1 h-1 rounded-full ${conf.dot}`} />
                            <span>{order.orderStatus}</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                          {order.user?.name || 'Customer'} • {order.items?.length || 1} items{' '}
                          {orderDate && `• ${orderDate}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-gray-900">
                          ₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </span>
                        <span className="text-[10px] text-gray-400 block font-medium">
                          {order.paymentMethod || 'Paid Online'}
                        </span>
                      </div>
                      <Link
                        to={`/orders/${order._id}`}
                        className="w-6 h-6 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-[#008848] hover:border-emerald-300 transition-colors shrink-0"
                        title="View details"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-gray-400 font-medium">
                No recent orders found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. Low Stock Alert Section (Compact) ── */}
      {stats.lowStockProducts && stats.lowStockProducts.length > 0 && (
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Low Stock Inventory Alert
                </h2>
                <p className="text-[11px] text-amber-800 font-normal">
                  The following items are running low and need replenishment
                </p>
              </div>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 group"
            >
              <span>Restock all</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-0.5">
            {stats.lowStockProducts.map((p) => (
              <Link
                key={p._id}
                to="/admin/products"
                className="p-2.5 rounded-xl bg-white border border-amber-200/70 hover:border-amber-400 hover:shadow-xs transition-all group"
              >
                <p className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                  {p.name}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/80">
                    {p.stock} left
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400">Restock →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}