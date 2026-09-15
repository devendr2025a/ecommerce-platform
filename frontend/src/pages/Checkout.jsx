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
  const [paymentMethod, setPaymentMethod] = useState("Online");
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

        {/* Two-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── LEFT COLUMN: 3 Logical Steps (7 Cols) ── */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5 text-left">
            
            {/* ── STEP 1: DELIVERY ADDRESS ── */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-sm transition-all">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    1
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight flex items-center gap-1.5">
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
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008848] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add New Address</span>
                  </button>
                )}
              </div>

              {/* Saved Address Cards Grid */}
              {!showAddForm && addresses.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddress === addr._id;
                    return (
                      <div
                        key={addr._id}
                        onClick={() => setSelectedAddress(addr._id)}
                        className={`group relative rounded-2xl border-2 p-4 transition-all duration-150 cursor-pointer flex flex-col justify-between text-left ${
                          isSelected
                            ? "border-[#008848] bg-emerald-50/30 shadow-sm ring-2 ring-[#008848]/10"
                            : "border-gray-200/90 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                        }`}
                      >
                        {/* Top Meta Bar */}
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                                <HomeIcon className="w-3 h-3 text-[#008848]" />
                                Home
                              </span>
                              {addr.isDefault && (
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded-md">
                                  Default
                                </span>
                              )}
                            </div>

                            {/* Radio / Check Circle */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-[#008848] bg-[#008848] text-white shadow-2xs"
                                  : "border-gray-300 bg-white group-hover:border-gray-400"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </div>
                          </div>

                          {/* Recipient Name & Phone */}
                          <div className="space-y-1 pt-1">
                            <h4 className="text-sm font-bold text-gray-900 tracking-tight capitalize">
                              {addr.fullName}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                              <Phone className="w-3.5 h-3.5 text-[#008848]" />
                              <span>{addr.phone}</span>
                            </div>
                          </div>

                          {/* Formatted Address Details */}
                          <div className="pt-2 text-xs text-gray-600 leading-relaxed space-y-0.5">
                            <p className="line-clamp-2 text-gray-700 font-normal">
                              {addr.addressLine1}
                              {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                            </p>
                            <p className="font-semibold text-gray-900 pt-0.5">
                              {addr.city}, {addr.state} -{" "}
                              <span className="text-[#008848] font-bold">
                                {addr.pincode}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Deliver Here Indicator */}
                        <div className="pt-3 mt-2 border-t border-gray-100/80 flex items-center justify-between text-[11px]">
                          <span
                            className={`font-bold transition-colors ${
                              isSelected
                                ? "text-[#008848]"
                                : "text-gray-400 group-hover:text-gray-600"
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
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 p-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    No Saved Delivery Address
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                    Please provide your delivery address in Lucknow to ensure superfast delivery of your groceries.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 bg-[#008848] text-white text-xs font-extrabold py-2.5 px-5 rounded-xl hover:bg-[#00703b] transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>
              )}

              {/* Add Address Form Modal / Inline Box */}
              {showAddForm && (
                <form
                  onSubmit={handleAddAddress}
                  className="bg-gray-50/70 border border-gray-200 rounded-2xl p-4 sm:p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <HomeIcon className="w-4 h-4 text-[#008848]" />
                      <span>Add New Delivery Address</span>
                    </h3>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-white border border-gray-200 px-2.5 py-1 rounded-lg"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    {/* Address Line 1 */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        House / Flat No., Apartment & Street *
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    {/* Address Line 2 */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    {/* Default Checkbox */}
                    <div className="sm:col-span-2 flex items-center gap-2 pt-1">
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
                        className="w-4 h-4 text-[#008848] rounded border-gray-300 focus:ring-[#008848] accent-[#008848]"
                      />
                      <label
                        htmlFor="defaultAddr"
                        className="text-xs text-gray-700 font-semibold cursor-pointer"
                      >
                        Make this my default delivery address
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#008848] hover:bg-[#00703b] text-white text-xs font-extrabold py-2.5 px-4 rounded-xl shadow-md transition-all"
                    >
                      Save &amp; Deliver Here
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* ── STEP 2: ORDER ITEMS REVIEW ── */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    2
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight">
                      Order Items ({items.length})
                    </h2>
                    <p className="text-[11px] text-gray-500 font-medium">
                      All items packed fresh from our Lucknow dark store
                    </p>
                  </div>
                </div>

                <Link
                  to="/cart"
                  className="text-xs font-bold text-[#008848] hover:underline bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 rounded-xl hover:bg-emerald-100/80 transition-all flex items-center gap-1"
                >
                  <span>Edit Cart</span>
                </Link>
              </div>

              {/* Product Rows */}
              <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-1 space-y-1">
                {items.map((item) => {
                  const productImg =
                    item.image || item.product?.images?.[0]?.url || "";
                  const imgSrc = getBackendImageUrl(productImg);

                  return (
                    <div
                      key={item._id || item.productId}
                      className="py-3 flex items-center justify-between gap-4 text-xs group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-14 bg-[#f8fafc] rounded-xl border border-gray-100 p-1.5 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <ShoppingBag className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <div className="min-w-0 text-left space-y-1">
                          <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">
                              @ ₹{item.price} each
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="font-black text-gray-950 text-sm sm:text-base">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── STEP 3: PAYMENT METHOD (IN LEFT FLOW) ── */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  3
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight">
                    Select Payment Method
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium">
                    All payment methods are encrypted &amp; verified
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Razorpay Online */}
                <label
                  onClick={() => setPaymentMethod("Online")}
                  className={`relative rounded-2xl border-2 p-4 transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                    paymentMethod === "Online"
                      ? "border-[#008848] bg-emerald-50/40 shadow-sm ring-2 ring-[#008848]/10"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Instant &amp; Fast
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === "Online"
                            ? "border-[#008848] bg-[#008848] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {paymentMethod === "Online" && (
                          <Check className="w-3 h-3 stroke-[3]" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-[#008848] flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                          UPI, Card &amp; NetBanking
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium pt-0.5">
                          Razorpay • Google Pay, PhonePe, Paytm, Cards
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-gray-100 text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#008848]" />
                    <span>Zero convenience fee • 100% Secure</span>
                  </div>
                </label>

                {/* Cash On Delivery */}
                <label
                  onClick={() => setPaymentMethod("COD")}
                  className={`relative rounded-2xl border-2 p-4 transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                    paymentMethod === "COD"
                      ? "border-[#008848] bg-emerald-50/40 shadow-sm ring-2 ring-[#008848]/10"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                        Pay At Doorstep
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === "COD"
                            ? "border-[#008848] bg-[#008848] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {paymentMethod === "COD" && (
                          <Check className="w-3 h-3 stroke-[3]" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center flex-shrink-0">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                          Cash on Delivery (COD)
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium pt-0.5">
                          Pay cash or scan QR at delivery time
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-gray-100 text-[10px] text-gray-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#008848]" />
                    <span>No advance payment needed</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Sticky Order Bill Summary & Place Order (5 Cols) ── */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-md space-y-4 sticky top-24">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xs sm:text-sm font-black text-gray-950 tracking-tight uppercase flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#008848]" />
                  <span>Bill Summary</span>
                </h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Free Delivery Banner / Tip */}
              {shipping === 0 ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <Sparkles className="w-4 h-4 text-[#008848] flex-shrink-0" />
                  <span>Yay! You saved ₹50 on delivery with this order!</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    Add <strong>₹{(500 - subtotal).toFixed(0)}</strong> more to get{" "}
                    <strong className="text-emerald-700">FREE Delivery</strong>
                  </span>
                </div>
              )}

              {/* Bill Details Breakdown */}
              <div className="space-y-3 text-xs text-left">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Items Total (MRP)</span>
                  <span className="font-bold text-gray-950">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    Handling &amp; Packaging
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="line-through text-gray-400 text-[11px]">₹15.00</span>
                    <span className="text-[#008848] font-extrabold">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    Delivery Fee
                    {shipping === 0 && (
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 border border-emerald-200 px-1.5 py-0.2 rounded">
                        &gt; ₹500
                      </span>
                    )}
                  </span>
                  {shipping === 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="line-through text-gray-400 text-[11px]">₹50.00</span>
                      <span className="text-[#008848] font-extrabold tracking-wide">
                        FREE
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-gray-950">
                      ₹{shipping.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Taxes &amp; GST (18%)</span>
                  <span className="font-bold text-gray-950">
                    ₹{tax.toFixed(2)}
                  </span>
                </div>

                {/* Grand Total Box */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3.5 flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-black text-gray-950 uppercase tracking-wide">
                        To Pay
                      </span>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Inclusive of all taxes
                      </p>
                    </div>
                    <span className="text-2xl font-black text-[#008848] tracking-tight">
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
                className="w-full bg-[#008848] hover:bg-[#00703b] active:scale-[0.99] text-white font-black py-4 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 flex items-center justify-center gap-2.5 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-wide"
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
              <div className="pt-3 border-t border-gray-100 space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#008848] flex-shrink-0" />
                  <span>100% Safe &amp; Encrypted Payment</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
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
