import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getBackendImageUrl } from "../../utils/imageUrl";
import toast from "react-hot-toast";

export default function QuickCommerceProductCard({ product }) {
  const { cart, items: contextItems, addToCart, updateQuantity } = useCart();
  const items = contextItems || cart?.items || [];

  const { isInWishlist, toggleWishlist } = useWishlist
    ? useWishlist()
    : { isInWishlist: () => false, toggleWishlist: () => {} };

  const [isAdding, setIsAdding] = useState(false);

  const itemId = String(product._id || product.id || "");
  const inWish = isInWishlist ? isInWishlist(itemId) : false;

  // Find quantity in cart
  const cartItem = items.find(
    (item) => String(item.productId) === itemId || String(item._id) === itemId
  );
  const cartQty = cartItem?.quantity || 0;

  const imgSrc = getBackendImageUrl(product.image);
  const discountLabel = product.discountLabel || (product.discount ? `${product.discount}% OFF` : null);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart({
      _id: itemId,
      id: itemId,
      productId: itemId,
      name: product.name,
      price: product.finalPrice || product.price,
      originalPrice: product.price,
      image: imgSrc,
      unit: product.unit || "1 pack",
      quantity: 1,
    });
    toast.success(`${product.name.slice(0, 24)}... added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#007038",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
      },
    });
    setTimeout(() => setIsAdding(false), 250);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(itemId, cartQty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(itemId, cartQty - 1);
  };

  return (
    <div className="group relative w-[150px] sm:w-[170px] md:w-[185px] flex-shrink-0 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 p-2.5 sm:p-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 flex flex-col justify-between select-none">
      <div>
        {/* Packshot Image Container with Badges */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-white flex items-center justify-center p-1 border border-gray-100/80">
          <Link
            to={`/products?search=${encodeURIComponent(product.name)}`}
            className="w-full h-full flex items-center justify-center overflow-hidden"
          >
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-contain select-none group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>

          {/* Discount Tag (Top-Left) */}
          {discountLabel && (
            <span className="absolute top-1.5 left-1.5 bg-[#008848] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs tracking-tight select-none pointer-events-none z-10">
              {discountLabel}
            </span>
          )}

          {/* Wishlist Heart Button (Top-Right) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist && toggleWishlist(product);
            }}
            className={`absolute top-1.5 right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-transform active:scale-110 cursor-pointer z-10 ${
              inWish ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            title="Add to Wishlist"
            aria-label="Add to Wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                inWish ? "fill-red-500 text-red-500" : "stroke-[2]"
              }`}
            />
          </button>
        </div>

        {/* Product Details */}
        <div className="space-y-0.5 text-left">
          {/* 2-line clamped title */}
          <Link
            to={`/products?search=${encodeURIComponent(product.name)}`}
            className="block text-xs sm:text-[13px] font-bold text-gray-800 leading-snug line-clamp-2 min-h-[34px] group-hover:text-[#008848] transition-colors"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Pack Size / Unit */}
          <p className="text-[11px] text-gray-500 font-medium truncate pt-0.5">
            {product.unit || "1 pack"}
          </p>

          {/* Optional Attribute Tag / Pill (e.g. For Tough Stains, Eco-friendly) */}
          {product.badge && (
            <div className="pt-0.5">
              <span className="inline-block text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                {product.badge}
              </span>
            </div>
          )}

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 text-[11px] font-medium pt-0.5">
            <span className="text-amber-500 font-bold">★</span>
            <span className="font-bold text-gray-800 text-[11px]">
              {product.rating || "4.8"}
            </span>
            <span className="text-gray-400 font-normal text-[10px]">
              ({product.ratingCount || "1k+"})
            </span>
          </div>
        </div>
      </div>

      {/* Price & Quick ADD Stepper Button */}
      <div className="pt-2.5 mt-auto flex items-center justify-between gap-1.5">
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-black text-gray-900 tracking-tight">
              ₹{product.finalPrice || product.price}
            </span>
            {product.price && product.finalPrice && product.price > product.finalPrice && (
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through font-normal">
                ₹{product.price}
              </span>
            )}
          </div>
        </div>

        {/* Quick Commerce ADD / Stepper Button (Zepto Signature Red/Pink) */}
        <div>
          {cartQty > 0 ? (
            <div className="inline-flex items-center justify-between bg-[#ff3269] text-white rounded-lg h-7 sm:h-8 px-1 shadow-xs min-w-[76px] sm:min-w-[84px] select-none font-bold">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-6 h-full flex items-center justify-center hover:bg-black/15 active:scale-90 rounded transition-all cursor-pointer text-white font-black"
                aria-label="Decrease quantity"
                title="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="text-xs sm:text-[13px] font-black px-1.5 text-center min-w-[18px]">
                {cartQty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-6 h-full flex items-center justify-center hover:bg-black/15 active:scale-90 rounded transition-all cursor-pointer text-white font-black"
                aria-label="Increase quantity"
                title="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdding}
              className="border-2 border-[#ff3269] bg-white hover:bg-[#ff3269] text-[#ff3269] hover:text-white font-black text-[11px] sm:text-xs tracking-wider px-3 sm:px-4 h-7 sm:h-8 rounded-lg shadow-2xs transition-all active:scale-95 flex items-center justify-center cursor-pointer uppercase select-none"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
