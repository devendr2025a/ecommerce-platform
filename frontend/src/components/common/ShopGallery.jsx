// src/components/common/ShopGallery.jsx
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// 🔥 DIRECT PATH - Public folder se
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/assets/image1.jpeg",
    caption: "Our Chikan Workshop",
    type: "workshop"
  },
  {
    id: 2,
    src: "/assets/image2.jpeg",
    caption: "Pure Cotton Fabrics Collection",
    type: "fabric"
  },
  {
    id: 3,
    src: "/assets/image3.jpeg",
    caption: "Traditional Embroidery Work",
    type: "embroidery"
  },
  {
    id: 4,
    src: "/assets/image4.jpeg",
    caption: "Our Retail Shop",
    type: "shop"
  },
];

export default function ShopGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Header - Only title, no click togggle */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] flex items-center justify-center gap-2">
              <span></span>  Gallery
            </h2>
            <p className="text-center text-[11px] text-[var(--vg-muted)] mt-2 uppercase tracking-wide">
              Explore our  fabrics
            </p>
          </div> 

          {/* Gallery Slider - Always visible */}
          <div className="mt-4">
            
            {/* Featured Image Slider */}
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white">
                <div className="relative aspect-[4/3]">
                  <img
                    src={GALLERY_IMAGES[currentIndex].src}
                    alt={GALLERY_IMAGES[currentIndex].caption}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openLightbox(currentIndex)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm font-medium text-center">
                      {GALLERY_IMAGES[currentIndex].caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5 text-[var(--vg-black)]" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="h-5 w-5 text-[var(--vg-black)]" />
              </button>

              {/* Dots Indicator - Shows which image you're on */}
              <div className="flex justify-center gap-2 mt-4">
                {GALLERY_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-6 bg-[var(--vg-red)]'
                        : 'w-2 bg-[var(--vg-border)] hover:bg-[var(--vg-muted)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Shop Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2x shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--vg-red)]">
                   Handcrafted with Love | 📍 Visit Our Shop
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal - Fullscreen View */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 transition-all hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <img
            src={GALLERY_IMAGES[currentIndex].src}
            alt={GALLERY_IMAGES[currentIndex].caption}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 transition-all hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <p className="absolute bottom-5 left-0 right-0 text-center text-white text-sm bg-black/50 py-2 mx-auto max-w-md rounded-full">
            {GALLERY_IMAGES[currentIndex].caption}
          </p>
        </div>
      )}
    </>
  );
}