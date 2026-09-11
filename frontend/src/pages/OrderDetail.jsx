import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Check,
  Phone,
  MessageSquare,
  ShoppingBag,
  Receipt,
  Copy,
  Sparkles,
} from "lucide-react";
import { orderAPI } from "../services/api";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";
import { getBackendImageUrl } from "../utils/imageUrl";

const STATUS_STEPS = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "processing", label: "Packing", icon: Package },
  { key: "shipped", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const STATUS_BADGE = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-purple-50 text-purple-700 border-purple-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

function getStepIndex(status = "") {
  const s = status.toLowerCase();
  const idx = STATUS_STEPS.findIndex((step) => step.key === s);
  return idx === -1 ? 0 : idx;
}

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI
      .getOne(id)
      .then(({ data }) => setOrder(data.order))
      .catch(() => navigate("/orders"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!order) return null;

  const rawStatus = (
    order.orderStatus ||
    order.status ||
    "pending"
  ).toLowerCase();
  const isCancelled = rawStatus === "cancelled";
  const currentStep = getStepIndex(rawStatus);
  const badgeClass =
    STATUS_BADGE[rawStatus] || "bg-gray-100 text-gray-700 border-gray-200";
  const statusLabel =
    STATUS_STEPS.find((s) => s.key === rawStatus)?.label || rawStatus;
  const items = order.orderItems || order.items || [];
  const totalPrice = order.totalPrice ?? order.totalAmount ?? 0;
  const itemsPrice = order.itemsPrice ?? order.subtotal ?? 0;
  const shippingPrice = order.shippingPrice ?? order.shippingCost ?? 0;
  const taxPrice = order.taxPrice ?? order.tax ?? 0;

  const displayOrderId = order._id.slice(-8).toUpperCase();

  const handleCopyId = () => {
    navigator.clipboard.writeText(order._id);
    toast.success("Order ID copied to clipboard!", {
      icon: "📋",
      style: {
        borderRadius: "8px",
        background: "#008848",
        color: "#fff",
        fontSize: "12px",
      },
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-4 sm:py-6">
      <div className="max-w-[1180px] mx-auto px-3 sm:px-5 lg:px-6 space-y-4 sm:space-y-5">
        {/* Compact Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200/80 rounded-xl p-3.5 sm:p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-950 hover:bg-gray-100 transition-colors shadow-2xs"
              title="Back to Orders"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-gray-950 tracking-tight">
                  Order #{displayOrderId}
                </h1>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="text-gray-400 hover:text-emerald-700 transition-colors p-1"
                  title="Copy full Order ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full border ${badgeClass} uppercase tracking-wide`}
            >
              {statusLabel}
            </span>
            <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 px-3 py-1 rounded-full">
              <Truck className="w-3.5 h-3.5 text-[#008848]" />
              <span>Delivering in 10–30 mins</span>
            </div>
          </div>
        </div>

        {/* Compact Progress Tracker */}
        {!isCancelled && (
          <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#008848]" />
                <span>Live Delivery Status</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-500">
                Hub: Lucknow Center
              </span>
            </div>

            <div className="relative px-2 sm:px-6 py-2">
              {/* Progress Background Line */}
              <div className="absolute top-6 left-6 right-6 h-1 bg-gray-100 rounded-full" />
              {/* Active Fill Line */}
              <div
                className="absolute top-6 left-6 h-1 bg-[#008848] rounded-full transition-all duration-700"
                style={{
                  width: `${
                    currentStep > 0
                      ? (currentStep / (STATUS_STEPS.length - 1)) * 88
                      : 0
                  }%`,
                }}
              />

              <div className="relative flex justify-between items-start">
                {STATUS_STEPS.map((step, idx) => {
                  const StepIcon = step.icon;
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center gap-1.5 text-center flex-1"
                    >
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 border-2 ${
                          isDone
                            ? "bg-[#008848] border-[#008848] text-white shadow-xs"
                            : "bg-white border-gray-200 text-gray-400"
                        } ${isCurrent ? "ring-4 ring-emerald-100 scale-105" : ""}`}
                      >
                        {isDone && !isCurrent ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <StepIcon className="w-4 h-4 stroke-[2]" />
                        )}
                      </div>
                      <p
                        className={`text-[10px] sm:text-[11px] leading-tight font-bold ${
                          isDone ? "text-gray-950" : "text-gray-400 font-medium"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Cancelled Notice */}
        {isCancelled && (
          <div className="flex items-center gap-3 bg-red-50/80 border border-red-200 rounded-xl p-3.5 sm:p-4">
            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-950">
                Order has been cancelled
              </p>
              <p className="text-[11px] text-red-700 font-medium">
                If you have any questions or require a refund, our Lucknow
                support team is here to help.
              </p>
            </div>
          </div>
        )}

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
          {/* ── LEFT COLUMN: Items & Summary (8 Cols) ── */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="text-xs sm:text-sm font-bold text-gray-950 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#008848]" />
                  <span>Items Ordered ({items.length})</span>
                </h2>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Delivered 100% Fresh
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100">
                {items.map((item, idx) => {
                  const rawImg =
                    item.image || item.product?.images?.[0]?.url || "";
                  const imgSrc = getBackendImageUrl(rawImg);

                  return (
                    <div
                      key={item._id || idx}
                      className="py-3 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f8fafc] rounded-lg border border-gray-100 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain select-none"
                            />
                          ) : (
                            <Package className="h-5 w-5 text-gray-300" />
                          )}
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="font-bold text-gray-950 truncate text-xs sm:text-sm">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 font-medium">
                            Qty: {item.quantity} × ₹
                            {(item.price || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <span className="font-extrabold text-gray-950 text-sm flex-shrink-0">
                        ₹
                        {((item.price || 0) * (item.quantity || 1)).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bill Details Breakdown */}
              <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Items Subtotal</span>
                  <span className="text-gray-900 font-semibold">
                    ₹{itemsPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Delivery Fee</span>
                  <span>
                    {shippingPrice === 0 ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                        FREE
                      </span>
                    ) : (
                      <span className="text-gray-900 font-semibold">
                        ₹{shippingPrice}
                      </span>
                    )}
                  </span>
                </div>

                {taxPrice > 0 && (
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>GST (18%)</span>
                    <span className="text-gray-900 font-semibold">
                      ₹{taxPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-gray-950">
                      Total Paid
                    </span>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Inclusive of all taxes
                    </p>
                  </div>
                  <span className="text-base sm:text-lg font-black text-[#008848]">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Delivery Info & Actions (4 Cols) ── */}
          <div className="lg:col-span-4 space-y-4">
            {/* Delivery Address Card */}
            {order.shippingAddress && (
              <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs space-y-2.5">
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
                  <MapPin className="w-3.5 h-3.5 text-[#008848]" />
                  <span>Delivery Address</span>
                </h3>
                <div className="text-xs space-y-0.5 text-left">
                  <p className="font-extrabold text-gray-950">
                    {order.shippingAddress.fullName}
                  </p>
                  <p className="text-gray-500 font-medium text-[11px]">
                    📞 {order.shippingAddress.phone}
                  </p>
                  <p className="text-gray-700 font-normal leading-relaxed text-[11px] pt-1">
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2
                      ? `, ${order.shippingAddress.addressLine2}`
                      : ""}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.pincode}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Details Card */}
            <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs space-y-2.5">
              <h3 className="flex items-center gap-1.5 text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
                <CreditCard className="w-3.5 h-3.5 text-[#008848]" />
                <span>Payment Information</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Method</span>
                  <span className="font-bold text-gray-900">
                    {order.paymentMethod === "COD"
                      ? "Cash on Delivery"
                      : "Online (Razorpay)"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Payment Status</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                      order.paymentStatus === "Paid" ||
                      order.paymentStatus === "paid"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {order.paymentStatus === "Paid" ||
                    order.paymentStatus === "paid"
                      ? "Paid"
                      : "Pay on Delivery"}
                  </span>
                </div>
                {order.paidAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Paid On</span>
                    <span className="font-medium text-gray-700">
                      {new Date(order.paidAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions & Help */}
            <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs space-y-2">
              <Link
                to="/products"
                className="w-full bg-[#008848] hover:bg-[#00703b] text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order More Groceries</span>
              </Link>
              <Link
                to="/contact"
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 border border-gray-200 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                <span>Need Help with Order?</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
