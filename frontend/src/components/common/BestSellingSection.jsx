import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getBackendImageUrl } from "../../utils/imageUrl";
import toast from "react-hot-toast";

// 6 exact authentic Best Selling products matching user's reference mockup
const DEFAULT_BEST_SELLING = [
  {
    _id: "deal-amul-fresh-milk-1l",
    id: "deal-amul-fresh-milk-1l",
    name: "Amul Fresh Milk",
    weight: "Standard Pack",
    unit: "Standard Pack",
    price: 68,
    discount: 9,
    rating: "4.8",
    ratingCount: "1k+",
    image: "/images/blinkit/deal_amul_milk.png",
  },
  {
    _id: "deal-tata-salt-1kg",
    id: "deal-tata-salt-1kg",
    name: "Tata Salt",
    weight: "Standard Pack",
    unit: "Standard Pack",
    price: 22,
    discount: 18,
    rating: "4.8",
    ratingCount: "1k+",
    image: "/images/blinkit/deal_tata_salt.png",
  },
  {
    _id: "deal-maggi-2min-noodles-70g",
    id: "deal-maggi-2min-noodles-70g",
    name: "Maggi 2-Minute Noodles",
    weight: "Standard Pack",
    unit: "Standard Pack",
    price: 15,
    discount: 20,
    rating: "4.8",
    ratingCount: "1k+",
    image: "/images/blinkit/deal_maggi_noodles.png",
  },
  {
    _id: "deal-lays-classic-chips-52g",
    id: "deal-lays-classic-chips-52g",
    name: "Lays Classic Chips",
    weight: "Standard Pack",
    unit: "Standard Pack",
    price: 25,
    discount: 20,
    rating: "4.8",
    ratingCount: "1k+",
    image: "/images/blinkit/deal_lays_chips.png",
  },
  {
    _id: "deal-coca-cola-750ml",
    id: "deal-coca-cola-750ml",
    name: "Coca-Cola",
    weight: "Standard Pack",
    unit: "Standard Pack",
    price: 60,
    discount: 25,
    rating: "4.8",
    ratingCount: "1k+",
    image: "/images/blinkit/deal_coca_cola.png",
  },
  {
    _id: "deal-nestle-kitkat-36g",
    id: "deal-nestle-kitkat-36g",
    name: "Nestle KitKat",
    weight: "Standard Pack",
    unit: "Standard Pack",
    price: 40,
    discount: 25,
    rating: "4.8",
    ratingCount: "1k+",
    image: "/images/blinkit/deal_nestle_kitkat.png",
  },
];

export default function BestSellingSection({ products }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist
    ? useWishlist()
    : { isInWishlist: () => false, toggleWishlist: () => {} };
  const [addingId, setAddingId] = useState(null);

  // Combine backend list or use the default authentic 6 items
  const items = Array.isArray(products) && products.length >= 6 ? products.slice(0, 6) : DEFAULT_BEST_SELLING;

  const handleAdd = (item) => {
    const itemId = item._id || item.id;
    setAddingId(itemId);
    addToCart({
      _id: itemId,
      id: itemId,
      name: item.name,
      price: item.finalPrice || item.price,
      image: getBackendImageUrl(item.image),
      quantity: 1,
    });
    toast.success(`${item.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#007038",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
      },
    });
    setTimeout(() => setAddingId(null), 600);
  };

  return (
    <section className="py-4 sm:py-6 relative">
      {/* Subtle Floating Decorative Leaves in Background */}
      <div className="absolute -top-3 right-0 pointer-events-none select-none opacity-40 hidden md:block">
        <span className="text-4xl">🌿</span>
      </div>
      <div className="absolute -bottom-2 left-0 pointer-events-none select-none opacity-40 hidden md:block">
        <span className="text-3xl">🍃</span>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-[#008848] rounded-full inline-block" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Best <span className="text-[#008848]">Selling</span>
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-1 ml-6">
            Top picks loved by our customers
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#008848] border border-gray-200 rounded-full px-4 py-1.5 hover:border-[#008848] bg-white shadow-2xs transition-all group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 6 Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
        {items.map((item) => {
          const itemId = item._id || item.id;
          const inWish = isInWishlist ? isInWishlist(itemId) : false;
          const imgSrc = getBackendImageUrl(item.image);
          const discountVal = item.discount || 20;

          return (
            <div
              key={itemId}
              className="group relative bg-white rounded-2xl border border-gray-100/80 p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Packshot Image with Overlay Badge & Wishlist */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2.5 bg-[#f8faf8] flex items-center justify-center p-2">
                <Link
                  to={`/products?search=${encodeURIComponent(item.name)}`}
                  className="w-full h-full flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain select-none group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>

                {/* Top-Left Discount Badge */}
                <span className="absolute top-2 left-2 bg-[#007038] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs select-none pointer-events-none z-10">
                  {discountVal}% OFF
                </span>

                {/* Top-Right Heart Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist && toggleWishlist(item);
                  }}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs transition-transform active:scale-110 cursor-pointer ${
                    inWish ? "text-red-500" : "text-gray-400 hover:text-red-500"
                  }`}
                  title="Add to Wishlist"
                  aria-label="Add to Wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      inWish
                        ? "fill-red-500 text-red-500"
                        : "stroke-[2]"
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-0.5 text-left flex-1">
                <Link
                  to={`/products?search=${encodeURIComponent(item.name)}`}
                  className="block text-xs sm:text-[13px] font-bold text-gray-900 leading-snug line-clamp-1 group-hover:text-[#008848] transition-colors"
                  title={item.name}
                >
                  {item.name}
                </Link>

                <p className="text-[11px] text-gray-400 font-medium">
                  {item.weight || item.unit || "Standard Pack"}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-[11px] font-medium pt-0.5">
                  <span className="text-amber-400 font-bold">★</span>
                  <span className="font-bold text-gray-800">
                    {item.rating || "4.8"}
                  </span>
                  <span className="text-gray-400 font-normal">
                    ({item.ratingCount || "1k+"})
                  </span>
                </div>

                {/* Price */}
                <div className="text-base sm:text-lg font-black text-gray-950 pt-1">
                  ₹{item.price}
                </div>
              </div>

              {/* Bottom Full-Width Rounded-lg Add to Cart Button */}
              <div className="mt-3 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleAdd(item)}
                  disabled={addingId === itemId}
                  className="w-full bg-[#007038] hover:bg-[#005a2e] active:scale-[0.98] text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>{addingId === itemId ? "Added!" : "Add to Cart"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
