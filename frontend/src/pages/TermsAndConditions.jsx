import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  Headphones,
  Sprout,
  User,
  Package,
  Tag,
  ShoppingCart,
  CreditCard,
  Percent,
  Ticket,
  FileText,
  RotateCcw,
  Copyright,
  Gavel,
  Calendar,
  MapPin,
  ChevronRight,
  Home,
} from "lucide-react";

// Subtle decorative leaf flourish on clause headers
function LeafFlourish() {
  return (
    <svg
      className="w-12 h-6 text-emerald-500/80 select-none flex-shrink-0"
      viewBox="0 0 60 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 22 C 22 22, 34 14, 52 4" strokeLinecap="round" />
      <path
        d="M40 7 C 46 2, 55 3, 53 10 C 50 14, 44 12, 40 7 Z"
        fill="#008848"
        stroke="#008848"
        opacity="0.85"
      />
    </svg>
  );
}

export default function TermsAndConditions() {
  const effectiveDate = "September 20, 2025";
  const locationText = "Uttar Pradesh, India";

  const highlightCards = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      title: "Trusted & Secure",
      desc: "Your data is safe with us. We follow strict security measures to protect your information.",
    },
    {
      icon: <Truck className="w-5 h-5 text-white" />,
      title: "Fast & Reliable",
      desc: "Fresh products, on time. Timely delivery with best quality.",
    },
    {
      icon: <Headphones className="w-5 h-5 text-white" />,
      title: "Customer First",
      desc: "We are here to help. Dedicated support for your needs.",
    },
    {
      icon: <Sprout className="w-5 h-5 text-white" />,
      title: "Quality Products",
      desc: "Only the best for you. Fresh, healthy & handpicked items.",
    },
  ];

  return (
    <div className="bg-[#fcfdfd] min-h-screen text-gray-800 font-sans pb-10 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5">
        
        {/* ─────────────────────────────────────────────────────────────
            1. HERO HEADER SECTION (Matching Mockup)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 pb-5 border-b border-gray-100/90">
          {/* Left Hero Content */}
          <div className="flex-1 max-w-2xl z-10">
            {/* Breadcrumbs (Enlarged and styled in pill badge matching mockup) */}
            <nav className="inline-flex items-center gap-2 text-sm sm:text-[14px] font-semibold text-gray-600 mb-3.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-2xs">
              <Link
                to="/"
                className="hover:text-emerald-700 flex items-center gap-1.5 text-gray-700 transition-colors"
              >
                <Home className="w-4 h-4 text-[#008848]" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#008848] font-bold">Terms & Conditions</span>
            </nav>

            {/* Title: Terms & Conditions */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-none mb-2.5">
              <span className="text-[#1e293b]">Terms & </span>
              <span className="text-[#008848]">Conditions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#475569] text-xs sm:text-[13.5px] leading-relaxed mb-4 max-w-xl font-normal">
              Welcome to <strong className="text-gray-900 font-semibold">Grosliy</strong>. These Terms & Conditions govern your access to and use of Grosliy website, mobile application, and related grocery delivery services.
            </p>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-700">
              {/* Effective Date */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200/90 rounded-lg px-3 py-1.5 shadow-2xs">
                <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-gray-900 font-semibold">Effective Date:</strong> {effectiveDate}
                </span>
              </div>

              {/* Location */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200/90 rounded-lg px-3 py-1.5 shadow-2xs">
                <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong className="text-gray-900 font-semibold">Location:</strong> {locationText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Visuals (Grosliy Green Tote Bag & Doodle) */}
          <div className="relative w-full sm:w-[380px] lg:w-[370px] flex items-center justify-center pt-2">
            {/* Cursive Doodle */}
            <div className="absolute top-1 left-2 sm:-left-4 z-20 select-none pointer-events-none text-center">
              <div className="font-['Caveat',_cursive] text-emerald-700 text-lg sm:text-xl font-bold rotate-[-8deg] leading-[1.1] tracking-wide drop-shadow-2xs">
                Good Food
                <br />
                Better Living
              </div>
              <div className="text-emerald-600 text-sm rotate-[-8deg] mt-0.5">
                💚
              </div>
            </div>

            {/* Green Grocery Bag */}
            <div className="relative rounded-2xl pt-2">
              <img
                src="/images/grosliy_terms_hero_bag.png"
                alt="Grosliy Fresh Grocery Tote Bag"
                className="w-full max-h-[220px] sm:max-h-[240px] object-contain drop-shadow-md hover:scale-[1.01] transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/grosliy_privacy_hero_bag.png";
                }}
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. TOP 4 HIGHLIGHT CARDS (Green Circles)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6">
          {highlightCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-emerald-200 hover:shadow-xs transition-all flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-full bg-[#008848] flex items-center justify-center flex-shrink-0 shadow-xs">
                {card.icon}
              </div>
              <div>
                <h2 className="text-[13.5px] font-bold text-gray-900 leading-snug">
                  {card.title}
                </h2>
                <p className="text-[11.5px] text-gray-500 mt-1 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. NUMBERED CLAUSES SECTIONS (1 TO 5)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
          
          {/* CLAUSE 1: Eligibility & Account Registration */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 shadow-xs mt-1">
              1
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-gray-200/85 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-emerald-200 transition-all">
              {/* Clause Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      CLAUSE 01
                    </span>
                    <h2 className="text-sm sm:text-[15px] font-bold text-gray-900 leading-none">
                      Eligibility & Account Registration
                    </h2>
                  </div>
                </div>
                <LeafFlourish />
              </div>

              {/* Points (2 Column Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Age & Legal Capacity:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      By accessing or using our services, you confirm that you are at least 18 years of age and have the legal capacity to enter into this agreement.
                    </p>
                  </div>
                </div>

                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Account Security:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      You are responsible for maintaining the confidentiality of your login credentials and other account details. We may suspend or terminate your account if we suspect any unauthorized use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLAUSE 2: Products, Pricing & Availability */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 shadow-xs mt-1">
              2
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-gray-200/85 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-emerald-200 transition-all">
              {/* Clause Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      CLAUSE 02
                    </span>
                    <h2 className="text-sm sm:text-[15px] font-bold text-gray-900 leading-none">
                      Products, Pricing & Availability
                    </h2>
                  </div>
                </div>
                <LeafFlourish />
              </div>

              {/* Points (Row 1: 2 Columns, Row 2: Full Width) */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 mb-1">
                        Product Information & Weight Variations:
                      </h3>
                      <p className="text-[11.5px] text-gray-600 leading-relaxed">
                        We make every effort to ensure accurate product descriptions, images and weights. However, actual products may vary slightly in size, weight or appearance.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 mb-1">
                        Pricing & Invoicing:
                      </h3>
                      <p className="text-[11.5px] text-gray-600 leading-relaxed">
                        Prices are subject to change without prior notice. In case of any pricing errors, we reserve the right to correct the same and adjust your order accordingly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Order Acceptance & Quantity Limits:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      We shall make every reasonable effort to fulfill your order. However, we may limit, refuse or cancel any order at our sole discretion, especially in cases of suspected fraud or unusual purchasing patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLAUSE 3: Payments, Discounts & Promo Codes */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 shadow-xs mt-1">
              3
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-gray-200/85 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-emerald-200 transition-all">
              {/* Clause Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      CLAUSE 03
                    </span>
                    <h2 className="text-sm sm:text-[15px] font-bold text-gray-900 leading-none">
                      Payments, Discounts & Promo Codes
                    </h2>
                  </div>
                </div>
                <LeafFlourish />
              </div>

              {/* Points (Row 1: 2 Columns, Row 2: Full Width) */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 mb-1">
                        Payment Methods:
                      </h3>
                      <p className="text-[11.5px] text-gray-600 leading-relaxed">
                        We accept payments through UPI, Net Banking, Credit/Debit Cards, and Cash on Delivery (COD) where applicable.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 mb-1">
                        Discounts & Promo Codes:
                      </h3>
                      <p className="text-[11.5px] text-gray-600 leading-relaxed">
                        Promo codes and discounts are subject to terms and conditions. We reserve the right to modify or discontinue any offer at any time without prior notice.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Coupons & Offers:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      Only one coupon or promo code can be used per order, unless otherwise specified. Offers are not valid on certain products or categories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLAUSE 4: Delivery & Order Cancellation */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 shadow-xs mt-1">
              4
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-gray-200/85 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-emerald-200 transition-all">
              {/* Clause Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      CLAUSE 04
                    </span>
                    <h2 className="text-sm sm:text-[15px] font-bold text-gray-900 leading-none">
                      Delivery & Order Cancellation
                    </h2>
                  </div>
                </div>
                <LeafFlourish />
              </div>

              {/* Points (3 Column Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Delivery Timelines:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      We aim to deliver your order within the selected time slot. Delays may occur due to unforeseen circumstances, high demand, or extreme weather conditions.
                    </p>
                  </div>
                </div>

                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Cancellation Policy:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      You can cancel your order before it is processed. Once the order is out for delivery, cancellation may not be possible.
                    </p>
                  </div>
                </div>

                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Failed Deliveries:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      If the delivery fails due to incorrect address, non-availability or other reasons, the order may be returned to us and a refund may be processed as per our refund policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLAUSE 5: Intellectual Property Rights */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 shadow-xs mt-1">
              5
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-gray-200/85 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-emerald-200 transition-all">
              {/* Clause Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      CLAUSE 05
                    </span>
                    <h2 className="text-sm sm:text-[15px] font-bold text-gray-900 leading-none">
                      Intellectual Property Rights
                    </h2>
                  </div>
                </div>
                <LeafFlourish />
              </div>

              {/* Points (2 Column Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <Copyright className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Ownership:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      All content on our website, app and services, including text, images, logos, trademarks and designs, are the property of Grosliy and are protected by applicable laws.
                    </p>
                  </div>
                </div>

                <div className="bg-[#f9faf9] rounded-xl p-3.5 border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                    <Gavel className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">
                      Restrictions:
                    </h3>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed">
                      You may not copy, reproduce, distribute, modify or use any part of our content without prior written permission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. BOTTOM FOOTER BANNER (Matching Mockup)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-6 sm:mt-8 bg-white rounded-xl border border-gray-200/90 p-3.5 sm:p-4.5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left Text */}
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center flex-shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-emerald-800 italic">
                Thank you for being a part of Grosliy!
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                If you have any questions about these Terms & Conditions, please contact us at{" "}
                <a
                  href="mailto:support@grosliy.com"
                  className="font-bold text-gray-900 underline hover:text-[#008848] transition-colors"
                >
                  support@grosliy.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Text / Freshness Always Doodle */}
          <div className="flex items-center gap-1.5 select-none flex-shrink-0">
            <span className="font-['Caveat',_'Patrick_Hand',_cursive] text-xl sm:text-2xl font-bold text-[#008848] tracking-wide">
              Freshness Always
            </span>
            <span className="text-base">💚</span>
          </div>
        </div>

      </div>
    </div>
  );
}
