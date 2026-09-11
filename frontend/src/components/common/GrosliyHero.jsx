import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Truck } from "lucide-react";

const HERO_SLIDES = [
  {
    tagline: "Fresh • Quality • Everyday",
    titlePart1: "Groceries at ",
    titleHighlight: "Your Doorstep",
    desc: "Get fresh fruits, vegetables, dairy, snacks & more delivered in minutes.",
    btnText: "Shop Now",
    btnLink: "/products",
    badgeTitle: "Fast Delivery",
    badgeSubtitle: "in 10–30 mins",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80", // Brown bag overflowing with vegetables
  },
  {
    tagline: "100% Organic & Farm Fresh",
    titlePart1: "Farm Fresh ",
    titleHighlight: "Daily Produce",
    desc: "Directly sourced from trusted local farmers to keep your family healthy.",
    btnText: "Explore Now",
    btnLink: "/products?category=fruits-vegetables",
    badgeTitle: "Farm Direct",
    badgeSubtitle: "Quality Tested",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80",
  },
  {
    tagline: "Super Savings",
    titlePart1: "Lowest Prices on ",
    titleHighlight: "Daily Essentials",
    desc: "Save big on your monthly grocery bill with exclusive cashback & instant discounts.",
    btnText: "Grab Deals",
    btnLink: "/products?category=snacks-branded-foods",
    badgeTitle: "Super Deals",
    badgeSubtitle: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=700&q=80",
  },
];

export default function GrosliyHero({ slides }) {
  const activeSlides = (slides && slides.length > 0) ? slides : HERO_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const slide = activeSlides[currentSlide % activeSlides.length] || activeSlides[0];

  return (
    <div className="relative bg-gradient-to-r from-[#dff2e4] via-[#e5f6ea] to-[#eff9f2] rounded-lg border border-[#cbead3] p-5 sm:p-6 md:p-7 overflow-hidden min-h-[340px] lg:min-h-[380px] flex items-center shadow-xs">
      {/* Background soft decorative leaves illustration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#008848_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Floating Delivery Badge Top Right */}
      <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3.5 py-1.5 shadow-sm border border-gray-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#eaf8ef] text-[#008848] flex items-center justify-center font-bold">
            <Truck className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-gray-900 leading-tight">
              {slide.badgeTitle}
            </p>
            <p className="text-[11px] font-semibold text-[#008848] leading-tight">
              {slide.badgeSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Prev Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 text-gray-700 shadow hover:bg-white hover:text-[#008848] flex items-center justify-center transition-all duration-150"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Carousel Next Button */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 text-gray-700 shadow hover:bg-white hover:text-[#008848] flex items-center justify-center transition-all duration-150"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full relative z-10">
        {/* Text Section (6 cols on md+) */}
        <div className="md:col-span-6 space-y-3.5 text-left">
          <span className="inline-block text-[#008848] text-xs sm:text-sm font-bold tracking-wide">
            {slide.tagline}
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#113821] tracking-tight leading-[1.2]">
            {slide.titlePart1}
            <span className="text-[#008848] block sm:inline">{slide.titleHighlight}</span>
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm max-w-md leading-relaxed">
            {slide.desc}
          </p>

          <div className="pt-1">
            <Link
              to={slide.btnLink}
              className="inline-flex items-center gap-2 bg-[#008848] hover:bg-[#00703b] text-white px-6 py-2.5 rounded-md text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow active:scale-95 group"
            >
              <span>{slide.btnText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Hero Image Section (Nicely proportioned, crisp rounded-md corners) */}
        <div className="md:col-span-6 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[420px] lg:max-w-[460px] h-60 sm:h-72 md:h-[280px] lg:h-[310px] flex items-center justify-center">
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-[#008848]/10 rounded-md blur-lg transform scale-95" />
            <img
              src={slide.image}
              alt="Fresh Groceries"
              className="relative z-10 w-full h-full object-cover rounded-md shadow-md transition-all duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((idx) => {
          const isActive = idx === (currentSlide % 5);
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx % HERO_SLIDES.length)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-200 rounded-full ${
                isActive
                  ? "w-6 h-2 bg-[#008848]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
