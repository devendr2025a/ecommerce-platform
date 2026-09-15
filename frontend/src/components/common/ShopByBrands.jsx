import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// 8 official brand cards with rich brand-tailored styling & accents
const BRAND_CARDS = [
  {
    id: "amul",
    name: "Amul",
    tagline: "The Taste of India",
    image: "/images/blinkit/brand_card_amul.png",
    link: "/products?search=Amul",
    brandColor: "#e31837",
    borderColor: "#fecdd3",
    glowShadow: "rgba(227, 24, 55, 0.22)",
  },
  {
    id: "mother-dairy",
    name: "Mother Dairy",
    tagline: "Pure & Fresh",
    image: "/images/blinkit/brand_card_mother_dairy.png",
    link: "/products?search=Mother%20Dairy",
    brandColor: "#008cdc",
    borderColor: "#bae6fd",
    glowShadow: "rgba(0, 140, 220, 0.22)",
  },
  {
    id: "nandini",
    name: "Nandini",
    tagline: "Pure by Nature",
    image: "/images/blinkit/brand_card_nandini.png",
    link: "/products?search=Nandini",
    brandColor: "#1b8e3e",
    borderColor: "#bbf7d0",
    glowShadow: "rgba(27, 142, 62, 0.22)",
  },
  {
    id: "tata",
    name: "TATA",
    tagline: "Trusted for Generations",
    image: "/images/blinkit/brand_card_tata.png",
    link: "/products?search=Tata",
    brandColor: "#0d5cb6",
    borderColor: "#bfdbfe",
    glowShadow: "rgba(13, 92, 182, 0.22)",
  },
  {
    id: "maggi",
    name: "Maggi",
    tagline: "Good Food, Good Mood",
    image: "/images/blinkit/brand_card_maggi.png",
    link: "/products?search=Maggi",
    brandColor: "#e69500",
    borderColor: "#fef08a",
    glowShadow: "rgba(230, 149, 0, 0.25)",
  },
  {
    id: "lays",
    name: "Lay's",
    tagline: "Life Needs Flavour",
    image: "/images/blinkit/brand_card_lays.png",
    link: "/products?search=Lay%27s",
    brandColor: "#d63027",
    borderColor: "#fecdd3",
    glowShadow: "rgba(214, 48, 39, 0.22)",
  },
  {
    id: "britannia",
    name: "Britannia",
    tagline: "Goodness in Every Bite",
    image: "/images/blinkit/brand_card_britannia.png",
    link: "/products?search=Britannia",
    brandColor: "#1c7e39",
    borderColor: "#bbf7d0",
    glowShadow: "rgba(28, 126, 57, 0.22)",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    tagline: "Real Magic",
    image: "/images/blinkit/brand_card_coca_cola.png",
    link: "/products?search=Coca-Cola",
    brandColor: "#dc2626",
    borderColor: "#fecaca",
    glowShadow: "rgba(220, 38, 38, 0.22)",
  },
];

export default function ShopByBrands({ brandsSection }) {
  const scrollContainerRef = useRef(null);

  const bannerImg = "/images/blinkit/shop_by_brands_header.png?v=v2026_perfect_mockup";

  const brandsList =
    Array.isArray(brandsSection?.brands) && brandsSection.brands.length > 0
      ? brandsSection.brands
      : BRAND_CARDS;

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollDistance = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const getBrandImage = (brand) => {
    const matched = BRAND_CARDS.find((b) => b.id === brand.id);
    const imgPath = matched ? matched.image : (brand.image || `/images/blinkit/brand_card_${brand.id}.png`);
    const cleanPath = imgPath.includes("/images/blinkit/")
      ? "/images/blinkit/" + imgPath.split("/images/blinkit/")[1]
      : imgPath;
    return `${cleanPath}?v=v2026_unified_aspect_v3`;
  };

  return (
    <section className="py-2 sm:py-3 select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. PANORAMIC HEADER BANNER WITH GREEN MINT BORDER & VIEW ALL
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-3 sm:mb-3.5 border border-[#c8eed9] shadow-[0_4px_18px_rgba(0,0,0,0.03)] group/banner transition-all duration-300 hover:shadow-md hover:border-[#a3e4c0]">
        <Link
          to="/products"
          className="block w-full cursor-pointer"
          title="Explore All Brands and Products"
        >
          <img
            src={bannerImg}
            alt="Shop by Brands - Discover your favourite brands, all in one place."
            className="w-full h-auto object-cover select-none group-hover/banner:scale-[1.002] transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Interactive Clickable Hotspot over the printed "View All →" Button */}
        <Link
          to="/products"
          aria-label="View all brands and products"
          title="View All Brands"
          className="absolute right-[4.5%] sm:right-[5.5%] md:right-[6.2%] top-[50%] -translate-y-1/2 w-[85px] sm:w-[100px] md:w-[115px] h-[30px] sm:h-[36px] md:h-[40px] rounded-full cursor-pointer z-10 hover:bg-emerald-600/10 hover:ring-2 hover:ring-emerald-400/40 transition-all"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 8 BRAND CARDS WITH CAROUSEL NAVIGATION ARROWS (< and >)
             (Clean, edge-to-edge artwork exactly matching the mockup)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative group/carousel">
        {/* Left Carousel Navigation Arrow (<) */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left brands"
          className="absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-gray-200/90 flex items-center justify-center text-gray-600 hover:text-[#008848] hover:border-[#a3e4c0] hover:scale-110 active:scale-95 transition-all duration-200 z-20 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
        </button>

        {/* Right Carousel Navigation Arrow (>) */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right brands"
          className="absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-gray-200/90 flex items-center justify-center text-gray-600 hover:text-[#008848] hover:border-[#a3e4c0] hover:scale-110 active:scale-95 transition-all duration-200 z-20 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
        </button>

        {/* Brand Cards Grid */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5 lg:gap-3 px-1 py-1"
        >
          {brandsList.map((brand) => {
            const config =
              BRAND_CARDS.find((b) => b.id === brand.id) || {
                brandColor: "#008848",
                borderColor: "#bbf7d0",
                glowShadow: "rgba(0, 136, 72, 0.22)",
              };

            return (
              <Link
                key={brand.id}
                to={brand.link}
                className="group relative block w-full rounded-2xl overflow-hidden bg-white border border-gray-200/80 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 14px 28px -6px ${config.glowShadow}`;
                  e.currentTarget.style.borderColor = config.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(229, 231, 235, 0.8)";
                }}
                title={`Shop ${brand.name} Products - ${brand.tagline || ""}`}
                aria-label={`Shop ${brand.name}`}
              >
                {/* Crisp Pristine Card Image */}
                <img
                  src={getBrandImage(brand)}
                  alt={brand.name}
                  className="w-full h-auto object-contain block select-none group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />

                {/* Delicate Glossy Shimmer Sweep on Hover */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

