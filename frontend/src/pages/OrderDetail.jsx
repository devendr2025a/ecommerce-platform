import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { orderAPI } from '../services/api';
import Loading from '../components/common/Loading';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const STATUS_METADATA = {
  Pending: { class: 'bg-white text-black', label: 'PREPARING', icon: Clock },
  Processing: { class: 'bg-white text-black', label: 'PROCESSING', icon: Package },
  Shipped: { class: 'bg-black border border-white text-white', label: 'IN TRANSIT', icon: Truck },
  Delivered: { class: 'bg-black border border-gray-800 text-gray-500', label: 'COMPLETED', icon: CheckCircle },
  Cancelled: { class: 'bg-red-900/20 text-red-500 border border-red-900/30', label: 'CANCELLED', icon: XCircle },
};

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

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

  const currentStep = STATUS_STEPS.indexOf(order.orderStatus);
  const status = STATUS_METADATA[order.orderStatus] || { class: 'bg-gray-900 text-gray-400', label: order.orderStatus.toUpperCase(), icon: Package };
  const StatusIcon = status.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-gray-600 hover:text-white mb-12 text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
        <ArrowLeft className="h-3 w-3" /> Back to History
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-gray-900 pb-12">
        <div className="space-y-3">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Acquisition Details</p>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">#{order._id.slice(-8).toUpperCase()}</h1>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Logged on {new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${status.class}`}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </div>
      </div>

      {/* Progress bar */}
      {order.orderStatus !== 'Cancelled' && (
        <div className="bg-[#020202] border border-gray-900 p-12 mb-12">
          <div className="max-w-3xl mx-auto flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-px bg-gray-900 mx-8">
              <div className="h-full bg-white transition-all duration-1000" style={{ width: `${currentStep > 0 ? (currentStep / (STATUS_STEPS.length - 1)) * 100 : 0}%` }} />
            </div>
            {STATUS_STEPS.map((step, i) => {
              const Icon = STATUS_METADATA[step].icon;
              const done = i <= currentStep;
              return (
                <div key={step} className="flex flex-col items-center z-10">
                  <div className={`w-9 h-9 border flex items-center justify-center transition-all duration-500 ${done ? 'bg-white border-white text-black' : 'bg-black border-gray-800 text-gray-700'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={`text-[8px] mt-4 font-black uppercase tracking-widest ${done ? 'text-white' : 'text-gray-700'}`}>{STATUS_METADATA[step].label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#050505] border border-gray-900 p-8">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-gray-900">Acquired Objects</h2>
            <div className="space-y-6">
              {order.orderItems.map((item) => {
                const imgUrl = item.image ? (item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`) : null;
                return (
                  <div key={item._id} className="flex gap-6 items-center">
                    <div className="w-20 h-20 bg-gray-950 border border-gray-900 overflow-hidden flex-shrink-0">
                      {imgUrl ? <img src={imgUrl} alt={item.name} className="w-full h-full object-cover" /> : <Package className="h-8 w-8 text-gray-800 m-6 stroke-[1]" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-[11px] font-black text-white uppercase tracking-widest line-clamp-1">{item.name}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <p className="text-[11px] font-black text-white italic">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-900 space-y-4 text-[10px] font-bold uppercase tracking-[0.2em]">
              <div className="flex justify-between text-gray-500"><span>Subtotal Value</span><span className="text-white tracking-widest">₹{order.itemsPrice.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-gray-500"><span>Logistics Fees</span><span className="text-white uppercase tracking-widest">{order.shippingPrice === 0 ? 'COMPLIMENTARY' : `₹${order.shippingPrice}`}</span></div>
              <div className="flex justify-between text-gray-500"><span>Fiscal Contribution</span><span className="text-white tracking-widest">₹{order.taxPrice.toLocaleString('en-IN')}</span></div>
              <div className="h-px bg-gray-900 my-4" />
              <div className="flex justify-between text-white text-sm font-black italic pt-2">
                <span>Grand Total</span><span className="tracking-tighter">₹{order.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#050505] border border-gray-900 p-8 space-y-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2 border-b border-gray-900 pb-4">
                <MapPin className="h-3 w-3" /> Delivery Destination
            </h3>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed space-y-1">
              <p className="text-white font-black text-[11px] mb-2">{order.shippingAddress.fullName}</p>
              <p className="font-mono">{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            </div>
          </div>

          <div className="bg-[#050505] border border-gray-900 p-8 space-y-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2 border-b border-gray-900 pb-4">
                <CreditCard className="h-3 w-3" /> Transaction Data
            </h3>
            <div className="text-[10px] font-bold uppercase tracking-widest space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Auth Status</span>
                <span className={`px-2 py-0.5 font-black italic ${order.paymentStatus === 'Paid' ? 'bg-white text-black' : 'text-gray-600 border border-gray-900'}`}>
                    {order.paymentStatus.toUpperCase()}
                </span>
              </div>
              {order.paymentMethod && (
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Method</span>
                    <span className="text-white font-black italic">{order.paymentMethod.toUpperCase()}</span>
                </div>
              )}
              {order.paymentInfo?.razorpayPaymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Trace ID</span>
                  <span className="text-gray-400 font-mono tracking-tighter">{order.paymentInfo.razorpayPaymentId.slice(-12)}</span>
                </div>
              )}
              {order.paidAt && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Verified On</span>
                  <span className="text-white">{new Date(order.paidAt).toLocaleDateString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8 text-center bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] italic cursor-pointer hover:bg-gray-200 transition-colors">
              DOWNLOAD INVOICE
          </div>
        </div>
      </div>
    </div>
  );
}
