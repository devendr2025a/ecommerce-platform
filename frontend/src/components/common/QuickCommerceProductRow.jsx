import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import QuickCommerceProductCard from "./QuickCommerceProductCard";

export default function QuickCommerceProductRow({ section }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll);
      return () => currentRef.removeEventListener("scroll", checkScroll);
    }
  }, [section]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!section || !Array.isArray(section.products) || section.products.length === 0) {
    return null;
  }

  return (
    <section className="py-2.5 sm:py-3.5 select-none relative group/row">
      {/* Header with Title and "See All >" link */}
      <div className="flex items-center justify-between pb-2 sm:pb-3 px-1">
        <h2 className="text-base sm:text-lg md:text-xl font-black text-gray-900 tracking-tight">
          {section.title}
        </h2>

        <Link
          to={section.seeAllLink || "/products"}
          className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-bold text-[#ff3269] hover:text-[#d61b50] transition-colors group/link"
        >
          <span>See All</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-0.5 transition-transform stroke-[2.5]" />
        </Link>
      </div>

      {/* Horizontal Scrollable Product Row with Nav Arrows */}
      <div className="relative">
        {/* Left Scroll Arrow */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all z-20 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Right Scroll Arrow (Circular button like reference) */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all z-20 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto scrollbar-none scroll-smooth pb-2 pt-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {section.products.map((product) => (
            <QuickCommerceProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
