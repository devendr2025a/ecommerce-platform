import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { ROUND_CATEGORIES } from "../../data/groceryData";

export default function CategoryCircles({ categories }) {
  const list = (categories && categories.length > 0) ? categories : ROUND_CATEGORIES;
  return (
    <section className="py-6">
      <div className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-hide py-2 px-1">
        {list.map((cat, i) => (
          <Link
            key={i}
            to={cat.isMore ? "/products" : `/products?category=${cat.slug}`}
            className="flex flex-col items-center group flex-shrink-0 w-24 sm:w-28 text-center"
          >
            {/* Circle / Rounded Image Box */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md bg-white border border-gray-100 shadow-xs p-1.5 flex items-center justify-center group-hover:border-[#008848] group-hover:shadow-sm transition-all duration-200 group-hover:-translate-y-0.5">
              {cat.isMore ? (
                <div className="w-full h-full rounded-sm bg-emerald-50 text-[#008848] flex items-center justify-center">
                  <LayoutGrid className="w-8 h-8" />
                </div>
              ) : (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform"
                />
              )}
            </div>

            {/* Label */}
            <span className="mt-2 text-xs font-semibold text-gray-800 leading-snug group-hover:text-[#008848] transition-colors line-clamp-2 px-1">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
