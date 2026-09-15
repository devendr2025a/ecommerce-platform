import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Plus,
  CreditCard,
  CheckCircle2,
  Truck,
  ShieldCheck,
  MapPin,
  Lock,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Check,
  Banknote,
  Phone,
  User,
  Home as HomeIcon,
  Receipt,
} from "lucide-react";
import { addressAPI, paymentAPI, orderAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";
import { getBackendImageUrl } from "../utils/imageUrl";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "",
    country: "India",
    isDefault: false,
  });

  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const toggleDeliveryNote = (note) => {
    setDeliveryNotes((prev) =>
      prev.includes(note) ? prev.filter((n) => n !== note) : [...prev, note]
    );
  };

  useEffect(() => {
    if (!cart.items?.length) {
      navigate("/cart");
      return;
    }
    addressAPI
      .getAll()
      .then(({ data }) => {
        setAddresses(data.addresses || []);
        const def = data.addresses?.find((a) => a.isDefault);
        if (def) setSelectedAddress(def._id);
        else if (data.addresses?.length > 0)
          setSelectedAddress(data.addresses[0]._id);
        else setShowAddForm(true);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
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
      setNewAddress({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "",
        country: "India",
        isDefault: false,
      });
      toast.success("Delivery address saved successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add address");
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }
    const addr = addresses.find((a) => a._id === selectedAddress);
    if (!addr) return;

    setPlacing(true);

    const shippingAddress = {
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      country: addr.country,
    };

    const checkoutItems = items.map((i) => ({
      productId: i.productId || i._id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }));

    if (paymentMethod === "COD") {
      try {
        const { data: orderData } = await orderAPI.create({
          shippingAddress,
          paymentMethod: "COD",
          items: checkoutItems,
        });
        await clearCart();
        toast.success("Order placed successfully (Cash on Delivery)!", {
          icon: "🎉",
          style: {
            borderRadius: "10px",
            background: "#008848",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "600",
          },
        });
        navigate(`/orders/${orderData.order._id}`);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to place COD order");
        setPlacing(false);
      }
      return;
    }

    // Online Payment (Razorpay)
    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Payment gateway failed to load");
        setPlacing(false);
        return;
      }

      const { data: razorData } = await paymentAPI.createOrder({
        amount: total,
      });

      const options = {
        key: razorData.key || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorData.order.amount,
        currency: "INR",
        name: "Grosliy Grocery",
        description: "Order Checkout Payment",
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
              paymentMethod: "Online",
              paymentInfo: verifyData.paymentInfo,
              items: checkoutItems,
            });

            await clearCart();
            toast.success("Payment verified! Order placed successfully!", {
              icon: "✅",
              style: {
                borderRadius: "10px",
                background: "#008848",
                color: "#fff",
                fontSize: "13px",
                fontWeight: "600",
              },
            });
            navigate(`/orders/${orderData.order._id}`);
          } catch (err) {
            toast.error(
              err.response?.data?.message ||
              "Order placement failed after payment"
            );
          }
        },
        prefill: { name: addr.fullName, contact: addr.phone },
        theme: { color: "#008848" },
        modal: { ondismiss: () => setPlacing(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed or cancelled");
        setPlacing(false);
      });
      rzp.open();
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        "Online payment is temporarily unavailable. We have switched your payment method to Cash on Delivery (COD).";
      toast.error(errMsg, { duration: 4500 });
      setPaymentMethod("COD");
      setPlacing(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-[#f8fafc] min-h-screen py-5 sm:py-7">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-gray-200/90">
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:border-emerald-400 hover:shadow-sm transition-all shadow-2xs group"
              title="Back to Cart"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
                  Checkout
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Secure
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium pt-0.5">
                Review your address, order items &amp; select payment mode
              </p>
            </div>
          </div>

          {/* Delivery Location Pill */}
          <div className="flex items-center gap-2.5 bg-white border border-emerald-200/90 rounded-2xl px-3.5 py-2 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#008848] flex items-center justify-center font-black">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-900 leading-tight">
                Express Delivery
              </p>
              <p className="text-[11px] text-emerald-700 font-extrabold leading-none pt-0.5">
                10–25 mins in Lucknow
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Balanced Layout - Zero Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* ── LEFT COLUMN: Address & Payment (7 Cols) ── */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4 text-left">
            
            {/* ── STEP 1: DELIVERY ADDRESS ── */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-sm transition-all">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    1
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight">
                      Delivery Address
                    </h2>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Select where you want your order delivered
                    </p>
                  </div>
                </div>

                {!showAddForm && (
                  <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008848] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 px-2.5 py-1 rounded-lg transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {/* Saved Address Cards - Clean full width when 1 address to avoid blank half! */}
              {!showAddForm && addresses.length > 0 && (
                <div className={addresses.length > 1 ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "space-y-3"}>
                  {addresses.map((addr) => {
                    const isSelected = selectedAddress === addr._id;
                    return (
                      <div
                        key={addr._id}
                        onClick={() => setSelectedAddress(addr._id)}
                        className={`group relative rounded-xl border-2 p-3.5 transition-all duration-150 cursor-pointer flex flex-col justify-between text-left ${
                          isSelected
                            ? "border-[#008848] bg-emerald-50/40 shadow-sm ring-2 ring-[#008848]/10"
                            : "border-gray-200/90 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                        }`}
                      >
                        {/* Top Meta Bar */}
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                <HomeIcon className="w-3 h-3 text-[#008848]" />
                                Home
                              </span>
                              {addr.isDefault && (
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>

                            {/* Selection Checkmark */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-[#008848] bg-[#008848] text-white shadow-2xs"
                                  : "border-gray-300 bg-white group-hover:border-gray-400"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>

                          {/* Recipient & Contact Details */}
                          <div className="space-y-0.5 pt-0.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-gray-900 capitalize">
                                {addr.fullName}
                              </h4>
                              <span className="text-gray-300">•</span>
                              <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#008848]" />
                                {addr.phone}
                              </span>
                            </div>

                            <p className="text-xs text-gray-600 leading-snug pt-0.5">
                              {addr.addressLine1}
                              {addr.addressLine2 ? `, ${addr.addressLine2}` : ""},{" "}
                              {addr.city}, {addr.state} -{" "}
                              <span className="text-[#008848] font-bold">{addr.pincode}</span>
                            </p>
                          </div>
                        </div>

                        {/* Status Footer */}
                        <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                          <span
                            className={`font-bold ${
                              isSelected ? "text-[#008848]" : "text-gray-400 group-hover:text-gray-600"
                            }`}
                          >
                            {isSelected ? "✓ Deliver to this address" : "Click to select"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty Address Notice */}
              {!showAddForm && addresses.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-4">
                  <MapPin className="w-8 h-8 text-[#008848] mx-auto mb-2" />
                  <h3 className="text-xs font-bold text-gray-900 mb-1">
                    No Saved Address Found
                  </h3>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Add your delivery address in Lucknow to place your order.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-1.5 bg-[#008848] text-white text-xs font-bold py-1.5 px-3.5 rounded-lg shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>
              )}

              {/* Add Address Form Modal / Inline Box */}
              {showAddForm && (
                <form
                  onSubmit={handleAddAddress}
                  className="bg-gray-50/70 border border-gray-200 rounded-xl p-3.5 sm:p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200/80">
                    <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <HomeIcon className="w-3.5 h-3.5 text-[#008848]" />
                      <span>New Delivery Address</span>
                    </h3>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="text-[11px] font-semibold text-gray-500 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={newAddress.fullName}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            fullName: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        required
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={newAddress.phone}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        House / Flat No., Apartment &amp; Street *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Flat 402, Royal Residency, Gomti Nagar"
                        value={newAddress.addressLine1}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            addressLine1: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Landmark / Area (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near Manoj Pandey Chauraha"
                        value={newAddress.addressLine2}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            addressLine2: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 226010"
                        value={newAddress.pincode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pincode: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848]"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-2 pt-0.5">
                      <input
                        type="checkbox"
                        id="defaultAddr"
                        checked={newAddress.isDefault}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            isDefault: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-[#008848] rounded border-gray-300 accent-[#008848]"
                      />
                      <label
                        htmlFor="defaultAddr"
                        className="text-xs text-gray-700 font-medium cursor-pointer"
                      >
                        Make this my default delivery address
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-1">
                    <button
                      type="submit"
                      className="flex-1 bg-[#008848] hover:bg-[#00703b] text-white text-xs font-bold py-2 px-4 rounded-lg shadow-sm"
                    >
                      Save &amp; Deliver Here
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-medium py-2 px-3 rounded-lg"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* ── STEP 2: PAYMENT METHOD (PLACED DIRECTLY IN FLOW) ── */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-gray-100">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  2
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight">
                    Select Payment Method
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium">
                    100% Encrypted &amp; Verified Payment Gateways
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Razorpay Online */}
                <div
                  onClick={() => setPaymentMethod("Online")}
                  className={`relative rounded-xl border-2 p-3.5 transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                    paymentMethod === "Online"
                      ? "border-[#008848] bg-emerald-50/40 shadow-sm ring-2 ring-[#008848]/10"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded">
                        Instant &amp; Fast
                      </span>
                      <div
                        className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === "Online"
                            ? "border-[#008848] bg-[#008848] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {paymentMethod === "Online" && (
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-0.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-[#008848] flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                          UPI, Card &amp; NetBanking
                        </h4>
                        <p className="text-[10px] text-gray-500 font-medium pt-0.5">
                          Razorpay • Google Pay, PhonePe, Paytm, Cards
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-gray-100 text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#008848]" />
                    <span>Zero convenience fee • Instant refund</span>
                  </div>
                </div>

                {/* Cash On Delivery */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`relative rounded-xl border-2 p-3.5 transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                    paymentMethod === "COD"
                      ? "border-[#008848] bg-emerald-50/40 shadow-sm ring-2 ring-[#008848]/10"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                        Pay At Doorstep
                      </span>
                      <div
                        className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === "COD"
                            ? "border-[#008848] bg-[#008848] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {paymentMethod === "COD" && (
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-0.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center flex-shrink-0">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                          Cash on Delivery (COD)
                        </h4>
                        <p className="text-[10px] text-gray-500 font-medium pt-0.5">
                          Pay with cash or scan QR upon delivery
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-gray-100 text-[10px] text-gray-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#008848]" />
                    <span>No advance payment needed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── DELIVERY PREFERENCES (Fills space with high utility) ── */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-3.5 sm:p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#008848]" />
                <span>Delivery Instructions (Optional):</span>
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {["🚪 Leave at door", "🔕 Avoid ringing bell", "📞 Call on arrival"].map((chip) => {
                  const active = deliveryNotes.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleDeliveryNote(chip)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                        active
                          ? "bg-emerald-50 border-[#008848] text-[#008848] font-bold shadow-2xs"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {active && <Check className="w-3 h-3 text-[#008848]" />}
                      <span>{chip}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Order Items + Bill Summary + Pay Button (5 Cols) ── */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-md space-y-4 sticky top-24">
              
              {/* Order Items Review Inside Right Card */}
              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs sm:text-sm font-black text-gray-950 tracking-tight uppercase flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-[#008848]" />
                    <span>Your Order ({items.length})</span>
                  </h3>
                  <Link
                    to="/cart"
                    className="text-xs font-bold text-[#008848] hover:text-[#00703b] hover:underline"
                  >
                    Edit Cart
                  </Link>
                </div>

                {/* Items List */}
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-50">
                  {items.map((item) => {
                    const productImg = item.image || item.product?.images?.[0]?.url || "";
                    const imgSrc = getBackendImageUrl(productImg);
                    return (
                      <div
                        key={item._id || item.productId}
                        className="flex items-center justify-between gap-3 text-xs pt-2 first:pt-0"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                            {imgSrc ? (
                              <img src={imgSrc} alt={item.name} className="max-h-full max-w-full object-contain" />
                            ) : (
                              <ShoppingBag className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                          <div className="min-w-0 text-left">
                            <p className="font-bold text-gray-900 truncate text-xs">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-gray-500 font-medium">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-gray-950 flex-shrink-0 text-xs sm:text-sm">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Free Delivery Banner */}
              {shipping === 0 ? (
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-[#008848] flex-shrink-0" />
                  <span>Yay! FREE Delivery unlocked on this order!</span>
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-[11px] text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>
                    Add <strong>₹{(500 - subtotal).toFixed(0)}</strong> more for{" "}
                    <strong className="text-emerald-700">FREE Delivery</strong>
                  </span>
                </div>
              )}

              {/* Bill Details Breakdown */}
              <div className="space-y-2.5 text-xs text-left">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Items Total (MRP)</span>
                  <span className="font-bold text-gray-950">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Handling &amp; Packaging</span>
                  <div className="flex items-center gap-1">
                    <span className="line-through text-gray-400 text-[11px]">₹15.00</span>
                    <span className="text-[#008848] font-extrabold">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Delivery Fee</span>
                  {shipping === 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="line-through text-gray-400 text-[11px]">₹50.00</span>
                      <span className="text-[#008848] font-extrabold">FREE</span>
                    </div>
                  ) : (
                    <span className="font-bold text-gray-950">₹{shipping.toFixed(2)}</span>
                  )}
                </div>

                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Taxes &amp; GST (18%)</span>
                  <span className="font-bold text-gray-950">₹{tax.toFixed(2)}</span>
                </div>

                {/* Grand Total Box */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-black text-gray-950 uppercase tracking-wide">
                        To Pay
                      </span>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Inclusive of all taxes
                      </p>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-[#008848] tracking-tight">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action / Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placing || !selectedAddress}
                className="w-full bg-[#008848] hover:bg-[#00703b] active:scale-[0.99] text-white font-black py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-wide"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {placing
                    ? "Processing Order..."
                    : paymentMethod === "Online"
                    ? `Pay ₹${total.toFixed(2)} Online`
                    : `Confirm Cash on Delivery`}
                </span>
              </button>

              {/* Security & Delivery Assurance Badges */}
              <div className="pt-2 border-t border-gray-100 space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008848] flex-shrink-0" />
                  <span>100% Safe &amp; Encrypted Payment</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 font-medium">
                  <Truck className="w-3 h-3 text-emerald-600" />
                  <span>Delivering in Lucknow Hub • 10–25 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
