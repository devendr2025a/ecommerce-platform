import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingBag, IndianRupee, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-[var(--vg-red)]/10 text-[var(--vg-red)]',
  Shipped: 'bg-purple-100 text-purple-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then(({ data }) => setStats(data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading fullScreen={false} />;
  if (!stats) return null;

  const statCards = [
    { label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: IndianRupee, color: 'text-[var(--vg-red)]', bg: 'bg-red-50' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-[var(--vg-black)]', bg: 'bg-gray-100' },
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-[var(--vg-red)]', bg: 'bg-red-50' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-[var(--vg-black)]', bg: 'bg-gray-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-[var(--vg-black)]">Dashboard</h1>
        <p className="text-[var(--vg-muted)] text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-[var(--vg-border)] rounded-sm p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${bg} rounded-sm flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
            </div>
            <p className="text-2xl font-black text-[var(--vg-black)]">{value}</p>
            <p className="text-[var(--vg-muted)] text-sm mt-1 uppercase tracking-[0.05em] font-bold">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Orders by Status */}
        <div className="bg-white border border-[var(--vg-border)] rounded-sm p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black uppercase tracking-[0.08em] text-[var(--vg-black)] text-sm">Orders by Status</h2>
            <Link to="/admin/orders" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--vg-red)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {stats.ordersByStatus?.map(({ _id, count }) => (
              <div key={_id} className="flex items-center justify-between p-2.5 bg-[var(--vg-gray)] rounded-sm">
                <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-sm ${STATUS_COLORS[_id] || 'bg-gray-100 text-[var(--vg-muted)]'}`}>{_id}</span>
                <span className="font-black text-[var(--vg-black)]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-[var(--vg-border)] rounded-sm p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black uppercase tracking-[0.08em] text-[var(--vg-black)] text-sm">Recent Orders</h2>
            <Link to="/admin/orders" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--vg-red)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {stats.recentOrders?.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between p-2.5 hover:bg-[var(--vg-gray)] rounded-sm transition-colors">
                <div>
                  <p className="text-sm font-black text-[var(--vg-black)]">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-[var(--vg-muted)]">{order.user?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[var(--vg-black)]">₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-sm ${STATUS_COLORS[order.orderStatus] || ''}`}>{order.orderStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockProducts?.length > 0 && (
        <div className="bg-white border-l-4 border-[var(--vg-red)] border border-[var(--vg-border)] rounded-sm p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-[var(--vg-red)]" />
            <h2 className="font-black uppercase tracking-[0.08em] text-[var(--vg-black)] text-sm">Low Stock Alert</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {stats.lowStockProducts.map((p) => (
              <Link key={p._id} to="/admin/products" className="p-3 bg-[var(--vg-gray)] rounded-sm hover:bg-gray-200 transition-colors">
                <p className="text-sm font-black text-[var(--vg-black)] line-clamp-1">{p.name}</p>
                <p className="text-xs text-[var(--vg-red)] font-bold mt-1">{p.stock} left</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}