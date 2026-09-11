import React from "react";
import { Link } from "react-router-dom";

export default function GrosliyLogo({ variant = "dark", className = "" }) {
  const isDarkBg = variant === "light"; // on dark green footer

  return (
    <Link to="/" className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Grocery Cart with sprout icon */}
      <div className="relative flex items-center justify-center">
        <svg
          className="w-10 h-10 transition-transform group-hover:scale-105 duration-200"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cart Basket */}
          <path
            d="M6 10H11L16 28H37L41 14H14"
            stroke={isDarkBg ? "#4ade80" : "#008848"}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cart Wheels */}
          <circle cx="18" cy="35" r="3.5" fill={isDarkBg ? "#ffffff" : "#008848"} />
          <circle cx="35" cy="35" r="3.5" fill={isDarkBg ? "#ffffff" : "#008848"} />
          {/* Sprout / Leaves in cart */}
          <path
            d="M24 16C24 12 28 9 32 9C32 13 28 16 24 16Z"
            fill={isDarkBg ? "#86efac" : "#22c55e"}
          />
          <path
            d="M25 16C23 11 18 10 16 11C16 15 20 17 25 16Z"
            fill={isDarkBg ? "#bbf7d0" : "#4ade80"}
          />
          <path
            d="M24.5 16V22"
            stroke={isDarkBg ? "#4ade80" : "#008848"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Name and Tagline */}
      <div className="flex flex-col">
        <span
          className={`text-2xl font-extrabold tracking-tight leading-none ${
            isDarkBg ? "text-white" : "text-[#152e20]"
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Grosliy
        </span>
        <span
          className={`text-[10px] font-medium tracking-wide mt-0.5 ${
            isDarkBg ? "text-emerald-200/80" : "text-[#557161]"
          }`}
        >
          Groceries Made Easy
        </span>
      </div>
    </Link>
  );
}
