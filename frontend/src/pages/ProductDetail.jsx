import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Heart,
  Share2,
  ChevronRight,
  Zap,
  Check,
  Clock,
  Package,
  ShoppingBag,
  Info,
} from "lucide-react";
import { productAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import { ALL_GROCERY_PRODUCTS, BEST_DEALS_PRODUCTS } from "../data/groceryData";
import ProductCard from "../components/products/ProductCard";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";
import { getBackendImageUrl } from "../utils/imageUrl";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Check if item is already in cart
  const cartItem = items?.find((item) => item.productId === id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    setLoading(true);
    // Find in mock data or fetch from backend API
    const localProd =
      ALL_GROCERY_PRODUCTS.find((p) => p._id === id) ||
      BEST_DEALS_PRODUCTS.find((p) => p._id === id);

    if (localProd) {
      setProduct(localProd);
      setLoading(false);
    }

    productAPI
      .getOne(id)
      .then(({ data }) => {
        if (data) setProduct(data);
      })
      .catch(() => {
        if (!localProd) {
          toast.error("Product not found");
          navigate("/products");
        }
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!product) return null;

  const finalPrice =
    product.finalPrice !== undefined && product.finalPrice !== null
      ? product.finalPrice
      : product.price;

  const originalPrice = product.originalPrice || product.price || finalPrice;

  const discountPercent =
    product.discount ||
    (originalPrice > finalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : null);

  const rawImageUrl =
    product.image ||
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80";

  const imageUrl = getBackendImageUrl(rawImageUrl);

  // Related products from same category or random
  const relatedProducts = ALL_GROCERY_PRODUCTS.filter(
    (p) =>
      p._id !== product._id &&
      (p.categorySlug === product.categorySlug ||
        p.category === product.category)
  ).slice(0, 4);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "8px",
        background: "#008848",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
        padding: "8px 12px",
      },
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!", { icon: "🔗" });
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-3 sm:py-4">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        {/* Compact Breadcrumb Header */}
        <nav className="flex items-center justify-between gap-2 text-[11px] text-gray-500 mb-2.5">
          <div className="flex items-center gap-1.5 truncate">
            <Link to="/" className="hover:text-[#008848] transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
            <Link
              to={`/products?category=${product.categorySlug || ""}`}
              className="hover:text-[#008848] transition-colors font-medium"
            >
              {product.category || "Grocery"}
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
            <span className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 hover:text-[#008848] transition-colors py-0.5 px-2 rounded-md hover:bg-white border border-transparent hover:border-gray-200 cursor-pointer flex-shrink-0"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back</span>
          </button>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs p-3 sm:p-5 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
            {/* ── Left Column: Media Showcase (5 cols) ── */}
            <div className="md:col-span-5 flex flex-col gap-2.5">
              {/* Product Image Canvas */}
              <div className="relative w-full aspect-square max-h-[320px] bg-gradient-to-b from-[#f9fafb] to-white rounded-lg border border-gray-100 flex items-center justify-center p-3 sm:p-4 overflow-hidden group">
                {/* Discount Badge */}
                {discountPercent && (
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="bg-[#dcfce7] text-[#15803d] border border-emerald-200/80 text-[10px] font-black px-2 py-0.5 rounded shadow-2xs tracking-tight uppercase">
                      {discountPercent}% OFF
                    </span>
                  </div>
                )}

                {/* Floating Wishlist & Share Buttons */}
                <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label="Wishlist"
                    className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs shadow-2xs border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90 cursor-pointer"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform ${
                        isWishlisted ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    aria-label="Share"
                    className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs shadow-2xs border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all active:scale-90 cursor-pointer"
                    title="Share product"
                  >
                    <Share2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Main Product Image with subtle hover zoom */}
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="max-h-[250px] w-auto object-contain transform group-hover:scale-105 transition-transform duration-300 select-none drop-shadow-xs"
                  loading="eager"
                />
              </div>

              {/* Delivery Assurance Micro-Card */}
              <div className="w-full bg-[#f0fdf4] border border-emerald-100 rounded-lg p-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#008848] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Zap className="w-3 h-3 fill-current" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-black text-gray-950 leading-tight">
                      Delivering in 10–25 mins
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <p className="text-[10px] text-emerald-800 font-medium leading-tight truncate">
                    Fast delivery to your location in Lucknow
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Column: Specs & Purchase Panel (7 cols) ── */}
            <div className="md:col-span-7 flex flex-col gap-2.5 text-left">
              {/* Category, Veg Badge & Brand Header */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {/* Veg Symbol Badge */}
                <span
                  className="w-3.5 h-3.5 border border-emerald-600 rounded-xs flex items-center justify-center p-0.5 flex-shrink-0"
                  title="100% Vegetarian"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                </span>

                {/* Category Pill */}
                <span className="text-[10px] font-extrabold text-[#008848] bg-[#eaf8ef] border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-wide">
                  {product.category || "Grocery"}
                </span>

                {/* Brand */}
                {product.brand && (
                  <span className="text-[11px] font-semibold text-gray-500">
                    By <strong className="text-gray-900">{product.brand}</strong>
                  </span>
                )}

                {/* Stock Indicator */}
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 ml-auto">
                  <Check className="w-2.5 h-2.5 stroke-[3]" /> In Stock
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-lg sm:text-xl font-black text-gray-950 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Pack Size Chip & Rating */}
              <div className="flex items-center gap-2.5 text-xs flex-wrap">
                <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  <span className="text-gray-500 font-medium">Pack Size:</span>
                  <span className="text-gray-950 font-black">
                    {product.unit || product.packSize || "1 unit"}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#008848] text-white px-1.5 py-0.5 rounded font-black text-[10px] shadow-2xs">
                  <span>4.8</span>
                  <Star className="w-2.5 h-2.5 fill-current" />
                </div>
                <span className="text-[10px] text-gray-500 font-medium">
                  (150+ ratings & verified reviews)
                </span>
              </div>

              {/* Pricing Row */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-gray-950 tracking-tight">
                    ₹{finalPrice}
                  </span>
                  {originalPrice > finalPrice && (
                    <span className="text-xs text-gray-400 line-through font-semibold">
                      ₹{originalPrice}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-[11px] font-extrabold text-[#15803d] bg-[#dcfce7] border border-emerald-200/80 px-2 py-0.5 rounded">
                      Save ₹{originalPrice - finalPrice} ({discountPercent}% OFF)
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 font-medium pt-0.5">
                  (Inclusive of all taxes)
                </p>
              </div>

              {/* Quantity Selector & Add to Cart Controls */}
              <div className="pt-1">
                {inCartQty > 0 ? (
                  /* Item Already in Cart State - Compact & Premium */
                  <div className="inline-flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center h-8 bg-[#f0fdf4] border border-[#008848]/30 rounded-lg p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product._id, inCartQty - 1)}
                        className="w-7 h-7 rounded-md bg-white hover:bg-emerald-50 text-[#008848] flex items-center justify-center font-bold border border-emerald-100/70 shadow-2xs transition-all active:scale-95 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span className="px-2.5 text-[11px] font-extrabold text-[#008848] whitespace-nowrap">
                        {inCartQty} in cart
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product._id, inCartQty + 1)}
                        className="w-7 h-7 rounded-md bg-[#008848] hover:bg-[#00703b] text-white flex items-center justify-center shadow-2xs transition-all active:scale-95 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>

                    <Link
                      to="/cart"
                      className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-gray-900 hover:bg-black text-white font-bold text-xs shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>View Cart & Checkout →</span>
                    </Link>
                  </div>
                ) : (
                  /* Standard Quantity & Add to Cart - Compact & Premium */
                  <div className="inline-flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center h-8 border border-gray-200 rounded-lg bg-gray-50 p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 rounded-md bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center shadow-2xs transition-all active:scale-95 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-gray-950">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-7 h-7 rounded-md bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center shadow-2xs transition-all active:scale-95 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`h-8 px-4 rounded-lg font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer ${
                        isAdding
                          ? "bg-[#15803d] text-white"
                          : "bg-[#008848] hover:bg-[#00703b] text-white"
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>
                        {isAdding
                          ? "Adding..."
                          : `Add to Cart • ₹${finalPrice * quantity}`}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3 Compact Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-[#f9fafb] border border-gray-100">
                  <Sparkles className="w-3.5 h-3.5 text-[#008848] flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-[10px] font-bold text-gray-900 leading-tight truncate">
                      100% Farm Fresh
                    </p>
                    <p className="text-[9px] text-gray-500 truncate leading-tight">
                      Quality Verified
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-[#f9fafb] border border-gray-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008848] flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-[10px] font-bold text-gray-900 leading-tight truncate">
                      Hygienically Packed
                    </p>
                    <p className="text-[9px] text-gray-500 truncate leading-tight">
                      Sanitized Storage
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-[#f9fafb] border border-gray-100">
                  <RotateCcw className="w-3.5 h-3.5 text-[#008848] flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-[10px] font-bold text-gray-900 leading-tight truncate">
                      Easy Return
                    </p>
                    <p className="text-[9px] text-gray-500 truncate leading-tight">
                      No questions asked
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Specifications Tabs / Highlights */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-900">
                    Product Details & Highlights
                  </h3>
                  <span className="text-[10px] text-gray-400 font-medium">
                    FSSAI Assured
                  </span>
                </div>

                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {product.description ||
                    `Premium quality ${product.name} sourced with care for pure refreshment and authentic taste. Carefully inspected and hygienically packed to retain peak freshness.`}
                </p>

                {/* Compact 4-cell Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5 text-[10px]">
                  <div className="bg-gray-50/90 border border-gray-100 p-1.5 rounded">
                    <span className="text-gray-400 block text-[9px] font-semibold">Brand</span>
                    <span className="font-bold text-gray-800 truncate block">
                      {product.brand || "Grosliy"}
                    </span>
                  </div>
                  <div className="bg-gray-50/90 border border-gray-100 p-1.5 rounded">
                    <span className="text-gray-400 block text-[9px] font-semibold">Category</span>
                    <span className="font-bold text-gray-800 truncate block">
                      {product.category || "Grocery"}
                    </span>
                  </div>
                  <div className="bg-gray-50/90 border border-gray-100 p-1.5 rounded">
                    <span className="text-gray-400 block text-[9px] font-semibold">Shelf Life</span>
                    <span className="font-bold text-gray-800">6 Months</span>
                  </div>
                  <div className="bg-gray-50/90 border border-gray-100 p-1.5 rounded">
                    <span className="text-gray-400 block text-[9px] font-semibold">Hub</span>
                    <span className="font-bold text-gray-800">Lucknow Express</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Grocery Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-sm sm:text-base font-black text-gray-950 tracking-tight flex items-center gap-1.5">
                <span>You Might Also Like</span>
                <span className="text-[11px] font-semibold text-gray-400">
                  (In {product.category || "Grocery"})
                </span>
              </h3>
              <Link
                to={`/products?category=${product.categorySlug || ""}`}
                className="text-[11px] font-bold text-[#008848] hover:underline"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
