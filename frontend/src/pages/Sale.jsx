import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  Percent,
  Copy,
  Check,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Package,
  Heart,
  Star,
  Phone,
  Landmark,
  FileText,
  UserCheck,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getBackendImageUrl } from "../utils/imageUrl";
import toast from "react-hot-toast";

// 4 Promo Vouchers matching reference mockup
const PROMO_COUPONS = [
  {
    code: "WELCOME50",
    discount: "FLAT ₹50 OFF",
    subtitle: "On your first order",
    note: "Use code: WELCOME50",
    pill: "FIRST ORDER",
    iconType: "percent",
  },
  {
    code: "FREEDEL",
    discount: "FREE DELIVERY",
    subtitle: "On orders above ₹99",
    note: "No extra charges. Just shop & save.",
    pill: "MOST POPULAR",
    iconType: "truck",
  },
  {
    code: "GROCERY20",
    discount: "20% OFF",
    subtitle: "On Groceries & Essentials",
    note: "Limited time only. Don't miss out!",
    pill: "BULK DEALS",
    iconType: "basket",
  },
  {
    code: "BULK15",
    discount: "FLAT 15% OFF",
    subtitle: "On your first bulk order",
    note: "Use code: BULK15",
    pill: "NEW USERS",
    iconType: "percent",
  },
];

// 4 Bank & Digital Payment Offers
const BANK_OFFERS = [
  {
    bank: "HDFC Bank",
    logoText: "HDFC BANK",
    logoColor: "bg-[#004c8f] text-white",
    offer: "10% Instant Discount",
    sub: "Min. spend ₹1,499 | Max. discount ₹500",
  },
  {
    bank: "SBI Card",
    logoText: "SBI Card",
    logoColor: "bg-[#280071] text-white",
    offer: "Flat ₹250 Cashback",
    sub: "On min. spend ₹1,999",
  },
  {
    bank: "Paytm",
    logoText: "Paytm",
    logoColor: "bg-[#00b9f5] text-white",
    offer: "Flat ₹150 Cashback",
    sub: "On min. spend ₹999",
  },
  {
    bank: "ICICI Bank",
    logoText: "i ICICI Bank",
    logoColor: "bg-[#b02a30] text-white",
    offer: "Up to ₹1,000 Cashback",
    sub: "On selected cards",
  },
];

