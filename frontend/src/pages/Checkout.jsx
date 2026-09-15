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
      .catch(() => {})
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
      <div className="max-w-[1240px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Compact Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 sm:mb-5 border-b border-gray-200/80">
          <div className="flex items-center gap-2.5">
            <Link
              to="/cart"
              className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-2xs"
              title="Back to Cart"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
                Checkout
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                  100% Secure
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Review your delivery address, items & payment
              </p>
            </div>
          </div>

          {/* Delivery Location Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-white border border-emerald-100 rounded-lg px-3 py-1.5 shadow-2xs">
            <Truck className="w-4 h-4 text-[#008848]" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-gray-900 leading-tight">
                Delivery to Lucknow
              </p>
              <p className="text-[10px] text-emerald-700 font-semibold leading-none">
                in 10–30 mins
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* ── LEFT COLUMN: Steps 1, 2, 3 (7 Cols on md/lg, 8 Cols on xl) ── */}
          <div className="md:col-span-7 lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5">
            {/* 1. Delivery Address Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center font-black text-xs border border-emerald-200/60 shadow-2xs">
                    1
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-gray-900 tracking-tight">
                    Delivery Address
                  </h2>
                </div>

                {!showAddForm && (
                  <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="text-xs font-bold text-[#008848] hover:text-[#006b38] flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-emerald-50/80 transition-colors border border-emerald-200/60 shadow-2xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {/* Saved Address List - 2 Column Grid */}
              {!showAddForm && addresses.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddress === addr._id;
                    return (
                      <label
                        key={addr._id}
                        className={`flex flex-col justify-between p-3.5 rounded-xl border transition-all cursor-pointer relative select-none ${
                          isSelected
                            ? "bg-emerald-50/50 border-[#008848] shadow-xs ring-2 ring-[#008848]/20"
                            : "bg-white border-gray-200/90 hover:border-gray-300 hover:bg-gray-50/50"
                        }`}
                      >
                        <div>
                          {/* Top row: Radio + Name + Default Pill */}
                          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-gray-100/80">
                            <div className="flex items-center gap-2 min-w-0">
                              <input
                                type="radio"
                                name="address"
                                value={addr._id}
                                checked={isSelected}
                                onChange={() => setSelectedAddress(addr._id)}
                                className="w-4 h-4 text-[#008848] focus:ring-emerald-400 accent-[#008848] cursor-pointer flex-shrink-0"
                              />
                              <span className="font-extrabold text-gray-950 text-xs sm:text-sm truncate">
                                {addr.fullName}
                              </span>
                            </div>

                            {addr.isDefault && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 px-2 py-0.5 rounded-md flex-shrink-0">
                                Default
                              </span>
                            )}
                          </div>

                          {/* Phone & Address info */}
                          <div className="text-left space-y-1">
                            <p className="text-gray-500 font-semibold text-[11px] flex items-center gap-1">
                              <span>📞</span>
                              <span>{addr.phone}</span>
                            </p>
                            <p className="text-gray-700 font-medium text-[11px] leading-relaxed line-clamp-3">
                              {addr.addressLine1}
                              {addr.addressLine2 ? `, ${addr.addressLine2}` : ""},{" "}
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                          </div>
                        </div>

                        {/* Selected Indicator Check */}
                        {isSelected && (
                          <div className="pt-2 mt-2 border-t border-emerald-100 flex items-center gap-1 text-[11px] font-bold text-[#008848]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Deliver Here</span>
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Empty Address Notice */}
              {!showAddForm && addresses.length === 0 && (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl bg-gray-50/40">
                  <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-800">
                    No address found
                  </p>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Add your delivery address in Lucknow to proceed
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-1.5 bg-[#008848] text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-[#00703b] transition-colors shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Delivery Address</span>
                  </button>
                </div>
              )}

              {/* Add Address Form Modal / Inline */}
              {showAddForm && (
                <form
                  onSubmit={handleAddAddress}
                  className="space-y-3 pt-2 text-left"
                >
                  <h3 className="text-xs font-bold text-gray-900 pb-1">
                    Add New Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Phone Number *
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
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Flat / House No. / Building / Street *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Flat 402, Green Valley Apartments"
                        value={newAddress.addressLine1}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            addressLine1: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Area / Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near Gomti Nagar Police Station"
                        value={newAddress.addressLine2}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            addressLine2: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
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
                          setNewAddress({
                            ...newAddress,
                            city: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
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
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#008848] focus:ring-1 focus:ring-[#008848]"
                      />
                    </div>

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
                        className="text-xs text-gray-600 font-medium cursor-pointer"
                      >
                        Set as default address for future orders
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#008848] hover:bg-[#00703b] text-white text-xs font-bold py-2 px-4 rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      Save & Use Address
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold py-2 px-3.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* 2. Order Items Review Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center font-black text-xs border border-emerald-200/60 shadow-2xs">
                    2
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-gray-900 tracking-tight">
                    Order Items ({items.length})
                  </h2>
                </div>
                <Link
                  to="/cart"
                  className="text-xs font-bold text-[#008848] hover:text-[#006b38] hover:underline"
                >
                  Edit Cart
                </Link>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => {
                  const productImg =
                    item.image || item.product?.images?.[0]?.url || "";
                  const imgSrc = getBackendImageUrl(productImg);

                  return (
                    <div
                      key={item._id || item.productId}
                      className="py-3 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <ShoppingBag className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                        <div className="min-w-0 text-left space-y-0.5">
                          <p className="font-bold text-gray-900 truncate sm:text-[13px]">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 font-medium">
                            Qty: <span className="font-bold text-gray-800">{item.quantity}</span> × ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <span className="font-black text-gray-950 flex-shrink-0 text-sm sm:text-base">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Payment Method Card (In Left Column for logical checkout flow) */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-gray-100">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center font-black text-xs border border-emerald-200/60 shadow-2xs">
                  3
                </div>
                <h2 className="text-sm sm:text-base font-black text-gray-900 tracking-tight">
                  Payment Method
                </h2>
              </div>

              {/* 2-Column Payment Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Razorpay Online */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    paymentMethod === "Online"
                      ? "bg-emerald-50/50 border-[#008848] shadow-xs ring-2 ring-[#008848]/20"
                      : "bg-white border-gray-200/90 hover:border-gray-300 hover:bg-gray-50/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={() => setPaymentMethod("Online")}
                    className="w-4 h-4 text-[#008848] accent-[#008848] mt-0.5 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-black text-gray-900">
                        Online Payment
                      </span>
                      <span className="text-[9px] font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-1.5 py-0.2 rounded">
                        FAST
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium leading-snug">
                      UPI (GPay / PhonePe / Paytm), Cards, NetBanking
                    </p>
                  </div>
                  <CreditCard
                    className={`w-5 h-5 flex-shrink-0 ${
                      paymentMethod === "Online"
                        ? "text-[#008848]"
                        : "text-gray-400"
                    }`}
                  />
                </label>

                {/* Cash On Delivery */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    paymentMethod === "COD"
                      ? "bg-emerald-50/50 border-[#008848] shadow-xs ring-2 ring-[#008848]/20"
                      : "bg-white border-gray-200/90 hover:border-gray-300 hover:bg-gray-50/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="w-4 h-4 text-[#008848] accent-[#008848] mt-0.5 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-black text-gray-900">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium leading-snug">
                      Pay at doorstep via Cash or QR code on delivery
                    </p>
                  </div>
                  <Banknote
                    className={`w-5 h-5 flex-shrink-0 ${
                      paymentMethod === "COD"
                        ? "text-[#008848]"
                        : "text-gray-400"
                    }`}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Sticky Order Summary & Pay Button (5 Cols) ── */}
          <div className="md:col-span-5 lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-4 sticky top-20">
              {/* Card Title */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xs sm:text-sm font-black text-gray-900 tracking-tight uppercase flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#008848]" />
                  <span>Order Summary</span>
                </h3>
                <span className="text-[11px] font-bold text-gray-500">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Bill Details Breakdown */}
              <div className="space-y-2.5 text-xs text-left">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Items Total (MRP)</span>
                  <span className="font-bold text-gray-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span className="flex items-center gap-1">
                    Delivery Fee
                    {shipping === 0 && (
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded">
                        Order &gt; ₹500
                      </span>
                    )}
                  </span>
                  {shipping === 0 ? (
                    <span className="text-[#008848] font-extrabold tracking-wide">FREE</span>
                  ) : (
                    <span className="font-bold text-gray-900">
                      ₹{shipping}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Taxes & GST (18%)</span>
                  <span className="font-bold text-gray-900">
                    ₹{tax.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Savings Strip */}
                {shipping === 0 && (
                  <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/70 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-[#008848] flex-shrink-0" />
                    <span>Yay! You saved ₹50 on delivery with this order</span>
                  </div>
                )}

                {/* Grand Total */}
                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-gray-950">
                      To Pay
                    </span>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Inclusive of all taxes & charges
                    </p>
                  </div>
                  <span className="text-xl font-black text-[#008848] tracking-tight">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Action / Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placing || !selectedAddress}
                className="w-full bg-[#008848] hover:bg-[#00703b] active:scale-[0.99] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-wide"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {placing
                    ? "Processing Order..."
                    : paymentMethod === "Online"
                    ? `Pay ₹${total.toLocaleString("en-IN")} Online`
                    : `Confirm Cash on Delivery`}
                </span>
              </button>

              {/* Security & Delivery Assurance Badges */}
              <div className="pt-2 border-t border-gray-100 space-y-1.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-600 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#008848] flex-shrink-0" />
                  <span>100% Safe &amp; Encrypted Payment</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 font-medium">
                  <Truck className="w-3 h-3 text-emerald-600" />
                  <span>Delivering in Lucknow Hub • 10–30 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
