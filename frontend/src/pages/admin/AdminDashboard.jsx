import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingBag, IndianRupee, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
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
    { label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Orders by Status */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Orders by Status</h2>
            <Link to="/admin/orders" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {stats.ordersByStatus?.map(({ _id, count }) => (
              <div key={_id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className={`badge ${STATUS_COLORS[_id] || 'bg-gray-100 text-gray-700'}`}>{_id}</span>
                <span className="font-semibold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {stats.recentOrders?.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{order.user?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  <span className={`badge text-xs ${STATUS_COLORS[order.orderStatus] || ''}`}>{order.orderStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockProducts?.length > 0 && (
        <div className="card p-5 border-l-4 border-orange-400">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h2 className="font-bold text-gray-900">Low Stock Alert</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {stats.lowStockProducts.map((p) => (
              <Link key={p._id} to="/admin/products" className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <p className="text-sm font-medium text-gray-800 line-clamp-1">{p.name}</p>
                <p className="text-xs text-orange-600 font-bold mt-1">{p.stock} left</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
