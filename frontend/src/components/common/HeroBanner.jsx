import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=700&fit=crop&q=90',
    tag: 'LIMITED RELEASE',
    title: 'THE NEW STANDARD',
    subtitle: "High-performance essentials designed for the modern lifestyle. Engineering meets aesthetic.",
    cta: 'SHOP COLLECTION',
    link: '/products',
    ctaSecondary: 'VIEW EDITORIAL',
    accent: 'from-black/95 via-black/40 to-transparent',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&h=700&fit=crop&q=90',
    tag: 'SEASONAL DROP',
    title: 'STYLE WITHOUT BOUNDARIES',
    subtitle: "The latest collection of seasonal layers and versatile staples. Built to last, designed to move.",
    cta: 'SHOP ALL',
    link: '/products',
    ctaSecondary: 'DISCOVER MORE',
    accent: 'from-black/95 via-black/40 to-transparent',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const back = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative w-full overflow-hidden select-none bg-black"
      style={{ height: '75vh', minHeight: '500px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={current} className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${animating ? 'opacity-90' : 'opacity-100'}`}>
        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover scale-105" />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`} />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block text-[10px] font-black tracking-[0.4em] text-white border border-white/40 px-3 py-1 uppercase">
                {slide.tag}
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter uppercase italic">
                {slide.title}
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md font-medium uppercase tracking-wide opacity-80">
                {slide.subtitle}
              </p>

              <div className="flex gap-4 pt-4">
                <Link to={slide.link} className="btn-primary flex items-center gap-2">
                  {slide.cta} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/products" className="btn-secondary">
                  {slide.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={back} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors">
        <ChevronLeft className="h-8 w-8 stroke-[1px]" />
      </button>

      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors">
        <ChevronRight className="h-8 w-8 stroke-[1px]" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`h-[2px] transition-all duration-500 ${i === current ? 'w-12 bg-white' : 'w-6 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
