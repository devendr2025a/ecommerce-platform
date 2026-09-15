import React from "react";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { getBackendImageUrl } from "../../utils/imageUrl";

export default function FarmFreshHero() {
  const heroBg = getBackendImageUrl("/images/blinkit/farm_fresh_hero_bg.jpg");

  return (
    <section className="w-full relative overflow-hidden bg-white">
      {/* Background Photo - Spans full width edge to edge covering all side space */}
      <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center">
        {/* Hero Background Image with vivid contrast and saturation */}
        <img
          src={heroBg}
          alt="Good Food Better Living - Farm Fresh Grocery"
          className="absolute inset-0 w-full h-full object-cover object-right select-none contrast-[1.06] saturate-[1.10]"
        />

        {/* Very Subtle Left Gradient Overlay behind text only - leaving produce 100% clear */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />

        {/* Floating Organic Leaves (Decorative) */}
        <div className="absolute top-4 left-6 pointer-events-none select-none opacity-80 animate-pulse">
          <span className="text-2xl sm:text-3xl">🍃</span>
        </div>
        <div className="absolute top-8 right-12 pointer-events-none select-none opacity-75">
          <span className="text-2xl sm:text-3xl">🌿</span>
        </div>


        {/* Centered Max-Width Content Wrapper */}
        <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-8 sm:py-12 max-w-xl">

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#113821] tracking-tight leading-[1.12]">
              Good Food<br />
              <span className="text-[#008848]">Better Living</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-gray-700 font-medium mt-2.5 sm:mt-3.5 leading-relaxed max-w-sm sm:max-w-md">
              Fresh groceries, daily essentials and more<br className="hidden sm:inline" />
              — delivered straight to your doorstep in minutes.
            </p>

            {/* Action CTA */}
            <div className="mt-5 sm:mt-7">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#008848] hover:bg-[#00703b] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3 Value Proposition Badges */}
            <div className="mt-6 sm:mt-8 pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-gray-800">
              {/* Fast Delivery */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100/70 text-[#008848] flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-tight">Fast Delivery</div>
                  <div className="text-[9px] text-gray-500">In 10–30 Mins</div>
                </div>
              </div>

              {/* 100% Organic */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100/70 text-[#008848] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-tight">100% Organic</div>
                  <div className="text-[9px] text-gray-500">& Farm Fresh</div>
                </div>
              </div>

              {/* Secure Payment */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100/70 text-[#008848] flex items-center justify-center shrink-0">
                  <CreditCard className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-tight">Secure Payment</div>
                  <div className="text-[9px] text-gray-500">Cash & Online</div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicator Dots (Bottom Center) */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            <span className="w-6 h-2 rounded-full bg-[#008848] transition-all" />
            <span className="w-2 h-2 rounded-full bg-gray-300/80 hover:bg-gray-400 transition-all cursor-pointer" />
            <span className="w-2 h-2 rounded-full bg-gray-300/80 hover:bg-gray-400 transition-all cursor-pointer" />
            <span className="w-2 h-2 rounded-full bg-gray-300/80 hover:bg-gray-400 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  );
}
