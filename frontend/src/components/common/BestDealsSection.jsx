import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { getBackendImageUrl } from "../../utils/imageUrl";

// 6 authentic best deal products matching user reference
const BEST_DEALS_ITEMS = [

  {
    id: "deal-amul-fresh-milk-1l",
    name: "Amul Fresh Milk",
    displayName: "Amul Fresh Milk",
    unit: "1 Ltr",
    price: 68,
    finalPrice: 62,
    discount: 9,
    image: "/images/blinkit/deal_amul_milk.png",
  },
  {
    id: "deal-tata-salt-1kg",
    name: "Tata Salt",
    displayName: "Tata Salt",
    unit: "1 kg",
    price: 22,
    finalPrice: 18,
    discount: 18,
    image: "/images/blinkit/deal_tata_salt.png",
  },
  {
    id: "deal-maggi-2min-noodles-70g",
    name: "Maggi 2-Minute Noodles",
    displayName: "Maggi 2-Minute Noodles",
    unit: "70 g",
    price: 15,
    finalPrice: 12,
    discount: 20,
    image: "/images/blinkit/deal_maggi_noodles.png",
  },
  {
    id: "deal-lays-classic-chips-52g",
    name: "Lays Classic Chips",
    displayName: "Lays Classic Chips",
    unit: "52 g",
    price: 25,
    finalPrice: 20,
    discount: 20,
    image: "/images/blinkit/deal_lays_chips.png",
  },
  {
    id: "deal-coca-cola-750ml",
    name: "Coca-Cola",
    displayName: "Coca-Cola",
    unit: "750 ml",
    price: 60,
    finalPrice: 45,
    discount: 25,
    image: "/images/blinkit/deal_coca_cola.png",
  },
  {
    id: "deal-nestle-kitkat-36g",
    name: "Nestle KitKat",
    displayName: "Nestle KitKat",
    unit: "36 g",
    price: 40,
    finalPrice: 30,
    discount: 25,
    image: "/images/blinkit/deal_nestle_kitkat.png",
  },
];

export default function BestDealsSection({ deals }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const bannerImg = getBackendImageUrl(
    deals?.banner || "/images/blinkit/best_deals_header_banner.png"
  );

  const rawDeals =
    Array.isArray(deals?.products) && deals.products.length > 0
      ? deals.products
      : Array.isArray(deals) && deals.length > 0
      ? deals
      : BEST_DEALS_ITEMS;

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const finalImg = getBackendImageUrl(product.image);

    addToCart({
      _id: product.id || product._id,
      id: product.id || product._id,
      name: product.name,
      price: product.finalPrice || product.price,
      finalPrice: product.finalPrice || product.price,
      originalPrice: product.price || product.originalPrice,
      image: finalImg,
      unit: product.unit,
      stock: 50,
    });

    setAddedIds((prev) => ({ ...prev, [product.id || product._id]: true }));
    toast.success(`Added ${product.name} to cart!`, {
      icon: "🎉",
      style: {
        borderRadius: "10px",
        background: "#299b60",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
      },
    });

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id || product._id]: false }));
    }, 1200);
  };

  return (
    <section className="py-2.5 relative">
      {/* Panoramic Best Deals Header Banner */}
      <Link
        to="/products?deal=true"
        className="block w-full rounded-lg overflow-hidden mb-3.5 shadow-2xs hover:opacity-98 transition-all group"
        title="View All Best Deals"
      >
        <img
          src={bannerImg}
          alt="Best Deals For You - Top quality products at unbeatable prices"
          className="w-full h-auto object-cover select-none group-hover:scale-[1.004] transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* 6 Clean, Border-Minimized Deal Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
        {rawDeals.map((item) => {
          const itemId = item.id || item._id;
          const isFav = wishlisted[itemId];
          const isAdded = addedIds[itemId];
          const imgSrc = getBackendImageUrl(item.image);

          return (
            <div
              key={itemId}
              className="bg-white rounded-lg transition-all duration-200 p-2 sm:p-2.5 flex flex-col justify-between group relative border border-gray-100/50 shadow-2xs hover:shadow-md hover:border-emerald-200/60"
            >
              {/* Deal Product Packshot Image with Overlay Badge & Wishlist */}
              <Link
                to="/products?deal=true"
                className="block w-full group/img"
              >
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative mb-1.5">
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-300 select-none"
                    loading="lazy"
                  />

                  {/* Top-Left Discount Badge overlaid naturally */}
                  <span className="absolute top-1.5 left-1.5 text-[10px] sm:text-[11px] font-extrabold text-[#15803d] bg-[#dcfce7]/95 backdrop-blur-xs px-1.5 py-0.5 rounded-md tracking-tight shadow-2xs">
                    {item.discount}% OFF
                  </span>

                  {/* Top-Right Heart Button overlaid naturally */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(e, item.id)}
                    aria-label="Add to wishlist"
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 border border-gray-200/50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-2xs"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                        isFav ? "fill-red-500 text-red-500" : "stroke-[1.8]"
                      }`}
                    />
                  </button>
                </div>

                {/* Title & Unit */}
                <div className="w-full text-left space-y-0.5 mb-1.5">
                  <h4
                    title={item.name}
                    className="text-xs sm:text-[13px] font-bold truncate leading-snug text-gray-900 group-hover/img:text-emerald-700 transition-colors"
                  >
                    {item.displayName}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {item.unit}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-1.5 pt-0.5">
                    <span className="text-sm sm:text-base font-black text-gray-950">
                      ₹{item.finalPrice}
                    </span>
                    {item.price > item.finalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Solid Emerald Add to Cart Button */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e, item)}
                  className={`w-full py-1.5 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.97] transition-all duration-150 ${
                    isAdded
                      ? "bg-[#15803d] text-white"
                      : "bg-[#299b60] hover:bg-[#238753] text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
