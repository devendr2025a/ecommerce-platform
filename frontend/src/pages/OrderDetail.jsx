import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { orderAPI } from '../services/api';
import Loading from '../components/common/Loading';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];
const STATUS_ICONS = { Pending: Clock, Processing: Package, Shipped: Truck, Delivered: CheckCircle, Cancelled: XCircle };
const STATUS_COLORS = {
  Pending: 'text-yellow-600 bg-yellow-50',
  Processing: 'text-blue-600 bg-blue-50',
  Shipped: 'text-purple-600 bg-purple-50',
  Delivered: 'text-green-600 bg-green-50',
  Cancelled: 'text-red-600 bg-red-50',
};

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

  const StatusIcon = STATUS_ICONS[order.orderStatus] || Package;
  const currentStep = STATUS_STEPS.indexOf(order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h1>
          <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_COLORS[order.orderStatus]}`}>
          <StatusIcon className="h-4 w-4" />
          {order.orderStatus}
        </div>
      </div>

      {/* Progress bar */}
      {order.orderStatus !== 'Cancelled' && (
        <div className="card p-5 mb-5">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 mx-8">
              <div className="h-full bg-blue-600 transition-all" style={{ width: `${currentStep > 0 ? (currentStep / (STATUS_STEPS.length - 1)) * 100 : 0}%` }} />
            </div>
            {STATUS_STEPS.map((step, i) => {
              const Icon = STATUS_ICONS[step];
              const done = i <= currentStep;
              return (
                <div key={step} className="flex flex-col items-center z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={`text-xs mt-1.5 font-medium ${done ? 'text-blue-600' : 'text-gray-400'}`}>{step}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Items */}
        <div className="md:col-span-2 card p-5">
          <h2 className="font-bold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.orderItems.map((item) => {
              const imgUrl = item.image ? (item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`) : null;
              return (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {imgUrl ? <img src={imgUrl} alt={item.name} className="w-full h-full object-cover" /> : <Package className="h-6 w-6 text-gray-300 m-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600"><span>Items</span><span>₹{order.itemsPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax</span><span>₹{order.taxPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100"><span>Total</span><span>₹{order.totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" /> Delivery Address</h3>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p className="font-medium text-gray-800">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            </div>
          </div>

          <div className="card p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><CreditCard className="h-4 w-4 text-blue-600" /> Payment</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{order.paymentStatus}</span>
              </div>
              {order.paymentInfo?.razorpayPaymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID</span>
                  <span className="text-gray-800 font-mono text-xs">{order.paymentInfo.razorpayPaymentId.slice(-10)}</span>
                </div>
              )}
              {order.paidAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid On</span>
                  <span className="text-gray-800">{new Date(order.paidAt).toLocaleDateString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
