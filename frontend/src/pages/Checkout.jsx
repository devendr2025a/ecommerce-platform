import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, CreditCard, CheckCircle } from 'lucide-react';
import { addressAPI, paymentAPI, orderAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '', phone: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', country: 'India', isDefault: false
  });

  useEffect(() => {
    if (!cart.items?.length) { navigate('/cart'); return; }
    addressAPI.getAll().then(({ data }) => {
      setAddresses(data.addresses);
      const def = data.addresses.find((a) => a.isDefault);
      if (def) setSelectedAddress(def._id);
      else if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]._id);
      else setShowAddForm(true);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const items = cart.items || [];
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18 * 100) / 100;
  const total = subtotal + shipping + tax;

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addressAPI.add(newAddress);
      setAddresses([...addresses, data.address]);
      setSelectedAddress(data.address._id);
      setShowAddForm(false);
      toast.success('Address added');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const loadRazorpay = () => new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const handlePlaceOrder = async () => {
    if (!selectedAddress) { toast.error('Please select a delivery address'); return; }
    const addr = addresses.find((a) => a._id === selectedAddress);
    if (!addr) return;

    setPlacing(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { toast.error('Payment gateway failed to load'); setPlacing(false); return; }

      const { data: razorData } = await paymentAPI.createOrder({ amount: total });

      const options = {
        key: razorData.key || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorData.order.amount,
        currency: 'INR',
        name: 'ShopEasy',
        description: 'Order Payment',
        order_id: razorData.order.id,
        handler: async (response) => {
          try {
            const { data: verifyData } = await paymentAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const shippingAddress = {
              fullName: addr.fullName, phone: addr.phone,
              addressLine1: addr.addressLine1, addressLine2: addr.addressLine2,
              city: addr.city, state: addr.state, pincode: addr.pincode, country: addr.country,
            };

            const { data: orderData } = await orderAPI.create({
              shippingAddress,
              paymentInfo: verifyData.paymentInfo,
            });

            await clearCart();
            toast.success('Order placed successfully!');
            navigate(`/orders/${orderData.order._id}`);
          } catch (err) {
            toast.error(err.response?.data?.message || 'Order placement failed after payment');
          }
        },
        prefill: { name: addr.fullName, contact: addr.phone },
        theme: { color: '#2563eb' },
        modal: { ondismiss: () => setPlacing(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => { toast.error('Payment failed'); setPlacing(false); });
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to initiate payment');
      setPlacing(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-5">
          {/* Delivery Address */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" /> Delivery Address
              </h2>
              <button onClick={() => setShowAddForm(!showAddForm)} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add New
              </button>
            </div>

            {addresses.map((addr) => (
              <label key={addr._id} className={`flex gap-3 p-3 rounded-lg border-2 cursor-pointer mb-2 transition-colors ${selectedAddress === addr._id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="address" value={addr._id} checked={selectedAddress === addr._id}
                  onChange={() => setSelectedAddress(addr._id)} className="mt-1 accent-blue-600" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{addr.fullName} {addr.isDefault && <span className="badge bg-blue-100 text-blue-700 ml-1">Default</span>}</p>
                  <p className="text-gray-600">{addr.phone}</p>
                  <p className="text-gray-600">{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
                  <p className="text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                </div>
              </label>
            ))}

            {showAddForm && (
              <form onSubmit={handleAddAddress} className="mt-4 border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
                <input required placeholder="Full Name" value={newAddress.fullName} onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })} className="input-field text-sm col-span-2" />
                <input required placeholder="Phone (10 digits)" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} className="input-field text-sm col-span-2" maxLength={10} />
                <input required placeholder="Address Line 1" value={newAddress.addressLine1} onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })} className="input-field text-sm col-span-2" />
                <input placeholder="Address Line 2 (optional)" value={newAddress.addressLine2} onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })} className="input-field text-sm col-span-2" />
                <input required placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="input-field text-sm" />
                <input required placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="input-field text-sm" />
                <input required placeholder="Pincode" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} className="input-field text-sm" maxLength={6} />
                <div className="flex items-center gap-2 col-span-2">
                  <input type="checkbox" id="defaultAddr" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} className="accent-blue-600" />
                  <label htmlFor="defaultAddr" className="text-sm text-gray-700">Set as default address</label>
                </div>
                <div className="col-span-2 flex gap-2">
                  <button type="submit" className="btn-primary text-sm py-2 flex-1">Save Address</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary text-sm py-2">Cancel</button>
                </div>
              </form>
            )}
          </div>

          {/* Order Items */}
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Order Items ({items.length})</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-3 text-sm">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product?.images?.[0]?.url && (
                      <img src={item.product.images[0].url.startsWith('http') ? item.product.images[0].url : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${item.product.images[0].url}`} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 line-clamp-1">{item.product?.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Summary */}
        <div>
          <div className="card p-5 sticky top-20">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Price Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span><span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <button onClick={handlePlaceOrder} disabled={placing || !selectedAddress}
              className="btn-primary w-full mt-5 py-3 flex items-center justify-center gap-2 text-base">
              <CreditCard className="h-5 w-5" />
              {placing ? 'Processing...' : 'Pay with Razorpay'}
            </button>
            <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 justify-center">
              <CheckCircle className="h-4 w-4 text-green-500" /> Secured by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
