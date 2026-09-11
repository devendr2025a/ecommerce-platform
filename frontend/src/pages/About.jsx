import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Truck,
  ShieldCheck,
  Headphones,
  ShoppingBag,
  ArrowRight,
  Check,
  Play,
  Package,
  Home,
  Tag,
  Heart,
} from "lucide-react";
import { getBackendImageUrl } from "../utils/imageUrl";

export default function About() {
  const heroGroceryImg = getBackendImageUrl("/images/blinkit/about_hero_grocery.jpg");
  const kitchenBg = getBackendImageUrl("/images/blinkit/farm_fresh_hero_bg.jpg");
  const farmerImg = getBackendImageUrl("/images/blinkit/farmer_crate.jpg");

  return (
    <div className="bg-white min-h-screen text-gray-800 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO BANNER: Groceries Made Fresh, Delivered in Minutes.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#062417] text-white overflow-hidden">
        <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex items-center">
          {/* Right Image on Desktop */}
          <div className="absolute inset-0 lg:left-[35%] overflow-hidden pointer-events-none">
            <img
              src={heroGroceryImg}
              alt="Fresh vegetables in brown grocery bag"
              className="w-full h-full object-cover object-center lg:object-right select-none contrast-[1.05] saturate-[1.10]"
            />
            {/* Gradient blending from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#062417] via-[#062417]/85 to-transparent lg:via-[#062417]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062417] via-transparent to-transparent lg:hidden" />
          </div>

          {/* Floating Leaves (Decorative) */}
          <div className="absolute top-8 left-12 pointer-events-none select-none opacity-40 hidden sm:block">
            <span className="text-3xl">🍃</span>
          </div>

          {/* Hero Content Container */}
          <div className="max-w-[1320px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
            <div className="max-w-xl text-left space-y-5">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xs text-white text-[11px] font-extrabold uppercase tracking-widest shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>FRESH • HEALTHY • ORGANIC</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white">
                Groceries Made Fresh, <br />
                <span className="text-[#22c55e]">Delivered in Minutes.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-emerald-100/85 font-medium leading-relaxed max-w-lg">
                At Grosliy, we believe every home deserves access to fresh, healthy
                and high-quality groceries. From farm-fresh vegetables to everyday
                essentials, we bring the goodness of nature right to your doorstep —
                faster, easier and fresher than ever.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#008848] hover:bg-[#00703b] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#008848]/30 transition-all transform hover:scale-105 active:scale-95 group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Fresh Groceries</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#how-we-operate"
                  className="inline-flex items-center gap-2.5 bg-black/30 hover:bg-black/45 border border-white/30 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full backdrop-blur-xs transition-all"
                >
                  <span>Learn More</span>
                  <div className="w-4 h-4 rounded-full border border-white/80 flex items-center justify-center">
                    <Play className="w-2 h-2 fill-current ml-0.5" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. IMPACT NUMBERS (4-Column White Card Overlapping Hero)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative -mt-10 sm:-mt-12 max-w-[1240px] mx-auto px-4 sm:px-6 z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 py-7 px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100 text-center">
            {/* Stat 1: 50K+ */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 group">
              <div className="w-10 h-10 rounded-full border border-emerald-200 bg-emerald-50/60 text-[#008848] flex items-center justify-center mb-2.5 shadow-2xs group-hover:scale-110 transition-transform">
                <Leaf className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                50K+
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-gray-900 mt-1">
                Happy Customers
              </div>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                Trust us for fresh &amp; quality groceries
              </p>
            </div>

            {/* Stat 2: 10-30 Mins */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 group">
              <div className="w-10 h-10 rounded-full border border-teal-200 bg-teal-50/60 text-[#008848] flex items-center justify-center mb-2.5 shadow-2xs group-hover:scale-110 transition-transform">
                <Truck className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                10–30
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-gray-900 mt-1">
                Min Delivery Time
              </div>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                Fastest delivery in your area
              </p>
            </div>

            {/* Stat 3: 5,000+ */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 group">
              <div className="w-10 h-10 rounded-full border border-emerald-200 bg-emerald-50/60 text-[#008848] flex items-center justify-center mb-2.5 shadow-2xs group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                5,000+
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-gray-900 mt-1">
                Fresh Products
              </div>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                From farm to your home
              </p>
            </div>

            {/* Stat 4: 100% */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 group">
              <div className="w-10 h-10 rounded-full border border-teal-200 bg-teal-50/60 text-[#008848] flex items-center justify-center mb-2.5 shadow-2xs group-hover:scale-110 transition-transform">
                <Headphones className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-gray-900 mt-1">
                Customer Satisfaction
              </div>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                Your happiness is our priority
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. "Freshness shouldn't take hours. It should take minutes."
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 text-left space-y-4 relative">
            {/* Pill Badge + Floating leaf doodle */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#008848] text-[11px] font-extrabold uppercase tracking-wider">
                <Leaf className="w-3 h-3 text-[#008848]" />
                <span>FRESHNESS IN EVERY BITE</span>
              </div>
              <span className="text-emerald-500/70 text-2xl hidden sm:inline-block select-none">🍃</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-[1.18]">
              Freshness shouldn't <br />
              take hours. <br />
              <span className="text-[#008848]">It should take minutes.</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              From handpicked fruits and vegetables to daily essentials, Grosliy
              ensures that you get the freshest products, right when you need
              them. No long waits, no compromise on quality — just pure
              freshness, delivered to your door.
            </p>

            {/* Checklist with Green Check Circles */}
            <div className="space-y-2.5 pt-1">
              {[
                "100% Original Products with Certified Quality",
                "Farm-Fresh Fruits, Vegetables & Essentials",
                "Easy & Secure Online Ordering",
                "Fast & Reliable Delivery to Your Doorstep",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-800"
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-[#008848] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Handwritten Signature Script with Curve Underline & Leaf */}
            <div className="pt-3">
              <div className="relative inline-block">
                <div className="font-serif italic font-bold text-xl sm:text-2xl text-[#144829] flex items-center gap-1.5">
                  <span className="tracking-wide">Freshness at Your Doorstep</span>
                  <span className="text-emerald-600 text-lg not-italic">🍃</span>
                </div>
                {/* Hand-drawn style brush underline SVG */}
                <svg
                  className="w-full h-3 text-[#008848]/60 mt-0.5"
                  viewBox="0 0 260 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.5C50 3 150 1 257 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Visual Image with Floating Play Bar */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-[#faf9f6] relative group">
              <img
                src={kitchenBg}
                alt="Healthy fresh groceries on kitchen countertop"
                className="w-full h-[320px] sm:h-[420px] object-cover select-none group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />

              {/* Floating Bottom Video/Play Pill Bar */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-white/70 flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#008848] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                      Healthy living starts with fresh groceries
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
                      Watch how we bring nature's best to your home
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#008848] hover:border-[#008848] transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. "The Grosliy Freshness Standard" (5 Column Cards)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-[#fcfcfb] border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto text-center space-y-10">
          {/* Centered Header */}
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-gray-400">
              <span className="w-6 h-[1.5px] bg-[#008848] inline-block" />
              <span>WHY CHOOSE GROSLIY</span>
              <span className="w-6 h-[1.5px] bg-[#008848] inline-block" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              The <span className="text-[#008848]">Grosliy</span> Freshness Standard
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              We go the extra mile to ensure you get the best quality, freshness and
              convenience — with every order.
            </p>
          </div>

          {/* 5 Column Feature Cards in Single Row on Large Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-4.5 text-left">
            {/* Card 1: Premium Quality Produce */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-start group">
              <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 text-[#008848] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                <Leaf className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#008848] transition-colors">
                Premium Quality Produce
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
                Handpicked, fresh and carefully sorted for your family's health.
              </p>
            </div>

            {/* Card 2: Hygienic Packaging */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-start group">
              <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#008848] transition-colors">
                Hygienic Packaging
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
                Clean, safe and eco-friendly packaging to keep your groceries fresh and safe.
              </p>
            </div>

            {/* Card 3: 10-30 Min Delivery */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-start group">
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#008848] transition-colors">
                10–30 Min Delivery
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
                Lightning-fast delivery from our store to your doorstep.
              </p>
            </div>

            {/* Card 4: Best Prices */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-start group">
              <div className="w-11 h-11 rounded-full bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                <Tag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#008848] transition-colors">
                Best Prices
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
                Get premium quality groceries at the right price.
              </p>
            </div>

            {/* Card 5: Dedicated Support */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-start group">
              <div className="w-11 h-11 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#008848] transition-colors">
                Dedicated Support
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
                We're always here to help, 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. "From The Soil To Your Doorstep" (Farmer Image + Stepper)
         ───────────────────────────────────────────────────────────── */}
      <section id="how-we-operate" className="py-16 sm:py-20 px-4 max-w-[1240px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Farmer Visual Card */}
          <div className="lg:col-span-4 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative h-[280px] sm:h-[320px] group">
              <img
                src={farmerImg}
                alt="Farmer holding fresh vegetable crate"
                className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Handwritten "From Farm To Home" Calligraphic Annotation */}
              <div className="absolute top-5 right-5 pointer-events-none rotate-[-6deg] text-right">
                <span className="font-serif italic text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block leading-tight">
                  From Farm
                </span>
                <span className="font-serif italic text-xl font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block">
                  To Home 🍃
                </span>
              </div>
            </div>
          </div>

          {/* Right Stepper Pipeline */}
          <div className="lg:col-span-8 text-left space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#008848] text-[11px] font-extrabold uppercase tracking-wider">
              <Leaf className="w-3 h-3 text-[#008848]" />
              <span>OUR JOURNEY</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              From The Soil To Your Doorstep
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-2xl">
              We work directly with trusted farmers and local suppliers to bring
              you the freshest produce, straight from nature. Because you
              deserve the best — every single day.
            </p>

            {/* Horizontal Stepper Flow with Connecting Arrows */}
            <div className="pt-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              {/* Step 1: Farm Fresh */}
              <div className="flex flex-col items-center text-center p-3 flex-1 min-w-[110px] rounded-2xl bg-white border border-gray-100 shadow-2xs group hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mb-1.5 shadow-2xs">
                  <Leaf className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-xs font-bold text-gray-800">Farm Fresh</div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden sm:flex text-gray-300 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 2: Quality Check */}
              <div className="flex flex-col items-center text-center p-3 flex-1 min-w-[110px] rounded-2xl bg-white border border-gray-100 shadow-2xs group hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mb-1.5 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-xs font-bold text-gray-800">Quality Check</div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden sm:flex text-gray-300 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 3: Packed with Care */}
              <div className="flex flex-col items-center text-center p-3 flex-1 min-w-[110px] rounded-2xl bg-white border border-gray-100 shadow-2xs group hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mb-1.5 shadow-2xs">
                  <Package className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-xs font-bold text-gray-800">Packed with Care</div>
              </div>

              {/* Arrow 3 */}
              <div className="hidden sm:flex text-gray-300 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 4: Delivered to You */}
              <div className="flex flex-col items-center text-center p-3 flex-1 min-w-[110px] rounded-2xl bg-white border border-gray-100 shadow-2xs group hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center mb-1.5 shadow-2xs">
                  <Home className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-xs font-bold text-gray-800">Delivered to You</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner leaves */}
        <div className="absolute -bottom-4 -right-2 pointer-events-none select-none opacity-40 hidden md:block">
          <span className="text-4xl">🌿</span>
        </div>
      </section>
    </div>
  );
}