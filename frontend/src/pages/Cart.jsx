import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Loading from '../components/common/Loading';
import { getBackendImageUrl } from '../utils/imageUrl';

export default function Cart() {
  const { cart, cartLoading, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartLoading) return <Loading />;

  const items = cart.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 199 ? 0 : items.length > 0 ? 30 : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="bg-[#f8fafc] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center max-w-md w-full shadow-sm">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#113821] mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-gray-500 mb-8 leading-relaxed">
            Your cart is hungry! Add fresh fruits, veggies, dairy and daily essentials to get them delivered in minutes.
          </p>
          <Link to="/products" className="btn-primary w-full py-3 rounded-xl font-bold">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113821] tracking-tight">
              My Grocery Cart
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {items.length} item{items.length > 1 ? 's' : ''} in your cart
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-[#008848] text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100">
            <Truck className="w-4 h-4" />
            <span>Delivery in 10–30 mins</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <div
                key={item._id || item.productId}
                className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex items-center gap-4 shadow-sm hover:border-emerald-200 transition-all"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#f8fafc] rounded-xl border border-gray-100 p-2 flex items-center justify-center flex-shrink-0">
                  <img
                    src={getBackendImageUrl(item.image)}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <Link
                      to={`/products/${item.productId}`}
                      className="text-sm font-bold text-gray-900 hover:text-[#008848] transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      aria-label="Remove item"
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.unit || '1 unit'}</p>

                  {/* Quantity & Price Row */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1.5 rounded bg-white shadow-xs hover:bg-gray-100 text-gray-700"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-extrabold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1.5 rounded bg-white shadow-xs hover:bg-gray-100 text-gray-700"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-gray-900">
                        ₹{item.price * item.quantity}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-gray-400 line-through ml-1.5">
                          ₹{item.originalPrice * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Delivery Guarantee Banner */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#008848] flex-shrink-0" />
              <p className="text-xs text-gray-700 leading-snug">
                <strong>100% Genuine & Fresh</strong> products delivered with contactless safety standards.
              </p>
            </div>
          </div>

          {/* Bill Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-sm sticky top-24">
              <h2 className="text-base font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Bill Details
              </h2>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Item Total</span>
                  <span className="font-bold text-gray-900 text-sm">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#15803d] font-bold bg-[#dcfce7] px-2 py-0.5 rounded">
                      FREE
                    </span>
                  ) : (
                    <span className="font-bold text-gray-900">₹{deliveryFee}</span>
                  )}
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[11px] text-[#008848] font-semibold">
                    Add items worth ₹{200 - subtotal} more for FREE Delivery!
                  </p>
                )}

                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
                  <span className="text-sm font-extrabold text-gray-900">To Pay</span>
                  <span className="text-xl font-black text-[#008848]">₹{total}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary w-full py-3.5 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/products"
                  className="w-full block text-center py-2.5 text-xs font-bold text-gray-600 hover:text-[#008848] transition-colors"
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