// 12 Super Saver Products matching exact reference mockup
const ALL_DEAL_PRODUCTS = [
  {
    _id: "deal-amul-fresh-milk",
    name: "Amul Fresh Milk",
    pack: "Standard Pack • 1L",
    price: 68,
    originalPrice: 75,
    discount: "9% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "dairy",
    image: "/images/blinkit/deal_amul_milk.png",
  },
  {
    _id: "deal-tata-salt",
    name: "Tata Salt",
    pack: "Standard Pack • 1kg",
    price: 22,
    originalPrice: 27,
    discount: "18% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "household",
    image: "/images/blinkit/deal_tata_salt.png",
  },
  {
    _id: "deal-maggi-noodles",
    name: "Maggi 2-Minute Noodles",
    pack: "Standard Pack • 560g",
    price: 15,
    originalPrice: 19,
    discount: "20% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "snacks",
    image: "/images/blinkit/deal_maggi_noodles.png",
  },
  {
    _id: "deal-lays-chips",
    name: "Lays Classic Chips",
    pack: "Standard Pack • 52g",
    price: 25,
    originalPrice: 31,
    discount: "20% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "snacks",
    image: "/images/blinkit/deal_lays_chips.png",
  },
  {
    _id: "deal-coca-cola",
    name: "Coca-Cola",
    pack: "Standard Pack • 330ml",
    price: 60,
    originalPrice: 75,
    discount: "20% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "snacks",
    image: "/images/blinkit/deal_coca_cola.png",
  },
  {
    _id: "deal-nestle-kitkat",
    name: "Nestle KitKat",
    pack: "Standard Pack • 150g",
    price: 60,
    originalPrice: 80,
    discount: "25% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "snacks",
    image: "/images/blinkit/deal_nestle_kitkat.png",
  },
  {
    _id: "deal-coca-cola-original",
    name: "Coca-Cola Original",
    pack: "Standard Pack • 330ml",
    price: 60,
    originalPrice: 80,
    discount: "25% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "snacks",
    image: "/images/blinkit/deal_coca_cola.png",
  },
  {
    _id: "deal-kitkat-big-pack",
    name: "Nestle KitKat (Big Pack)",
    pack: "Standard Pack • 300g",
    price: 120,
    originalPrice: 160,
    discount: "25% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "snacks",
    image: "/images/blinkit/deal_nestle_kitkat.png",
  },
  {
    _id: "deal-farm-vegetables",
    name: "Fresh Farm Vegetables",
    pack: "Standard Pack • 1kg",
    price: 45,
    originalPrice: 53,
    discount: "15% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "vegetables",
    image: "/images/blinkit/deal_farm_vegetables.jpg",
  },
  {
    _id: "deal-fruits-combo",
    name: "Fresh Fruits Combo",
    pack: "Standard Pack • 2kg",
    price: 99,
    originalPrice: 113,
    discount: "12% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "vegetables",
    image: "/images/blinkit/deal_fruits_combo.jpg",
  },
  {
    _id: "deal-fortune-sunflower",
    name: "Fortune Sunflower Oil",
    pack: "Standard Pack • 1L",
    price: 145,
    originalPrice: 177,
    discount: "18% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "household",
    image: "/images/blinkit/deal_sunflower_oil.jpg",
  },
  {
    _id: "deal-india-gate-rice",
    name: "India Gate Basmati Rice",
    pack: "Standard Pack • 5kg",
    price: 449,
    originalPrice: 499,
    discount: "10% OFF",
    rating: "4.8",
    ratingCount: "1k+",
    category: "household",
    image: "/images/blinkit/deal_basmati_rice.jpg",
  },
];

