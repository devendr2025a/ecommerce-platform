import React, { useState, useEffect } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import { orderAPI } from '../../services/api';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const ALL_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      const { data } = await orderAPI.getAll(params);
      setOrders(data.orders);
      setMeta(data.meta);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [page, statusFilter]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    try {
      const { data } = await orderAPI.updateStatus(orderId, { orderStatus: newStatus });
      setOrders(orders.map((o) => (o._id === orderId ? data.order : o)));
      if (selectedOrder?._id === orderId) setSelectedOrder(data.order);
      toast.success(`Order status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

      {/* Filter */}
      <div className="card p-4 flex gap-3 flex-wrap">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="input-field text-sm w-auto min-w-[160px]">
          <option value="">All Statuses</option>
          {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {meta.total !== undefined && <p className="flex items-center text-sm text-gray-500">{meta.total} orders found</p>}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? <Loading fullScreen={false} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Order ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Total</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Payment</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-gray-800">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div>
                        <p className="font-medium text-gray-800">{order.user?.name}</p>
                        <p className="text-xs text-gray-500">{order.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900">₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative inline-block">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          disabled={updatingStatus === order._id}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer appearance-none pr-5 ${STATUS_COLORS[order.orderStatus] || ''}`}
                        >
                          {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <div className="text-center py-12 text-gray-400">No orders found</div>}
          </div>
        )}
        {meta.totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-gray-100">
            <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="btn-secondary text-sm disabled:opacity-40">Previous</button>
            <span className="flex items-center px-3 text-sm text-gray-600">{page} / {meta.totalPages}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page === meta.totalPages} className="btn-secondary text-sm disabled:opacity-40">Next</button>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Order #{selectedOrder._id.slice(-8).toUpperCase()}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-gray-500 text-xs mb-1">Customer</p>
                  <p className="font-semibold">{selectedOrder.user?.name}</p>
                  <p className="text-gray-500">{selectedOrder.user?.email}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-gray-500 text-xs mb-1">Payment</p>
                  <p className="font-semibold">{selectedOrder.paymentStatus}</p>
                  <p className="text-gray-500">₹{selectedOrder.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-gray-500 text-xs mb-2">Shipping Address</p>
                <p className="font-medium">{selectedOrder.shippingAddress.fullName}</p>
                <p className="text-gray-600">{selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">Items ({selectedOrder.orderItems.length})</p>
                {selectedOrder.orderItems.map((item) => (
                  <div key={item._id} className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-700">{item.name} × {item.quantity}</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500 mb-2">Update Status</p>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
                  className="input-field text-sm"
                >
                  {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
