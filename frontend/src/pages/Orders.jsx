import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { orderAPI } from '../services/api';
import Loading from '../components/common/Loading';

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    orderAPI.getMy({ page, limit: 10 })
      .then(({ data }) => { setOrders(data.orders); setMeta(data.meta); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">No orders yet</p>
          <p className="text-gray-500 mt-1 mb-6">Start shopping to see your orders here</p>
          <Link to="/products" className="btn-primary inline-block">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link key={order._id} to={`/orders/${order._id}`}
              className="card p-4 flex items-center justify-between hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}{order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <span className={`badge text-xs mt-1 ${STATUS_COLORS[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          ))}

          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                className="btn-secondary text-sm disabled:opacity-40">Previous</button>
              <span className="flex items-center px-4 text-sm text-gray-600">Page {page} of {meta.totalPages}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page === meta.totalPages}
                className="btn-secondary text-sm disabled:opacity-40">Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
