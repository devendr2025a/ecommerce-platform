import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Loading from '../components/common/Loading';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function Cart() {
  const { cart, cartLoading, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartLoading) return <Loading />;

  const items = cart.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : items.length > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.18 * 100) / 100;
  const total = subtotal + shipping + tax;

  const getImageUrl = (url) => url?.startsWith('http') ? url : `${API_URL}${url}`;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-20 w-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
          Start Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => {
            const product = item.product;
            if (!product) return null;
            const imgUrl = product.images?.[0]?.url ? getImageUrl(product.images[0].url) : null;
            return (
              <div key={item._id} className="card p-4 flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {imgUrl ? (
                    <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${product._id}`} className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-1 text-sm">
                    {product.name}
                  </Link>
                  <p className="text-blue-600 font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(product._id, item.quantity + 1)}
                        disabled={item.quantity >= product.stock}
                        className="px-2 py-1 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900 text-sm">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button onClick={() => removeFromCart(product._id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div>
          <div className="card p-5 sticky top-20">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-500 mt-3 bg-blue-50 p-2 rounded-lg">
                Add ₹{(500 - subtotal).toFixed(0)} more for free shipping
              </p>
            )}
            <button onClick={() => navigate('/checkout')} className="btn-primary w-full mt-4 py-3 flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/products" className="btn-secondary w-full mt-2 py-2.5 text-center block text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
