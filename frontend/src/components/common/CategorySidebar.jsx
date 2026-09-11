import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Menu } from "lucide-react";
import { GROSLIY_CATEGORIES } from "../../data/groceryData";

export default function CategorySidebar() {
  return (
    <aside className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#008848] text-white px-4 py-3 flex items-center gap-2.5 font-bold text-sm select-none">
        <Menu className="w-5 h-5" />
        <span>All Categories</span>
      </div>

      {/* Categories List */}
      <div className="flex-1 py-1 divide-y divide-gray-100 flex flex-col justify-between">
        {GROSLIY_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="flex items-center justify-between px-4 py-2.5 hover:bg-emerald-50 text-gray-700 hover:text-[#008848] transition-colors group text-[13px] font-medium"
          >
            <div className="flex items-center gap-3">
              <span className="text-base select-none">{cat.icon}</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                {cat.name}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#008848] group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </aside>
  );
}
