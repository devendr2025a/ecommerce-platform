import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getBackendImageUrl } from "../../utils/imageUrl";

export default function FloatingActions() {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist ? useWishlist() : { wishlist: [] };
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Exact 3D neumorphic artwork extracted from user reference image
  const cartIconImg = getBackendImageUrl("/images/blinkit/widget_cart_icon.png");
  const heartIconImg = getBackendImageUrl("/images/blinkit/widget_heart_icon.png");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed right-2.5 sm:right-5 bottom-6 sm:bottom-8 z-50 flex flex-col items-center gap-2.5 select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          COMPACT ULTRA-PREMIUM NEUMORPHIC FLOATING PILL DOCK
         ───────────────────────────────────────────────────────────── */}
      <div
        className="w-[46px] sm:w-[50px] py-2.5 sm:py-3 px-1 rounded-[26px] sm:rounded-[28px] bg-white border border-blue-50/80 flex flex-col items-center gap-2 sm:gap-2.5 transition-all duration-300"
        style={{
          boxShadow:
            "0 10px 28px -4px rgba(20, 70, 160, 0.16), 0 0 20px 2px rgba(220, 238, 255, 0.8), inset 0 1.5px 3px rgba(255, 255, 255, 1), 0 2px 6px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* 1. CART ACTION BUTTON */}
        <Link
          to="/cart"
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 group cursor-pointer"
          title="View Shopping Cart"
          style={{
            filter: "drop-shadow(0 3px 8px rgba(20, 70, 180, 0.15))",
          }}
        >
          <img
            src={cartIconImg}
            alt="Shopping Cart"
            className="w-full h-full object-contain pointer-events-none group-hover:brightness-105 transition-all"
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#008848] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs border-[1.5px] border-white animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>

        {/* 2. WISHLIST ACTION BUTTON */}
        <Link
          to="/products"
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 group cursor-pointer"
          title="My Wishlist"
          style={{
            filter: "drop-shadow(0 3px 8px rgba(20, 70, 180, 0.15))",
          }}
        >
          <img
            src={heartIconImg}
            alt="Wishlist"
            className="w-full h-full object-contain pointer-events-none group-hover:brightness-105 transition-all"
          />
          {wishlist?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs border-[1.5px] border-white">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* 3. WHATSAPP SUPPORT ACTION BUTTON */}
        <a
          href="https://wa.me/917388330600?text=Hi%20Grosliy,%20I%20need%20assistance%20with%20my%20grocery%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 group cursor-pointer"
          title="Chat on WhatsApp"
          style={{
            filter: "drop-shadow(0 3px 8px rgba(37, 211, 102, 0.28))",
          }}
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_2px_6px_rgba(20,70,160,0.12)] border border-emerald-50/80 group-hover:border-emerald-300 transition-all">
            <svg
              className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-[#25D366] drop-shadow-xs transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.03C9.36 7.03 9.09 7.09 8.87 7.33C8.65 7.57 8.02 8.16 8.02 9.36C8.02 10.56 8.9 11.72 9.02 11.89C9.14 12.05 10.73 14.5 13.17 15.56C13.75 15.81 14.2 15.96 14.55 16.07C15.13 16.26 15.66 16.23 16.08 16.17C16.55 16.1 17.52 15.58 17.72 15.01C17.93 14.45 17.93 13.97 17.87 13.87C17.81 13.77 17.65 13.71 17.41 13.59C17.17 13.47 15.98 12.89 15.76 12.81C15.54 12.73 15.38 12.69 15.22 12.93C15.06 13.17 14.6 13.71 14.46 13.87C14.32 14.03 14.18 14.05 13.94 13.93C13.7 13.81 12.92 13.56 12 12.74C11.28 12.1 10.79 11.31 10.65 11.07C10.51 10.83 10.64 10.7 10.76 10.58C10.87 10.47 11.01 10.29 11.13 10.15C11.25 10.01 11.29 9.91 11.37 9.75C11.45 9.59 11.41 9.45 11.35 9.33C11.29 9.21 10.83 8.08 10.64 7.62C10.45 7.17 10.26 7.23 10.12 7.22C9.99 7.22 9.83 7.22 9.67 7.22L9.53 7.03Z" />
            </svg>
          </div>
        </a>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SCROLL TO TOP BUTTON (Compact Micro-action)
         ───────────────────────────────────────────────────────────── */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-gray-700 hover:text-[#008848] border border-blue-50/80 shadow-md flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-90 cursor-pointer animate-in fade-in zoom-in"
          style={{
            boxShadow: "0 3px 10px rgba(20, 60, 140, 0.12)",
          }}
          title="Scroll to Top"
        >
          <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      )}
    </aside>
  );
}
