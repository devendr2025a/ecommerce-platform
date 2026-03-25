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
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <ShoppingBag className="h-20 w-20 text-gray-800 mx-auto mb-8 stroke-[1]" />
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Empty Cart</h2>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-10 font-bold">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col gap-2 mb-12">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Your Bag</h1>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">{items.length} Items Total</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = item.product;
            if (!product) return null;
            const imgUrl = product.images?.[0]?.url ? getImageUrl(product.images[0].url) : null;
            return (
              <div key={item._id} className="bg-[#000000] border border-gray-900 p-6 flex gap-6 group hover:border-white/20 transition-all">
                <div className="w-24 h-24 bg-gray-950 overflow-hidden flex-shrink-0 border border-gray-900">
                  {imgUrl ? (
                    <img src={imgUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-gray-800 stroke-[1]" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                        <Link to={`/products/${product._id}`} className="text-xs font-black text-white uppercase tracking-widest hover:text-gray-300 transition-colors">
                            {product.name}
                        </Link>
                        <button onClick={() => removeFromCart(product._id)} className="text-gray-600 hover:text-white transition-colors">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 mb-2">{product.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-900 bg-gray-950">
                      <button onClick={() => updateQuantity(product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-gray-900 disabled:opacity-20 transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-4 py-1 text-[11px] font-black text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(product._id, item.quantity + 1)}
                        disabled={item.quantity >= product.stock}
                        className="p-2 hover:bg-gray-900 disabled:opacity-20 transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-black text-white text-sm tracking-tighter">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-[#050505] border border-gray-900 p-8 sticky top-28">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-8">Order Summary</h2>
            <div className="space-y-6 text-[11px] font-bold uppercase tracking-widest">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white tracking-tighter text-xs">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-white' : 'text-white tracking-tighter text-xs'}>
                  {shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Tax</span>
                <span className="text-white tracking-tighter text-xs">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-px bg-gray-900 my-6" />
              <div className="flex justify-between text-white text-sm font-black italic">
                <span>Total</span>
                <span className="tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-8 text-center italic">
                Spend ₹{(500 - subtotal).toFixed(0)} more for free shipping
              </p>
            )}
            <button onClick={() => navigate('/checkout')} className="btn-primary w-full mt-10">
              Checkout Now
            </button>
            <Link to="/products" className="btn-secondary w-full mt-4 block">
              Keep Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
