import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CreditCard, CheckCircle, ShoppingBag } from 'lucide-react';
import { addressAPI, paymentAPI, orderAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Online');
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

    const shippingAddress = {
      fullName: addr.fullName, phone: addr.phone,
      addressLine1: addr.addressLine1, addressLine2: addr.addressLine2,
      city: addr.city, state: addr.state, pincode: addr.pincode, country: addr.country,
    };

    if (paymentMethod === 'COD') {
      try {
        const { data: orderData } = await orderAPI.create({
          shippingAddress,
          paymentMethod: 'COD',
        });
        await clearCart();
        toast.success('Order placed successfully (COD)!');
        navigate(`/orders/${orderData.order._id}`);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to place COD order');
        setPlacing(false);
      }
      return;
    }

    // Online Payment (Razorpay)
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

            const { data: orderData } = await orderAPI.create({
              shippingAddress,
              paymentMethod: 'Online',
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
        theme: { color: '#000000' },
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col gap-2 mb-12">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Secure Checkout</h1>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Review and place your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Shipping and Items */}
        <div className="lg:col-span-7 space-y-12">
          {/* Delivery Address */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-900 pb-4">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">1. Shipping Address</h2>
              <button onClick={() => setShowAddForm(!showAddForm)} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                <Plus className="h-3 w-3" /> Add New
              </button>
            </div>

            <div className="space-y-4">
              {addresses.map((addr) => (
                <label key={addr._id} className={`flex gap-4 p-6 border transition-all cursor-pointer ${selectedAddress === addr._id ? 'bg-[#050505] border-white' : 'bg-black border-gray-900 hover:border-gray-700'}`}>
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${selectedAddress === addr._id ? 'border-white' : 'border-gray-800'}`}>
                      {selectedAddress === addr._id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                  <input type="radio" name="address" value={addr._id} checked={selectedAddress === addr._id} onChange={() => setSelectedAddress(addr._id)} className="hidden" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-black text-white uppercase tracking-widest">{addr.fullName}</p>
                      {addr.isDefault && <span className="text-[8px] font-black bg-white text-black px-1.5 py-0.5 uppercase tracking-tighter">Default</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold font-mono">{addr.phone}</p>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                      {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {showAddForm && (
              <form onSubmit={handleAddAddress} className="bg-[#050505] border border-gray-900 p-8 space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="FULL NAME" value={newAddress.fullName} onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase" />
                  <input required placeholder="PHONE NUMBER" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase font-mono" maxLength={10} />
                  <input required placeholder="ADDRESS LINE 1" value={newAddress.addressLine1} onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase" />
                  <input placeholder="ADDRESS LINE 2 (OPTIONAL)" value={newAddress.addressLine2} onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })} className="input-field text-[10px] font-bold tracking-widest col-span-2 uppercase" />
                  <input required placeholder="CITY" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="input-field text-[10px] font-bold tracking-widest uppercase" />
                  <input required placeholder="STATE" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="input-field text-[10px] font-bold tracking-widest uppercase" />
                  <input required placeholder="PINCODE" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} className="input-field text-[10px] font-bold tracking-widest uppercase font-mono" maxLength={6} />
                  <div className="flex items-center gap-3 col-span-2 pt-2">
                    <input type="checkbox" id="defaultAddr" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} className="w-4 h-4 bg-black border-gray-800 rounded-sm focus:ring-0 accent-white" />
                    <label htmlFor="defaultAddr" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Set as default address</label>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button type="submit" className="btn-primary flex-1">Save Address</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
                </div>
              </form>
            )}
          </div>

          {/* Order Items */}
          <div className="space-y-6">
            <div className="border-b border-gray-900 pb-4">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">2. Review Items</h2>
            </div>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex gap-6 items-center p-4 border border-gray-900 bg-[#020202]">
                  <div className="w-16 h-16 bg-gray-950 border border-gray-900 overflow-hidden flex-shrink-0">
                    {item.product?.images?.[0]?.url && (
                      <img src={item.product.images[0].url.startsWith('http') ? item.product.images[0].url : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${item.product.images[0].url}`} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[11px] font-black text-white uppercase tracking-widest line-clamp-1">{item.product?.name}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-[11px] font-black text-white uppercase tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Payment and Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#050505] border border-gray-900 p-8 space-y-10 sticky top-28">
            <div className="space-y-6">
              <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-5 border cursor-pointer transition-all ${paymentMethod === 'Online' ? 'bg-[#080808] border-white' : 'bg-black border-gray-900 hover:border-gray-800'}`}>
                  <input type="radio" name="payment" value="Online" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className="hidden" />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'Online' ? 'border-white' : 'border-gray-800'}`}>
                    {paymentMethod === 'Online' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-black text-white uppercase tracking-widest">Card / NetBanking</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-0.5">Secure Transaction</p>
                  </div>
                  <CreditCard className={`h-5 w-5 ${paymentMethod === 'Online' ? 'text-white' : 'text-gray-700'}`} />
                </label>

                <label className={`flex items-center gap-4 p-5 border cursor-pointer transition-all ${paymentMethod === 'COD' ? 'bg-[#080808] border-white' : 'bg-black border-gray-900 hover:border-gray-800'}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="hidden" />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'COD' ? 'border-white' : 'border-gray-800'}`}>
                    {paymentMethod === 'COD' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-black text-white uppercase tracking-widest">Cash on Delivery</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-0.5">Pay at Doorstep</p>
                  </div>
                  <CheckCircle className={`h-5 w-5 ${paymentMethod === 'COD' ? 'text-white' : 'text-gray-700'}`} />
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Price Summary</h2>
              <div className="space-y-4 text-[11px] font-bold uppercase tracking-widest">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white tracking-tighter">₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-white uppercase">{shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-gray-400"><span>GST (18%)</span><span className="text-white tracking-tighter">₹{tax.toLocaleString('en-IN')}</span></div>
                <div className="h-px bg-gray-900 my-4" />
                <div className="flex justify-between text-white text-sm font-black italic">
                  <span>Grand Total</span><span className="tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button onClick={handlePlaceOrder} disabled={placing || !selectedAddress} className="btn-primary w-full py-4 text-xs tracking-[0.3em]">
              {placing ? 'PROCESSSING...' : (paymentMethod === 'Online' ? 'PAY & PLACE ORDER' : 'CONFIRM COD ORDER')}
            </button>
            
            <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest text-center italic">
              All transactions are secured and encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
