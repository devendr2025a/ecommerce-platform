import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';
import { orderAPI } from '../services/api';
import Loading from '../components/common/Loading';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const STATUS_STEPS = [
  { key: 'pending',    label: 'Order Placed', icon: Clock },
  { key: 'confirmed',  label: 'Confirmed',    icon: CheckCircle2 },
  { key: 'processing', label: 'Processing',   icon: Package },
  { key: 'shipped',    label: 'Shipped',      icon: Truck },
  { key: 'delivered',  label: 'Delivered',    icon: CheckCircle2 },
];

const STATUS_BADGE = {
  pending:    'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed:  'bg-blue-50 text-blue-700 border border-blue-200',
  processing: 'bg-purple-50 text-purple-700 border border-purple-200',
  shipped:    'bg-indigo-50 text-indigo-700 border border-indigo-200',
  delivered:  'bg-green-50 text-green-700 border border-green-200',
  cancelled:  'bg-red-50 text-red-600 border border-red-200',
};

function getStepIndex(status = '') {
  const s = status.toLowerCase();
  const idx = STATUS_STEPS.findIndex((step) => step.key === s);
  return idx === -1 ? 0 : idx;
}

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getOne(id)
      .then(({ data }) => setOrder(data.order))
      .catch(() => navigate('/orders'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!order) return null;

  const rawStatus = (order.orderStatus || order.status || 'pending').toLowerCase();
  const isCancelled = rawStatus === 'cancelled';
  const currentStep = getStepIndex(rawStatus);
  const badgeClass = STATUS_BADGE[rawStatus] || 'bg-gray-100 text-gray-600 border border-gray-200';
  const statusLabel = STATUS_STEPS.find((s) => s.key === rawStatus)?.label || rawStatus;
  const items = order.orderItems || order.items || [];
  const totalPrice = order.totalPrice ?? order.totalAmount ?? 0;
  const itemsPrice = order.itemsPrice ?? order.subtotal ?? 0;
  const shippingPrice = order.shippingPrice ?? order.shippingCost ?? 0;
  const taxPrice = order.taxPrice ?? order.tax ?? 0;

  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-10 sm:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-1.5 text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest hover:text-[var(--vg-red)] transition-colors mb-5"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Orders
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Order Details</span>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--vg-black)] uppercase tracking-[0.06em] mt-1">
                #{order._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-[11px] text-[var(--vg-muted)] font-bold uppercase tracking-widest mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <span className={`self-start sm:self-end px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${badgeClass}`}>
              {statusLabel}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Progress Tracker */}
        {!isCancelled && (
          <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-6 sm:p-8 mb-8">
            <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-6">Order Progress</p>
            <div className="relative">
              {/* Background line */}
              <div className="absolute top-5 left-5 right-5 h-[2px] bg-[var(--vg-border)]" />
              {/* Progress fill */}
              <div
                className="absolute top-5 left-5 h-[2px] bg-[var(--vg-black)] transition-all duration-700"
                style={{ width: `${currentStep > 0 ? (currentStep / (STATUS_STEPS.length - 1)) * 90 : 0}%` }}
              />
              <div className="relative flex justify-between">
                {STATUS_STEPS.map((step, idx) => {
                  const StepIcon = step.icon;
                  const done = idx <= currentStep;
                  return (
                    <div key={step.key} className="flex flex-col items-center gap-2 w-14 sm:w-20">
                      <div className={`w-10 h-10 flex items-center justify-center border-2 z-10 transition-all duration-300
                        ${done ? 'bg-[var(--vg-black)] border-[var(--vg-black)]' : 'bg-white border-[var(--vg-border)]'}`}>
                        <StepIcon className={`h-4 w-4 ${done ? 'text-white' : 'text-[var(--vg-border)]'}`} strokeWidth={2} />
                      </div>
                      <p className={`text-center text-[8px] sm:text-[9px] font-black uppercase tracking-wide leading-tight
                        ${done ? 'text-[var(--vg-black)]' : 'text-[var(--vg-muted)]'}`}>{step.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {isCancelled && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-5 mb-8">
            <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-widest">Order Cancelled</p>
              <p className="text-sm text-[var(--vg-muted)] mt-0.5">Contact support if you need assistance with this order.</p>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Order Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[var(--vg-border)]">
              <div className="px-5 sm:px-6 py-4 border-b border-[var(--vg-border)]">
                <h2 className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-[0.2em]">
                  Items Ordered ({items.length})
                </h2>
              </div>
              <div className="divide-y divide-[var(--vg-border)]">
                {items.map((item, idx) => {
                  const imgUrl = item.image
                    ? (item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`)
                    : null;
                  return (
                    <div key={item._id || idx} className="flex gap-4 p-4 sm:p-5 items-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--vg-gray)] border border-[var(--vg-border)] overflow-hidden flex-shrink-0">
                        {imgUrl
                          ? <img src={imgUrl} alt={item.name} className="w-full h-full object-cover" />
                          : <Package className="h-7 w-7 text-[var(--vg-border)] m-auto" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-black text-[var(--vg-black)] uppercase tracking-[0.1em] line-clamp-2">{item.name}</p>
                        {item.size && <p className="text-[10px] text-[var(--vg-muted)] font-bold uppercase tracking-widest mt-0.5">Size: {item.size}</p>}
                        <p className="text-[11px] text-[var(--vg-muted)] font-bold mt-1">
                          {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <p className="text-[14px] font-black text-[var(--vg-black)] flex-shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Price breakdown */}
              <div className="px-5 sm:px-6 py-5 border-t border-[var(--vg-border)] space-y-3">
                <div className="flex justify-between text-[12px] text-[var(--vg-muted)] font-bold">
                  <span>Subtotal</span>
                  <span>₹{itemsPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[12px] text-[var(--vg-muted)] font-bold">
                  <span>Shipping</span>
                  <span>{shippingPrice === 0 ? <span className="text-green-600 font-black">Free</span> : `₹${shippingPrice}`}</span>
                </div>
                {taxPrice > 0 && (
                  <div className="flex justify-between text-[12px] text-[var(--vg-muted)] font-bold">
                    <span>Tax</span>
                    <span>₹{taxPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[var(--vg-border)] flex justify-between items-center">
                  <span className="text-[13px] font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">Total</span>
                  <span className="text-xl font-black text-[var(--vg-black)]">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white border border-[var(--vg-border)] p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-[0.2em] mb-4 pb-3 border-b border-[var(--vg-border)]">
                  <MapPin className="h-3.5 w-3.5 text-[var(--vg-red)]" /> Delivery Address
                </h3>
                <div className="space-y-1">
                  <p className="text-[13px] font-black text-[var(--vg-black)] uppercase tracking-[0.1em]">{order.shippingAddress.fullName}</p>
                  <p className="text-[12px] text-[var(--vg-muted)] font-bold">{order.shippingAddress.phone}</p>
                  <p className="text-[12px] text-[var(--vg-muted)] leading-relaxed mt-1">
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Info */}
            <div className="bg-white border border-[var(--vg-border)] p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-[0.2em] mb-4 pb-3 border-b border-[var(--vg-border)]">
                <CreditCard className="h-3.5 w-3.5 text-[var(--vg-red)]" /> Payment Details
              </h3>
              <div className="space-y-3 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--vg-muted)] font-bold">Status</span>
                  <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest
                    ${order.paymentStatus === 'Paid' || order.paymentStatus === 'paid'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </div>
                {order.paymentMethod && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--vg-muted)] font-bold">Method</span>
                    <span className="font-black text-[var(--vg-black)] uppercase">{order.paymentMethod}</span>
                  </div>
                )}
                {order.paidAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--vg-muted)] font-bold">Paid On</span>
                    <span className="font-bold text-[var(--vg-black)]">
                      {new Date(order.paidAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                )}
                {order.paymentInfo?.razorpayPaymentId && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--vg-muted)] font-bold">Payment ID</span>
                    <span className="text-[var(--vg-muted)] font-mono text-[10px]">
                      …{order.paymentInfo.razorpayPaymentId.slice(-10)}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
