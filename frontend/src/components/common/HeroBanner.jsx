import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/assets/indian.webp",
    tag: "New Collection",
    title: "Quality Products. Trusted Delivery.",
    subtitle:
      "Premium fashion, curated and quality-checked. Delivered fast across India.",
    cta: "Shop Now",
    link: "/products",
    ctaSecondary: "Explore Collection",
  },
  {
    id: 2,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/049/099/130/small/colorful-outfits-hang-elegantly-reflecting-rich-cultural-craftsmanship-and-design-photo.jpeg",
    tag: "Best Sellers",
    title: "Elevated Essentials For You.",
    subtitle:
      "Timeless design meets modern craftsmanship — curated for the everyday you.",
    cta: "Shop Now",
    link: "/products",
    ctaSecondary: "View Collection",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating]
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo]
  );

  const back = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ height: "clamp(420px, 70vh, 800px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        key={current}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          animating ? "opacity-90" : "opacity-100"
        }`}
      >
        {/* IMAGE - Full Fill, No Black Space, Face Centered */}
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center 16%", // 0% from top - face usually yahi hota hai
          }}
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="max-w-[1500px] mx-auto px-5 sm:px-6 lg:px-10 w-full pb-8 sm:pb-10 md:pb-0">
            <div className="max-w-xl space-y-2 sm:space-y-3 md:space-y-5">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] sm:tracking-[0.35em] text-red-500 uppercase">
                {slide.tag}
              </span>

              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight sm:leading-none uppercase">
                {slide.title}
              </h1>

              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-sm hidden sm:block">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
                <Link
                  to={slide.link}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-colors"
                >
                  {slide.cta} <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Link>

                <Link
                  to="/products"
                  className="hidden sm:inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/60 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
                >
                  {slide.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <button
        onClick={back}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/90 items-center justify-center group transition-all"
      >
        <ChevronLeft className="h-5 w-5 text-white group-hover:text-black" />
      </button>

      <button
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/90 items-center justify-center group transition-all"
      >
        <ChevronRight className="h-5 w-5 text-white group-hover:text-black" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[2px] transition-all duration-500 ${
              i === current
                ? "w-6 sm:w-8 md:w-12 bg-white"
                : "w-3 sm:w-4 md:w-6 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}