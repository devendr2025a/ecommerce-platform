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
    overlay: "from-black/70 via-black/30 to-transparent",
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
    overlay: "from-black/70 via-black/30 to-transparent",
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
      className="relative w-full overflow-hidden select-none bg-black"
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
        {/* 🔥 IMAGE FIX START */}
        <div className="absolute inset-0 overflow-hidden">
          
          {/* Blur Background */}
          <div
            className="absolute inset-0 scale-105 blur-lg"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Main Image (No Cut) */}
          <div
            className="relative w-full h-full bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "contain",
            }}
          />
        </div>
        {/* 🔥 IMAGE FIX END */}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`}
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-end sm:items-center">
          <div className="max-w-[1500px] mx-auto px-5 sm:px-6 lg:px-10 w-full pb-10 sm:pb-0">
            <div className="max-w-xl space-y-3 sm:space-y-5">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[var(--vg-red)] uppercase">
                {slide.tag}
              </span>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight sm:leading-none uppercase">
                {slide.title}
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm sm:max-w-md hidden sm:block">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
                <Link to={slide.link} className="btn-primary text-center">
                  {slide.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to="/products"
                  className="hidden sm:inline-flex items-center gap-2 bg-transparent text-white border border-white/60 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
                >
                  {slide.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={back}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/90 items-center justify-center group"
      >
        <ChevronLeft className="h-5 w-5 text-white group-hover:text-black" />
      </button>

      <button
        onClick={next}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/90 items-center justify-center group"
      >
        <ChevronRight className="h-5 w-5 text-white group-hover:text-black" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`h-[2px] transition-all duration-500 ${
              i === current
                ? "w-8 sm:w-12 bg-white"
                : "w-4 sm:w-6 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}