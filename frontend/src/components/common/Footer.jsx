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
  { label: "Blog", path: "/blog", icon: BookOpen },
  { label: "Partner", path: "/partner", icon: Users },
  { label: "Privacy", path: "/privacy", icon: Lock },
  { label: "Franchise", path: "/franchise", icon: Store },
  { label: "Terms", path: "/terms", icon: FileText },
  { label: "Seller", path: "/seller", icon: Store },
  { label: "FAQs", path: "/faq", icon: HelpCircle },
  { label: "Warehouse", path: "/warehouse", icon: Warehouse },
  { label: "Security", path: "/disclaimer", icon: Shield },
  { label: "Deliver", path: "/deliver", icon: Bike },
  { label: "Contact", path: "/contact", icon: Phone },
  { label: "Resources", path: "/resources", icon: Layers },
];

const CATEGORY_COLUMNS = [
  // Column 1
  [
    { name: "Bath & Body", url: "/products?search=Soap" },
    { name: "Beauty & Cosmetics", url: "/products?category=personal-care" },
    { name: "Health & Pharma", url: "/products?category=pharma-wellness" },
    { name: "Atta, Rice & Dal", url: "/products?search=Atta" },
    { name: "Bakery & Biscuits", url: "/products?category=bakery-cakes" },
    { name: "Kitchenware & Appliances", url: "/products?category=household-essentials" },
    { name: "Drinks & Juices", url: "/products?category=beverages" },
    { name: "Sauces & Spreads", url: "/products?search=Sauce" },
    { name: "Rakhi Gifts", url: "/products?category=bakery-cakes" },
  ],
  // Column 2
  [
    { name: "Hair", url: "/products?search=Shampoo" },
    { name: "Feminine Hygiene", url: "/products?category=personal-care" },
    { name: "Sexual Wellness", url: "/products?category=pharma-wellness" },
    { name: "Oil, Ghee & Masala", url: "/products?search=Oil" },
    { name: "Dry Fruits & Cereals", url: "/products?search=Almond" },
    { name: "Chips & Namkeen", url: "/products?category=snacks-branded-foods" },
    { name: "Tea, Coffee & Milk Drinks", url: "/products?category=beverages" },
    { name: "Paan Corner", url: "/products?search=Paan" },
    { name: "Cleaners & Repellents", url: "/products?category=household-essentials" },
    { name: "Print Store", url: "/products?category=household-essentials" },
  ],
  // Column 3
  [
    { name: "Skin & Face", url: "/products?category=personal-care" },
    { name: "Baby Care", url: "/products?category=baby-care" },
    { name: "Vegetables & Fruits", url: "/products?category=fruits-vegetables" },
    { name: "Dairy, Bread & Eggs", url: "/products?category=dairy-breakfast" },
    { name: "Chicken, Meat & Fish", url: "/products?category=meat-seafood" },
    { name: "Sweets & Chocolates", url: "/products?category=bakery-cakes" },
    { name: "Instant Food", url: "/products?search=Instant" },
    { name: "Ice Creams & More", url: "/products?category=dairy-breakfast" },
    { name: "Electronics", url: "/products?category=household-essentials" },
    { name: "E-Gift Cards", url: "/products?search=Gift" },
  ],
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
    <footer className="w-full bg-white border-t border-gray-200 mt-12">
      {/* ── 1. Value Propositions Strip ── */}
      <div className="py-6 sm:py-8 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white border border-[#c8eed9] rounded-2xl sm:rounded-3xl shadow-[0_4px_24px_rgba(0,136,72,0.06)] py-6 sm:py-7 px-2 sm:px-4 overflow-hidden">
            {/* ── Continuous Connected Flow Line (Dead center of the 4 icon circles) ── */}
            <div className="hidden lg:block absolute top-[86px] -translate-y-1/2 left-[12%] right-[12%] h-[3px] bg-emerald-100 rounded-full z-0 overflow-hidden pointer-events-none">
              <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#008848] to-transparent rounded-full animate-line-flow shadow-[0_0_8px_#008848]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
              {/* Feature 1 */}
              <div className="flex flex-col items-center justify-center text-center p-4 sm:p-5 group relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_6px_16px_rgba(0,136,72,0.16)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-7 h-7 text-[#008848]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h4 className="mt-4 text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
                  100% Original Products
                </h4>
                <div className="w-7 h-[2.5px] bg-[#008848] rounded-full my-2.5" />
                <p className="text-xs sm:text-[13px] text-gray-500 font-medium">
                  Genuine Brands
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center justify-center text-center p-4 sm:p-5 group relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_6px_16px_rgba(0,136,72,0.16)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-7 h-7 text-[#008848]" viewBox="0 0 28 24" fill="currentColor">
                    <path d="M1 8h5a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zm2 5h4a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm-2 5h3a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2z" />
                    <path d="M9 5h9a1 1 0 0 1 1 1v2h3.2a1.5 1.5 0 0 1 1.2.6l2.8 3.5a1.5 1.5 0 0 1 .3.9v3.5a1.5 1.5 0 0 1-1.5 1.5h-1.2a3 3 0 0 1-5.6 0h-3.6a3 3 0 0 1-5.6 0H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm3 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-.8-7.5h-3.2v2.5h4.6l-1.4-2.5z" />
                  </svg>
                </div>
                <h4 className="mt-4 text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
                  Fast Delivery
                </h4>
                <div className="w-7 h-[2.5px] bg-[#008848] rounded-full my-2.5" />
                <p className="text-xs sm:text-[13px] text-gray-500 font-medium">
                  In 10–30 Minutes
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center justify-center text-center p-4 sm:p-5 group relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_6px_16px_rgba(0,136,72,0.16)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-8 h-8 text-[#008848]" viewBox="0 0 28 26" fill="none">
                    <rect x="2" y="4" width="22" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
                    <line x1="2" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2" />
                    <g transform="translate(14, 11)">
                      <path d="M6 14s4.5-2.2 4.5-5.5V4l-4.5-1.8L1.5 4v4.5C1.5 11.8 6 14 6 14z" fill="#e8f8f0" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="m4.2 8.2 1.3 1.3 2.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                </div>
                <h4 className="mt-4 text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
                  Secure Payments
                </h4>
                <div className="w-7 h-[2.5px] bg-[#008848] rounded-full my-2.5" />
                <p className="text-xs sm:text-[13px] text-gray-500 font-medium">
                  Cash & Online UPI
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center justify-center text-center p-4 sm:p-5 group relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e8f8f0] ring-4 ring-white flex items-center justify-center shadow-[0_6px_16px_rgba(0,136,72,0.16)] transition-transform duration-300 group-hover:scale-105 relative z-10">
                  <svg className="w-7 h-7 text-[#008848]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 13.5v-3a9 9 0 0 1 18 0v3" />
                    <rect x="2" y="12" width="3" height="6" rx="1.5" fill="currentColor" />
                    <rect x="19" y="12" width="3" height="6" rx="1.5" fill="currentColor" />
                    <path d="M20.5 16.5v1.5a3.5 3.5 0 0 1-3.5 3.5h-2" />
                    <circle cx="14" cy="21.5" r="1.2" fill="currentColor" stroke="none" />
                    <text x="12" y="12.5" textAnchor="middle" fontSize="6.2" fontWeight="900" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.3">24/7</text>
                  </svg>
                </div>
                <h4 className="mt-4 text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
                  24/7 Support
                </h4>
                <div className="w-7 h-[2.5px] bg-[#008848] rounded-full my-2.5" />
                <p className="text-xs sm:text-[13px] text-gray-500 font-medium">
                  We're here to help
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Links Section ── */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
          {/* Useful Links (4 cols on lg) */}
          <div className="lg:col-span-4">
            <h3 className="text-base font-extrabold text-gray-900 mb-4 tracking-tight">
              Useful Links
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-gray-600">
              {USEFUL_LINKS.map(({ label, path, icon: Icon }) => (
                <Link
                  key={label}
                  to={path}
                  className="flex items-center gap-2 hover:text-[#008848] transition-colors group"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#008848] transition-colors" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories Columns (8 cols on lg) */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                Categories
              </h3>
              <Link
                to="/products"
                className="text-xs font-bold text-[#008848] hover:underline"
              >
                see all
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-600">
              {CATEGORY_COLUMNS.map((col, cIdx) => (
                <ul key={cIdx} className="space-y-2">
                  {col.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.url}
                        className="flex items-center gap-1.5 hover:text-[#008848] transition-colors group"
                      >
                        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#008848] transition-colors" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Bottom Bar (Dark Forest Green) ── */}
      <div className="bg-[#062a19] text-white py-8 border-t border-emerald-950">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
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
            <div className="flex flex-wrap items-center gap-4">
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