import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PROMO_BANNERS } from "../../data/groceryData";

export default function PromoCards({ promos }) {
  const list = (promos && promos.length > 0) ? promos : PROMO_BANNERS;
  return (
    <section className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {list.map((promo) => (
          <div
            key={promo.id}
            className={`relative rounded-md p-5 sm:p-6 ${promo.bgColor} border ${promo.borderColor} overflow-hidden flex items-center justify-between shadow-xs hover:shadow-sm transition-shadow group min-h-[160px]`}
          >
            {/* Text & Button */}
            <div className="relative z-10 max-w-[58%] space-y-2">
              <span className="text-xs sm:text-sm font-semibold text-gray-700 block">
                {promo.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                {promo.offer}
              </h3>
              <div className="pt-2">
                <Link
                  to={promo.link}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all shadow-sm group-hover:gap-2 ${promo.btnColor}`}
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Thumbnail Image on Right (Bigger size, reduced radius) */}
            <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 flex items-center justify-center">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
