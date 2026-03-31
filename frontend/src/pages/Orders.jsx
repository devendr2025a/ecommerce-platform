import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { orderAPI } from '../services/api';
import Loading from '../components/common/Loading';

const STATUS_STYLES = {
  pending:    { bg: 'bg-amber-50 text-amber-700 border border-amber-200',  label: 'Pending' },
  confirmed:  { bg: 'bg-blue-50 text-blue-700 border border-blue-200',     label: 'Confirmed' },
  processing: { bg: 'bg-purple-50 text-purple-700 border border-purple-200', label: 'Processing' },
  shipped:    { bg: 'bg-indigo-50 text-indigo-700 border border-indigo-200', label: 'Shipped' },
  delivered:  { bg: 'bg-green-50 text-green-700 border border-green-200',  label: 'Delivered' },
  cancelled:  { bg: 'bg-red-50 text-red-600 border border-red-200',        label: 'Cancelled' },
};

function getStatus(raw = '') {
  return STATUS_STYLES[raw.toLowerCase()] || { bg: 'bg-gray-100 text-gray-600 border border-gray-200', label: raw };
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    orderAPI.getMy({ page, limit: 10 })
      .then(({ data }) => { setOrders(data.orders); setMeta(data.meta); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-10 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">My Account</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.06em] mt-1">Order History</h1>
          <p className="text-sm text-[var(--vg-muted)] mt-2">{meta.total || 0} order{(meta.total || 0) !== 1 ? 's' : ''} placed</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {orders.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[var(--vg-border)]">
            <ShoppingBag className="h-12 w-12 text-[var(--vg-border)] mx-auto mb-4" />
            <p className="text-[11px] font-black text-[var(--vg-muted)] uppercase tracking-[0.4em] mb-6">No orders yet</p>
            <Link to="/products" className="btn-primary inline-flex px-10 py-3">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              // Support both orderStatus and status fields
              const rawStatus = order.orderStatus || order.status || 'pending';
              const status = getStatus(rawStatus);
              const itemCount = (order.orderItems || order.items || []).length;
              const total = order.totalPrice ?? order.totalAmount ?? 0;

              return (
                <Link
                  key={order._id}
                  to={`/orders/${order._id}`}
                  className="flex items-center justify-between gap-4 bg-white border border-[var(--vg-border)] p-5 sm:p-6 hover:border-[var(--vg-black)] hover:shadow-sm transition-all group"
                >
                  {/* Left */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 bg-[var(--vg-gray)] border border-[var(--vg-border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--vg-black)] transition-colors">
                      <Package className="h-5 w-5 text-[var(--vg-black)] stroke-[1.5]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-black text-[var(--vg-black)] uppercase tracking-[0.15em]">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-[11px] text-[var(--vg-muted)] font-bold mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}{itemCount} item{itemCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-[15px] font-black text-[var(--vg-black)]">₹{total.toLocaleString('en-IN')}</p>
                      <span className={`inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest mt-1 ${status.bg}`}>
                        {status.label}
                      </span>
                    </div>
                    {/* Mobile: show price only */}
                    <p className="text-[14px] font-black text-[var(--vg-black)] sm:hidden">₹{total.toLocaleString('en-IN')}</p>
                    <ChevronRight className="h-4 w-4 text-[var(--vg-muted)] group-hover:text-[var(--vg-black)] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}

            {/* Pagination */}
            {meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8">
                <button
                  onClick={() => setPage((p) => p - 1)} disabled={page === 1}
                  className="flex items-center gap-1.5 text-[11px] font-black text-[var(--vg-muted)] uppercase tracking-widest hover:text-[var(--vg-black)] disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Previous
                </button>
                <span className="text-[11px] font-black text-[var(--vg-muted)] uppercase tracking-widest px-4 border-x border-[var(--vg-border)]">
                  {page} / {meta.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)} disabled={page === meta.totalPages}
                  className="flex items-center gap-1.5 text-[11px] font-black text-[var(--vg-muted)] uppercase tracking-widest hover:text-[var(--vg-black)] disabled:opacity-30 transition-colors"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
