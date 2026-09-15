import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Lock,
  FileText,
  HelpCircle,
  Shield,
  Phone,
  Users,
  Store,
  Warehouse,
  Bike,
  Layers,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
} from "lucide-react";
import GrosliyLogo from "./GrosliyLogo";
import toast from "react-hot-toast";

const USEFUL_LINKS = [
  { label: "About & Blog", path: "/blog", icon: BookOpen },
  { label: "Partner With Us", path: "/partner", icon: Users },
  { label: "Privacy Policy", path: "/privacy", icon: Lock },
  { label: "Franchise Store", path: "/franchise", icon: Store },
  { label: "Terms of Service", path: "/terms", icon: FileText },
  { label: "Seller Onboarding", path: "/seller", icon: Store },
  { label: "Customer FAQs", path: "/faq", icon: HelpCircle },
  { label: "Warehouse Hub", path: "/warehouse", icon: Warehouse },
  { label: "Security & Safety", path: "/disclaimer", icon: Shield },
  { label: "Delivery Partner", path: "/deliver", icon: Bike },
  { label: "Contact Support", path: "/contact", icon: Phone },
  { label: "Help Center", path: "/faq", icon: Layers },
];

const CATEGORY_COLUMNS = [
  {
    title: "Daily Staples & Fresh",
    items: [
      { name: "Dairy, Milk & Eggs", url: "/products?category=dairy-breakfast" },
      { name: "Fresh Fruits & Vegetables", url: "/products?category=fruits-vegetables" },
      { name: "Atta, Rice & Dal", url: "/products?search=Atta" },
      { name: "Masala, Oil & Ghee", url: "/products?search=Oil" },
      { name: "Bakery, Bread & Buns", url: "/products?category=bakery-cakes" },
    ],
  },
  {
    title: "Snacks & Refreshments",
    items: [
      { name: "Cold Drinks & Juices", url: "/products?category=beverages" },
      { name: "Snacks, Chips & Namkeen", url: "/products?category=snacks-branded-foods" },
      { name: "Tea, Coffee & Drinks", url: "/products?search=Tea" },
      { name: "Chocolates & Sweets", url: "/products?search=Chocolate" },
      { name: "Instant Noodles & Pasta", url: "/products?search=Instant" },
    ],
  },
  {
    title: "Home & Personal Care",
    items: [
      { name: "Cleaning Essentials", url: "/products?category=household-essentials" },
      { name: "Detergents & Laundry", url: "/products?search=Detergent" },
      { name: "Personal Care & Soaps", url: "/products?category=personal-care" },
      { name: "Baby Care Products", url: "/products?category=baby-care" },
      { name: "Pharma & Wellness", url: "/products?category=pharma-wellness" },
    ],
  },
];

const POPULAR_SEARCHES = [
  "Amul Milk",
  "Aashirvaad Atta",
  "Fortune Oil",
  "Surf Excel",
  "Harpic Cleaner",
  "Dettol Soap",
  "Maggi Noodles",
  "Tata Tea",
  "Basmati Rice",
  "Dove Bar",
  "Good Day Biscuits",
];

