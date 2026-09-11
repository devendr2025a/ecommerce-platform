import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { orderAPI } from "../services/api";
import Loading from "../components/common/Loading";
import { getBackendImageUrl } from "../utils/imageUrl";

const STATUS_CONFIG = {
  pending: {
    bg: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
    label: "Order Placed",
  },
  confirmed: {
    bg: "bg-blue-50 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
    label: "Confirmed",
  },
  processing: {
    bg: "bg-purple-50 text-purple-800 border-purple-200",
    dot: "bg-purple-500",
    label: "Packing Order",
  },
  shipped: {
    bg: "bg-indigo-50 text-indigo-800 border-indigo-200",
    dot: "bg-indigo-500",
    label: "Out for Delivery",
  },
  delivered: {
    bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-600",
    label: "Delivered",
  },
  cancelled: {
    bg: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    label: "Cancelled",
  },
};

function getStatusDetails(raw = "") {
  const key = raw.toLowerCase();
  return (
    STATUS_CONFIG[key] || {
      bg: "bg-gray-100 text-gray-700 border-gray-200",
      dot: "bg-gray-400",
      label: raw || "Processing",
    }
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    orderAPI
      .getMy({ page, limit: 10 })
      .then(({ data }) => {
        setOrders(data.orders || []);
        setMeta(data.meta || {});
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#f8fafc] min-h-screen py-3 sm:py-5">
      <div className="max-w-4xl mx-auto px-3 sm:px-5">
        {/* Compact Breadcrumb */}
        <nav className="flex items-center justify-between gap-2 text-[11px] text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Link to="/" className="hover:text-[#008848] transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
            <Link to="/dashboard" className="hover:text-[#008848] transition-colors font-medium">
              My Account
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
            <span className="font-bold text-gray-900">Order History</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 hover:text-[#008848] transition-colors py-0.5 px-2 rounded-md hover:bg-white border border-transparent hover:border-gray-200 cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back</span>
          </button>
        </nav>

        {/* Compact Header Bar */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-3.5 sm:p-4 mb-3.5 flex items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Package className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-gray-950 tracking-tight leading-snug">
                My Orders & History
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                {meta.total || orders.length} order
                {(meta.total || orders.length) !== 1 ? "s" : ""} placed • Lucknow Express
              </p>
            </div>
          </div>

          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#008848] bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 py-1.5 px-3 rounded-lg transition-colors cursor-pointer flex-shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order More</span>
          </Link>
        </div>

        {/* Orders List / Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <ShoppingBag className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              No orders placed yet
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-5 leading-relaxed">
              Order fresh fruits, milk, snacks & groceries with fast 10–30 min delivery in Lucknow.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 bg-[#008848] hover:bg-[#00703b] text-white text-xs font-extrabold px-5 py-2.5 rounded-lg shadow-2xs transition-all active:scale-95"
            >
              <span>Start Shopping Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {orders.map((order) => {
              const rawStatus = order.orderStatus || order.status || "processing";
              const status = getStatusDetails(rawStatus);
              const items = order.orderItems || order.items || [];
              const itemCount = items.length;
              const total = order.totalPrice ?? order.totalAmount ?? 0;
              const orderShortId = order._id.slice(-8).toUpperCase();
              const formattedDate = new Date(order.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                <Link
                  key={order._id}
                  to={`/orders/${order._id}`}
                  className="block bg-white rounded-xl border border-gray-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-xs p-3.5 sm:p-4 transition-all group text-left"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    {/* Left Info Column */}
                    <div className="space-y-2 min-w-0 flex-1">
                      {/* Top Order ID & Status Badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-gray-950 font-mono tracking-tight group-hover:text-[#008848] transition-colors">
                          ORDER #{orderShortId}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${status.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          <span>{status.label}</span>
                        </span>

                        <span className="text-[10px] text-gray-400 font-medium">
                          {order.paymentMethod || "COD"}
                        </span>
                      </div>

                      {/* Date & Items Count */}
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>{formattedDate}</span>
                        </span>
                        <span>•</span>
                        <span>
                          {itemCount} item{itemCount !== 1 ? "s" : ""}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold truncate">
                          Lucknow Hub
                        </span>
                      </div>

                      {/* Item Thumbnail Strip (Zepto / Blinkit style) */}
                      {items.length > 0 && (
                        <div className="flex items-center gap-1.5 pt-0.5 overflow-hidden">
                          {items.slice(0, 5).map((item, idx) => {
                            const rawImg =
                              item.image ||
                              item.product?.image ||
                              item.product?.images?.[0]?.url ||
                              "";
                            const imgUrl = getBackendImageUrl(rawImg);
                            return (
                              <div
                                key={idx}
                                className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 p-0.5 flex-shrink-0 flex items-center justify-center overflow-hidden"
                                title={item.name}
                              >
                                {imgUrl ? (
                                  <img
                                    src={imgUrl}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                  />
                                ) : (
                                  <Package className="w-3.5 h-3.5 text-gray-300" />
                                )}
                              </div>
                            );
                          })}

                          {items.length > 5 && (
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-1 rounded">
                              +{items.length - 5}
                            </span>
                          )}

                          <span className="text-[10px] text-gray-400 font-medium truncate ml-1 hidden sm:inline">
                            {items[0]?.name}
                            {items.length > 1 ? ` & ${items.length - 1} more` : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Price & Chevron Column */}
                    <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0 pl-2">
                      <p className="text-base sm:text-lg font-black text-gray-950 tracking-tight">
                        ₹{Number(total).toLocaleString("en-IN", { maximumFractionDigits: 1 })}
                      </p>

                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#008848] group-hover:translate-x-0.5 transition-transform mt-auto">
                        <span className="hidden sm:inline">Details</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Pagination Controls */}
            {meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:border-[#008848] hover:text-[#008848] disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
                >
                  ← Previous
                </button>
                <span className="text-xs font-bold text-gray-500 px-3">
                  Page {page} of {meta.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:border-[#008848] hover:text-[#008848] disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