export default function Sale() {
  const { addToCart } = useCart();
  const wishlistContext = useWishlist ? useWishlist() : null;
  const isWishlisted = wishlistContext?.isWishlisted || (() => false);
  const toggleWishlist = wishlistContext?.toggleWishlist || (() => {});

  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedCode, setCopiedCode] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const heroProduceImg = getBackendImageUrl("/images/blinkit/about_hero_grocery.jpg");
  const wholesaleBurlapImg = getBackendImageUrl("/images/blinkit/wholesale_burlap_sacks.jpg");

  // Copy code handler
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied!`, {
      icon: "📋",
      style: {
        borderRadius: "10px",
        background: "#007038",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
      },
    });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Add to cart handler
  const handleAdd = (item) => {
    setAddingId(item._id);
    addToCart({
      _id: item._id,
      id: item._id,
      name: item.name,
      price: item.price,
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

  // Filter products by tab
  const displayedProducts =
    activeCategory === "all"
      ? ALL_DEAL_PRODUCTS
      : ALL_DEAL_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#fcfdfc] min-h-screen text-gray-800 selection:bg-emerald-100 selection:text-emerald-900 font-sans pb-16">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO BANNER: Super Saver Offers & Wholesale Bulk Deals
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-r from-[#f5fbf7] via-[#ebf7f0] to-[#f4fbf6] overflow-hidden border-b border-emerald-50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
          {/* Subtle leaves decoration top-left */}
          <div className="absolute top-4 left-6 pointer-events-none select-none opacity-40 hidden sm:block">
            <span className="text-3xl">🍃</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200/80 text-[#008848] text-[11px] font-extrabold tracking-wide">
                <span>Bulk Orders • Better Savings</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.14] text-gray-900">
                Super Saver Offers &amp; <br />
                <span className="text-[#008848]">Wholesale Bulk Deals</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-lg">
                Enjoy wallet-friendly prices, premium quality and huge discounts
                on your favourite grocery and daily essentials. Buy more, save more!
              </p>

              {/* 3 Micro Perks */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white shadow-2xs border border-gray-100 flex items-center justify-center text-gray-800">
                    <Package className="w-3.5 h-3.5 text-gray-700" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 leading-tight">Bulk Discounts</div>
                    <div className="text-[10px] text-gray-500">Up to 40% Off</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white shadow-2xs border border-gray-100 flex items-center justify-center text-gray-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-700" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 leading-tight">Premium Quality</div>
                    <div className="text-[10px] text-gray-500">Fresh &amp; Verified</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white shadow-2xs border border-gray-100 flex items-center justify-center text-gray-800">
                    <Truck className="w-3.5 h-3.5 text-gray-700" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 leading-tight">Fast Delivery</div>
                    <div className="text-[10px] text-gray-500">Across India</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="#deal-products"
                  className="inline-flex items-center gap-2 bg-[#008848] hover:bg-[#00703b] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-[#008848]/25 transition-all transform hover:scale-105 active:scale-95 group"
                >
                  <span>Shop All Deals</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Visual Image with Fresh Produce Bag & Cursive Annotation */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-white/40">
                <img
                  src={heroProduceImg}
                  alt="Fresh groceries in brown bag"
                  className="w-full h-full object-cover object-center select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Top-Right Cursive Handwriting Annotation */}
              <div className="absolute -top-3 -right-2 pointer-events-none select-none text-right hidden sm:block">
                <span className="font-serif italic font-bold text-lg text-emerald-800 block drop-shadow-xs">
                  More Savings
                </span>
                <span className="font-serif italic font-semibold text-base text-emerald-700 block">
                  More Goodness 🍃
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. 4 FLOATING COUPON CARDS
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 -mt-5 sm:-mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROMO_COUPONS.map((cp) => {
            const isCopied = copiedCode === cp.code;
            return (
              <div
                key={cp.code}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-md shadow-gray-200/50 flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                {/* Top Row: Pill Tag + Graphic Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#008848] border border-emerald-100">
                    {cp.pill}
                  </span>

                  {/* Graphic Badge */}
                  {cp.iconType === "truck" ? (
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center">
                      <Truck className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  ) : cp.iconType === "basket" ? (
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008848] flex items-center justify-center">
                      <Package className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      %
                    </div>
                  )}
                </div>

                {/* Offer Headline & Info */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    {cp.discount}
                  </h3>
                  <p className="text-xs font-bold text-gray-700 mt-0.5">
                    {cp.subtitle}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">
                    {cp.note}
                  </p>
                </div>

                {/* Bottom Actions: View Details & Copy Button */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() =>
                      toast("Use this code at checkout to claim your discount!", {
                        icon: "💡",
                      })
                    }
                    className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleCopy(cp.code)}
                    className={`inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-lg transition-all ${
                      isCopied
                        ? "bg-emerald-700 text-white"
                        : "bg-[#008848] hover:bg-[#00703b] active:scale-95 text-white shadow-2xs"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. BANK & DIGITAL PAYMENT OFFERS
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                  Bank &amp; Digital Payment Offers
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Exclusive discounts on leading bank cards, UPI and digital payments.
                </p>
              </div>
            </div>

            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              LIMITED PERIOD PARTNER OFFERS
            </span>
          </div>

          {/* 4 Bank Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
            {BANK_OFFERS.map((b) => (
              <div
                key={b.bank}
                className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-2xs hover:border-emerald-200 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-800">{b.bank}</span>
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm tracking-wide ${b.logoColor}`}
                  >
                    {b.logoText}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 leading-snug">
                    {b.offer}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {b.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. TODAY'S SUPER SAVER PRODUCTS (6 Column Grid x 2 Rows = 12 Items)
         ───────────────────────────────────────────────────────────── */}
      <section id="deal-products" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#008848] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BEST DEALS &amp; TOP PICKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Today's Super Saver Products
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Handpicked products at unbeatable prices. Fresh, quality and value - only at Grosliy.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All" },
              { id: "dairy", label: "🥛 Dairy & Eggs" },
              { id: "vegetables", label: "🥦 Fruits & Vegetables" },
              { id: "snacks", label: "🍿 Snacks & Beverages" },
              { id: "household", label: "🧴 Household" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? "bg-[#008848] text-white shadow-xs"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Column Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedProducts.map((item) => {
            const isWish = isWishlisted(item._id);
            const isAdding = addingId === item._id;

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-3 border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative rounded-xl overflow-hidden bg-[#f9faf9] p-2.5 flex items-center justify-center aspect-square group-hover:bg-emerald-50/25 transition-colors">
                    {/* Discount Badge */}
                    <span className="absolute top-2 left-2 bg-[#008848] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm shadow-2xs">
                      {item.discount}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-2xs"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWish ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </button>

                    <img
                      src={getBackendImageUrl(item.image)}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Info */}
                  <div className="pt-2.5">
                    <h3 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-[#008848] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5 line-clamp-1">
                      {item.pack}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-gray-700">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-gray-400 font-normal">({item.ratingCount})</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-sm font-black text-gray-900">
                        ₹{item.price}
                      </span>
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Full-width Button */}
                <div className="pt-2.5 mt-2">
                  <button
                    onClick={() => handleAdd(item)}
                    disabled={isAdding}
                    className="w-full bg-[#008848] hover:bg-[#00703b] active:scale-95 text-white font-extrabold text-[11px] py-2 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>+</span>
                    <span>{isAdding ? "Added!" : "Add to Cart"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. WHOLESALE & INSTITUTIONAL BULK GROCERY SUPPLY (Bottom Dark Card)
         ───────────────────────────────────────────────────────────── */}
      <section id="wholesale" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-[#062417] text-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-[10px] font-extrabold tracking-wider uppercase">
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>BULK PURCHASES • WHOLESALE PRICES</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-[1.15] text-white">
                Wholesale &amp; Institutional <br />
                <span className="text-white">Bulk Grocery Supply</span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-emerald-100/75 font-medium leading-relaxed max-w-lg">
                Are you a restaurant, café, hotel, retailer or institution? Get
                the best prices on bulk groceries, fresh produce and daily
                essentials with our wholesale solutions.
              </p>

              {/* 4 Feature Badges (2x2 grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Tag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Volume Discounts</div>
                    <div className="text-[10px] text-emerald-200/70">Up to 40% Off</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Consistent Supply</div>
                    <div className="text-[10px] text-emerald-200/70">&amp; Fresh Stock</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Dedicated Account Manager</div>
                    <div className="text-[10px] text-emerald-200/70">For Business Needs</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CreditCard className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Flexible Payment Terms</div>
                    <div className="text-[10px] text-emerald-200/70">&amp; Bulk Ordering</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/917388330600?text=Hi%20Grosliy,%20I%20want%20to%20inquire%20about%20Wholesale%20Bulk%20Grocery%20Supply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#008848] hover:bg-[#00703b] text-white font-extrabold text-xs px-5 py-3 rounded-full transition-all transform hover:scale-105 active:scale-95 group shadow-md"
                >
                  <span>Explore Wholesale</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Visual Image with Burlap Grains & Business Enquiries Pill */}
            <div className="lg:col-span-5 relative">
              {/* Top Cursive Annotation */}
              <div className="absolute -top-6 left-4 pointer-events-none select-none text-left z-20">
                <span className="font-serif italic font-bold text-lg text-emerald-300 block drop-shadow-sm">
                  Good Food
                </span>
                <span className="font-serif italic text-base text-emerald-200 block">
                  for Growing Business 🍃
                </span>
              </div>

              {/* Burlap Sacks Photo */}
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-xl relative aspect-[4/3] bg-black/30">
                <img
                  src={wholesaleBurlapImg}
                  alt="Wholesale grains in burlap sacks and fresh produce"
                  className="w-full h-full object-cover object-center select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Contact Card Bottom-Right */}
              <div className="mt-3 sm:absolute sm:bottom-4 sm:right-4 bg-white text-gray-900 rounded-full px-4 py-2.5 shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-gray-500 uppercase">
                    For Business Enquiries
                  </div>
                  <div className="text-xs font-black text-gray-900">
                    Call: +91 73883 30600
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}