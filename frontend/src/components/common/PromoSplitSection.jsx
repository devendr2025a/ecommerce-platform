import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, RotateCcw, Headphones, ArrowRight } from "lucide-react";
import { getBackendImageUrl } from "../../utils/imageUrl";

export default function PromoSplitSection() {
  const produceImg = getBackendImageUrl("/images/blinkit/fresh_deals_produce.jpg");

  return (
    <section className="py-2.5 sm:py-3.5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* Left: Wide Dark Green Promotional Banner (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-r from-black via-[#062416] to-[#0c3d26] rounded-lg sm:rounded-xl overflow-hidden relative shadow-sm flex flex-col sm:flex-row items-center justify-between min-h-[170px]">
          {/* Fresh Produce Graphic Left */}
          <div
            className="w-full sm:w-[46%] h-48 sm:h-full relative overflow-hidden flex items-center justify-center p-1 sm:p-2"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black 60%, transparent 98%)",
              maskImage: "linear-gradient(to right, black 60%, transparent 98%)",
            }}
          >
            <img
              src={produceImg}
              alt="Fresh Deals Produce"
              className="max-h-full max-w-full object-cover sm:object-contain select-none transform hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Offer Text & Button Right */}
          <div className="w-full sm:w-[58%] p-5 sm:p-6 flex flex-col justify-center text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-[10px] font-extrabold uppercase tracking-wider w-fit mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Special Offer</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              Fresh Deals, Every Day!
            </h3>

            <p className="text-xs sm:text-[13px] text-emerald-100/80 font-medium mt-1 mb-4">
              Get up to 20% OFF on your favourite grocery products.
            </p>

            <div>
              <Link
                to="/products?search=deal"
                className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-[#0c3d26] text-xs font-extrabold px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 group"
              >
                <span>Explore Offers</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: 3 Trust Guarantees (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-lg sm:rounded-xl border border-gray-100/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-center gap-4.5">
          {/* Guarantee 1 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Premium Quality
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Only the best for you
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Guarantee 2 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0 shadow-2xs">
              <RotateCcw className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Easy Returns
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Hassle-free shopping
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Guarantee 3 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#008848] flex items-center justify-center shrink-0 shadow-2xs">
              <Headphones className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                24/7 Support
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                We're always here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
