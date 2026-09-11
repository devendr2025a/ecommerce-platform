import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { getBackendImageUrl } from "../../utils/imageUrl";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const finalPrice =
    product.finalPrice !== undefined && product.finalPrice !== null
      ? product.finalPrice
      : product.price;

  const originalPrice =
    product.originalPrice || product.price || finalPrice;

  const discountPercent =
    product.discount ||
    (originalPrice > finalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : null);

  const rawImageUrl =
    product.image ||
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80";

  const imageUrl = getBackendImageUrl(rawImageUrl);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "8px",
        background: "#008848",
        color: "#fff",
        fontSize: "13px",
      },
    });
    setTimeout(() => setAdding(false), 400);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 p-2.5 sm:p-3 flex flex-col justify-between group relative">
      {/* Top Discount Tag & Wishlist Heart */}
      <div className="flex items-center justify-between z-10 mb-1">
        {discountPercent ? (
          <span className="text-[10px] font-extrabold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-md">
            {discountPercent}% OFF
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
              isWishlisted ? "fill-red-500 text-red-500" : "stroke-[1.8]"
            }`}
          />
        </button>
      </div>

      {/* Product Image Link (Aspect-square, full-bleed compact cover) */}
      <Link
        to={`/products/${product._id || product.id}`}
        className="block w-full group"
      >
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50/70 flex items-center justify-center relative">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 block select-none"
            loading="lazy"
          />
        </div>

        {/* Product Details (Compact typography) */}
        <div className="w-full mt-2 text-left space-y-0.5">
          <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 group-hover:text-[#008848] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h4>
          <p className="text-[11px] text-gray-500 font-medium truncate">
            {product.unit || "1 unit"}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-sm sm:text-base font-black text-gray-900">
              ₹{finalPrice}
            </span>
            {originalPrice > finalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add To Cart Button (Clean, compact, pill design) */}
      <div className="pt-2">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || adding}
          className="w-full bg-[#e8f5e9] text-[#008848] hover:bg-[#008848] hover:text-white font-extrabold text-xs py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-xs active:scale-95 disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
