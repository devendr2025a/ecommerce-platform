import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { getBackendImageUrl } from "../../utils/imageUrl";

// 6 authentic milk pouch items strictly matching the design in media_1788946565766.png
const DEFAULT_MILK_PRODUCTS = [

  {
    id: "milk-mother-dairy-classic-1l",
    name: "Mother Dairy Classic Toned Milk",
    displayName: "Mother Dairy Classic...",
    unit: "1 Ltr pouch",
    price: 60,
    finalPrice: 57,
    discount: 5,
    image: "/images/blinkit/milk_pouch_1.png",
    isFeatured: false,
  },
  {
    id: "milk-amul-taaza-1l",
    name: "Amul Taaza Toned Milk",
    displayName: "Amul Taaza...",
    unit: "1 Ltr pouch",
    price: 56,
    finalPrice: 54,
    discount: 4,
    image: "/images/blinkit/milk_pouch_2.png",
    isFeatured: false,
  },
  {
    id: "milk-nandini-fresh-500ml",
    name: "Nandini Fresh Toned Milk",
    displayName: "Nandini Fresh Toned Milk",
    unit: "500 ml pouch",
    price: 24,
    finalPrice: 23,
    discount: 4,
    image: "/images/blinkit/milk_pouch_3.png",
    isFeatured: false,
  },
  {
    id: "milk-mother-dairy-toned-500ml",
    name: "Mother Dairy Toned Milk",
    displayName: "Mother Dairy Toned...",
    unit: "500 ml pouch",
    price: 28,
    finalPrice: 27,
    discount: 4,
    image: "/images/blinkit/milk_pouch_4.png",
    isFeatured: false,
  },
  {
    id: "milk-mother-dairy-full-cream-500ml",
    name: "Mother Dairy Full Cream Milk",
    displayName: "Mother Dairy Full Crea...",
    unit: "500 ml pouch",
    price: 34,
    finalPrice: 33,
    discount: 3,
    image: "/images/blinkit/milk_pouch_5.png",
    isFeatured: true, // highlighted emerald border as shown in reference
  },
  {
    id: "milk-amul-cow-fresh-500ml",
    name: "Amul Cow Fresh Milk",
    displayName: "Amul Cow Fresh Milk",
    unit: "500 ml pouch",
    price: 30,
    finalPrice: 29,
    discount: 3,
    image: "/images/blinkit/milk_pouch_6.png",
    isFeatured: false,
  },
];

export default function MilkSection({ sectionData, products = [] }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const bannerImg = getBackendImageUrl(
    sectionData?.banner || "/images/blinkit/milk_header_banner.png"
  );

  const rawProducts =
    Array.isArray(sectionData?.products) && sectionData.products.length > 0
      ? sectionData.products
      : Array.isArray(products) && products.length > 0
      ? products
      : DEFAULT_MILK_PRODUCTS;

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
      icon: "🥛",
      style: {
        borderRadius: "10px",
        background: "#2e9e62",
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
    <section className="py-2">
      <div className="bg-[#f3f9fb] border border-[#e4f3f8] rounded-xl p-2.5 sm:p-3.5 shadow-2xs transition-all">
        {/* Full-width Panoramic Milk Header Banner */}
        <Link
          to="/products?search=Milk"
          className="block w-full rounded-lg overflow-hidden mb-3.5 shadow-2xs hover:shadow-xs hover:opacity-98 transition-all group"
          title="View All Milk Collection"
        >
          <img
            src={bannerImg}
            alt="Fresh Packaged Milk Range - 100% Pure & Fresh"
            className="w-full h-auto object-cover select-none group-hover:scale-[1.004] transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* 6 High-Fidelity Packaged Milk Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {rawProducts.map((item) => {
            const itemId = item.id || item._id;
            const isFav = wishlisted[itemId];
            const isAdded = addedIds[itemId];
            const imgSrc = getBackendImageUrl(item.image);

            return (
              <div
                key={itemId}
                className="bg-white rounded-lg transition-all duration-200 p-2 sm:p-2.5 flex flex-col justify-between group relative border border-gray-100/50 shadow-2xs hover:shadow-md hover:border-emerald-200/60"
              >
                {/* Milk Pouch Packshot Image with Overlay Badge & Wishlist */}
                <Link
                  to="/products?search=Milk"
                  className="block w-full group/img"
                >
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative mb-1.5">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-300 select-none"
                      loading="lazy"
                    />

                    {/* Top-Left Discount Badge overlaid cleanly */}
                    <span className="absolute top-1.5 left-1.5 text-[10px] sm:text-[11px] font-extrabold text-[#15803d] bg-[#dcfce7]/95 backdrop-blur-xs px-1.5 py-0.5 rounded-md tracking-tight shadow-2xs">
                      {item.discount}% OFF
                    </span>

                    {/* Top-Right Heart Button overlaid cleanly */}
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
                  <div className="w-full text-left space-y-0.5 mb-2">
                    <h4
                      title={item.name}
                      className={`text-xs sm:text-[13px] font-bold truncate leading-snug ${
                        item.isFeatured
                          ? "text-[#166534]"
                          : "text-gray-900 group-hover/img:text-emerald-700"
                      } transition-colors`}
                    >
                      {item.displayName}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {item.unit}
                    </p>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-1.5 pt-1">
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
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, item)}
                    className={`w-full py-1.5 sm:py-2 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.97] transition-all duration-150 ${
                      isAdded
                        ? "bg-[#15803d] text-white"
                        : "bg-[#3da36e] hover:bg-[#348f60] text-white"
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
      </div>
    </section>
  );
}
