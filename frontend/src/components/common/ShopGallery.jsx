// src/components/common/ShopGallery.jsx
import React, { useState } from 'react';
import { ChevronDown, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const displayImages = showAllImages ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, 4);
  const hasMoreImages = GALLERY_IMAGES.length > 4;

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
      {/* 🔥 Background changed to bg-[var(--vg-gray)] - Same as New Releases section */}
      <section className="py-12 md:py-16 bg-[var(--vg-gray)] border-b border-[var(--vg-border)]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Header - Click to toggle */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer group"
          >
            <div className="flex items-center justify-between max-w-md mx-auto border-b-2 border-[var(--vg-border)] pb-4 hover:border-[var(--vg-red)] transition-all">
              <h2 className="text-2xl font-black text-[var(--vg-black)] uppercase tracking-[0.08em] flex items-center gap-2">
                <span></span> Our Shop Gallery
              </h2>
              <ChevronDown 
                className={`h-5 w-5 text-[var(--vg-muted)] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
            <p className="text-center text-[11px] text-[var(--vg-muted)] mt-2 uppercase tracking-wide">
              Click to see our workshop & fabrics
            </p>
          </div>

          {/* Gallery Content */}
          {isOpen && (
            <div className="mt-10 animate-fadeIn">
              
              {/* Featured Image Slider */}
              <div className="relative max-w-4xl mx-auto mb-8">
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

                {/* Dots Indicator */}
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

              {/* Thumbnail Grid with Show More */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--vg-black)]">
                    All Moments
                  </h3>
                  {hasMoreImages && (
                    <button
                      onClick={() => setShowAllImages(!showAllImages)}
                      className="text-[11px] font-bold uppercase tracking-wider text-[var(--vg-red)] hover:underline flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      {showAllImages ? 'Show Less' : `Show ${GALLERY_IMAGES.length - 4} More`}
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {displayImages.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => {
                        const originalIndex = GALLERY_IMAGES.findIndex(i => i.id === img.id);
                        setCurrentIndex(originalIndex);
                        openLightbox(originalIndex);
                      }}
                      className="relative group overflow-hidden rounded-xl aspect-square bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">
                          View
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-[9px] font-medium truncate">
                          {img.caption}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop Badge */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--vg-red)]">
                    🧵 Handcrafted with Love | 📍 Visit Our Shop
                  </span>
                </div>
              </div>
            </div>
          )}
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

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}