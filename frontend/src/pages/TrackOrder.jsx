import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const STATUS_STEPS = [
  { key: 'pending',    label: 'Order Placed',   icon: Clock },
  { key: 'confirmed',  label: 'Confirmed',       icon: CheckCircle2 },
  { key: 'processing', label: 'Processing',      icon: Package },
  { key: 'shipped',    label: 'Shipped',         icon: Truck },
  { key: 'delivered',  label: 'Delivered',       icon: CheckCircle2 },
];

const STATUS_ORDER = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

function getStepIndex(status) {
  const idx = STATUS_ORDER.indexOf(status?.toLowerCase());
  return idx === -1 ? 0 : idx;
}

export default function TrackOrder() {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await orderAPI.getById(orderId.trim());
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.status === 404
          ? 'No order found with that ID. Please double-check and try again.'
          : 'Unable to fetch order details. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const currentStep = result ? getStepIndex(result.status) : -1;
  const isCancelled = result?.status?.toLowerCase() === 'cancelled';

  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <section className="bg-[var(--vg-gray)] border-b border-[var(--vg-border)] py-12 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] font-bold text-[var(--vg-red)] uppercase tracking-[0.4em]">Delivery Status</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] mt-2 mb-1">Track Your Order</h1>
          <p className="text-sm text-[var(--vg-muted)] mt-3">Enter your Order ID below to get real-time delivery updates.</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Search Form */}
        <form onSubmit={handleTrack} className="flex gap-3 mb-8">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your Order ID"
            className="input-field flex-1 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-5 sm:px-7 flex items-center gap-2 whitespace-nowrap"
          >
            <Search className="h-4 w-4" />
            {loading ? 'Searching…' : 'Track'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 mb-8">
            <XCircle className="h-5 w-5 text-[var(--vg-red)] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--vg-black)]">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">

            {/* Order Summary Card */}
            <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-0.5">Order ID</p>
                  <p className="text-[13px] font-bold text-[var(--vg-black)] font-mono">{result._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-0.5">Total</p>
                  <p className="text-[15px] font-black text-[var(--vg-black)]">₹{result.totalAmount?.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-0.5">Ordered On</p>
                  <p className="text-[13px] font-bold text-[var(--vg-black)]">
                    {new Date(result.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-0.5">Items</p>
                  <p className="text-[13px] font-bold text-[var(--vg-black)]">{result.items?.length} item{result.items?.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            {isCancelled ? (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-5">
                <XCircle className="h-6 w-6 text-[var(--vg-red)] flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-black text-[var(--vg-black)] uppercase tracking-widest">Order Cancelled</p>
                  <p className="text-sm text-[var(--vg-muted)] mt-0.5">This order has been cancelled. Contact support if you need assistance.</p>
                </div>
              </div>
            ) : (
              <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-5 sm:p-6">
                <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-6">Order Progress</p>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-5 left-5 right-5 h-[2px] bg-[var(--vg-border)]" />
                  <div
                    className="absolute top-5 left-5 h-[2px] bg-[var(--vg-black)] transition-all duration-500"
                    style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * (100 - (10 / STATUS_STEPS.length * 2))}%` }}
                  />

                  {/* Steps */}
                  <div className="relative flex justify-between">
                    {STATUS_STEPS.map((step, idx) => {
                      const StepIcon = step.icon;
                      const done = idx <= currentStep;
                      return (
                        <div key={step.key} className="flex flex-col items-center gap-2 w-16 sm:w-20">
                          <div className={`w-10 h-10 flex items-center justify-center border-2 transition-colors z-10 bg-white
                            ${done ? 'border-[var(--vg-black)] bg-[var(--vg-black)]' : 'border-[var(--vg-border)]'}`}>
                            <StepIcon className={`h-4 w-4 ${done ? 'text-white' : 'text-[var(--vg-border)]'}`} strokeWidth={2} />
                          </div>
                          <p className={`text-center text-[9px] sm:text-[10px] font-black uppercase tracking-wide leading-tight
                            ${done ? 'text-[var(--vg-black)]' : 'text-[var(--vg-muted)]'}`}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Address */}
            {result.shippingAddress && (
              <div className="bg-[var(--vg-gray)] border border-[var(--vg-border)] p-5 sm:p-6">
                <p className="text-[10px] font-black text-[var(--vg-muted)] uppercase tracking-widest mb-3">Delivering To</p>
                <p className="text-[13px] font-bold text-[var(--vg-black)]">{result.shippingAddress.name}</p>
                <p className="text-sm text-[var(--vg-muted)] mt-1 leading-relaxed">
                  {result.shippingAddress.address}, {result.shippingAddress.city}, {result.shippingAddress.state} — {result.shippingAddress.pincode}
                </p>
              </div>
            )}

            {/* Login CTA */}
            {!user && (
              <p className="text-sm text-[var(--vg-muted)] text-center">
                <Link to="/login" className="text-[var(--vg-black)] font-bold underline hover:text-[var(--vg-red)]">Sign in</Link> to see all your orders in one place.
              </p>
            )}
          </div>
        )}

        {/* No search yet — helper tips */}
        {!result && !error && !loading && (
          <div className="text-center py-12 space-y-3">
            <Package className="h-12 w-12 text-[var(--vg-border)] mx-auto" />
            <p className="text-sm text-[var(--vg-muted)]">Your Order ID can be found in your confirmation email or under <Link to="/orders" className="text-[var(--vg-black)] font-bold underline hover:text-[var(--vg-red)]">My Orders</Link>.</p>
          </div>
        )}
      </div>

    </div>
  );
}
