import React from "react";
import { Link } from "react-router-dom";
import { DEPARTMENT_EXPLORE_SECTIONS } from "../../data/categoryCatalogData";
import { getBackendImageUrl } from "../../utils/imageUrl";

export default function DepartmentExploreGrid() {
  return (
    <div className="pt-4 pb-12 space-y-6 sm:space-y-8 select-none">
      {DEPARTMENT_EXPLORE_SECTIONS.map((dept) => (
        <section key={dept.id} className="space-y-2.5 sm:space-y-3">
          {/* Department Header */}
          <h2 className="text-base sm:text-lg md:text-xl font-black text-gray-900 tracking-tight px-1">
            {dept.title}
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2 sm:gap-3">
            {(dept.categories || dept.items || []).map((cat, idx) => (
              <Link
                key={cat.id || cat.name || idx}
                to={cat.link || "/products"}
                className="group flex flex-col items-center justify-between p-2 sm:p-2.5 bg-[#f8faf9] hover:bg-[#f0f7f3] border border-gray-100 hover:border-emerald-200 rounded-xl sm:rounded-2xl transition-all duration-200 hover:shadow-xs cursor-pointer min-h-[105px] sm:min-h-[120px]"
              >
                {/* Category Packshot / Icon Image */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-0.5 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={getBackendImageUrl(cat.image)}
                    alt={(cat.name || "").replace("\n", " ")}
                    className="w-full h-full object-contain select-none"
                    loading="lazy"
                  />
                </div>

                {/* Category Name (Centered, Multi-line) */}
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 group-hover:text-emerald-800 text-center leading-tight whitespace-pre-line mt-1">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