export default function Footer() {
  const handleAppDownload = (platform) => {
    toast.success(
      `📱 Grosliy ${platform} App is launching soon! You can enjoy fast ordering right here on our website.`,
      {
        icon: "⚡",
        style: {
          borderRadius: "10px",
          background: "#008848",
          color: "#fff",
          fontSize: "12px",
          fontWeight: "600",
        },
        duration: 4000,
      }
    );
  };

  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-10">
      {/* ── 1. Value Propositions Strip ── */}
      <div className="py-5 sm:py-6 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-5 sm:py-6 px-2 sm:px-4 overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
              {/* Feature 1 */}
              <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 group relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,136,72,0.14)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-6 h-6 text-[#008848]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h4 className="mt-3 text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
                  100% Original Products
                </h4>
                <div className="w-6 h-[2px] bg-[#008848] rounded-full my-2" />
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  Direct from Verified Brands
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 group relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,136,72,0.14)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-6 h-6 text-[#008848]" viewBox="0 0 28 24" fill="currentColor">
                    <path d="M1 8h5a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zm2 5h4a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm-2 5h3a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2z" />
                    <path d="M9 5h9a1 1 0 0 1 1 1v2h3.2a1.5 1.5 0 0 1 1.2.6l2.8 3.5a1.5 1.5 0 0 1 .3.9v3.5a1.5 1.5 0 0 1-1.5 1.5h-1.2a3 3 0 0 1-5.6 0h-3.6a3 3 0 0 1-5.6 0H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm3 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-.8-7.5h-3.2v2.5h4.6l-1.4-2.5z" />
                  </svg>
                </div>
                <h4 className="mt-3 text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
                  Superfast Delivery
                </h4>
                <div className="w-6 h-[2px] bg-[#008848] rounded-full my-2" />
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  In 10–25 Minutes
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 group relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,136,72,0.14)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-6 h-6 text-[#008848]" viewBox="0 0 28 26" fill="none">
                    <rect x="2" y="4" width="22" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
                    <line x1="2" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2" />
                    <g transform="translate(14, 11)">
                      <path d="M6 14s4.5-2.2 4.5-5.5V4l-4.5-1.8L1.5 4v4.5C1.5 11.8 6 14 6 14z" fill="#e8f8f0" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="m4.2 8.2 1.3 1.3 2.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                </div>
                <h4 className="mt-3 text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
                  Secure Payments
                </h4>
                <div className="w-6 h-[2px] bg-[#008848] rounded-full my-2" />
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  UPI, Cards &amp; Cash on Delivery
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 group relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,136,72,0.14)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-6 h-6 text-[#008848]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 13.5v-3a9 9 0 0 1 18 0v3" />
                    <rect x="2" y="12" width="3" height="6" rx="1.5" fill="currentColor" />
                    <rect x="19" y="12" width="3" height="6" rx="1.5" fill="currentColor" />
                    <path d="M20.5 16.5v1.5a3.5 3.5 0 0 1-3.5 3.5h-2" />
                    <circle cx="14" cy="21.5" r="1.2" fill="currentColor" stroke="none" />
                    <text x="12" y="12.5" textAnchor="middle" fontSize="6.2" fontWeight="900" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.3">24/7</text>
                  </svg>
                </div>
                <h4 className="mt-3 text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
                  Dedicated Support
                </h4>
                <div className="w-6 h-[2px] bg-[#008848] rounded-full my-2" />
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  Quick Resolution in Lucknow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Compact Links & Real Product Categories Section ── */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 text-left">
          {/* Useful Links (4 cols on lg) */}
          <div className="lg:col-span-4 pr-0 sm:pr-4">
            <h3 className="text-sm font-black text-gray-950 mb-3 tracking-tight flex items-center gap-2">
              <span>Useful Links</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-gray-600">
              {USEFUL_LINKS.map(({ label, path, icon: Icon }) => (
                <Link
                  key={label}
                  to={path}
                  className="flex items-center gap-1.5 hover:text-[#008848] transition-colors py-0.5 group"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#008848] transition-colors flex-shrink-0" />
                  <span className="truncate group-hover:translate-x-0.5 transition-transform">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Categories (8 cols on lg) */}
          <div className="lg:col-span-8 pr-0 sm:pr-8 lg:pr-14">
            <div className="flex items-center justify-between gap-2 mb-3 pb-1 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-gray-950 tracking-tight">
                  Grocery Categories
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                  Fresh Daily
                </span>
              </div>
              <Link
                to="/products"
                className="text-xs font-bold text-[#008848] hover:text-[#00703b] hover:underline flex items-center gap-1"
              >
                <span>View All Products</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 3 Compact Columns of Real Product Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs text-gray-600">
              {CATEGORY_COLUMNS.map((col, cIdx) => (
                <div key={cIdx} className="space-y-1.5">
                  <h4 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    {col.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.url}
                          className="flex items-center gap-1.5 hover:text-[#008848] transition-colors group py-0.5"
                        >
                          <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#008848] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Popular Grocery Searches Strip */}
            <div className="mt-5 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-gray-500 flex-shrink-0">
                  Popular Searches:
                </span>
                {POPULAR_SEARCHES.map((term) => (
                  <Link
                    key={term}
                    to={`/products?search=${encodeURIComponent(term)}`}
                    className="text-[11px] font-medium text-gray-600 hover:text-[#008848] bg-gray-50 hover:bg-emerald-50/80 border border-gray-200/70 hover:border-emerald-200 px-2 py-0.5 rounded-md transition-all shadow-2xs"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Bottom Bar (Dark Forest Green) ── */}
      <div className="bg-[#062a19] text-white py-8 border-t border-emerald-950">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pr-16 sm:pr-20 md:pr-24 lg:pr-28">
          {/* Top Row: Logo, Download App, Socials */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Grosliy Logo on Dark */}
            <div>
              <GrosliyLogo variant="light" />
            </div>

            {/* Download App Badges */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-300 hidden sm:inline">
                Download App
              </span>

              <button
                type="button"
                onClick={() => handleAppDownload("App Store")}
                className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Download Grosliy on App Store"
              >
                <svg
                  className="w-5 h-5 fill-current text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.96 2.76 1.01.08 2.08-.51 2.69-1.26z" />
                </svg>
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider leading-tight text-gray-300">
                    Download on the
                  </p>
                  <p className="text-xs font-bold leading-tight text-white">
                    App Store
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAppDownload("Google Play")}
                className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Download Grosliy on Google Play"
              >
                <svg
                  className="w-5 h-5 fill-current text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.352-.35-.553-.846-.553-1.383V3.197c0-.537.201-1.033.552-1.383zm11.24 11.24l2.138 2.138-11.83 6.83 9.692-8.968zm2.138-2.138l-2.138 2.138-9.692-8.968 11.83 6.83zm1.189 1.189l2.793 1.613c.808.467.808 1.229 0 1.696l-2.793 1.613-2.222-2.461 2.222-2.461z" />
                </svg>
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider leading-tight text-gray-300">
                    Get it on
                  </p>
                  <p className="text-xs font-bold leading-tight text-white">
                    Google Play
                  </p>
                </div>
              </button>
            </div>

            {/* Social Icons - Shifted left to stay clear of floating widget */}
            <div className="flex items-center gap-2.5 mr-2 sm:mr-6 md:mr-10">
              {[
                { icon: Facebook, href: "https://facebook.com", name: "Facebook" },
                {
                  icon: () => (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  href: "https://x.com",
                  name: "X",
                },
                { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" },
                { icon: Youtube, href: "https://youtube.com", name: "YouTube" },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#008848] hover:bg-[#008848]/20 transition-all"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Copyright & Legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-gray-400">
            <p>© 2025 Grosliy. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4 mr-2 sm:mr-6 md:mr-10">
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
              <span>|</span>
              <Link to="/faq" className="hover:text-white transition-colors">
                Help
              </Link>
              <span>|</span>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
              <span>|</span>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}