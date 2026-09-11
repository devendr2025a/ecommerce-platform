import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getBackendImageUrl } from "../../utils/imageUrl";

const PASTEL_CATEGORIES = [
  {
    id: "vegetables",
    name: "Vegetables",
    image: "/images/blinkit/cat_fruits_vegetables.png",
    link: "/products?category=fruits-vegetables",
    bgColor: "bg-[#eafaf1]",
    borderColor: "border-[#d1fae5]",
  },
  {
    id: "fruits",
    name: "Fruits",
    image: "/images/blinkit/new_cat_fruits_vegetables.png",
    link: "/products?category=fruits-vegetables",
    bgColor: "bg-[#fef9c3]",
    borderColor: "border-[#fef08a]",
  },
  {
    id: "dairy-eggs",
    name: "Dairy & Eggs",
    image: "/images/blinkit/cat_dairy_bread_eggs.png",
    link: "/products?category=dairy-breakfast",
    bgColor: "bg-[#e0f2fe]",
    borderColor: "border-[#bae6fd]",
  },
  {
    id: "staples",
    name: "Staples",
    image: "/images/blinkit/cat_atta_rice_dal.png",
    link: "/products?search=Atta",
    bgColor: "bg-[#fef3c7]",
    borderColor: "border-[#fde68a]",
  },
  {
    id: "snacks-beverages",
    name: "Snacks & Beverages",
    image: "/images/blinkit/cat_snacks_munchies.png",
    link: "/products?category=snacks-branded-foods",
    bgColor: "bg-[#ffe4e6]",
    borderColor: "border-[#fecdd3]",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "/images/blinkit/cat_personal_care.png",
    link: "/products?category=personal-care",
    bgColor: "bg-[#f3e8ff]",
    borderColor: "border-[#e9d5ff]",
  },
  {
    id: "household",
    name: "Household Essentials",
    image: "/images/blinkit/cat_cleaning_essentials.png",
    link: "/products?category=household-essentials",
    bgColor: "bg-[#e0f7fa]",
    borderColor: "border-[#b2ebf2]",
  },
  {
    id: "baby-care",
    name: "Baby Care",
    image: "/images/blinkit/cat_baby_care.png",
    link: "/products?category=baby-care",
    bgColor: "bg-[#ffedd5]",
    borderColor: "border-[#fed7aa]",
  },
  {
    id: "pet-care",
    name: "Pet Care",
    image: "/images/blinkit/cat_pet_care.png",
    link: "/products?category=pet-care",
    bgColor: "bg-[#f1f5f9]",
    borderColor: "border-[#e2e8f0]",
  },
];

export default function PastelCategoryGrid() {
  return (
    <section className="py-3 sm:py-5">
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5 sm:gap-3.5">
        {PASTEL_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            className={`group relative flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${cat.bgColor} hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden min-h-[130px] sm:min-h-[142px]`}
          >
            {/* Category Product Cluster Image */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src={getBackendImageUrl(cat.image)}
                alt={cat.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply select-none"
                loading="lazy"
              />
            </div>

            {/* Category Name */}
            <div className="text-center mt-2 flex-1 flex items-center justify-center">
              <span className="text-[11px] sm:text-xs font-bold text-gray-800 leading-tight group-hover:text-[#008848] transition-colors line-clamp-2">
                {cat.name}
              </span>
            </div>

            {/* Mini Circular Arrow Button */}
            <div className="mt-2 w-6 h-6 rounded-full bg-white/90 border border-black/5 shadow-2xs flex items-center justify-center text-gray-500 group-hover:bg-[#008848] group-hover:text-white group-hover:border-[#008848] transition-all">
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
