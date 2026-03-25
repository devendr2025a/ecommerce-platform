import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=560&fit=crop&q=85',
    tag: '✨ New Season Collection',
    title: 'Fashion That Speaks',
    subtitle: "Discover the latest trends for every season. Explore curated styles with exclusive member discounts.",
    cta: 'Shop Fashion',
    link: '/products?category=Fashion',
    ctaSecondary: 'View Collection',
    accent: 'from-purple-900/80 via-pink-800/50 to-transparent',
    badge: 'bg-pink-500',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&h=560&fit=crop&q=85',
    tag: '👗 Up to 40% Off',
    title: 'Style Your Every Mood',
    subtitle: "Men's & women's clothing for every occasion. Premium fabrics, modern cuts, unbeatable prices.",
    cta: 'Shop Clothing',
    link: '/products?category=Clothing',
    ctaSecondary: 'Explore Now',
    accent: 'from-indigo-900/80 via-purple-800/50 to-transparent',
    badge: 'bg-indigo-500',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&h=560&fit=crop&q=85',
    tag: '💄 Beauty Essentials',
    title: 'Glow Up Every Day',
    subtitle: 'Top beauty brands, skincare, makeup & more. Look and feel your absolute best every single day.',
    cta: 'Shop Beauty',
    link: '/products?category=Beauty',
    ctaSecondary: 'View All',
    accent: 'from-rose-900/80 via-pink-700/50 to-transparent',
    badge: 'bg-rose-500',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=560&fit=crop&q=85',
    tag: '🔥 Trending Now',
    title: 'Be Bold, Be You',
    subtitle: 'Express yourself with our latest arrivals. Handpicked styles that turn heads wherever you go.',
    cta: 'Shop Now',
    link: '/products',
    ctaSecondary: 'All Products',
    accent: 'from-fuchsia-900/80 via-rose-800/40 to-transparent',
    badge: 'bg-fuchsia-500',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState('next'); // 'next' | 'prev'

  const goTo = useCallback((index, direction = 'next') => {
    if (animating) return;
    setDir(direction);
    setPrev(current);
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 600);
  }, [animating, current]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length, 'next'), [current, goTo]);
  const back = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, 'prev'), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = SLIDES[current];
  const prevSlide = prev !== null ? SLIDES[prev] : null;

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ height: 'clamp(300px, 52vw, 560px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Prev slide (exit) */}
      {prevSlide && (
        <div
          key={`prev-${prev}`}
          className="absolute inset-0 w-full h-full"
          style={{
            animation: `${dir === 'next' ? 'slideOutLeft' : 'slideOutRight'} 0.6s ease forwards`,
          }}
        >
          <img src={prevSlide.image} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${prevSlide.accent}`} />
        </div>
      )}

      {/* Current slide (enter) */}
      <div
        key={`curr-${current}`}
        className="absolute inset-0 w-full h-full"
        style={{
          animation: animating
            ? `${dir === 'next' ? 'slideInRight' : 'slideInLeft'} 0.6s ease forwards`
            : 'none',
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`} />
        {/* dark bottom fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-xl">
              {/* Tag badge */}
              <span
                className={`inline-block ${slide.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wide shadow-lg`}
                style={{ animation: 'fadeSlideUp 0.5s ease 0.1s both' }}
              >
                {slide.tag}
              </span>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 drop-shadow-lg"
                style={{ animation: 'fadeSlideUp 0.5s ease 0.2s both' }}
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/85 text-sm sm:text-base leading-relaxed mb-6 max-w-sm drop-shadow"
                style={{ animation: 'fadeSlideUp 0.5s ease 0.3s both' }}
              >
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div
                className="flex gap-3 flex-wrap"
                style={{ animation: 'fadeSlideUp 0.5s ease 0.4s both' }}
              >
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  {slide.cta} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/25 transition-all text-sm"
                >
                  {slide.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={back}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-7 h-2.5 bg-white shadow-lg'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-white/20 w-full z-20">
          <div
            key={current}
            className="h-full bg-white/70"
            style={{ animation: 'progressBar 5s linear forwards' }}
          />
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute top-4 right-5 z-20 bg-black/30 backdrop-blur-sm text-white/80 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
        {current + 1} / {SLIDES.length}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0.8; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0.8; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0.8; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0);   opacity: 1; }
          to   { transform: translateX(100%); opacity: 0.8; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
