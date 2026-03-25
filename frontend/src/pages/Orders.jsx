import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { orderAPI } from '../services/api';
import Loading from '../components/common/Loading';

const STATUS_METADATA = {
  Pending: { class: 'bg-white text-black', label: 'PREPARING' },
  Processing: { class: 'bg-white text-black', label: 'PROCESSING' },
  Shipped: { class: 'bg-black border border-white text-white', label: 'IN TRANSIT' },
  Delivered: { class: 'bg-black border border-gray-800 text-gray-500', label: 'COMPLETED' },
  Cancelled: { class: 'bg-red-900/20 text-red-500 border border-red-900/30', label: 'CANCELLED' },
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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex flex-col gap-2 mb-12 text-center">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Order History</h1>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Track your luxury acquirements</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-40 bg-[#020202] border border-dashed border-gray-900">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-8">Your history is clear</p>
          <Link to="/products" className="btn-primary inline-block">Explore Collections</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_METADATA[order.orderStatus] || { class: 'bg-gray-900 text-gray-500', label: order.orderStatus.toUpperCase() };
            return (
              <Link key={order._id} to={`/orders/${order._id}`}
                className="bg-black border border-gray-900 p-8 flex items-center justify-between hover:border-white/20 transition-all group overflow-hidden relative">
                <div className="flex items-center gap-6 z-10">
                  <div className="w-12 h-12 bg-gray-950 border border-gray-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Package className="h-5 w-5 stroke-[1]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-white text-[11px] uppercase tracking-[0.2em]">Acquisition #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{order.orderItems.length} OBJECT{order.orderItems.length > 1 ? 'S' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8 z-10 text-right">
                  <div className="space-y-3">
                    <p className="font-black text-white italic tracking-tighter text-base">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                    <span className={`inline-block px-3 py-1 text-[8px] font-black uppercase tracking-widest ${status.class}`}>
                      {status.label}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-800 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </div>
                {/* Subtle depth effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}

          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-4 pt-12 items-center">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors disabled:opacity-20 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 rotate-180" /> PREVIOUS
              </button>
              <div className="h-px w-8 bg-gray-900" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">PAGE {page} OF {meta.totalPages}</span>
              <div className="h-px w-8 bg-gray-900" />
              <button onClick={() => setPage(p => p + 1)} disabled={page === meta.totalPages}
                className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors disabled:opacity-20 flex items-center gap-2">
                  NEXT <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
